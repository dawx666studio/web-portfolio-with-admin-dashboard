import { z } from "zod";

export const FaqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.enum(["Shipping", "General", "Materials", "Returns"]),
  orderIndex: z.coerce.number().int().default(0),
});

export type FaqFormValues = z.infer<typeof FaqSchema>;

export const SiteSettingsSchema = z.object({
  announcementText: z.string().min(1, "Announcement text is required"),
  announcementActive: z.boolean().default(true),
  heroHeadline: z.string().min(1, "Hero headline is required"),
  heroSubheadline: z.string().min(1, "Hero subheadline is required"),
  heroCtaText: z.string().min(1, "Hero CTA text is required"),
  heroCtaLink: z.string().min(1, "Hero CTA link is required"),
  artistName: z.string().min(1, "Artist name is required"),
  artistTitle: z.string().min(1, "Artist title is required"),
  bioHeadline: z.string().min(1, "Bio headline is required"),
  bioParagraph1: z.string().min(10, "Bio paragraph 1 is required"),
  bioParagraph2: z.string().min(10, "Bio paragraph 2 is required"),
  instagramUrl: z.string().url("Valid URL required").or(z.literal("")),
  twitterUrl: z.string().url("Valid URL required").or(z.literal("")),
  tiktokUrl: z.string().url("Valid URL required").or(z.literal("")),
  youtubeUrl: z.string().url("Valid URL required").or(z.literal("")),
  email: z.string().email("Valid email required"),
});

export type SiteSettingsFormValues = z.infer<typeof SiteSettingsSchema>;

export const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;
