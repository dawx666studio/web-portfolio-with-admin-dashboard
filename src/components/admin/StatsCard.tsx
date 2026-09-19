import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendPositive = true,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-black/80 p-6 shadow-retro-sm hover:shadow-retro transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <div className="p-2.5 rounded-2xl bg-cream-100 border border-black/20 text-fructus-red">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="my-3">
        <span className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-tight">
          {value}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs font-bold">
        {trend && (
          <span
            className={cn(
              "px-2 py-0.5 rounded-full",
              trendPositive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {trend}
          </span>
        )}
        {description && (
          <span className="text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}
