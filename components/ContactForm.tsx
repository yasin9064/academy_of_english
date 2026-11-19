'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryFormValues } from '@/lib/validation';
import { Send, CheckCircle2, MessageCircle, Loader2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
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
      course: 'Spoken English',
      message: '',
      type: 'contact',
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact', source: 'contact_page' }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to send enquiry');
      }

      setSuccessData({
        message: json.message || 'Your enquiry has been received successfully!',
        whatsappUrl: json.whatsappUrl,
      });
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="p-8 rounded-2xl bg-[#111111] border border-yellow-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-serif">Enquiry Sent Successfully!</h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            {successData.message}
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
              <span>Contact Through WhatsApp</span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSuccessData(null)}
          className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 pt-2 block mx-auto transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-zinc-800 space-y-5 shadow-2xl"
    >
      <div className="space-y-1 mb-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
          Send Us an Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Have a question about courses, admission, or institutional workshops? Leave us a message.
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
          placeholder="Your Full Name"
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        />
        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Phone Number <span className="text-[#F5D638]">*</span>
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
            placeholder="e.g. yourname@gmail.com"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Course Interested In */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Course Interested In <span className="text-[#F5D638]">*</span>
        </label>
        <select
          {...register('course')}
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all"
        >
          <option value="Spoken English">Spoken English</option>
          <option value="English Communication Skills">English Communication Skills</option>
          <option value="Public Speaking">Public Speaking</option>
          <option value="Personality Development">Personality Development</option>
          <option value="Voice & Accent Training">Voice & Accent Training</option>
          <option value="Phonetics Training">Phonetics Training</option>
          <option value="Soft Skills Development">Soft Skills Development</option>
          <option value="Leadership Development">Leadership Development</option>
          <option value="30-Day Intensive Workshop">30-Day Intensive Workshop</option>
          <option value="40-Day Intensive Workshop">40-Day Intensive Workshop</option>
          <option value="School / Teacher Training Program">School / Teacher Training Program</option>
          <option value="General Enquiry">General Enquiry</option>
        </select>
        {errors.course && <p className="text-xs text-red-400 mt-1">{errors.course.message}</p>}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Message <span className="text-[#F5D638]">*</span>
        </label>
        <textarea
          rows={4}
          {...register('message')}
          placeholder="How can Trainer Faizan and Academy of English help you?..."
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] focus:ring-1 focus:ring-[#F5D638] transition-all resize-none"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5D638] to-[#e0c228] text-black shadow-lg shadow-[#F5D638]/25 hover:shadow-[#F5D638]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Enquiry</span>
          </>
        )}
      </button>

      {/* WhatsApp Alternative */}
      <div className="pt-2 text-center">
        <span className="text-xs text-zinc-500 block mb-2">Or connect instantly via instant messaging:</span>
        <a
          href={`https://wa.me/917004706208?text=${encodeURIComponent(
            'Hello Academy of English! I would like to enquire about your courses.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:underline"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contact Academy of English on WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
