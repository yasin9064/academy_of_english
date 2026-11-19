export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'INTERESTED' | 'CONVERTED' | 'NOT_INTERESTED';
export type EnquiryType = 'admission' | 'contact' | 'partnership' | 'workshop';

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  course: string;
  message: string;
  type: EnquiryType;
  status: EnquiryStatus;
  notes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  outcomes: string[];
  duration: string;
  eligibility: string;
  classFormat: string;
  fees: string;
  batchTimings: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Workshop {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  type: '30-day' | '40-day' | 'public-speaking' | 'personality-development' | 'school-program' | 'student-workshop' | 'teacher-training';
  duration: string;
  targetAudience: string;
  venue: string;
  status: 'UPCOMING' | 'COMPLETED';
  imageUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: 'trainer' | 'public-speaking' | 'workshops' | 'student-workshops' | 'award-ceremonies' | 'collaborations' | 'classroom' | 'training' | 'certifications';
  imageUrl: string;
  isFeatured: boolean;
  order: number;
  createdAt: string;
}

export interface SchoolCollaboration {
  id: string;
  name: string;
  location: string;
  tagline?: string;
  description: string;
  programConducted: string;
  logoPlaceholder?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface SiteContentData {
  hero: {
    headline: string;
    subheadline: string;
    highlight: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
  };
  vision: {
    heading: string;
    content: string;
    highlight: string;
  };
  mission: {
    heading: string;
    content: string;
    statement: string;
    targetCount: number;
    disclaimer: string;
  };
  trainer: {
    name: string;
    title: string;
    bio: string;
    highlights: string[];
    publicSpeakingJourney: string;
    certificationStory: string;
  };
  contact: {
    academyName: string;
    subtitle: string;
    location: string;
    phones: string[];
    email: string;
    socials: {
      youtube: { name: string; url: string };
      instagram: { name: string; url: string };
      facebook: { name: string; url: string };
    };
  };
}
