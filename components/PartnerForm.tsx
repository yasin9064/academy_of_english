'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2, MessageCircle, Loader2, School, AlertCircle } from 'lucide-react';

interface PartnerFormValues {
  institutionName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  programType: string;
  estimatedStudents: string;
  message: string;
}

export default function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    defaultValues: {
      institutionName: '',
      contactPerson: '',
      phone: '',
      email: '',
      location: 'Bihar',
      programType: '10-Day Student Personality Development & Speech Training',
      estimatedStudents: '100-250',
      message: '',
    },
  });

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const fullMessage = `INSTITUTION: ${data.institutionName} | CONTACT PERSON: ${data.contactPerson} | LOCATION: ${data.location} | ESTIMATED STUDENTS: ${data.estimatedStudents} | PROGRAM: ${data.programType} | NOTE: ${data.message}`;

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${data.contactPerson} (${data.institutionName})`,
          phone: data.phone,
          email: data.email || undefined,
          course: data.programType,
          message: fullMessage,
          type: 'partnership',
          source: 'collaboration_page',
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit proposal');

      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 rounded-2xl bg-[#111111] border border-blue-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-serif">Partnership Request Received!</h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Thank you for inviting Academy of English to collaborate with your prestigious institution. Trainer Faizan will personally review your curriculum goals and schedule a strategic consultation.
          </p>
        </div>

        <div className="pt-2">
          <a
            href={`https://wa.me/917004706208?text=${encodeURIComponent(
              'Hello Trainer Faizan! We just submitted an institutional collaboration proposal for our school on your website.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:scale-105 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp for Immediate Priority</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-zinc-800 space-y-5 shadow-2xl"
    >
      <div className="space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3157A5]/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
          <School className="w-3.5 h-3.5" />
          <span>Institutional Partnership</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
          Partner With Academy of English
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Empower your students and faculty with on-campus speaking bootcamps, morning assembly training, and personality workshops.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Institution Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            School / College Name *
          </label>
          <input
            type="text"
            required
            {...register('institutionName', { required: true })}
            placeholder="e.g. Oxford International School"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>

        {/* Contact Person & Designation */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Principal / Representative Name *
          </label>
          <input
            type="text"
            required
            {...register('contactPerson', { required: true })}
            placeholder="e.g. Dr. A. K. Sharma (Principal)"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Official Mobile / WhatsApp *
          </label>
          <input
            type="tel"
            required
            {...register('phone', { required: true })}
            placeholder="e.g. 9876543210"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Official Email
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="e.g. info@school.org"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            City / Location *
          </label>
          <input
            type="text"
            required
            {...register('location', { required: true })}
            placeholder="e.g. Kishanganj, Purnia, Araria, Patna"
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>

        {/* Estimated Student Strength */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Estimated Student Strength
          </label>
          <select
            {...register('estimatedStudents')}
            className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          >
            <option value="50-100">50 - 100 Students</option>
            <option value="100-250">100 - 250 Students</option>
            <option value="250-500">250 - 500 Students</option>
            <option value="500+">500+ Students (Full School Batch)</option>
          </select>
        </div>
      </div>

      {/* Program Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Requested Program Format *
        </label>
        <select
          {...register('programType')}
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#F5D638] transition-all"
        >
          <option value="10-Day Student Personality Development & Speech Training">
            10-Day Student Personality Development & Speech Training
          </option>
          <option value="15-Day Stand Tall, Speak Bold Intensive Bootcamp">
            15-Day &ldquo;Stand Tall, Speak Bold&rdquo; Intensive Bootcamp
          </option>
          <option value="Teacher Training & Modern Classroom Pedagogy Seminar">
            Teacher Training & Modern Classroom Pedagogy Seminar
          </option>
          <option value="Phonetics, Accent & Vocabulary Diagnostic Program">
            Phonetics, Accent & Vocabulary Diagnostic Program
          </option>
          <option value="Annual School Assembly & Public Speaking Mentorship">
            Annual School Assembly & Public Speaking Mentorship
          </option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          Additional Details or Preferred Months
        </label>
        <textarea
          rows={3}
          {...register('message')}
          placeholder="Preferred workshop duration, class standards (e.g. Grades 5 to 10), or specific focus areas..."
          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#F5D638] transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#3157A5] to-[#264687] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Proposal...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Institutional Proposal</span>
          </>
        )}
      </button>
    </form>
  );
}
