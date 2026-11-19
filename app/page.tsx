import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  Sparkles,
  Mic,
  UserCheck,
  Shield,
  Volume2,
  Languages,
  Briefcase,
  Award,
  Compass,
  TrendingUp,
  Zap,
  Presentation,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Target,
  Layers,
  HeartHandshake,
  Coins,
  ChevronRight,
  School,
  Star,
  Quote,
} from 'lucide-react';
import { getCourses, getGalleryItems, getSiteContent, getWorkshops } from '@/lib/data-store';
import { INITIAL_SERVICES, SCHOOL_COLLABORATIONS, WHY_CHOOSE_US_BENEFITS } from '@/lib/constants';
import AnimatedCounter from '@/components/AnimatedCounter';
import AdmissionForm from '@/components/AdmissionForm';

// Mapping string icons to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Sparkles,
  Mic,
  UserCheck,
  Shield,
  Volume2,
  Languages,
  Briefcase,
  Award,
  Compass,
  TrendingUp,
  Zap,
  Presentation,
  GraduationCap,
  Users,
  BookOpen,
  Target,
  Layers,
  HeartHandshake,
  Coins,
  CheckCircle2,
};

export default async function HomePage() {
  const content = await getSiteContent();
  const courses = await getCourses(true);
  const workshops = await getWorkshops();
  const gallery = await getGalleryItems();

  const whatsappTalkUrl = `https://wa.me/917004706208?text=${encodeURIComponent(
    'Hello Trainer Faizan! I am visiting the Academy of English website and would like to speak directly with you regarding training programs.'
  )}`;

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24 overflow-hidden">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 overflow-hidden">
        {/* Subtle dynamic background glow */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#F5D638]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#3157A5]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#F5D638]/30 shadow-lg shadow-black/50">
                <span className="w-2 h-2 rounded-full bg-[#F5D638] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#F5D638] uppercase">
                  {content.hero.highlight}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-xs text-zinc-300">Institute of Personality Development</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-serif">
                Speak With <span className="text-gold-gradient">Confidence.</span> <br className="hidden sm:inline" />
                Lead With <span className="text-blue-gradient">Purpose.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {content.hero.subheadline}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-[#F5D638] via-[#F5D638] to-[#e0c228] text-black shadow-xl shadow-[#F5D638]/25 hover:shadow-[#F5D638]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{content.hero.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href={whatsappTalkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base bg-[#111111] hover:bg-[#181818] text-white border border-zinc-700/80 hover:border-[#F5D638]/60 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                  <span>{content.hero.secondaryCtaText}</span>
                </a>
              </div>

              {/* Trust Metrics Pill Strip */}
              <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#F5D638] font-serif">10+</p>
                  <p className="text-xs text-zinc-400 font-medium">Core Programs</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-serif">10+</p>
                  <p className="text-xs text-zinc-400 font-medium">School Collaborations</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#3157A5] font-serif">100k</p>
                  <p className="text-xs text-zinc-400 font-medium">Mission Goal</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg">
                {/* Decorative gold/blue ring containers */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#F5D638]/30 via-transparent to-[#3157A5]/30 blur-xl opacity-70" />

                {/* Main Card with Trainer Portrait */}
                <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] to-[#0A0A0A] border border-zinc-700/70 p-4 sm:p-5 shadow-2xl shadow-black overflow-hidden">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800/50 to-black">
                    <Image
                      src="/images/trainer/faizan_hero.png"
                      alt="Trainer Md. Faizan Alam delivering public speaking training"
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />

                    {/* Gradient overlay for bottom text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* Bottom floating badge on image */}
                    <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-[#050505]/90 backdrop-blur-md border border-[#F5D638]/40 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white tracking-wide">Md. Faizan Alam</p>
                          <p className="text-xs text-[#F5D638] font-medium">
                            Founder & Public Speaking Coach
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-[#3157A5]/30 border border-[#3157A5]/50 text-[10px] font-bold text-blue-200 uppercase tracking-wider">
                          Certified Trainer
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Badge: Mentorship */}
                  <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111111] border border-[#F5D638]/50 shadow-xl">
                    <Award className="w-4 h-4 text-[#F5D638]" />
                    <span className="text-xs font-semibold text-white">
                      Mentored by Munawar Zama
                    </span>
                  </div>

                  {/* Floating Micro-Badge: Methodology */}
                  <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111111] border border-blue-500/50 shadow-xl">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-white">
                      7-Step Public Speaking System
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: ACADEMY INTRODUCTION
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#111111] via-[#0B0B0B] to-[#111111] border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3157A5]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-semibold border border-[#F5D638]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About The Institute</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight">
                {content.intro.heading}
              </h2>

              <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                {content.intro.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#080808] border border-zinc-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5D638]/10 border border-[#F5D638]/30 flex items-center justify-center shrink-0 text-[#F5D638]">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    &ldquo;Words can create, words can destroy. Speak with a purpose!&rdquo;
                  </p>
                  <p className="text-xs text-zinc-400">— Trainer Faizan</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F5D638] hover:underline"
                >
                  <span>Read our full philosophy and methodology</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side: Authentic Photos Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-700/80 shadow-xl group">
                <Image
                  src="/images/trainer/faizan_workshop.png"
                  alt="Trainer Faizan conducting interactive whiteboard training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-semibold text-white">Live Classroom Drills</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700/80 shadow-xl group">
                  <Image
                    src="/images/hero/microphone_auditorium.png"
                    alt="Auditorium stage public speaking"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">Auditorium Speaking</span>
                  </div>
                </div>

                <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700/80 shadow-xl group">
                  <Image
                    src="/images/graphics/leadership_crowd.jpeg"
                    alt="Stand tall and lead with purpose"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-[#F5D638]">Character & Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: OUR SERVICES (15 SERVICES)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Comprehensive Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif">
            Our Specialized Services
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            From foundational fluency to commanding executive presence, explore the 15 specialized training modules crafted to build your voice and character.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName] || MessageSquare;
            return (
              <div
                key={service.id}
                className="group p-6 sm:p-7 rounded-2xl bg-[#111111] hover:bg-[#161616] border border-zinc-800 hover:border-[#F5D638]/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#080808] border border-zinc-800 group-hover:border-[#F5D638]/40 flex items-center justify-center text-[#F5D638] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F5D638]/10 text-[#F5D638] border border-[#F5D638]/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#F5D638] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-800/80">
                  <Link
                    href={`/admission?course=${encodeURIComponent(service.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5D638] group-hover:text-white transition-colors"
                  >
                    <span>Enquire Now</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHY CHOOSE US (12 BENEFITS GRID)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-[#111111] to-[#080808] border border-zinc-800 relative">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5D638]">
              Learn. Speak. Lead.
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif">
              Why Choose Academy of English?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light">
              We combine structured linguistics, psychological confidence conditioning, and real podium experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {WHY_CHOOSE_US_BENEFITS.map((benefit, i) => {
              const Icon = ICON_MAP[benefit.icon] || CheckCircle2;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#090909] border border-zinc-800/90 hover:border-zinc-700 space-y-3 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5D638]/10 text-[#F5D638] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{benefit.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F & G: VISION & MISSION WITH ANIMATED COUNTER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vision Card */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-zinc-800 relative flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157A5]/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                <Target className="w-3.5 h-3.5" />
                <span>Our Direction</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {content.vision.heading}
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {content.vision.content}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-sm font-semibold text-[#F5D638]">
                &ldquo;{content.vision.highlight}&rdquo;
              </p>
            </div>
          </div>

          {/* Mission Card with 100,000+ Animated Counter */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121003] via-[#111111] to-[#050505] border border-yellow-500/40 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#F5D638]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/20 text-[#F5D638] text-xs font-bold border border-[#F5D638]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Institutional Mission</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {content.mission.heading}
              </h3>

              {/* Animated Counter Display */}
              <div className="py-4">
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter
                    end={content.mission.targetCount}
                    suffix="+"
                    duration={2500}
                    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-serif text-gold-gradient tracking-tight"
                  />
                  <span className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                    Students Mission
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 font-medium tracking-wide">
                  {content.mission.disclaimer}
                </p>
              </div>

              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {content.mission.content}
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-yellow-500/20">
                <p className="text-sm sm:text-base font-bold text-white tracking-wide">
                  &ldquo;{content.mission.statement}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: TRAINER INTRODUCTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#111111] border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Trainer Image Container */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-700 bg-gradient-to-b from-zinc-800 to-black shadow-2xl">
                  <Image
                    src="/images/trainer/faizan_hero.png"
                    alt="Md. Faizan Alam (Trainer Faizan)"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Handwritten signature overlay */}
                <div className="mt-4 p-3 rounded-xl bg-[#080808] border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Official Signature</span>
                    <span className="text-xs font-semibold text-white">Md. Faizan Alam</span>
                  </div>
                  <div className="relative w-28 h-10">
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

            {/* Trainer Bio Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20">
                Founder & Master Coach
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
                Meet Your Trainer – Md. Faizan Alam
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                {content.trainer.bio}
              </p>

              {/* Professional Highlights Badges */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Professional Credentials & Roles:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {content.trainer.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#080808] border border-zinc-800 text-xs sm:text-sm text-zinc-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F5D638] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/trainer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-lg shadow-[#F5D638]/20 hover:scale-105 transition-all"
                >
                  <span>Know More About Trainer Faizan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappTalkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COLLABORATIONS PREVIEW BAR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-zinc-800 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#3157A5] uppercase tracking-wider block">
                Institutional Trust
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                Our Educational Collaborations
              </h3>
            </div>
            <Link
              href="/collaborations"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F5D638] hover:underline"
            >
              <span>View all 10 Partner Schools</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SCHOOL_COLLABORATIONS.slice(0, 10).map((school) => (
              <div
                key={school.id}
                className="p-4 rounded-xl bg-[#080808] border border-zinc-800/80 hover:border-zinc-700 flex flex-col items-center text-center justify-center space-y-2 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#3157A5]/15 border border-[#3157A5]/30 flex items-center justify-center text-[#3157A5]">
                  <School className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-white line-clamp-1">{school.name}</h5>
                <p className="text-[10px] text-zinc-400">{school.location}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-zinc-400 text-center sm:text-left">
              Does your school or college want to empower students with world-class public speaking?
            </p>
            <Link
              href="/collaborations#partner-form"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#3157A5] text-white hover:bg-[#264687] transition-colors shrink-0"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ADMISSION CALL TO ACTION & EMBEDDED FORM
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
              Admissions Open 2026
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif leading-tight">
              Begin Your Transformation At Academy of English
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              Seats are strictly limited to ensure personal podium time for every student. Reserve your admission enquiry or schedule an individual diagnostic consultation today.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">Individual Diagnostic Assessment:</strong> Free initial analysis of your English vocabulary, pronunciation and speaking anxiety.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">Direct Mentorship:</strong> Taught under the direct supervision of Certified Public Speaking Trainer Md. Faizan Alam.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5D638] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">Podium Confidence Guarantee:</strong> Daily microphone speaking practice from your very first session.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <AdmissionForm source="home_page" />
          </div>
        </div>
      </section>
    </div>
  );
}
