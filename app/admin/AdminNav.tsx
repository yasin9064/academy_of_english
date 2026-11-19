'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Edit3,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

const NAV_ITEMS = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Enquiries & Leads', href: '/admin/enquiries', icon: MessageSquare },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Workshops', href: '/admin/workshops', icon: Calendar },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Content CMS', href: '/admin/content', icon: Edit3 },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <aside className="w-full md:w-64 bg-[#111111] border-b md:border-b-0 md:border-r border-zinc-800 p-4 shrink-0 flex flex-col justify-between">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2 block">
          Modules
        </span>
        <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#F5D638] text-black font-bold shadow-md shadow-[#F5D638]/20'
                    : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 hidden md:block" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 mt-4 border-t border-zinc-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
