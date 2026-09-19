import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  compareAtPrice: z.coerce.number().optional().nullable(),
  category: z.string().min(1, "Please select a category"),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  images: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string().url("Please provide a valid image URL"),
      altText: z.string().optional().default(""),
      isPrimary: z.boolean().default(false),
    })
  ).min(1, "At least one image is required"),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;

export const CategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
