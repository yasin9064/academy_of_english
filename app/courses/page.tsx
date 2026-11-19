import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Mic,
  Sparkles,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { getCourses } from '@/lib/data-store';

export const metadata = {
  title: 'Courses & Programs | Academy of English – Personality Development',
  description:
    'Explore our 10 specialized training programs in Spoken English, Public Speaking, Personality Development, Voice & Accent, Phonetics, and Soft Skills in Kishanganj, Bihar.',
};

export default async function CoursesPage() {
  const courses = await getCourses(true);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Transformative Curriculum
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Courses & Training Programs
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Engineered by Trainer Faizan to eliminate speaking hesitation, master native pronunciation, and forge unshakable leadership presence.
          </p>
        </div>
      </section>

      {/* Courses List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-10">
          {courses.map((course, idx) => {
            const courseWhatsapp = `https://wa.me/917004706208?text=${encodeURIComponent(
              `Hello Academy of English! I would like to enquire about details and admission for the course: "${course.title}".`
            )}`;

            return (
              <div
                key={course.id}
                id={course.slug}
                className="scroll-mt-28 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#111111] border border-zinc-800 hover:border-[#F5D638]/40 transition-all duration-300 shadow-xl space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F5D638]/10 text-[#F5D638] flex items-center justify-center text-xs font-bold font-serif border border-[#F5D638]/20">
                        0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                        {course.title}
                      </h2>
                    </div>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light max-w-4xl">
                      {course.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    <Link
                      href={`/admission?course=${encodeURIComponent(course.title)}`}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-md shadow-[#F5D638]/20 hover:scale-105 transition-all text-center"
                    >
                      Enquire for Admission
                    </Link>
                    <a
                      href={courseWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#080808] hover:bg-zinc-800 text-white border border-zinc-700 transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Key Course Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                  <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800/80 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F5D638]" />
                      Course Duration
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">{course.duration}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800/80 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#3157A5]" />
                      Eligibility
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">{course.eligibility}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800/80 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      Class Format
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">{course.classFormat}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800/80 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Course Fees
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#F5D638]">{course.fees}</p>
                  </div>
                </div>

                {/* Learning Outcomes */}
                {course.outcomes && course.outcomes.length > 0 && (
                  <div className="pt-2 space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Key Learning Outcomes:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {course.outcomes.map((outcome, oIdx) => (
                        <div
                          key={oIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F5D638] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#111111] via-[#1a1705] to-[#111111] border border-[#F5D638]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Not Sure Which Program Is Right For You?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
              Book a free diagnostic assessment with Trainer Faizan. We will evaluate your vocabulary, accent, and speaking goals to recommend the perfect batch.
            </p>
          </div>
          <Link
            href="/admission"
            className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#F5D638] text-black hover:bg-[#e0c228] shadow-lg shadow-[#F5D638]/20 transition-all shrink-0"
          >
            Book Free Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
