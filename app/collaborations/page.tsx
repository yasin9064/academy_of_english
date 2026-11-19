import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  School,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Users,
  Award,
} from 'lucide-react';
import { SCHOOL_COLLABORATIONS } from '@/lib/constants';
import PartnerForm from '@/components/PartnerForm';

export const metadata = {
  title: 'School & Institutional Collaborations | Academy of English',
  description:
    'Showcasing our educational collaborations with Oxford International School, Children’s Academy, Edu Valley School, Ilham Academy, and more across Bihar.',
};

export default function CollaborationsPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3157A5]/20 text-blue-400 text-xs font-bold border border-blue-500/30 uppercase tracking-wider">
            Educational Network
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Our School Collaborations
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Academy of English is proud to collaborate with forward-thinking educational institutions to elevate student public speaking, morning assemblies, and communicative poise.
          </p>
        </div>
      </section>

      {/* 10 Institutions Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
            Partnered Educational Institutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Institutions Where Workshops Have Been Conducted
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHOOL_COLLABORATIONS.map((school, idx) => (
            <div
              key={school.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-4 transition-all shadow-xl hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-zinc-800 flex items-center justify-center text-[#3157A5] shrink-0">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-serif">{school.name}</h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#F5D638]" />
                        <span>{school.location}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-600 font-serif">#{idx + 1}</span>
                </div>

                {school.tagline && (
                  <p className="text-xs text-[#F5D638] font-medium tracking-wide">
                    {school.tagline}
                  </p>
                )}

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {school.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <div className="p-3 rounded-xl bg-[#080808] border border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">
                    <strong>Program:</strong> {school.programConducted}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration Photographs & Moments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111111] border border-zinc-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
              Campus Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              School Workshops & Student Development
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Real moments from on-campus speaking bootcamps and pronunciation sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/trainer/faizan_workshop.png"
                  alt="Trainer Faizan mentoring student at whiteboard"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-zinc-300 font-semibold">1-on-1 Student Coaching</p>
              <p className="text-[11px] text-zinc-400 font-light">
                Correcting body posture and teaching expressive hand gestures on stage.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/hero/microphone_auditorium.png"
                  alt="School assembly speech training"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Auditorium & Stage Practice</p>
              <p className="text-[11px] text-zinc-400 font-light">
                Empowering students to deliver morning assembly talks without stage trembling.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/graphics/leadership_crowd.jpeg"
                  alt="Student leadership formation"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Character & Value Formation</p>
              <p className="text-[11px] text-zinc-400 font-light">
                Teaching humility, thanking skills, and the winner mindset across classrooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action: Your School Could Be Our Next Collaboration! */}
      <section id="partner-form" className="scroll-mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
              Institutional Invitation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif">
              Your School Could Be Our Next Collaboration!
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              We partner with school principals, management committees, and college leadership to host dynamic, high-energy bootcamps tailored to your curriculum.
            </p>
          </div>

          <PartnerForm />
        </div>
      </section>
    </div>
  );
}
