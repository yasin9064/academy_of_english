'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Workshop } from '@/lib/types';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Upload,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('30-day');
  const [duration, setDuration] = useState('30 Days');
  const [targetAudience, setTargetAudience] = useState('Students & Youth');
  const [venue, setVenue] = useState('Academy Campus, Kishanganj');
  const [status, setStatus] = useState<'UPCOMING' | 'COMPLETED'>('UPCOMING');
  const [imageUrl, setImageUrl] = useState('');

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workshops');
      const data = await res.json();
      if (data.workshops) setWorkshops(data.workshops);
    } catch {
      toast.error('Failed to load workshops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const openCreateModal = () => {
    setEditingWorkshop(null);
    setTitle('');
    setSlug('');
    setSubtitle('');
    setDescription('');
    setType('30-day');
    setDuration('30 Days');
    setTargetAudience('Students & Youth');
    setVenue('Academy Campus, Kishanganj');
    setStatus('UPCOMING');
    setImageUrl('/images/trainer/faizan_workshop.png');
    setIsModalOpen(true);
  };

  const openEditModal = (w: Workshop) => {
    setEditingWorkshop(w);
    setTitle(w.title);
    setSlug(w.slug);
    setSubtitle(w.subtitle || '');
    setDescription(w.description);
    setType(w.type);
    setDuration(w.duration);
    setTargetAudience(w.targetAudience);
    setVenue(w.venue);
    setStatus(w.status);
    setImageUrl(w.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      toast.success('Photograph uploaded successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: subtitle || undefined,
      description,
      type,
      duration,
      targetAudience,
      venue,
      status,
      imageUrl: imageUrl || undefined,
    };

    try {
      if (editingWorkshop) {
        const res = await fetch(`/api/workshops/${editingWorkshop.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success('Workshop updated');
      } else {
        const res = await fetch('/api/workshops', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success('Workshop created');
      }
      setIsModalOpen(false);
      fetchWorkshops();
    } catch {
      toast.error('Failed to save workshop');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this workshop?')) return;

    try {
      const res = await fetch(`/api/workshops/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
      toast.success('Workshop deleted');
    } catch {
      toast.error('Failed to delete workshop');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Workshop & Bootcamp Manager
          </h1>
          <p className="text-xs text-zinc-400">
            Create upcoming campus bootcamps, school development programs, and upload workshop photos.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md shadow-[#F5D638]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Workshop</span>
        </button>
      </div>

      {/* Workshops List */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-sm">Loading workshops...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <div
              key={w.id}
              className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-4 shadow-xl transition-colors"
            >
              <div className="space-y-3">
                {w.imageUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.imageUrl} alt={w.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      w.status === 'UPCOMING'
                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                        : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                    }`}
                  >
                    {w.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(w)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-[#F5D638] hover:bg-zinc-800 transition-colors"
                      title="Edit Workshop"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Workshop"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white font-serif">{w.title}</h3>
                {w.subtitle && <p className="text-xs text-[#F5D638] italic">{w.subtitle}</p>}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-light">
                  {w.description}
                </p>

                <div className="pt-2 space-y-1 text-[11px] text-zinc-400 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F5D638]" />
                    <span>{w.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3157A5]" />
                    <span className="truncate">{w.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111111] border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingWorkshop ? 'Edit Workshop' : 'Create New Workshop'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 30-Day Intensive Personality Transformation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. 30-day-intensive"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. A month that permanently reshapes your communication"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed workshop overview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="30 Days"
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Venue</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Academy Campus, Kishanganj"
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Workshop Photograph
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/trainer/faizan_workshop.png"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#F5D638]" />
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
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
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Workshop</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
