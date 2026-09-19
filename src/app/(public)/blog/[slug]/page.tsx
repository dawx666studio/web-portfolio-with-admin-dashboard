import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const recentPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 mb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-4 text-xs font-black text-fructus-red uppercase">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.authorName}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-fructus-dark tracking-wide leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-auto rounded-3xl mb-10 bg-cream-100 object-contain"
        />
      )}

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="prose prose-lg prose-rose max-w-none text-fructus-dark font-sans leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t-2 border-black/10 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-fructus-red mr-1" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-cream-200 text-fructus-dark text-xs font-bold border border-black/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* More Articles */}
      {recentPosts.length > 0 && (
        <div className="mt-16 pt-12 border-t-2 border-black/10">
          <h3 className="font-display text-2xl text-fructus-dark mb-6">
            More from the Studio Blog
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recentPosts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="p-6 bg-cream-100 rounded-2xl transition-all group"
              >
                <span className="text-xs font-black text-fructus-red uppercase">
                  {formatDate(p.publishedAt)}
                </span>
                <h4 className="font-display text-lg text-fructus-dark mt-2 group-hover:text-fructus-red transition-colors line-clamp-2">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
