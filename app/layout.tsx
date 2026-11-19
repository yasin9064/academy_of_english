import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Toaster } from 'sonner';

const sansFont = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const serifFont = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Academy of English – Institute of Personality Development | Trainer Faizan',
    template: '%s | Academy of English',
  },
  description:
    'Transform your English communication, conquer stage fear, and build dynamic leadership confidence under Md. Faizan Alam (Trainer Faizan) in Kishanganj, Bihar. Practical English, Public Speaking, Voice & Accent, and Personality Training.',
  keywords: [
    'Spoken English Classes in Kishanganj',
    'English Speaking Course in Kishanganj',
    'Public Speaking Classes in Kishanganj',
    'Personality Development Classes in Kishanganj',
    'English Communication Training in Kishanganj',
    'Public Speaking Trainer in Bihar',
    'Trainer Faizan Alam',
    'Academy of English Kishanganj',
    'Voice and Accent Training Bihar',
    'Munawar Zama Mentorship',
  ],
  authors: [{ name: 'Md. Faizan Alam (Trainer Faizan)' }],
  creator: 'Academy of English',
  publisher: 'Academy of English',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://academyofenglish.in',
    title: 'Academy of English – Institute of Personality Development',
    description:
      'We Teach. We Train. We Transform. Premier Spoken English, Public Speaking, and Personality Development Institute in Kishanganj, Bihar.',
    siteName: 'Academy of English',
    images: [
      {
        url: '/images/trainer/faizan_podium.png',
        width: 1200,
        height: 630,
        alt: 'Trainer Faizan Alam - Founder & Public Speaking Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academy of English – Institute of Personality Development',
    description:
      'Empowering students through high-impact English communication, public speaking and personality development.',
    images: ['/images/trainer/faizan_hero.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo/logo.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Academy of English',
    alternateName: 'Institute of Personality Development',
    description:
      'Premier institute in Kishanganj, Bihar dedicated to English communication, public speaking, voice and accent, and personality development.',
    founder: {
      '@type': 'Person',
      name: 'Md. Faizan Alam',
      jobTitle: 'Founder, Public Speaking Coach & English Language Trainer',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kishanganj',
      addressRegion: 'Bihar',
      addressCountry: 'IN',
    },
    telephone: '+91-7004706208',
    email: 'academyofenglishkne@gmail.com',
    url: 'https://academyofenglish.in',
    slogan: 'WE TEACH. WE TRAIN. WE TRANSFORM.',
    sameAs: [
      'https://www.youtube.com/@academyofenglish',
      'https://www.instagram.com/academyofenglish06',
      'https://www.facebook.com/academyofenglish06',
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-white flex flex-col antialiased selection:bg-[#F5D638] selection:text-black">
        <Toaster position="top-right" richColors />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
