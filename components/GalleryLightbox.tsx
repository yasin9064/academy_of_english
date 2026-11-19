'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0);
    }
  }, [currentIndex, items.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(items.length - 1);
    }
  }, [currentIndex, items.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Top Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-zinc-300">
        <div className="text-xs sm:text-sm font-medium bg-[#111111]/80 border border-zinc-800 px-3 py-1.5 rounded-full">
          <span>{currentIndex + 1}</span> / <span>{items.length}</span> —{' '}
          <span className="text-[#F5D638] uppercase font-semibold text-xs tracking-wider">
            {currentItem.category.replace('-', ' ')}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#111111] border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#F5D638] hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close image lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center p-4">
        <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-zinc-800 select-none"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4 space-y-1">
          <h4 className="text-white font-bold text-base sm:text-lg">{currentItem.title}</h4>
          {currentItem.caption && (
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{currentItem.caption}</p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#111111]/90 border border-zinc-800 text-zinc-300 hover:text-[#F5D638] hover:border-[#F5D638] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#111111]/90 border border-zinc-800 text-zinc-300 hover:text-[#F5D638] hover:border-[#F5D638] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
