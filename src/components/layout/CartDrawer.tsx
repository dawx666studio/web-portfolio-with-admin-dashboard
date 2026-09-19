"use client";

import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getSubtotal,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isDrawerOpen) return null;

  const subtotal = getSubtotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in-0 duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fef8ed] border-l-4 border-black shadow-retro-lg flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b-2 border-black/10 flex items-center justify-between bg-cream-100">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-fructus-red" />
              <h2 className="font-display text-2xl tracking-wide text-fructus-dark">
                YOUR BAG
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-cream-200 text-fructus-dark transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-cream-200 border-2 border-black/20 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-fructus-dark mb-2">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-6">
                  Looks like you haven&apos;t added any stickers, prints, or goods yet!
                </p>
                <Button
                  onClick={closeDrawer}
                  asChild
                >
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border-2 border-black/80 shadow-retro-sm"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-black/20">
                    <Image
                      src={item.image || "/images/Landing Page.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={closeDrawer}
                        className="font-bold text-sm text-fructus-dark hover:text-fructus-red transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-fructus-red p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm font-black text-fructus-red">
                      {formatCurrency(item.price)}
                    </div>


                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t-2 border-black/10 bg-cream-100 space-y-4">
              <div className="flex justify-between items-center text-base font-bold">
                <span>Subtotal</span>
                <span className="font-black text-xl text-fructus-red">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  onClick={closeDrawer}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button
                  variant="default"
                  onClick={closeDrawer}
                  asChild
                >
                  <Link href="/cart" className="flex items-center justify-center gap-1">
                    Checkout <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
