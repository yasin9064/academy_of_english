import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';
import AdmissionForm from '@/components/AdmissionForm';

export const metadata = {
  title: 'Student Admission & Free Assessment | Academy of English',
  description:
    'Join Academy of English in Kishanganj. Reserve your seat for Spoken English, Public Speaking, or Personality Development classes under Trainer Faizan.',
};

export default function AdmissionPage() {
  const ADMISSION_STEPS = [
    {
      step: '01',
      title: 'Submit Admission Enquiry',
      desc: 'Fill out the form below with your current educational background and communicative goals.',
    },
    {
      step: '02',
      title: 'Free Diagnostic Assessment',
      desc: 'Trainer Faizan evaluates your vocabulary, pronunciation, and speaking anxiety to identify your core needs.',
    },
    {
      step: '03',
      title: 'Batch Assignment & Orientation',
      desc: 'Join a carefully matched peer batch ensuring comfortable interaction and maximum podium time.',
    },
    {
      step: '04',
      title: 'Transformation Begins',
      desc: 'Hold the microphone from your very first class and begin your journey toward inspiring leadership.',
    },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Admissions 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Join Academy of English
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Reserve your seat for upcoming batches in Spoken English, Public Speaking, and Personality Development at our Kishanganj campus.
          </p>
        </div>
      </section>

      {/* How The Admission Process Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111111] border border-zinc-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
              Step-by-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Simple 4-Step Enrollment Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#080808] border border-zinc-800 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5D638]/10 text-[#F5D638] font-serif font-black text-sm flex items-center justify-center border border-[#F5D638]/30">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-white font-serif">{s.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Instructions & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 shadow-2xl">
              <span className="text-xs font-bold text-[#F5D638] uppercase tracking-wider block">
                Why Enrol Now?
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">
                Small Batches. Individual Attention.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                To guarantee that every student speaks on the microphone every single day, our batch sizes are strictly limited. Early enrollment guarantees your preferred morning or evening timing slot.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Interactive Classrooms</h5>
                    <p className="text-[11px] text-zinc-400">Zero rote memorization; purely conversational and speech-based.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Trainer Faizan&apos;s Direct Guidance</h5>
                    <p className="text-[11px] text-zinc-400">Personally monitored by certified coach Md. Faizan Alam.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Affordable Fee Structure</h5>
                    <p className="text-[11px] text-zinc-400">High-caliber personality training accessible to all students.</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="pt-4 border-t border-zinc-800/80">
                <p className="text-xs text-zinc-400 mb-3">Prefer immediate discussion on WhatsApp?</p>
                <a
                  href={`https://wa.me/917004706208?text=${encodeURIComponent(
                    'Hello Academy of English! I would like to enquire about new admission batches and reserve my seat.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Enquire Immediately on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Component */}
          <div className="lg:col-span-7">
            <AdmissionForm source="admission_dedicated_page" />
          </div>
        </div>
      </section>
    </div>
  );
}
