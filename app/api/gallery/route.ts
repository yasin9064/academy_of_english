import { NextRequest, NextResponse } from 'next/server';
import { createGalleryItem, getGalleryItems } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';
import { galleryItemSchema } from '@/lib/validation';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const items = await getGalleryItems(category);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = galleryItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid gallery item data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const newItem = await createGalleryItem(result.data as any);
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Gallery item creation error:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}
