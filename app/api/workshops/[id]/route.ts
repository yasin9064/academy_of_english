import { NextRequest, NextResponse } from 'next/server';
import { deleteWorkshop, updateWorkshop } from '@/lib/data-store';
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

  const updated = await updateWorkshop(id, body);
  if (!updated) {
    return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, workshop: updated });
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
  const deleted = await deleteWorkshop(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Workshop deleted' });
}
