'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import {
  Upload,
  PlusCircle,
  Trash2,
  Star,
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'trainer', label: 'Trainer Faizan' },
  { id: 'public-speaking', label: 'Public Speaking Events' },
  { id: 'workshops', label: 'Student Workshops' },
  { id: 'award-ceremonies', label: 'Award Ceremonies' },
  { id: 'collaborations', label: 'School Collaborations' },
  { id: 'classroom', label: 'Classroom Activities' },
  { id: 'training', label: 'Training Sessions' },
  { id: 'certifications', label: 'Certifications' },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('workshops');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setImageUrl(data.url);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      toast.success('Image uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Please upload an image or provide an image URL');
      return;
    }
    setSaving(true);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          caption: caption || undefined,
          category,
          imageUrl,
          isFeatured,
          order: 0,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success('Photograph added to gallery');
      setIsModalOpen(false);
      setTitle('');
      setCaption('');
      setImageUrl('');
      fetchGallery();
    } catch {
      toast.error('Failed to add photograph');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photograph?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success('Photograph removed');
    } catch {
      toast.error('Failed to delete item');
    }
  };

  const handleToggleFeature = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !item.isFeatured }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isFeatured: !item.isFeatured } : i))
      );
      toast.success(`Photo ${!item.isFeatured ? 'marked as featured' : 'unfeatured'}`);
    } catch {
      toast.error('Failed to update featured flag');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Gallery & Media Manager
          </h1>
          <p className="text-xs text-zinc-400">
            Upload student workshop photographs, categorize images, and set featured highlights.
          </p>
        </div>

        <button
          onClick={() => {
            setTitle('');
            setCaption('');
            setImageUrl('');
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md shadow-[#F5D638]/20 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Photograph</span>
        </button>
      </div>

      {/* Grid of photos */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-sm">Loading media gallery...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col justify-between space-y-3 shadow-lg"
            >
              <div className="space-y-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeature(item)}
                      className={`p-1.5 rounded-full ${
                        item.isFeatured
                          ? 'bg-[#F5D638] text-black'
                          : 'bg-black/60 text-zinc-400 hover:text-white'
                      } transition-colors`}
                      title={item.isFeatured ? 'Featured Image' : 'Mark as Featured'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-full bg-black/60 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/80 text-[#F5D638] border border-[#F5D638]/30">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                {item.caption && (
                  <p className="text-[11px] text-zinc-400 line-clamp-2 font-light">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload & Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#111111] border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-white font-serif">Add Photograph to Gallery</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* File upload drag / picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Select Image File *
                </label>
                <div className="border-2 border-dashed border-zinc-700 hover:border-[#F5D638] rounded-2xl p-6 text-center transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    id="galUpload"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="galUpload" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-[#F5D638] mx-auto" />
                    <p className="text-xs text-zinc-300 font-semibold">
                      {uploading ? 'Uploading image...' : 'Click to browse image from computer'}
                    </p>
                    <p className="text-[10px] text-zinc-500">Supports JPG, PNG, WebP up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Or manual URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/trainer/faizan_hero.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Photograph Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Trainer Faizan Addressing Student Assembly"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short explanation of what is taking place in this photo..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#F5D638] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featCheck" className="text-xs text-zinc-300 cursor-pointer">
                  Feature on homepage and highlight reels
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !imageUrl}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Photograph</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
