'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryFormValues } from '@/lib/validation';
import { Send, CheckCircle2, MessageCircle, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface AdmissionFormProps {
  initialCourse?: string;
  source?: string;
  className?: string;
}

export default function AdmissionForm({
  initialCourse = 'Spoken English Mastery',
  source = 'admission_page',
  className = '',
}: AdmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ message: string; whatsappUrl?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      course: initialCourse,
      message: 'I am interested in enrolling at Academy of English. Please share admission details and batch timings.',
      type: 'admission',
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry');
      }

      setSuccessData({
        message: json.message || 'Your application was received successfully!',
        whatsappUrl: json.whatsappUrl,
      });
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className={`p-8 rounded-2xl bg-[#111111] border border-yellow-500/30 text-center space-y-6 shadow-2xl ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-serif">Admission Enquiry Received!</h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            {successData.message} Trainer Faizan and our admissions counsellor will review your details and reach out within 24 hours.
          </p>
        </div>

        {successData.whatsappUrl && (
          <div className="pt-2">
            <a
              href={successData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Continue on WhatsApp with Trainer Faizan</span>
            </a>
            <p className="text-xs text-zinc-500 mt-2">Skip the wait — connect with us immediately on WhatsApp</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSuccessData(null)}
          className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 pt-2 block mx-auto transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`p-6 sm:p-8 rounded-2xl bg-[#111111] border border-zinc-800 space-y-5 shadow-2xl relative ${className}`}
    >
      <div className="space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D638]/10 text-[#F5D638] text-xs font-semibold border border-[#F5D638]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority Admission Form</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
          Take Your First Step To Confidence
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Fill this quick form to reserve your seat or book a free diagnostic counselling session.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Full Name <span className="text-[#F5D638]">*</span>
        </label>
        <input
          type="text"
          {...register('fullName')}
          placeholder="e.g. Md. Tarique Alam"
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        />
        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          WhatsApp / Phone Number <span className="text-[#F5D638]">*</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="e.g. 7004706208"
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        />
        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Email Address <span className="text-zinc-500 text-[11px]">(Optional)</span>
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="e.g. student@example.com"
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>

      {/* Course Interested In */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Program of Interest <span className="text-[#F5D638]">*</span>
        </label>
        <select
          {...register('course')}
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        >
          <option value="Spoken English Mastery">Spoken English Mastery</option>
          <option value="Public Speaking & Stage Presence">Public Speaking & Stage Presence</option>
          <option value="Personality Development & Character Building">Personality Development & Character Building</option>
          <option value="English Communication Skills">English Communication Skills</option>
          <option value="Voice & Accent Training">Voice & Accent Training</option>
          <option value="Phonetics & Pronunciation Science">Phonetics & Pronunciation Science</option>
          <option value="Soft Skills & Corporate Readiness">Soft Skills & Corporate Readiness</option>
          <option value="Leadership Development">Leadership Development</option>
          <option value="30-Day Intensive Transformation Workshop">30-Day Intensive Transformation Workshop</option>
          <option value="40-Day Advanced Leadership & Speaking Bootcamp">40-Day Advanced Leadership Bootcamp</option>
          <option value="Student Development Program (Schools)">Student Development Program (Schools)</option>
          <option value="Teacher Training Program">Teacher Training Program</option>
          <option value="Other / Free Counselling">Other / Free Counselling</option>
        </select>
        {errors.course && <p className="text-xs text-red-400 mt-1">{errors.course.message}</p>}
      </div>

      {/* Message / Goal */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Your Goal or Message <span className="text-[#F5D638]">*</span>
        </label>
        <textarea
          rows={3}
          {...register('message')}
          placeholder="Tell us what you want to achieve (e.g., conquer stage fear, speak fluently in English, prepare for job interviews)..."
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all resize-none"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-lg shadow-[#F5D638]/25 hover:shadow-[#F5D638]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Admission Enquiry</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-zinc-500 text-center">
        Your information is confidential and will only be used by Academy of English counsellors.
      </p>
    </form>
  );
}
