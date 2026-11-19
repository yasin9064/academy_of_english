import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Mic,
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Quote,
  GraduationCap,
  Users,
} from 'lucide-react';
import { YoutubeIcon, InstagramIcon, FacebookIcon } from '@/components/BrandIcons';
import { getSiteContent, getWorkshops } from '@/lib/data-store';

export const metadata = {
  title: 'Trainer Faizan – Md. Faizan Alam | Public Speaking Coach & Founder',
  description:
    'Profile of Md. Faizan Alam (Trainer Faizan) - Founder of Academy of English, Certified Public Speaking Trainer mentored under Munawar Zama, Assistant Trainer at English House Academy.',
};

export default async function TrainerPage() {
  const content = await getSiteContent();
  const workshops = await getWorkshops();

  const whatsappTalkUrl = `https://wa.me/917004706208?text=${encodeURIComponent(
    'Hello Trainer Faizan! I read your journey on the website and would like to speak directly with you about training.'
  )}`;

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24">
      {/* Top Profile Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#F5D638]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo & Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-700 bg-gradient-to-b from-zinc-800 to-black shadow-2xl">
                  <Image
                    src="/images/trainer/faizan_hero.png"
                    alt="Md. Faizan Alam (Trainer Faizan)"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 text-center">
                    <p className="text-xl font-bold text-white font-serif">Md. Faizan Alam</p>
                    <p className="text-xs text-[#F5D638] font-semibold tracking-wider uppercase">
                      Popularly known as Trainer Faizan
                    </p>
                  </div>
                </div>

                {/* Handwritten Signature Card */}
                <div className="mt-4 p-4 rounded-2xl bg-[#111111] border border-zinc-800 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Official Signature</span>
                    <span className="text-xs font-semibold text-white">Md. Faizan Alam</span>
                  </div>
                  <div className="relative w-32 h-10">
                    <Image
                      src="/images/trainer/signature_faizan.jpg"
                      alt="Signature of Md. Faizan Alam"
                      fill
                      className="object-contain invert brightness-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
                Personal Profile
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight">
                Md. Faizan Alam
              </h1>
              <p className="text-lg sm:text-xl text-[#F5D638] font-medium">
                Public Speaking Coach • English Language Trainer • Motivational Speaker • Education Counsellor
              </p>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  Md. Faizan Alam is from <strong className="text-white">Kishanganj, Bihar</strong>. He is the visionary founder of <strong className="text-white">Academy of English – Institute of Personality Development</strong>, where he trains students in spoken English, public speaking, communication fluency, phonetics, personality development, and character building.
                </p>
                <p>
                  With an unyielding passion for empowering young minds, he believes that education is not merely about accumulating degrees or memorizing words—it is about an authentic, inside-out transformation that prepares individuals to conquer stage fear, lead with dignity, and positively influence society.
                </p>
              </div>

              {/* Roles Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Founder, Academy of English',
                  'Certified Public Speaking Trainer',
                  'Former Assistant Trainer, English House Academy',
                  'Personality Development Coach',
                  'Youth Motivational Speaker',
                  'Institutional Educator & Counsellor',
                ].map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#090909] border border-zinc-800 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F5D638] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href={whatsappTalkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-lg shadow-[#F5D638]/20 hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Talk to Trainer Faizan</span>
                </a>
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors"
                >
                  <span>Enroll in His Next Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: PUBLIC SPEAKING JOURNEY & MENTORSHIP UNDER MUNAWAR ZAMA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#121004] via-[#111111] to-[#0A0A0A] border border-yellow-500/40 shadow-2xl space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5D638]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/30 uppercase tracking-wider">
              Mentorship & Lineage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif">
              The Public Speaking Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-black/60 border border-yellow-500/20 relative">
                <Quote className="w-10 h-10 text-[#F5D638]/20 absolute -top-3 -left-3" />
                <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-light italic">
                  &ldquo;Every public speaker dreams of learning from the legendary Munawar Zama Sir, and I consider myself truly fortunate to have had that opportunity.&rdquo;
                </p>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  My journey took a new direction when I completed a <strong className="text-white font-semibold">40-day Personality Development Workshop under his mentorship at Dasna, Ghaziabad, on 24th March 2024</strong>.
                </p>
                <p>
                  Those 40 days were not just a training program – they transformed my mindset, built my confidence and laid the foundation of my professional public speaking journey.
                </p>
                <p>
                  I will always be grateful to my mentor, whose guidance continues to inspire me every day.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase block">Training Location</span>
                  <p className="text-sm font-bold text-white mt-0.5">Dasna, Ghaziabad</p>
                </div>
                <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase block">Completion Date</span>
                  <p className="text-sm font-bold text-[#F5D638] mt-0.5">24th March 2024</p>
                </div>
              </div>
            </div>

            {/* Dedicated Mentor Photograph Section */}
            <div className="lg:col-span-5">
              <div className="p-4 rounded-2xl bg-[#080808] border border-zinc-800 shadow-xl space-y-3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-700/80">
                  <Image
                    src="/images/mentorship/munawar_zama.jpg"
                    alt="Master Trainer Munawar Zama Sir addressing grand auditorium"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <p className="text-sm font-bold text-white">Munawar Zama Sir</p>
                    <p className="text-xs text-[#F5D638]">Legendary Master Trainer & Mentor</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 text-center px-2 font-light">
                  Mentor photograph: Master Trainer Munawar Zama addressing thousands of eager students at English House Academy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CERTIFIED PUBLIC SPEAKING TRAINER & ENGLISH HOUSE ACADEMY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#111111] border border-zinc-800 shadow-2xl space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157A5]/20 text-blue-400 text-xs font-bold border border-blue-500/30 uppercase tracking-wider">
              Certification & Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Certified Public Speaking Trainer
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
                <Image
                  src="/images/hero/microphone_auditorium.png"
                  alt="Certified public speaking trainer in auditorium"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#090909] border border-zinc-800 space-y-1">
                <span className="text-xs font-bold text-[#F5D638] uppercase tracking-wider block">
                  Institutional Milestone
                </span>
                <p className="text-sm font-semibold text-white">
                  Assistant Trainer, English House Academy, Hyderabad
                </p>
              </div>
            </div>

            {/* Official Certification Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-[#080808] border border-zinc-800 space-y-4">
                <p className="text-base sm:text-lg text-white font-serif font-bold">
                  2024 was the year that changed my life.
                </p>
                <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  <p>
                    I completed an intensive 40-day Public Speaking Workshop and proudly became a <strong className="text-white font-semibold">Certified Public Speaking Trainer</strong>.
                  </p>
                  <p>
                    That journey gave me more than a certificate – it gave me confidence, purpose and a new direction in life.
                  </p>
                  <p>
                    Soon after, I got the opportunity to work as an <strong className="text-[#F5D638] font-semibold">Assistant Trainer at English House Academy, Hyderabad</strong>, where I learned, grew and inspired others.
                  </p>
                  <p>
                    Today, I continue to work with dedication while moving forward with my dream project in Public Speaking.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Certified: 2024
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Campus: Dasna, Ghaziabad
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  English House Academy, Hyderabad
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WORKSHOPS CONDUCTED SUMMARY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
            Impact & Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Major Workshops Conducted by Trainer Faizan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <div
              key={w.id}
              className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#F5D638]/10 text-[#F5D638] uppercase">
                  {w.status}
                </span>
                <h3 className="text-lg font-bold text-white font-serif leading-snug">{w.title}</h3>
                {w.subtitle && <p className="text-xs text-zinc-400 italic">{w.subtitle}</p>}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-light">
                  {w.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F5D638]" />
                  <span>{w.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3157A5]" />
                  <span>{w.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION: OFFICIAL SOCIAL MEDIA PRESENCE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#111111] via-[#0E0E0E] to-[#111111] border border-zinc-800 text-center space-y-6">
          <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
            Stay Connected
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Follow Trainer Faizan Online
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-light">
            Watch live speech demonstrations, student transformation clips, tongue twisters, and vocabulary tips on our verified social profiles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://www.youtube.com/@academyofenglish"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600/10 border border-red-600/30 text-white hover:bg-red-600/20 hover:scale-105 transition-all text-sm font-semibold"
            >
              <YoutubeIcon className="w-5 h-5 text-red-500" />
              <span>YouTube: academyofenglish (Trainer Faizan)</span>
            </a>

            <a
              href="https://www.instagram.com/academyofenglish06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-pink-600/10 border border-pink-600/30 text-white hover:bg-pink-600/20 hover:scale-105 transition-all text-sm font-semibold"
            >
              <InstagramIcon className="w-5 h-5 text-pink-400" />
              <span>Instagram: @academyofenglish06</span>
            </a>

            <a
              href="https://www.facebook.com/academyofenglish06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600/10 border border-blue-600/30 text-white hover:bg-blue-600/20 hover:scale-105 transition-all text-sm font-semibold"
            >
              <FacebookIcon className="w-5 h-5 text-blue-400" />
              <span>Facebook: academyofenglish06</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
