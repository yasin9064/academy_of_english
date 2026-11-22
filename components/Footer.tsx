'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { YoutubeIcon, InstagramIcon, FacebookIcon } from '@/components/BrandIcons';

export default function Footer() {
  const pathname = usePathname();

  // Don't show public footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = `https://wa.me/917004706208?text=${encodeURIComponent(
    'Hello Academy of English! I visited your website and would like to know more about your courses and admission process.'
  )}`;

  return (
    <footer className="bg-[#050505] text-zinc-300 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5D638] to-transparent opacity-80" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3157A5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F5D638]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 & 2: Brand & Motto */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#F5D638] via-[#e63946] to-[#3157A5] shadow-lg shadow-[#F5D638]/20 shrink-0">
                <Image
                  src="/images/logo/logo.png"
                  alt="Academy of English Official Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full bg-black"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-tight text-white leading-tight">
                  ACADEMY OF ENGLISH
                </h3>
                <p className="text-xs text-zinc-400 font-medium tracking-wider uppercase leading-tight">
                  Institute of Personality Development
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Under the direct leadership of <span className="text-white font-semibold">Md. Faizan Alam (Trainer Faizan)</span>, Academy of English empowers students through practical English communication, public speaking mastery, voice training, and life leadership.
            </p>

            <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800 space-y-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-[#F5D638] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Our Institutional Motto
              </span>
              <p className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                &ldquo;WE TEACH. WE TRAIN. WE TRANSFORM.&rdquo;
              </p>
              <p className="text-xs text-zinc-400">
                &ldquo;If you know how to dress, you can impress people. But if you know how to address, you can influence people.&rdquo;
              </p>
            </div>

            {/* Clickable Social Media */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Connect With Trainer Faizan
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@academyofenglish06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111111] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                  aria-label="YouTube Channel"
                  title="YouTube: academyofenglish (Trainer Faizan)"
                >
                  <YoutubeIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/academyofenglish06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111111] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all"
                  aria-label="Instagram Profile"
                  title="Instagram: @academyofenglish06"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/academyofenglish06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111111] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all"
                  aria-label="Facebook Page"
                  title="Facebook: academyofenglish06"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111111] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all"
                  aria-label="WhatsApp Contact"
                  title="WhatsApp: 7004706208"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#F5D638] rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Trainer', href: '/trainer' },
                { name: 'Courses & Programs', href: '/courses' },
                { name: 'Workshops', href: '/workshops' },
                { name: 'Achievements', href: '/achievements' },
                { name: 'School Collaborations', href: '/collaborations' },
                { name: 'Photography Gallery', href: '/gallery' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Student Admission Form', href: '/admission' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-[#F5D638] flex items-center gap-1.5 transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#F5D638] group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Our Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#3157A5] rounded-full" />
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Spoken English', href: '/courses#spoken-english' },
                { name: 'Public Speaking', href: '/courses#public-speaking' },
                { name: 'Personality Development', href: '/courses#personality-development' },
                { name: 'Communication Skills', href: '/courses#english-communication' },
                { name: 'Voice & Accent Training', href: '/courses#voice-accent' },
                { name: 'Phonetics Training', href: '/courses#phonetics' },
                { name: 'Soft Skills Development', href: '/courses#soft-skills' },
                { name: 'Leadership Training', href: '/courses#leadership-development' },
                { name: 'Student Development', href: '/courses#student-development' },
                { name: 'Teacher Training Program', href: '/courses#teacher-training' },
              ].map((prog) => (
                <li key={prog.name}>
                  <Link
                    href={prog.href}
                    className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3157A5]" />
                    <span>{prog.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#F5D638] rounded-full" />
              Get In Touch
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Academy of English Campus</p>
                  <p className="text-xs text-zinc-400">Kishanganj, Bihar, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:7004706208"
                    className="block text-zinc-300 hover:text-[#F5D638] transition-colors"
                  >
                    +91 7004706208
                  </a>
                  <a
                    href="tel:9801685258"
                    className="block text-zinc-300 hover:text-[#F5D638] transition-colors"
                  >
                    +91 9801685258
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:academyofenglishkne@gmail.com"
                    className="text-zinc-300 hover:text-[#F5D638] text-xs sm:text-sm break-all transition-colors"
                  >
                    academyofenglishkne@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F5D638] text-black hover:bg-[#e0c228] shadow-md shadow-[#F5D638]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Academy of English. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Institute of Personality Development</span>
            <span>•</span>
            <span>Kishanganj, Bihar</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-zinc-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
