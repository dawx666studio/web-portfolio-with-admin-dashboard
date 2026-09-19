"use client";

import { useState, useMemo } from "react";
import { ProductItem, CategoryItem } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
  selectedCategory?: string;
}

export function ProductGrid({
  initialProducts,
  categories,
  selectedCategory = "all",
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by Category
    if (activeCategory !== "all") {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 border-b-2 border-black/10 pb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                "px-5 py-2 rounded-full text-sm sm:text-base font-bold transition-all border-2 border-black",
                isActive
                  ? "bg-fructus-red text-white shadow-retro-sm scale-105"
                  : "bg-cream-100 text-fructus-dark hover:bg-cream-200"
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stickers, prints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white border-2 border-black/80 rounded-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-sm font-bold text-fructus-dark whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort:</span>
          </div>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-11 w-44 rounded-full border-2 border-black/80 font-bold bg-white text-sm"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-cream-100 rounded-3xl border-2 border-dashed border-black/30 p-8">
          <h3 className="font-display text-2xl text-fructus-dark mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="px-6 py-2 rounded-full bg-fructus-red text-white font-bold border-2 border-black shadow-retro-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
