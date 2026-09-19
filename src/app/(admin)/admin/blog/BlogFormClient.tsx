"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/actions/blog";
import { BlogPostItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { slugify } from "@/lib/utils";
import { Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BlogFormClient({
  initialPost,
}: {
  initialPost?: BlogPostItem;
}) {
  const router = useRouter();
  const isEditing = !!initialPost;

  const [formData, setFormData] = useState({
    title: initialPost?.title || "",
    slug: initialPost?.slug || "",
    excerpt: initialPost?.excerpt || "",
    content: initialPost?.content || "",
    coverImage: initialPost?.coverImage || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80",
    authorName: initialPost?.authorName || "Dewnith (Dawx666)",
    isPublished: initialPost?.isPublished !== undefined ? initialPost.isPublished : true,
    tags: initialPost?.tags || ["Art Business", "Behind the Scenes"],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      setError("Please fill in title, slug, and content.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let res;
      if (isEditing && initialPost) {
        res = await updateBlogPost(initialPost.id, formData);
      } else {
        res = await createBlogPost(formData);
      }

      if (res.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(res.error || "Failed to save blog post.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialPost) return;
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setLoading(true);
    try {
      await deleteBlogPost(initialPost.id);
      router.push("/admin/blog");
      router.refresh();
    } catch {
      alert("Failed to delete post.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-fructus-red"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Articles</span>
        </Link>

        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Article</span>
          </Button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-6">
        <h2 className="font-display text-2xl text-fructus-dark tracking-wide">
          {isEditing ? "Edit Article" : "Write New Studio Article"}
        </h2>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Article Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              required
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Slug (URL) *
            </label>
            <Input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="h-11 font-mono text-xs"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-1">
            Short Summary / Excerpt *
          </label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={2}
            className="font-medium"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-2">
            Cover Image
          </label>
          <ImageUploader
            value={formData.coverImage ? [formData.coverImage] : []}
            onChange={(urls) => setFormData({ ...formData, coverImage: urls[0] || "" })}
            maxImages={1}
          />
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider">
            Article Content (Markdown / WYSIWYG) *
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end gap-3">
          <Button variant="secondary" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="flex items-center gap-2 font-black px-8"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Publishing..." : isEditing ? "Save Changes" : "Publish Article"}</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
