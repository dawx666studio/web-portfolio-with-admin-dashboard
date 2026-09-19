import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";
import { ArrowRight, BookOpen } from "lucide-react";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-12">
      {/* Blog Top Header Banner */}
      <section className="bg-gradient-to-r from-fructus-pink via-fructus-pinkLight to-fructus-pink py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-6xl text-fructus-dark tracking-wide uppercase">
            Welcome to the Dawx666 Blog
          </h1>
          <p className="text-sm sm:text-base font-bold text-muted-foreground mt-3 max-w-xl mx-auto">
            Behind-the-scenes sketches, art business tips, product design journeys, and freebies!
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="w-full overflow-hidden bg-cream-100 flex items-center justify-center">
                <img
                  src={post.coverImage || "/images/Landing Page.jpg"}
                  alt={post.title}
                  className="w-full h-auto max-h-[400px] object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-fructus-red uppercase">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>By {post.authorName}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display text-2xl sm:text-3xl text-fructus-dark tracking-wide group-hover:text-fructus-red transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-black text-fructus-red hover:underline"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
