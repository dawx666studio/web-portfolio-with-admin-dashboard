import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  text?: string;
  active?: boolean;
}

export function AnnouncementBar({
  text = "Please read my FAQ PAGE to understand shipping restrictions!",
  active = true,
}: AnnouncementBarProps) {
  if (!active) return null;

  return (
    <div className="bg-fructus-pink text-fructus-dark border-b-2 border-black/80 py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide transition-all hover:bg-fructus-pinkDark">
      <Link href="/faq" className="inline-flex items-center justify-center gap-2 hover:underline">
        <Sparkles className="w-3.5 h-3.5 text-fructus-red animate-pulse" />
        <span>{text}</span>
      </Link>
    </div>
  );
}
