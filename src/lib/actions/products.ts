"use server";

import { prisma } from "@/lib/prisma";
import { ProductItem } from "@/lib/types";
import { ProductFormValues } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";

export async function getProducts(category?: string, search?: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        ...(category && category !== "all" ? { category: { slug: category } } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      compareAtPrice: p.compareAtPrice ?? undefined,
      isFeatured: p.isFeatured,
      isArchived: p.isArchived,
      category: p.category?.slug ?? "all",
      tags: p.tags,
      images: p.images.map((img) => ({
        id: img.id,
        url: img.url,
        altText: img.altText ?? p.title,
        isPrimary: img.isPrimary,
      })),
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { images: true, category: true },
    });
    if (!product) return null;
    
    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? undefined,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      category: product.category?.slug ?? "all",
      tags: product.tags,
      images: product.images.map((img) => ({
        id: img.id,
        url: img.url,
        altText: img.altText ?? product.title,
        isPrimary: img.isPrimary,
      })),
      createdAt: product.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      image: c.image ?? "/images/Landing Page.jpg",
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function createProduct(data: ProductFormValues) {
  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        tags: data.tags,
        images: {
          create: data.images.map((img) => ({
            url: img.url,
            altText: img.altText,
            isPrimary: img.isPrimary,
          })),
        },
      },
    });
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    console.error("Create product error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: Partial<ProductFormValues>) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        tags: data.tags,
      },
    });
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    console.error("Update product error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProducts(ids: string[]) {
  try {
    await prisma.product.deleteMany({
      where: { id: { in: ids } },
    });
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("Delete products error:", error);
    return { success: false, error: error.message };
  }
}
