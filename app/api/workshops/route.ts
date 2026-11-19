import { NextRequest, NextResponse } from 'next/server';
import { createWorkshop, getWorkshops } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';
import { workshopSchema } from '@/lib/validation';

export async function GET() {
  const workshops = await getWorkshops();
  return NextResponse.json({ workshops });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = workshopSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid workshop data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const newWorkshop = await createWorkshop(result.data as any);
    return NextResponse.json({ success: true, workshop: newWorkshop }, { status: 201 });
  } catch (error) {
    console.error('Workshop creation error:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
