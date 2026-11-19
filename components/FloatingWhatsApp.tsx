'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const phone = '917004706208';
  const prefilled =
    'Hello Academy of English! I visited your website and would like to know more about your courses and admission process.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(prefilled)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#111111] border border-yellow-500/40 text-white text-xs py-2 px-3.5 rounded-2xl shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-col">
            <span className="font-bold text-[#F5D638]">Have questions?</span>
            <span className="text-zinc-300">Chat with Trainer Faizan</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-white p-0.5 ml-1 transition-colors"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Academy of English on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulse radar rings */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-90" />
        <MessageCircle className="w-7 h-7 relative z-10 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
