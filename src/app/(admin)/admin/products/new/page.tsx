import { getCategories } from "@/lib/actions/products";
import { ProductFormClient } from "../ProductFormClient";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <ProductFormClient categories={categories} />
    </div>
  );
}
