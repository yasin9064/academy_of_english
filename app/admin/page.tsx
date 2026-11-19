import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getDashboardStats } from '@/lib/data-store';
import {
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  FileSpreadsheet,
  PlusCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default async function AdminDashboardOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  const STAT_CARDS = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      sub: 'All-time student leads',
      icon: MessageSquare,
      color: 'text-[#F5D638]',
      bg: 'bg-[#F5D638]/10',
      border: 'border-[#F5D638]/30',
    },
    {
      title: 'New / Unread',
      value: stats.newEnquiries,
      sub: 'Requires immediate follow-up',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/30',
    },
    {
      title: 'Contacted',
      value: stats.contactedEnquiries,
      sub: 'Counselling in progress',
      icon: Phone,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/30',
    },
    {
      title: 'Converted Students',
      value: stats.convertedEnquiries,
      sub: 'Enrolled in batches',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/30',
    },
    {
      title: 'Active Courses',
      value: stats.totalCourses,
      sub: 'Published programs',
      icon: BookOpen,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/30',
    },
    {
      title: 'Workshops & Events',
      value: stats.totalWorkshops,
      sub: 'Campus & school bootcamps',
      icon: Calendar,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
      border: 'border-pink-400/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111111] via-[#1a1806] to-[#111111] border border-yellow-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5D638]/20 text-[#F5D638] text-xs font-bold border border-[#F5D638]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Monitor incoming student admissions, manage courses, and update institutional content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/api/enquiries/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </a>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-colors"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111111] border border-zinc-800 space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium truncate">{card.title}</span>
                <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className={`text-2xl sm:text-3xl font-black font-serif ${card.color}`}>
                {card.value}
              </p>
              <p className="text-[10px] text-zinc-500 font-light truncate">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Bar */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 space-y-3">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Quick Management Actions:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/enquiries"
            className="p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-[#F5D638]/40 text-xs font-semibold text-white flex items-center gap-2.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#F5D638]" />
            <span>Manage Leads</span>
          </Link>
          <Link
            href="/admin/courses"
            className="p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-[#F5D638]/40 text-xs font-semibold text-white flex items-center gap-2.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Edit Courses</span>
          </Link>
          <Link
            href="/admin/workshops"
            className="p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-[#F5D638]/40 text-xs font-semibold text-white flex items-center gap-2.5 transition-colors"
          >
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>Add Workshop</span>
          </Link>
          <Link
            href="/admin/content"
            className="p-3.5 rounded-xl bg-[#090909] border border-zinc-800 hover:border-[#F5D638]/40 text-xs font-semibold text-white flex items-center gap-2.5 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Update Content</span>
          </Link>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
              Recent Admission & Contact Enquiries
            </h3>
            <p className="text-xs text-zinc-400">Latest 5 submissions from prospective students</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-[#F5D638] hover:underline flex items-center gap-1"
          >
            <span>View All ({stats.totalEnquiries})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[11px] uppercase tracking-wider">
                <th className="pb-3 pl-2">Student Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {stats.recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-white">
                    <div>{enq.fullName}</div>
                    {enq.email && <div className="text-[11px] text-zinc-500">{enq.email}</div>}
                  </td>
                  <td className="py-3.5 text-zinc-300 font-mono">
                    <a href={`tel:${enq.phone}`} className="hover:text-[#F5D638]">
                      {enq.phone}
                    </a>
                  </td>
                  <td className="py-3.5 text-zinc-300 max-w-[180px] truncate">{enq.course}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-zinc-300">
                      {enq.type}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'NEW'
                          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                          : enq.status === 'CONVERTED'
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                          : enq.status === 'CONTACTED'
                          ? 'bg-blue-400/10 text-blue-400 border border-blue-400/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <Link
                      href="/admin/enquiries"
                      className="text-xs text-[#F5D638] hover:underline font-semibold"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
