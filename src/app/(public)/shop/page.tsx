import { getProducts, getCategories } from "@/lib/actions/products";
import { ProductGrid } from "@/components/storefront/ProductGrid";

export const revalidate = 60;

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || "all";

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl sm:text-6xl text-fructus-red tracking-wide uppercase">
          Shop
        </h1>
        <p className="text-sm sm:text-base font-bold text-muted-foreground mt-2 max-w-md mx-auto">
          Explore handmade die-cut stickers, archival pixel prints, pin badges, and stationery goods.
        </p>
      </div>

      {/* Interactive Filterable Product Grid */}
      <ProductGrid
        initialProducts={products}
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
