import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (at least 2 characters)'),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit mobile number')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9+ -]+$/, 'Phone number can only contain digits, spaces and +'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  course: z.string().min(1, 'Please select a program or area of interest'),
  message: z.string().min(5, 'Please provide a brief message or question (at least 5 characters)'),
  type: z.enum(['admission', 'contact', 'partnership', 'workshop']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const courseSchema = z.object({
  title: z.string().min(3, 'Course title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  outcomes: z.array(z.string()).min(1, 'At least one learning outcome is required'),
  duration: z.string().default('Contact us for details'),
  eligibility: z.string().default('Students, Professionals & Job Seekers'),
  classFormat: z.string().default('Offline Classroom & Interactive Workshops'),
  fees: z.string().default('Contact us for details'),
  batchTimings: z.string().default('Morning & Evening Batches Available'),
  isPublished: z.boolean().default(true),
  order: z.number().default(0),
});

export const workshopSchema = z.object({
  title: z.string().min(3, 'Workshop title is required'),
  slug: z.string().min(3, 'Slug is required'),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  type: z.string().default('30-day'),
  duration: z.string().min(2, 'Duration is required'),
  targetAudience: z.string().min(2, 'Target audience is required'),
  venue: z.string().default('Academy Campus / Partner Institution'),
  status: z.enum(['UPCOMING', 'COMPLETED']).default('UPCOMING'),
  imageUrl: z.string().optional(),
  order: z.number().default(0),
});

export const galleryItemSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  caption: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type CourseFormValues = z.infer<typeof courseSchema>;
export type WorkshopFormValues = z.infer<typeof workshopSchema>;
export type GalleryItemFormValues = z.infer<typeof galleryItemSchema>;
