'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import GalleryLightbox from '@/components/GalleryLightbox';
import { Sparkles, Maximize2, Filter, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'trainer', label: 'Trainer Faizan' },
  { id: 'public-speaking', label: 'Public Speaking Events' },
  { id: 'workshops', label: 'Student Workshops' },
  { id: 'award-ceremonies', label: 'Award Ceremonies' },
  { id: 'collaborations', label: 'School Collaborations' },
  { id: 'classroom', label: 'Classroom Activities' },
  { id: 'training', label: 'Training Sessions' },
  { id: 'certifications', label: 'Certifications' },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setItems(data.items);
        }
      })
      .catch((err) => console.error('Failed to load gallery items:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Visual Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Academy Photography Gallery
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Real moments of growth, student public speaking, mentorship under Master Trainer Munawar Zama, and school campus workshops.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar justify-start sm:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5D638] text-black shadow-lg shadow-[#F5D638]/20 font-bold'
                    : 'bg-[#111111] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 text-sm">
            Loading photographic gallery...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 text-sm">No photographs found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-[#F5D638] hover:underline"
            >
              View all photographs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800 hover:border-[#F5D638]/50 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Right Zoom Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#050505]/80 text-[#F5D638] border border-[#F5D638]/30 uppercase tracking-wider">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Caption Bottom Bar */}
                  <div className="absolute inset-x-0 bottom-0 p-4 space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#F5D638] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
