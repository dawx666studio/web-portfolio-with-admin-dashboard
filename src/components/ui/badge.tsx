import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-fructus-red text-white",
        pink: "border-transparent bg-fructus-pink text-fructus-red",
        gold: "border-black bg-fructus-gold text-fructus-dark border",
        outline: "border-black text-fructus-dark bg-white",
        secondary: "border-transparent bg-cream-300 text-fructus-dark",
        success: "border-transparent bg-emerald-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
