import { AdminHeader } from "@/components/admin/AdminHeader";
import { getCategories } from "@/lib/actions/products";
import Image from "next/image";
import { FolderTree, Tag } from "lucide-react";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Categories"
        description="Organize your shop products into collections and navigation categories."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border-2 border-black/80 p-6 shadow-retro-sm hover:shadow-retro transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/20 mb-4 bg-cream-100">
                <Image
                  src={cat.image || "/images/Landing Page.jpg"}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-fructus-red" />
                <h3 className="font-display text-xl text-fructus-dark">
                  {cat.name}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground font-medium mt-1">
                {cat.description || "No description provided."}
              </p>
            </div>

            <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">/{cat.slug}</span>
              <span className="px-2 py-0.5 rounded-md bg-cream-200 text-fructus-dark font-bold font-sans">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
