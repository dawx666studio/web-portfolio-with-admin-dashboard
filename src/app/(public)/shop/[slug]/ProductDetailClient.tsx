"use client";

import { useState } from "react";
import { ProductItem } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function ProductDetailClient({ product }: { product: ProductItem }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    addItem(
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        image: product.images[0]?.url,
        category: product.category,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#e61d2b", "#ffd2d7", "#ffc72c"],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">


        {/* Add to Cart CTA */}
        <Button
          onClick={handleAddToCart}
          variant="default"
          size="lg"
          className="flex-1 rounded-full hover:scale-102 transition-transform"
        >
          {isAdded ? (
            <span className="flex items-center gap-2 text-white">
              <Check className="w-5 h-5" /> Added to Bag!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Add to Bag
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
