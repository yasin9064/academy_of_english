import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

const uuidv4 = () => randomUUID();
import { Course, Enquiry, GalleryItem, SiteContentData, Workshop } from './types';
import {
  INITIAL_COURSES,
  INITIAL_GALLERY_ITEMS,
  INITIAL_SITE_CONTENT,
  INITIAL_WORKSHOPS,
} from './constants';

interface StoredAdmin {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: string;
}

interface DatabaseStructure {
  adminUsers: StoredAdmin[];
  enquiries: Enquiry[];
  courses: Course[];
  workshops: Workshop[];
  galleryItems: GalleryItem[];
  siteContent: SiteContentData;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function initializeDatabase(): DatabaseStructure {
  ensureDataDir();

  const defaultAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123';
  const defaultAdminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@academyofenglish.com').toLowerCase();
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(defaultAdminPassword, salt);

  const initialData: DatabaseStructure = {
    adminUsers: [
      {
        id: 'admin-primary-1',
        email: defaultAdminEmail,
        passwordHash,
        name: 'Md. Faizan Alam',
        role: 'superadmin',
        createdAt: new Date().toISOString(),
      },
    ],
    enquiries: [
      {
        id: 'seed-enquiry-1',
        fullName: 'Aman Rahman',
        phone: '9876543210',
        email: 'aman.rahman@example.com',
        course: 'Public Speaking & Stage Presence',
        message: 'I want to overcome stage fright and improve my speaking confidence for upcoming college presentations.',
        type: 'admission',
        status: 'NEW',
        notes: 'Requested evening batch information.',
        source: 'website',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'seed-enquiry-2',
        fullName: 'Saba Parveen',
        phone: '9123456780',
        email: 'saba.parveen@example.com',
        course: 'Spoken English Mastery',
        message: 'Interested in daily conversational English classes and phonetics training.',
        type: 'admission',
        status: 'CONTACTED',
        notes: 'Called candidate, scheduled counseling for Saturday.',
        source: 'website',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
      {
        id: 'seed-enquiry-3',
        fullName: 'Principal, Crescent Model Academy',
        phone: '9431234567',
        email: 'principal@crescentmodel.org',
        course: 'Student Development Program (For Schools)',
        message: 'We would like to invite Trainer Faizan to conduct a 10-day Public Speaking and Personality Development workshop for our high school students.',
        type: 'partnership',
        status: 'INTERESTED',
        notes: 'Follow up with customized proposal and workshop outline.',
        source: 'website',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      },
    ],
    courses: INITIAL_COURSES,
    workshops: INITIAL_WORKSHOPS,
    galleryItems: INITIAL_GALLERY_ITEMS,
    siteContent: INITIAL_SITE_CONTENT,
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

function readDb(): DatabaseStructure {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    return initializeDatabase();
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.adminUsers || !parsed.courses) {
      return initializeDatabase();
    }
    return parsed;
  } catch {
    return initializeDatabase();
  }
}

function writeDb(data: DatabaseStructure): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Admin Users
export async function getAdminByEmail(email: string): Promise<StoredAdmin | null> {
  const db = readDb();
  const lower = email.toLowerCase().trim();
  const user = db.adminUsers.find((u) => u.email.toLowerCase() === lower);
  return user || null;
}

export async function getAdminById(id: string): Promise<StoredAdmin | null> {
  const db = readDb();
  const user = db.adminUsers.find((u) => u.id === id);
  return user || null;
}

// Enquiries
export async function getEnquiries(filter?: {
  status?: string;
  course?: string;
  search?: string;
}): Promise<Enquiry[]> {
  const db = readDb();
  let list = [...db.enquiries];

  if (filter?.status && filter.status !== 'ALL') {
    list = list.filter((e) => e.status === filter.status);
  }
  if (filter?.course && filter.course !== 'ALL') {
    list = list.filter((e) => e.course === filter.course);
  }
  if (filter?.search) {
    const query = filter.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.fullName.toLowerCase().includes(query) ||
        e.phone.includes(query) ||
        (e.email && e.email.toLowerCase().includes(query)) ||
        e.message.toLowerCase().includes(query)
    );
  }

  // Sort descending by creation date
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const db = readDb();
  return db.enquiries.find((e) => e.id === id) || null;
}

export async function createEnquiry(data: {
  fullName: string;
  phone: string;
  email?: string;
  course: string;
  message: string;
  type?: 'admission' | 'contact' | 'partnership' | 'workshop';
  source?: string;
}): Promise<Enquiry> {
  const db = readDb();
  const newEnquiry: Enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || undefined,
    course: data.course.trim(),
    message: data.message.trim(),
    type: data.type || 'admission',
    status: 'NEW',
    notes: '',
    source: data.source || 'website',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.enquiries.unshift(newEnquiry);
  writeDb(db);
  return newEnquiry;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Pick<Enquiry, 'status' | 'notes' | 'course'>>
): Promise<Enquiry | null> {
  const db = readDb();
  const index = db.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  db.enquiries[index] = {
    ...db.enquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);
  return db.enquiries[index];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = readDb();
  const initialLength = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  if (db.enquiries.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Courses
export async function getCourses(publishedOnly = false): Promise<Course[]> {
  const db = readDb();
  let list = [...db.courses];
  if (publishedOnly) {
    list = list.filter((c) => c.isPublished);
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const db = readDb();
  return db.courses.find((c) => c.slug === slug) || null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const db = readDb();
  return db.courses.find((c) => c.id === id) || null;
}

export async function createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  const db = readDb();
  const id = `course_${Date.now()}`;
  const newCourse: Course = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.courses.push(newCourse);
  writeDb(db);
  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const db = readDb();
  const index = db.courses.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.courses[index] = {
    ...db.courses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.courses[index];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const db = readDb();
  const initialLen = db.courses.length;
  db.courses = db.courses.filter((c) => c.id !== id);
  if (db.courses.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// Workshops
export async function getWorkshops(): Promise<Workshop[]> {
  const db = readDb();
  return [...db.workshops].sort((a, b) => a.order - b.order);
}

export async function getWorkshopBySlug(slug: string): Promise<Workshop | null> {
  const db = readDb();
  return db.workshops.find((w) => w.slug === slug) || null;
}

export async function createWorkshop(data: Omit<Workshop, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workshop> {
  const db = readDb();
  const newWorkshop: Workshop = {
    ...data,
    id: `ws_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.workshops.push(newWorkshop);
  writeDb(db);
  return newWorkshop;
}

export async function updateWorkshop(id: string, updates: Partial<Workshop>): Promise<Workshop | null> {
  const db = readDb();
  const index = db.workshops.findIndex((w) => w.id === id);
  if (index === -1) return null;

  db.workshops[index] = {
    ...db.workshops[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.workshops[index];
}

export async function deleteWorkshop(id: string): Promise<boolean> {
  const db = readDb();
  const initialLen = db.workshops.length;
  db.workshops = db.workshops.filter((w) => w.id !== id);
  if (db.workshops.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// Gallery
export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  const db = readDb();
  let items = [...db.galleryItems];
  if (category && category !== 'all') {
    items = items.filter((g) => g.category === category);
  }
  return items.sort((a, b) => a.order - b.order);
}

export async function createGalleryItem(data: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
  const db = readDb();
  const newItem: GalleryItem = {
    ...data,
    id: `gal_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.galleryItems.push(newItem);
  writeDb(db);
  return newItem;
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const db = readDb();
  const index = db.galleryItems.findIndex((g) => g.id === id);
  if (index === -1) return null;

  db.galleryItems[index] = {
    ...db.galleryItems[index],
    ...updates,
  };
  writeDb(db);
  return db.galleryItems[index];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const db = readDb();
  const initialLen = db.galleryItems.length;
  db.galleryItems = db.galleryItems.filter((g) => g.id !== id);
  if (db.galleryItems.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// Site Content CMS
export async function getSiteContent(): Promise<SiteContentData> {
  const db = readDb();
  return db.siteContent || INITIAL_SITE_CONTENT;
}

export async function updateSiteContent(updates: Partial<SiteContentData>): Promise<SiteContentData> {
  const db = readDb();
  db.siteContent = {
    ...db.siteContent,
    ...updates,
  };
  writeDb(db);
  return db.siteContent;
}

// Dashboard KPI Stats
export async function getDashboardStats() {
  const db = readDb();
  const totalEnquiries = db.enquiries.length;
  const newEnquiries = db.enquiries.filter((e) => e.status === 'NEW').length;
  const contactedEnquiries = db.enquiries.filter((e) => e.status === 'CONTACTED').length;
  const convertedEnquiries = db.enquiries.filter((e) => e.status === 'CONVERTED').length;
  const interestedEnquiries = db.enquiries.filter((e) => e.status === 'INTERESTED').length;
  const totalCourses = db.courses.length;
  const totalWorkshops = db.workshops.length;
  const totalGallery = db.galleryItems.length;

  return {
    totalEnquiries,
    newEnquiries,
    contactedEnquiries,
    convertedEnquiries,
    interestedEnquiries,
    totalCourses,
    totalWorkshops,
    totalGallery,
    recentEnquiries: db.enquiries.slice(0, 5),
  };
}
