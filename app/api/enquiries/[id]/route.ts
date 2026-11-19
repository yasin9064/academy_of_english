import { NextRequest, NextResponse } from 'next/server';
import { deleteEnquiry, getEnquiryById, updateEnquiry } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { id } = await props.params;
  const body = await req.json();

  const updated = await updateEnquiry(id, {
    status: body.status,
    notes: body.notes,
    course: body.course,
  });

  if (!updated) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, enquiry: updated });
}

export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { id } = await props.params;
  const deleted = await deleteEnquiry(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Enquiry deleted' });
}
