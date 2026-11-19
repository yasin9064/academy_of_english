import { NextRequest, NextResponse } from 'next/server';
import { deleteGalleryItem, updateGalleryItem } from '@/lib/data-store';
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

  const updated = await updateGalleryItem(id, body);
  if (!updated) {
    return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, item: updated });
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
  const deleted = await deleteGalleryItem(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Gallery item deleted' });
}
