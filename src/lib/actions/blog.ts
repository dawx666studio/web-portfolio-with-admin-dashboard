"use server";

import { prisma } from "@/lib/prisma";
import { BlogPostItem } from "@/lib/types";
import { BlogPostFormValues } from "@/lib/validators/blog";
import { revalidatePath } from "next/cache";

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    
    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? "",
      content: p.content,
      coverImage: p.coverImage ?? "",
      isPublished: p.isPublished,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : p.createdAt.toISOString(),
      authorName: p.authorName,
      authorAvatar: p.authorAvatar ?? undefined,
      tags: p.tags,
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (post) {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? "",
        content: post.content,
        coverImage: post.coverImage ?? "",
        isPublished: post.isPublished,
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : post.createdAt.toISOString(),
        authorName: post.authorName,
        authorAvatar: post.authorAvatar ?? undefined,
        tags: post.tags,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}

export async function createBlogPost(data: BlogPostFormValues) {
  try {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        isPublished: data.isPublished,
        authorName: data.authorName,
        tags: data.tags,
      },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, post };
  } catch (error: any) {
    console.error("Create blog post error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostFormValues>) {
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        isPublished: data.isPublished,
        tags: data.tags,
      },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, post };
  } catch (error: any) {
    console.error("Update blog post error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
