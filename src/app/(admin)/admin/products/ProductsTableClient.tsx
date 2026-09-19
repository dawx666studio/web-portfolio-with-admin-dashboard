"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { deleteProducts } from "@/lib/actions/products";

// Minimal type definition based on what we need from getProducts
type ProductItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  isFeatured: boolean;
  images: { url: string }[];
};

export function ProductsTableClient({ products }: { products: ProductItem[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(products.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedIds(newSet);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) return;

    setIsDeleting(true);
    const res = await deleteProducts(Array.from(selectedIds));
    if (res.success) {
      setSelectedIds(new Set());
    } else {
      alert("Failed to delete products: " + res.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-cream-100 p-4 rounded-xl border border-black/20">
          <span className="font-bold text-fructus-dark">
            {selectedIds.size} product{selectedIds.size > 1 ? "s" : ""} selected
          </span>
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={isDeleting}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete Selected"}
          </Button>
        </div>
      )}

      <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-100 text-xs font-black uppercase tracking-wider text-fructus-dark">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-fructus-red"
                    checked={products.length > 0 && selectedIds.size === products.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="p-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-fructus-red"
                      checked={selectedIds.has(product.id)}
                      onChange={(e) => handleSelectOne(product.id, e.target.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/20 bg-cream-100 flex-shrink-0">
                        <Image
                          src={product.images[0]?.url || "/images/Landing Page.jpg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-bold text-fructus-dark hover:text-fructus-red transition-colors line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <span className="text-xs text-muted-foreground font-mono">
                          /{product.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-cream-200 text-xs font-black uppercase border border-black/20">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-4 font-black">{formatCurrency(product.price)}</td>

                  <td className="p-4">
                    {product.isFeatured ? (
                      <span className="px-2 py-0.5 rounded-full bg-fructus-pink text-fructus-red text-xs font-bold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild className="p-2 h-9 w-9">
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
