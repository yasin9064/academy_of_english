import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  School,
  Users,
  Target,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import { SCHOOL_COLLABORATIONS } from '@/lib/constants';

export const metadata = {
  title: 'Achievements & Milestones | Academy of English',
  description:
    'Key achievements, certifications, school training milestones, and pedagogical breakthroughs of Trainer Md. Faizan Alam and Academy of English.',
};

export default function AchievementsPage() {
  const MILESTONES = [
    {
      year: '2024',
      date: '24th March 2024',
      title: 'Certified Public Speaking Trainer (Munawar Zama Mentorship)',
      location: 'Dasna, Ghaziabad',
      description:
        'Completed an intensive 40-day Personality Development and Public Speaking Workshop under legendary Master Trainer Munawar Zama Sir. Proudly earned official Public Speaking Trainer certification.',
      tag: 'Core Certification',
      accent: 'yellow',
    },
    {
      year: '2024',
      date: '2024',
      title: 'Assistant Trainer at English House Academy',
      location: 'Hyderabad',
      description:
        'Worked as an Assistant Trainer at the renowned English House Academy, Hyderabad, gaining invaluable hands-on coaching experience with hundreds of ambitious speakers.',
      tag: 'Experience',
      accent: 'blue',
    },
    {
      year: '2024 - Present',
      date: 'Founding Year',
      title: 'Established Academy of English',
      location: 'Kishanganj, Bihar',
      description:
        'Founded Academy of English – Institute of Personality Development to bring world-class English communication, phonetics, and leadership grooming to the youth of Bihar.',
      tag: 'Institution',
      accent: 'yellow',
    },
    {
      year: '2024 - 2026',
      date: 'Multi-School Programs',
      title: '10+ School Campus Workshops & Bootcamps',
      location: 'Bihar & Region',
      description:
        'Conducted high-impact 10-day and 15-day workshops at leading institutions including Oxford International School, Children\'s Academy, Edu Valley School, Ilham Academy, and more.',
      tag: 'Impact',
      accent: 'blue',
    },
    {
      year: 'Ongoing',
      date: 'Institutional Goal',
      title: 'The 100,000+ Students Empowerment Mission',
      location: 'Pan-State Vision',
      description:
        'Dedicated institutional mission to transform over 100,000 students through speech clarity, stage confidence, and principled character formation.',
      tag: 'Mission Goal',
      accent: 'yellow',
    },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Track Record & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Achievements & Milestones
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            From mentorship under legendary Master Trainer Munawar Zama to conducting transformative bootcamps across prestigious schools.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-l-2 border-zinc-800 pl-6 sm:pl-10 space-y-12">
          {MILESTONES.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on line */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-4 border-[#050505] ${
                  m.accent === 'yellow' ? 'bg-[#F5D638]' : 'bg-[#3157A5]'
                } shadow-md`}
              />

              <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 transition-colors space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        m.accent === 'yellow'
                          ? 'bg-[#F5D638]/10 text-[#F5D638] border border-[#F5D638]/30'
                          : 'bg-[#3157A5]/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {m.tag}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">{m.date}</span>
                  </div>

                  <span className="text-xs text-zinc-400 font-medium">{m.location}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">{m.title}</h3>

                <p className="text-sm text-zinc-300 leading-relaxed font-light">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Showcase: Mentor & Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111111] border border-zinc-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F5D638] uppercase tracking-widest block">
              Documented Evidence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Visual Moments of Growth & Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-[#080808] border border-zinc-800 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/mentorship/munawar_zama.jpg"
                  alt="Munawar Zama mentorship"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-bold text-white">Munawar Zama Mentorship</h4>
              <p className="text-xs text-zinc-400 font-light">
                Intensive 40-day personality development training completed on 24th March 2024 at Dasna, Ghaziabad.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#080808] border border-zinc-800 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/trainer/faizan_workshop.png"
                  alt="Trainer Faizan conducting workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-bold text-white">Live Classroom Pedagogy</h4>
              <p className="text-xs text-zinc-400 font-light">
                Hands-on coaching in body language, pronunciation phonetics, and audience connection.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#080808] border border-zinc-800 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/images/hero/microphone_auditorium.png"
                  alt="Auditorium speech delivery"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-bold text-white">Auditorium & Stage Authority</h4>
              <p className="text-xs text-zinc-400 font-light">
                Training students to face large audiences without hesitation, self-doubt, or fear.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F5D638] hover:underline"
            >
              <span>Explore our full photography gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick link to Collaborations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#111111] via-[#0E1528] to-[#111111] border border-blue-500/30 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Explore Our 10 Institutional Collaborations
          </h3>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto font-light">
            Read about our on-campus partnerships with schools like Oxford International School, Children&apos;s Academy, Edu Valley School, and more.
          </p>
          <div className="pt-2">
            <Link
              href="/collaborations"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-[#3157A5] text-white hover:bg-[#264687] transition-all inline-flex items-center gap-2"
            >
              <span>View School Collaborations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
