import { Hero } from "@/components/storefront/Hero";
import { CategoryTabs } from "@/components/storefront/CategoryTabs";
import { PastIllustrations } from "@/components/storefront/PastIllustrations";
import { InstagramGrid } from "@/components/storefront/InstagramGrid";
import { ProductCard } from "@/components/storefront/ProductCard";
import { getProducts } from "@/lib/actions/products";
import { getSiteSettings } from "@/lib/actions/settings";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60; // 1 min ISR

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div>
      {/* Hero Banner Section */}
      <Hero
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
        ctaText={settings.heroCtaText}
        ctaLink={settings.heroCtaLink}
      />

      {/* 3 Main Category Banner Cards */}
      <CategoryTabs />

      {/* Featured Products Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-wide">
                Featured Goodies
              </h2>
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-0.5">
                Hand-picked fan favorites, vinyl stickers, and pixel prints
              </p>
            </div>
          </div>

          <Button asChild className="rounded-full bg-fructus-red hover:bg-fructus-redDark text-white transition-all">
            <Link href="/shop" className="flex items-center gap-1.5 font-black text-sm">
              <span>View All Shop Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* "Stay a while" Past Illustrations Showcase */}
      <PastIllustrations />

      {/* "Find me on Instagram!" Grid */}
      <InstagramGrid />
    </div>
  );
}
