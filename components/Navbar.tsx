'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare, Shield, ChevronRight, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Trainer', href: '/trainer' },
  { name: 'Courses', href: '/courses' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Collaborations', href: '/collaborations' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Don't render public header on admin subpages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#050505] via-[#111111] to-[#050505] border-b border-yellow-500/20 text-xs py-2 px-4 text-center text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F5D638]/10 text-[#F5D638] font-medium border border-[#F5D638]/30">
              <Sparkles className="w-3 h-3" />
              Admissions Open 2026
            </span>
            <span className="hidden md:inline text-zinc-400">
              New Batches for Spoken English & Public Speaking in Kishanganj
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-zinc-400 text-xs">
            <a
              href="tel:7004706208"
              className="flex items-center gap-1 hover:text-[#F5D638] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#F5D638]" />
              +91 7004706208
            </a>
            <span className="text-zinc-600">|</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 hover:text-[#3157A5] transition-colors text-zinc-500 hover:text-zinc-300"
              title="Admin Portal"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md shadow-xl shadow-black/50 border-b border-zinc-800/80 py-3'
            : 'bg-[#050505]/80 backdrop-blur-sm border-b border-zinc-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#F5D638] to-[#3157A5] p-0.5 shadow-lg shadow-[#F5D638]/20 group-hover:shadow-[#F5D638]/40 transition-shadow">
                <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-black text-xl text-[#F5D638]">A</span>
                  <span className="font-sans font-bold text-xs text-[#3157A5] -ml-0.5">E</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#F5D638] transition-colors">
                  ACADEMY OF ENGLISH
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-zinc-400 uppercase">
                  Institute of Personality Development
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#F5D638] bg-[#F5D638]/10 border border-[#F5D638]/20'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/admission"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-lg shadow-[#F5D638]/25 hover:shadow-[#F5D638]/45 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Join Our Academy</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <Link
                href="/admission"
                className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5D638] text-black"
              >
                Join
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6 text-[#F5D638]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-[#0A0A0A] border-b border-zinc-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'text-black bg-[#F5D638] font-semibold'
                        : 'text-zinc-200 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <Link
                href="/admission"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-center bg-[#F5D638] text-black shadow-lg shadow-[#F5D638]/20"
              >
                <span>Join Our Academy</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between text-xs text-zinc-400 px-2 pt-2">
                <a
                  href="tel:7004706208"
                  className="flex items-center gap-1.5 hover:text-[#F5D638]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F5D638]" />
                  <span>Call: 7004706208</span>
                </a>
                <Link
                  href="/admin/login"
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
