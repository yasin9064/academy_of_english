import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminSession } from '@/lib/auth';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  Edit3,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react';
import AdminNav from './AdminNav';

export const metadata = {
  title: 'Admin Dashboard | Academy of English',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#111111] border-b border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black border border-[#F5D638]/70 shrink-0 p-0.5 shadow-sm">
              <Image
                src="/images/logo/logo.png"
                alt="Academy of English Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                AOE Control Panel
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                Academy of English
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {session && (
            <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
              <div className="hidden sm:block text-right">
                <span className="text-xs font-semibold text-white block">{session.name}</span>
                <span className="text-[10px] text-[#F5D638] uppercase font-bold tracking-wider">
                  {session.role}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {session && <AdminNav />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
