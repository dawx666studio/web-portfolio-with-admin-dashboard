"use client";

import Link from "next/link";
import { Plus, Store, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function AdminHeader({
  title,
  description,
  actionLabel,
  actionHref,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black/10">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-wide">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-bold text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" asChild>
          <Link href="/" target="_blank" className="flex items-center gap-1.5">
            <Store className="w-4 h-4" />
            <span>Storefront</span>
          </Link>
        </Button>

        {actionLabel && actionHref && (
          <Button variant="default" size="sm" asChild>
            <Link href={actionHref} className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>{actionLabel}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
