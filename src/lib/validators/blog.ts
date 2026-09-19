import { z } from "zod";

export const BlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  coverImage: z.string().url("Please provide a valid cover image URL"),
  isPublished: z.boolean().default(true),
  authorName: z.string().default("Dewnith (Dawx666)"),
  tags: z.array(z.string()).default([]),
});

export type BlogPostFormValues = z.infer<typeof BlogPostSchema>;
