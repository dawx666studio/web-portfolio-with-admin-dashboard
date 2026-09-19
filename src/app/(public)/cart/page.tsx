"use client";

import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { createOrder } from "@/lib/actions/orders";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Truck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderNumber: string;
    total: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-24 text-center max-w-7xl mx-auto px-4">
        <p className="font-bold text-muted-foreground">Loading bag...</p>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = subtotal;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!shippingInfo.name || !shippingInfo.email) {
      alert("Please enter your name and email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createOrder({
        customerName: shippingInfo.name,
        customerEmail: shippingInfo.email,
        customerAddress: shippingInfo.address,
        customerCity: shippingInfo.city,
        customerZip: shippingInfo.zip,
        customerCountry: shippingInfo.country,
        items: items.map((i) => ({
          productId: i.id,
          productTitle: i.title,
          productPrice: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal,
        shipping: 0,
        total,
      });

      if (res.success) {
        setOrderComplete({
          orderNumber: res.orderNumber,
          total,
        });
        clearCart();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#e61d2b", "#ffd2d7", "#ffc72c", "#ffffff"],
        });
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border-3 border-black p-8 sm:p-12 shadow-retro-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-fructus-pink text-fructus-red border-2 border-black flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="font-display text-4xl text-fructus-dark tracking-wide uppercase">
              Thank You for Your Order!
            </h1>
            <p className="text-sm font-bold text-muted-foreground mt-2">
              Order confirmation number:{" "}
              <span className="text-fructus-red font-mono">{orderComplete.orderNumber}</span>
            </p>
          </div>

          <div className="p-4 bg-cream-100 rounded-2xl border border-black/20 text-sm font-medium text-fructus-dark">
            <p>
              We sent a receipt and tracking updates to{" "}
              <strong>{shippingInfo.email || "your email"}</strong>. Your order will be packed and shipped in 1-3 business days!
            </p>
          </div>

          <Button variant="default" size="lg" asChild className="rounded-full">
            <Link href="/shop" className="font-black">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto space-y-6">
        <div className="w-24 h-24 rounded-full bg-cream-200 border-3 border-black flex items-center justify-center mx-auto shadow-retro-sm">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="font-display text-4xl text-fructus-dark">YOUR BAG IS EMPTY</h1>
        <p className="text-sm font-medium text-muted-foreground">
          You haven&apos;t added any stickers, prints or cute goods to your cart yet.
        </p>
        <Button variant="default" size="lg" asChild className="rounded-full">
          <Link href="/shop" className="font-black">
            Explore the Shop
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl text-fructus-dark tracking-wide uppercase mt-2">
          Your Shopping Bag
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border-3 border-black p-6 shadow-retro divide-y divide-black/10">
            {items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-black/80 bg-cream-100 flex-shrink-0">
                  <Image
                    src={item.image || "/images/Landing Page.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-display text-base sm:text-lg text-fructus-dark hover:text-fructus-red line-clamp-1 transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="text-sm font-black text-fructus-red">
                    {formatCurrency(item.price)}
                  </div>

                  <div className="flex items-center justify-between pt-2">

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-fructus-dark">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-fructus-red transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Right Column: Checkout & Shipping Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-6">
            <h2 className="font-display text-2xl text-fructus-dark tracking-wide">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm font-bold border-b-2 border-black/10 pb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-fructus-red pt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Shipping details input */}
            <form onSubmit={handleCheckout} className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Shipping Information
              </h3>

              <Input
                type="text"
                placeholder="Full Name *"
                value={shippingInfo.name}
                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                required
                className="h-10 text-xs"
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                required
                className="h-10 text-xs"
              />
              <Input
                type="text"
                placeholder="Street Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                className="h-10 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="h-10 text-xs"
                />
                <Input
                  type="text"
                  placeholder="ZIP / Postal"
                  value={shippingInfo.zip}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                  className="h-10 text-xs"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-full shadow-retro font-black text-base"
                >
                  {isSubmitting ? "Processing Order..." : `Place Order • ${formatCurrency(total)}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
