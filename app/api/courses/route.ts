import { NextRequest, NextResponse } from 'next/server';
import { createCourse, getCourses } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';
import { courseSchema } from '@/lib/validation';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const courses = await getCourses(!all);
  return NextResponse.json({ courses });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = courseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid course data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const newCourse = await createCourse(result.data);
    return NextResponse.json({ success: true, course: newCourse }, { status: 201 });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
