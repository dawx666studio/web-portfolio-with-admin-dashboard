import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, User, MapPin, Truck } from "lucide-react";
import { OrderStatusUpdater } from "./OrderStatusUpdater";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-fructus-red font-mono">
            {order.orderNumber}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-wide">
            Order Details
          </h1>
          <p className="text-xs font-bold text-muted-foreground mt-1">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Client Status & Tracking Updater */}
        <OrderStatusUpdater order={order} />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer & Shipping Info */}
        <div className="bg-white rounded-3xl border-2 border-black/80 p-6 shadow-retro-sm space-y-4">
          <div className="flex items-center gap-2 text-fructus-red font-bold text-sm">
            <User className="w-4 h-4" />
            <span>Customer</span>
          </div>
          <div className="text-sm font-medium">
            <div className="font-black text-fructus-dark">{order.customerName}</div>
            <div className="text-muted-foreground">{order.customerEmail}</div>
          </div>

          <div className="pt-4 border-t border-black/10">
            <div className="flex items-center gap-2 text-fructus-red font-bold text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Shipping Address</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p>{order.customerAddress || "Standard Mail Delivery"}</p>
              <p>{order.customerCity ? `${order.customerCity}, ${order.customerZip}` : ""}</p>
              <p>{order.customerCountry || "United States"}</p>
            </div>
          </div>
        </div>

        {/* Order Line Items */}
        <div className="md:col-span-2 bg-white rounded-3xl border-2 border-black/80 p-6 shadow-retro-sm space-y-4">
          <div className="flex items-center gap-2 text-fructus-red font-bold text-sm mb-2">
            <Package className="w-4 h-4" />
            <span>Items Ordered</span>
          </div>

          <div className="divide-y divide-black/10">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/20 bg-cream-100 flex-shrink-0">
                    <Image
                      src={item.image || "/images/Landing Page.jpg"}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-fructus-dark">{item.productTitle}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(item.productPrice)} x {item.quantity}
                    </div>
                  </div>
                </div>

                <div className="font-black text-sm text-fructus-dark">
                  {formatCurrency(item.productPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-black/10 space-y-1 text-sm font-bold">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-fructus-red pt-2 border-t border-black/5">
              <span>Total Paid</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
