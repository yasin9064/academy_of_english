'use client';

import React, { useState, useEffect } from 'react';
import { Course } from '@/lib/types';
import {
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  BookOpen,
  Clock,
  GraduationCap,
  Sparkles,
  X,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDuration, setFormDuration] = useState('Contact us for details');
  const [formEligibility, setFormEligibility] = useState('Students, Professionals & Job Seekers');
  const [formClassFormat, setFormClassFormat] = useState('Offline Classroom & Interactive Workshops');
  const [formFees, setFormFees] = useState('Contact us for details');
  const [formOutcomes, setFormOutcomes] = useState('');
  const [formPublished, setFormPublished] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/courses?all=true');
      const data = await res.json();
      if (data.courses) setCourses(data.courses);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormTitle('');
    setFormSlug('');
    setFormDesc('');
    setFormDuration('Contact us for details');
    setFormEligibility('Students, Professionals & Job Seekers');
    setFormClassFormat('Offline Classroom & Interactive Workshops');
    setFormFees('Contact us for details');
    setFormOutcomes('Master daily speaking fluency\nConquer stage fear');
    setFormPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setFormTitle(c.title);
    setFormSlug(c.slug);
    setFormDesc(c.description);
    setFormDuration(c.duration);
    setFormEligibility(c.eligibility);
    setFormClassFormat(c.classFormat);
    setFormFees(c.fees);
    setFormOutcomes((c.outcomes || []).join('\n'));
    setFormPublished(c.isPublished);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const outcomesArray = formOutcomes
      .split('\n')
      .map((o) => o.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle,
      slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formDesc,
      duration: formDuration,
      eligibility: formEligibility,
      classFormat: formClassFormat,
      fees: formFees,
      batchTimings: 'Morning & Evening Batches Available',
      outcomes: outcomesArray.length > 0 ? outcomesArray : ['Practical speaking fluency'],
      isPublished: formPublished,
    };

    try {
      if (editingCourse) {
        const res = await fetch(`/api/courses/${editingCourse.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success('Course updated successfully');
      } else {
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success('Course created successfully');
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch {
      toast.error('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this course?')) return;

    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Course deleted');
    } catch {
      toast.error('Failed to delete course');
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });
      if (!res.ok) throw new Error();

      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, isPublished: !c.isPublished } : c))
      );
      toast.success(`Course ${!course.isPublished ? 'published' : 'unpublished'}`);
    } catch {
      toast.error('Failed to toggle publish status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Course & Program Manager
          </h1>
          <p className="text-xs text-zinc-400">
            Create, edit descriptions, adjust duration, eligibility and publish status.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md shadow-[#F5D638]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-sm">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-4 shadow-xl transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleTogglePublish(c)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      c.isPublished
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {c.isPublished ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>Unpublished</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-[#F5D638] hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-serif">{c.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-light">
                  {c.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-zinc-400">
                  <div className="p-2 rounded-lg bg-[#080808] border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 uppercase block">Duration</span>
                    <span className="text-zinc-200 font-medium truncate block">{c.duration}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#080808] border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 uppercase block">Fees</span>
                    <span className="text-[#F5D638] font-medium truncate block">{c.fees}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                <span>Slug: /{c.slug}</span>
                <span>{c.outcomes?.length || 0} outcomes</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111111] border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Spoken English Mastery"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. spoken-english"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Detailed course description..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Duration</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="Contact us for details"
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Eligibility</label>
                  <input
                    type="text"
                    value={formEligibility}
                    onChange={(e) => setFormEligibility(e.target.value)}
                    placeholder="Students, Professionals"
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase block">Fees</label>
                  <input
                    type="text"
                    value={formFees}
                    onChange={(e) => setFormFees(e.target.value)}
                    placeholder="Contact us for details"
                    className="w-full px-3 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Learning Outcomes (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formOutcomes}
                  onChange={(e) => setFormOutcomes(e.target.value)}
                  placeholder="Outcome 1&#10;Outcome 2&#10;Outcome 3"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="rounded text-[#F5D638] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="pubCheck" className="text-xs text-zinc-300 cursor-pointer">
                  Publish this course on the live website immediately
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
