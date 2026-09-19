"use server";

import { prisma } from "@/lib/prisma";
import { FaqItem } from "@/lib/types";
import { FaqFormValues } from "@/lib/validators/faq";
import { revalidatePath } from "next/cache";

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { orderIndex: "asc" },
    });
    return faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category as any,
      orderIndex: f.orderIndex,
    }));
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}

export async function createFaq(data: FaqFormValues) {
  try {
    const faq = await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        orderIndex: data.orderIndex,
      },
    });
    revalidatePath("/faq");
    revalidatePath("/admin/faq");
    return { success: true, faq };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateFaq(id: string, data: Partial<FaqFormValues>) {
  try {
    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(data.question ? { question: data.question } : {}),
        ...(data.answer ? { answer: data.answer } : {}),
        ...(data.category ? { category: data.category } : {}),
        ...(typeof data.orderIndex === "number" ? { orderIndex: data.orderIndex } : {}),
      },
    });
    revalidatePath("/faq");
    revalidatePath("/admin/faq");
    return { success: true, faq };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFaq(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/faq");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
