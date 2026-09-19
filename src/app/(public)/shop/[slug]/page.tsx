import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/actions/products";
import { formatCurrency } from "@/lib/utils";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ProductDetailClient } from "./ProductDetailClient";
import { ArrowLeft, ShieldCheck, Truck, Sparkles } from "lucide-react";

export const revalidate = 60;

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-retro-lg flex items-center justify-center p-4">
            <Image
              src={product.images[0]?.url || "/images/Landing Page.jpg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-black bg-white flex-shrink-0 cursor-pointer shadow-retro-sm"
                >
                  <Image
                    src={img.url}
                    alt={img.altText || product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-fructus-pink text-fructus-red border border-black text-xs font-black uppercase tracking-wider mb-3">
              {product.category}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl text-fructus-dark tracking-wide leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 text-2xl font-black mb-6">
              <span className="text-fructus-red">{formatCurrency(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-muted-foreground line-through text-lg font-bold">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="prose prose-rose max-w-none text-fructus-dark/90 font-medium leading-relaxed mb-6">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Interactive Client Cart Form */}
          <ProductDetailClient product={product} />

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t-2 border-black/10">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-fructus-dark tracking-wide">
              You Might Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
