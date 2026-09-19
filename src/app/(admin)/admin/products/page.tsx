import { AdminHeader } from "@/components/admin/AdminHeader";
import { getProducts } from "@/lib/actions/products";
import { ProductsTableClient } from "./ProductsTableClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Products Catalog"
        description="Manage stickers, prints, stationery items, inventory and pricing."
        actionLabel="Add Product"
        actionHref="/admin/products/new"
      />

      <ProductsTableClient products={products || []} />
    </div>
  );
}
