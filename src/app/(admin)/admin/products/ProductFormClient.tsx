"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions/products";
import { ProductItem, CategoryItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { slugify } from "@/lib/utils";
import { Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductFormClientProps {
  initialProduct?: ProductItem;
  categories: CategoryItem[];
}

export function ProductFormClient({
  initialProduct,
  categories,
}: ProductFormClientProps) {
  const router = useRouter();
  const isEditing = !!initialProduct;

  const [formData, setFormData] = useState({
    title: initialProduct?.title || "",
    slug: initialProduct?.slug || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || 2.99,
    compareAtPrice: initialProduct?.compareAtPrice || "",
    category: initialProduct?.category || (categories[1]?.slug || "stickers"),
    isFeatured: initialProduct?.isFeatured || false,
    isArchived: initialProduct?.isArchived || false,
    images: initialProduct?.images.map((img) => img.url) || [
      "/images/Landing Page.jpg",
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.description) {
      setError("Please fill in title, slug, and description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload: any = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isArchived: formData.isArchived,
        tags: [formData.category],
        images: formData.images.map((url, idx) => ({
          url,
          altText: formData.title,
          isPrimary: idx === 0,
        })),
      };

      let res;
      if (isEditing && initialProduct) {
        res = await updateProduct(initialProduct.id, payload);
      } else {
        res = await createProduct(payload);
      }

      if (res.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(res.error || "Failed to save product.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialProduct) return;
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      await deleteProduct(initialProduct.id);
      router.push("/admin/products");
      router.refresh();
    } catch {
      alert("Failed to delete product.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Product</span>
          </Button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-6">
        <h2 className="font-display text-2xl text-fructus-dark tracking-wide">
          {isEditing ? "Edit Product" : "New Product Details"}
        </h2>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              required
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Slug (URL) *
            </label>
            <Input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="h-11 font-mono text-xs"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-1">
            Description *
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="font-medium"
          />
        </div>

        {/* Price, Compare Price, Category */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Price ($) *
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Compare Price ($)
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.compareAtPrice}
              onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
              className="h-11"
            />
          </div>



          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Category *
            </label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="h-11 font-bold capitalize"
            >
              {categories
                .filter((c) => c.slug !== "all")
                .map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
            </Select>
          </div>
        </div>

        {/* Featured & Archived toggles */}
        <div className="flex flex-wrap gap-6 pt-2 border-t border-black/10">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded border-black text-fructus-red focus:ring-fructus-red w-4 h-4"
            />
            <span>Feature on Homepage</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-muted-foreground">
            <input
              type="checkbox"
              checked={formData.isArchived}
              onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
              className="rounded border-black text-fructus-red focus:ring-fructus-red w-4 h-4"
            />
            <span>Archive / Hide from Store</span>
          </label>
        </div>

        {/* Product Images Uploader */}
        <div className="space-y-2 pt-4 border-t border-black/10">
          <label className="block text-xs font-black uppercase tracking-wider">
            Product Photos & Artwork
          </label>
          <ImageUploader
            value={formData.images}
            onChange={(images) => setFormData({ ...formData, images })}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end gap-3">
          <Button variant="secondary" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="flex items-center gap-2 font-black px-8"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
