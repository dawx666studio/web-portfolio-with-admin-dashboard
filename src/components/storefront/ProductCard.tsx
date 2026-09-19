"use client";

import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { ProductItem } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { Plus, ShoppingBag, ShoppingBagIcon } from "lucide-react";
import confetti from "canvas-confetti";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.url,
      category: product.category,
    });

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 40,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#e61d2b", "#ffd2d7", "#ffc72c"],
    });
  };

  const primaryImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url || "/images/Landing Page.jpg";

  return (
    <div className="group flex flex-col h-full bg-transparent">
      {/* Product Image Container */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white group-hover:-translate-y-1 transition-all duration-300 block"
      >
        <div className="relative w-full h-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Quick Add overlay button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 p-3 rounded-full bg-fructus-red text-white border-2 border-black opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute top-3 left-3 bg-fructus-gold text-fructus-dark border border-black text-xs font-black px-2 py-0.5 rounded-full shadow-retro-sm">
            SALE
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="pt-3 pb-1 text-center flex flex-col items-center flex-1 justify-between">
        <Link
          href={`/shop/${product.slug}`}
          className="font-display text-base sm:text-lg tracking-wide text-fructus-dark hover:text-fructus-red transition-colors line-clamp-2"
        >
          {product.title}
        </Link>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-sm sm:text-base font-bold text-fructus-dark">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
