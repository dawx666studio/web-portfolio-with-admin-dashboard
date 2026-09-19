"use server";

import { prisma } from "@/lib/prisma";
import { OrderItemRecord } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getOrders(): Promise<OrderItemRecord[]> {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      customerAddress: o.customerAddress ?? undefined,
      customerCity: o.customerCity ?? undefined,
      customerZip: o.customerZip ?? undefined,
      customerCountry: o.customerCountry ?? undefined,
      subtotal: o.subtotal,
      shipping: o.shipping,
      total: o.total,
      status: o.status as any,
      paymentStatus: o.paymentStatus as any,
      trackingNumber: o.trackingNumber ?? undefined,
      notes: o.notes ?? undefined,
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((i) => ({
        id: i.id,
        productId: i.productId ?? "",
        productTitle: i.productTitle,
        productPrice: i.productPrice,
        quantity: i.quantity,
        image: i.image ?? undefined,
      })),
    }));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<OrderItemRecord | null> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function updateOrderStatus(id: string, status: string, trackingNumber?: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        status: status as any,
        ...(trackingNumber ? { trackingNumber } : {}),
      },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerZip: string;
  customerCountry: string;
  items: { productId: string; productTitle: string; productPrice: number; quantity: number; image?: string }[];
  subtotal: number;
  shipping: number;
  total: number;
}) : Promise<{ success: true, orderNumber: string, orderId: string } | { success: false, error: string }> {
  const orderNumber = `DWX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerAddress: data.customerAddress,
        customerCity: data.customerCity,
        customerZip: data.customerZip,
        customerCountry: data.customerCountry,
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        status: "PROCESSING",
        paymentStatus: "PAID",
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            productPrice: item.productPrice,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
      include: { items: true },
    });
    return { success: true, orderNumber: order.orderNumber, orderId: order.id };
  } catch (error: any) {
    console.error("Create order error:", error);
    return { success: false, error: error.message };
  }
}
