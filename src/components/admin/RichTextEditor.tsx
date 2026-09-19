"use client";

import { useState } from "react";
import { Bold, Italic, Heading2, Heading3, List, Quote, Code, Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog post or article content here...",
}: RichTextEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  const insertSyntax = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected.length || 4)
      );
    }, 50);
  };

  return (
    <div className="border-2 border-black/80 rounded-2xl overflow-hidden bg-white shadow-retro-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-cream-100 border-b-2 border-black/10 flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertSyntax("**", "**")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("*", "*")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-black/20 mx-1" />
          <button
            type="button"
            onClick={() => insertSyntax("\n## ", "\n")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("\n### ", "\n")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-black/20 mx-1" />
          <button
            type="button"
            onClick={() => insertSyntax("\n- ", "\n")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("\n> ", "\n")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSyntax("`", "`")}
            className="p-2 rounded-lg hover:bg-cream-200 text-fructus-dark transition-colors"
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Edit / Preview Toggle */}
        <div className="flex items-center bg-cream-200 rounded-xl p-0.5 border border-black/20">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1",
              tab === "edit"
                ? "bg-fructus-red text-white"
                : "text-fructus-dark hover:bg-cream-300"
            )}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1",
              tab === "preview"
                ? "bg-fructus-red text-white"
                : "text-fructus-dark hover:bg-cream-300"
            )}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>
      </div>

      {/* Editor or Preview Pane */}
      {tab === "edit" ? (
        <textarea
          id="blog-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[300px] p-4 text-sm font-mono focus:outline-none focus:ring-0 resize-y"
        />
      ) : (
        <div className="p-6 min-h-[300px] prose prose-rose max-w-none text-fructus-dark font-sans leading-relaxed whitespace-pre-wrap">
          {value || <span className="text-muted-foreground italic">No content to preview</span>}
        </div>
      )}
    </div>
  );
}
