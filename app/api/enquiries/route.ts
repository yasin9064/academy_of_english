import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, getEnquiries } from '@/lib/data-store';
import { getAdminSession } from '@/lib/auth';
import { enquirySchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.type) body.type = 'admission';
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, phone, email, course, message, type } = result.data;
    const enquiry = await createEnquiry({
      fullName,
      phone,
      email: email || undefined,
      course,
      message,
      type,
      source: 'website',
    });

    // Generate WhatsApp direct conversation link for prefilling
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917004706208';
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const greetingText = `Hello Academy of English! I am ${fullName}. I just submitted an enquiry for "${course}" through your website. Message: ${message}`;
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greetingText)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received successfully! Our academic counsellor will connect with you shortly.',
        enquiry,
        whatsappUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Enquiry creation error:', error);
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const course = searchParams.get('course') || undefined;
  const search = searchParams.get('search') || undefined;

  const enquiries = await getEnquiries({ status, course, search });
  return NextResponse.json({ enquiries });
}
