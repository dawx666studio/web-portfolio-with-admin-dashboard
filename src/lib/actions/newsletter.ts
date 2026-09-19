"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function subscribeNewsletter(email: string) {
  try {
    const sub = await prisma.subscriber.upsert({
      where: { email },
      update: { isActive: true },
      create: { email, isActive: true },
    });
    revalidatePath("/admin/subscribers");
    return { success: true, id: sub.id };
  } catch (error: any) {
    console.error("Newsletter DB error:", error);
    return { success: false, error: error.message };
  }
}

export async function getSubscribers() {
  try {
    const list = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return list.map((s) => ({
      id: s.id,
      email: s.email,
      isActive: s.isActive,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return [];
  }
}
