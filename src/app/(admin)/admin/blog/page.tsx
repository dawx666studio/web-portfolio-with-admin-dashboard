import { AdminHeader } from "@/components/admin/AdminHeader";
import { getBlogPosts } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Edit, BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Studio Blog Articles"
        description="Write and publish behind-the-scenes stories, art tutorials, and announcements."
        actionLabel="New Article"
        actionHref="/admin/blog/new"
      />

      <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-100 text-xs font-black uppercase tracking-wider text-fructus-dark">
                <th className="p-4">Article</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-xl overflow-hidden border border-black/20 bg-cream-100 flex-shrink-0">
                        <Image
                          src={post.coverImage || "/images/Landing Page.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="font-bold text-fructus-dark hover:text-fructus-red transition-colors line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <span className="text-xs text-muted-foreground font-mono">
                          /{post.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-xs">{post.authorName}</td>

                  <td className="p-4 text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                      Published
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" asChild className="p-2 h-9 w-9">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
