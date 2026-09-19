"use server";

import { prisma } from "@/lib/prisma";
import { ContactMessageItem } from "@/lib/types";
import { ContactFormValues } from "@/lib/validators/contact";
import { revalidatePath } from "next/cache";

export async function submitContactForm(data: ContactFormValues) {
  try {
    const contact = await prisma.contactMessage.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        orderNumber: data.orderNumber,
        message: data.message,
      },
    });
    revalidatePath("/admin/messages");
    return { success: true, id: contact.id };
  } catch (error: any) {
    console.error("Contact form error:", error);
    return { success: false, error: error.message };
  }
}

export async function getContactMessages(): Promise<ContactMessageItem[]> {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return messages.map((m) => ({
      id: m.id,
      firstName: m.firstName,
      lastName: m.lastName ?? undefined,
      email: m.email,
      orderNumber: m.orderNumber ?? undefined,
      message: m.message,
      isRead: m.isRead,
      createdAt: m.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return [];
  }
}

export async function markMessageRead(id: string, isRead: boolean = true) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
