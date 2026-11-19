import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { YoutubeIcon, InstagramIcon, FacebookIcon } from '@/components/BrandIcons';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Academy of English – Personality Development',
  description:
    'Contact Academy of English in Kishanganj, Bihar. Call +91-7004706208 or WhatsApp Trainer Faizan for admission enquiries, course fees, and workshop bookings.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/917004706208?text=${encodeURIComponent(
    'Hello Academy of English! I would like to get in touch with Trainer Faizan.'
  )}`;

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Top Header */}
      <section className="relative pt-16 sm:pt-24 pb-12 bg-gradient-to-b from-[#111111] to-[#050505] border-b border-zinc-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-bold border border-[#F5D638]/20 uppercase tracking-wider">
            Direct Reach
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif">
            Contact Academy of English
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about admissions, batch schedules, or institutional workshops? Reach out to Trainer Faizan and our admissions team.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Academy Details & Clickable Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 shadow-2xl">
              <div>
                <span className="text-xs font-bold text-[#F5D638] uppercase tracking-wider block">
                  Campus & Official Head Office
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  Academy of English
                </h3>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Institute of Personality Development
                </p>
              </div>

              <div className="space-y-5 text-sm">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080808] border border-zinc-800 flex items-center justify-center text-[#F5D638] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Campus Location</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Kishanganj, Bihar, India
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080808] border border-zinc-800 flex items-center justify-center text-[#F5D638] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Phone & WhatsApp</p>
                    <a
                      href="tel:7004706208"
                      className="block text-xs text-zinc-300 hover:text-[#F5D638] transition-colors"
                    >
                      +91 7004706208 (Direct / WhatsApp)
                    </a>
                    <a
                      href="tel:9801685258"
                      className="block text-xs text-zinc-300 hover:text-[#F5D638] transition-colors"
                    >
                      +91 9801685258 (Admissions Helpline)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080808] border border-zinc-800 flex items-center justify-center text-[#F5D638] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email Address</p>
                    <a
                      href="mailto:academyofenglishkne@gmail.com"
                      className="text-xs text-zinc-300 hover:text-[#F5D638] break-all transition-colors"
                    >
                      academyofenglishkne@gmail.com
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080808] border border-zinc-800 flex items-center justify-center text-[#3157A5] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Office & Batch Hours</p>
                    <p className="text-xs text-zinc-400">
                      Monday to Saturday: 8:00 AM – 7:30 PM <br />
                      Sunday: Special Bootcamps & Counseling
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-zinc-800/80">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Chat on WhatsApp (7004706208)</span>
                </a>
              </div>
            </div>

            {/* Official Social Media Buttons */}
            <div className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4 shadow-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Official Social Media Profiles
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Follow our official verified channels for lecture clips, student speech recordings, and motivation:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://www.youtube.com/@academyofenglish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-red-500/40 text-xs text-zinc-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <YoutubeIcon className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-bold text-white">YouTube</p>
                      <p className="text-[10px] text-zinc-400">academyofenglish (Trainer Faizan)</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#F5D638] group-hover:underline">Subscribe</span>
                </a>

                <a
                  href="https://www.instagram.com/academyofenglish06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-pink-500/40 text-xs text-zinc-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-5 h-5 text-pink-400" />
                    <div>
                      <p className="font-bold text-white">Instagram</p>
                      <p className="text-[10px] text-zinc-400">@academyofenglish06</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#F5D638] group-hover:underline">Follow</span>
                </a>

                <a
                  href="https://www.facebook.com/academyofenglish06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-blue-500/40 text-xs text-zinc-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FacebookIcon className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-bold text-white">Facebook</p>
                      <p className="text-[10px] text-zinc-400">academyofenglish06</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#F5D638] group-hover:underline">Like</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
