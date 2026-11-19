'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AdmissionForm from './AdmissionForm';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

export default function EnquiryModal({ isOpen, onClose, initialCourse }: EnquiryModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-zinc-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#F5D638] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AdmissionForm
          initialCourse={initialCourse}
          source="modal"
          className="border-none shadow-none"
        />
      </div>
    </div>
  );
}
