import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  School,
  GraduationCap,
} from 'lucide-react';
import { getWorkshops } from '@/lib/data-store';

export const metadata = {
  title: 'Workshops & Bootcamps | Academy of English – Personality Development',
  description:
    '30-Day and 40-Day intensive workshops, school public speaking bootcamps, and teacher training programs in Kishanganj, Bihar.',
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Hands-on Immersion
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Transform Yourself Through Practical Learning
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
            Our 30-day and 40-day intensive workshops are conducted at our vibrant campus with one clear mission: to transform students from the inside out. This is not just a public speaking course – it is a complete personality transformation program designed to help students become confident communicators and future leaders.
          </p>
        </div>
      </section>

      {/* Featured 30-Day & 40-Day Flagship Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 30-Day Intensive */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121004] via-[#111111] to-[#0A0A0A] border border-yellow-500/40 relative flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#F5D638]/20 text-[#F5D638] text-xs font-bold border border-[#F5D638]/40 uppercase tracking-wider">
                  Campus Flagship
                </span>
                <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F5D638]" />
                  30 Days
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                30-Day Intensive Workshop
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Conducted at our vibrant campus in Kishanganj. A step-by-step transformation taking students from stage trembling to delivering confident, structured speeches. Daily microphone turns, phonetic chart drills, and personalized feedback.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  'Daily stage speaking & microphone handling',
                  'Pronunciation & vowel articulation drills',
                  'Conquering glossophobia & negative self-talk',
                  '7-Step speech delivery framework',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#F5D638] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              <Link
                href="/admission?course=30-Day Intensive Transformation Workshop"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all text-center"
              >
                Enquire for Next Batch
              </Link>
              <a
                href={`https://wa.me/917004706208?text=${encodeURIComponent(
                  'Hello Trainer Faizan! I want to join the 30-Day Intensive Campus Workshop.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#080808] border border-zinc-700 text-[#25D366] hover:bg-zinc-800 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 40-Day Mastery */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B152B] via-[#111111] to-[#0A0A0A] border border-blue-500/40 relative flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#3157A5]/30 text-blue-300 text-xs font-bold border border-blue-500/40 uppercase tracking-wider">
                  Mastery Program
                </span>
                <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  40 Days
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                40-Day Advanced Leadership Workshop
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Modeled after the rigorous training methodology Trainer Faizan completed at Dasna, Ghaziabad. Focuses on executive rhetoric, deep audience empathy, impromptu debate, and life leadership.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  'Advanced speech architecture & rhetoric',
                  'Vocal projection, acoustics & pitch control',
                  'High-pressure impromptu & extempore speaking',
                  'Character building, gratitude & ethics',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              <Link
                href="/admission?course=40-Day Advanced Leadership & Speaking Bootcamp"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#3157A5] text-white hover:bg-[#264687] transition-all text-center"
              >
                Enquire for Next Batch
              </Link>
              <a
                href={`https://wa.me/917004706208?text=${encodeURIComponent(
                  'Hello Trainer Faizan! I want to join the 40-Day Advanced Leadership Workshop.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#080808] border border-zinc-700 text-[#25D366] hover:bg-zinc-800 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Categories Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest">
            Complete Workshop Spectrum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            All Specialized Workshop Formats
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => {
            const workshopWhatsapp = `https://wa.me/917004706208?text=${encodeURIComponent(
              `Hello Academy of English! I would like to enquire about the workshop: "${w.title}".`
            )}`;

            return (
              <div
                key={w.id}
                className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-5 transition-colors shadow-lg"
              >
                <div className="space-y-4">
                  {w.imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800">
                      <Image
                        src={w.imageUrl}
                        alt={w.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5D638]/10 text-[#F5D638] uppercase tracking-wider">
                      {w.status}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {w.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-serif leading-snug">
                    {w.title}
                  </h3>

                  {w.subtitle && (
                    <p className="text-xs text-[#F5D638] italic">{w.subtitle}</p>
                  )}

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-light">
                    {w.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#F5D638]" />
                      <span><strong>Target:</strong> {w.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3157A5]" />
                      <span><strong>Venue:</strong> {w.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                  <Link
                    href={`/admission?course=${encodeURIComponent(w.title)}`}
                    className="w-full text-center px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#F5D638] text-white hover:text-black transition-colors"
                  >
                    Enquire Now
                  </Link>
                  <a
                    href={workshopWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#090909] border border-zinc-800 text-[#25D366] hover:bg-zinc-800 transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* School Development & Teacher Training Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#111111] via-[#0E1528] to-[#111111] border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
              For Educational Institutions
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Bring Trainer Faizan To Your Campus
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              We conduct customized 10-day, 15-day, and weekend workshops for school assemblies, high-school students, and faculty empowerment.
            </p>
          </div>
          <Link
            href="/collaborations#partner-form"
            className="px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#3157A5] to-[#264687] text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all shrink-0"
          >
            Request Institutional Workshop
          </Link>
        </div>
      </section>
    </div>
  );
}
