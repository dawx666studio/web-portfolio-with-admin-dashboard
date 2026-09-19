import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/actions/products";
import { ProductFormClient } from "../ProductFormClient";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ProductFormClient initialProduct={product} categories={categories} />
    </div>
  );
}
