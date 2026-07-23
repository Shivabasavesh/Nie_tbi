import { z } from 'zod';

// Regex to match Google Drive, OneDrive, SharePoint, and Dropbox URLs
const cloudStorageRegex = /^(https?:\/\/)?(drive\.google\.com|onedrive\.live\.com|.*\.sharepoint\.com|dropbox\.com)\/.*$/i;

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required").max(100),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Invalid phone characters"),
  subject: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

export const applicationFormSchema = z.object({
  startup_name: z.string().min(1, "Startup Name is required"),
  founder_name: z.string().min(1, "Founder Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  startup_stage: z.string().optional(),
  sector: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
  pitch_deck_url: z.string()
    .min(1, "Pitch Deck URL is required")
    .regex(cloudStorageRegex, "URL must be from Google Drive, OneDrive, SharePoint, or Dropbox"),
  link_accessibility_confirmed: z.boolean()
    .refine((val) => val === true, {
      message: "You must confirm the link is accessible",
    }),
});
