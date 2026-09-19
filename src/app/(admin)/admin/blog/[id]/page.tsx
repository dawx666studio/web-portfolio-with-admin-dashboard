import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/actions/blog";
import { BlogFormClient } from "../BlogFormClient";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === id || p.slug === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BlogFormClient initialPost={post} />
    </div>
  );
}
