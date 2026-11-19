import { NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const enquiries = await getEnquiries();

  // Generate CSV rows
  const headers = ['ID', 'Full Name', 'Phone', 'Email', 'Course', 'Type', 'Status', 'Notes', 'Created At'];
  const rows = enquiries.map((e) => [
    `"${e.id}"`,
    `"${(e.fullName || '').replace(/"/g, '""')}"`,
    `"${(e.phone || '').replace(/"/g, '""')}"`,
    `"${(e.email || '').replace(/"/g, '""')}"`,
    `"${(e.course || '').replace(/"/g, '""')}"`,
    `"${(e.type || '').replace(/"/g, '""')}"`,
    `"${(e.status || '').replace(/"/g, '""')}"`,
    `"${(e.notes || '').replace(/"/g, '""')}"`,
    `"${e.createdAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="academy_enquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
