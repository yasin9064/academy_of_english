import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Award,
  BookOpen,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  Compass,
} from 'lucide-react';
import { getSiteContent } from '@/lib/data-store';

export const metadata = {
  title: 'About Us | Academy of English – Institute of Personality Development',
  description:
    'Learn about the Academy of English, our founder Trainer Faizan, our core values, pedagogical 7-step speaking system, and mission to empower 100,000+ students.',
};

export default async function AboutPage() {
  const content = await getSiteContent();

  const SEVEN_STEPS = [
    {
      step: 'Step 1',
      title: 'Warm & Grand Audience Greeting',
      desc: 'Master the confident opening: "A warm greeting and a very good morning to all of you!" Capture instant room attention.',
    },
    {
      step: 'Step 2',
      title: 'Active Audience Interaction',
      desc: 'Break the barrier: "How are you all doing today?" Connect emotionally before delivering content.',
    },
    {
      step: 'Step 3',
      title: 'Crisp Self-Introduction',
      desc: 'Introduce yourself with upright posture, pride, clarity, and genuine authority without rambling.',
    },
    {
      step: 'Step 4',
      title: 'Gratitude & Thanking Skills',
      desc: 'Express sincere thanks to the host institution, mentors, and organisers for providing the podium.',
    },
    {
      step: 'Step 5',
      title: 'Clear Topic Declaration',
      desc: 'Declare the core message or thesis cleanly so the audience knows what value they are about to receive.',
    },
    {
      step: 'Step 6',
      title: 'Passionate Main Body Delivery',
      desc: 'Deliver key points with vocal modulation, diaphragmatic projection, pauses, and expressive hand gestures.',
    },
    {
      step: 'Step 7',
      title: 'Impactful Concluding Skills',
      desc: 'Leave an indelible mark: "I conclude my speech thanking you all for listening patiently. Have a wonderful day!"',
    },
  ];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            About Our Academy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Transforming Minds. Inspiring Leaders.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Academy of English is Kishanganj&apos;s premier Institute of Personality Development, dedicated to equipping students with exceptional communication, moral courage, and public speaking mastery.
          </p>
        </div>
      </section>

      {/* Main Story & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
              Our Origin & Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              More Than An English Class. A Life Transformation Platform.
            </h2>
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Founded by <strong className="text-white font-semibold">Md. Faizan Alam (Trainer Faizan)</strong>, Academy of English was born out of a profound realization: countless talented students in Bihar and eastern India possess brilliant intellects, but struggle to express themselves due to linguistic hesitation and stage fright.
              </p>
              <p>
                Traditional school curricula teach grammar on blackboards through tedious rules and written exams. At Academy of English, we revolutionized this paradigm. We place microphones in students&apos; hands on day one. We teach English through active speech, phonetic ear-training, behavioral psychology, and podium delivery.
              </p>
              <p>
                We believe true education is never limited to scoring marks or reciting words. It is about character, respectful thanking skills, confident posture, and the inner conviction that you can stand before thousands and influence hearts.
              </p>
            </div>

            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-[#111111] border border-[#F5D638]/30 space-y-2">
                <span className="text-xs font-bold text-[#F5D638] uppercase tracking-wider">
                  Our Uncompromising Rule
                </span>
                <p className="text-base sm:text-lg font-bold text-white font-serif">
                  &ldquo;If you know how to dress, you can impress people. But if you know how to address, you can influence people.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/trainer/faizan_hero.png"
                  alt="Trainer Faizan coaching students"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800 text-center">
                <p className="text-xs font-bold text-white">Md. Faizan Alam</p>
                <p className="text-[10px] text-[#F5D638]">Founder & Master Trainer</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/images/mentorship/munawar_zama.jpg"
                  alt="Mentorship under legendary Munawar Zama Sir"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800 text-center">
                <p className="text-xs font-bold text-white">Mentorship Legacy</p>
                <p className="text-[10px] text-blue-400">Master Trainer Munawar Zama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 7-Step Public Speaking Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-[#111111] via-[#0D0D0D] to-[#080808] border border-zinc-800 space-y-12 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest">
              Proprietary Pedagogy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif">
              The 7-Step Public Speaking System
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light">
              &ldquo;These 7 steps hold the key to unlocking the art of powerful public speaking.&rdquo; Every student at Academy of English is conditioned to execute this framework instinctively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SEVEN_STEPS.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070707] border border-zinc-800 hover:border-[#F5D638]/40 space-y-3 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5D638]/10 text-[#F5D638] font-serif font-black text-sm flex items-center justify-center border border-[#F5D638]/20">
                    {s.step.replace('Step ', '')}
                  </div>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{s.desc}</p>
                </div>
              </div>
            ))}

            {/* Final Bonus Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#3157A5]/20 to-[#111111] border border-blue-500/30 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  The Result
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Magnetic Stage Authority
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  When you know exactly what to do from your first step onto the platform until your final bow, stage fear vanishes and confidence takes its place.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5D638] hover:underline"
                >
                  <span>Learn this in person</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#3157A5]/20 text-blue-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">Our Institutional Vision</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {content.vision.content}
            </p>
            <p className="text-xs font-semibold text-[#F5D638]">
              {content.vision.highlight}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111111] border border-yellow-500/30 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5D638]/20 text-[#F5D638] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">Our 100,000+ Mission</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {content.mission.content}
            </p>
            <p className="text-xs font-semibold text-white">
              &ldquo;{content.mission.statement}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#111111] via-[#1a1705] to-[#111111] border border-[#F5D638]/30 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Ready To Start Your Transformation?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto font-light">
            Join hundreds of confident students and youth in Kishanganj who found their voice at Academy of English.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="px-8 py-4 rounded-xl font-bold text-sm bg-[#F5D638] text-black hover:bg-[#e0c228] shadow-lg shadow-[#F5D638]/20 transition-all"
            >
              Apply for Admission
            </Link>
            <Link
              href="/trainer"
              className="px-8 py-4 rounded-xl font-bold text-sm bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 transition-all"
            >
              Meet Trainer Faizan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
