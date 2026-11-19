'use client';

import React, { useState, useEffect } from 'react';
import { Enquiry, EnquiryStatus } from '@/lib/types';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Trash2,
  Edit2,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

const STATUS_OPTIONS: EnquiryStatus[] = [
  'NEW',
  'CONTACTED',
  'INTERESTED',
  'CONVERTED',
  'NOT_INTERESTED',
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText }),
      });
      if (!res.ok) throw new Error();

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, notes: noteText } : e))
      );
      setEditingNotesId(null);
      toast.success('Internal notes saved');
    } catch {
      toast.error('Failed to save notes');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();

      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.success('Enquiry deleted');
    } catch {
      toast.error('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchesSearch =
      search === '' ||
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase())) ||
      e.course.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Student Enquiries & Leads
          </h1>
          <p className="text-xs text-zinc-400">
            Manage prospective students, update admission follow-ups, and add internal notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/api/enquiries/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md shadow-[#F5D638]/20"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to CSV</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, phone, course, or message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#F5D638] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5D638]"
          >
            <option value="ALL">All Statuses ({enquiries.length})</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st} ({enquiries.filter((e) => e.status === st).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-sm">
          Loading student enquiries...
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#111111] border border-zinc-800 space-y-2">
          <p className="text-zinc-300 font-semibold text-base">No enquiries found</p>
          <p className="text-xs text-zinc-500">Try adjusting your search query or status filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
            const whatsappText = `Hello ${enq.fullName}! I am Trainer Faizan from Academy of English. Following up on your enquiry regarding "${enq.course}".`;
            const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;

            return (
              <div
                key={enq.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 transition-colors space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                        {enq.fullName}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-zinc-300">
                        {enq.type}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(enq.createdAt).toLocaleDateString()} at{' '}
                        {new Date(enq.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#F5D638]">
                      Course: {enq.course}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-400">Status:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border cursor-pointer ${
                        enq.status === 'NEW'
                          ? 'bg-amber-400/10 text-amber-400 border-amber-400/40'
                          : enq.status === 'CONVERTED'
                          ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/40'
                          : enq.status === 'CONTACTED'
                          ? 'bg-blue-400/10 text-blue-400 border-blue-400/40'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-black text-white">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                    Student Query / Goal:
                  </span>
                  {enq.message}
                </div>

                {/* Contact Actions & Internal Notes */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
                  {/* Contact Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-[#F5D638]"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F5D638]" />
                      <span>{enq.phone}</span>
                    </a>

                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-[#F5D638]"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        <span>{enq.email}</span>
                      </a>
                    )}

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/30"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Candidate</span>
                    </a>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="self-end lg:self-auto p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Internal Counsellor Notes */}
                <div className="pt-2 border-t border-zinc-800/60">
                  {editingNotesId === enq.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add internal notes (e.g. called on Monday, requested morning batch)..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#080808] border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#F5D638]"
                      />
                      <button
                        onClick={() => handleSaveNotes(enq.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5D638] text-black"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-2 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs">
                      <div className="text-zinc-400 font-light">
                        <strong className="text-zinc-500 font-medium">Internal Notes: </strong>
                        {enq.notes || <span className="italic text-zinc-600">No notes added yet</span>}
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(enq.id);
                          setNoteText(enq.notes || '');
                        }}
                        className="text-zinc-400 hover:text-[#F5D638] flex items-center gap-1 text-[11px] ml-2 cursor-pointer shrink-0"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Note</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
