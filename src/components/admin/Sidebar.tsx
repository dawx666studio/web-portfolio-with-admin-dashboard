"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  FileText,
  HelpCircle,
  Mail,
  Users,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/faq", label: "FAQ Items", icon: HelpCircle },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Store Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1e1b24] text-cream-100 flex flex-col border-r-2 border-black min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full border-2 border-fructus-gold overflow-hidden bg-fructus-gold">
          <Image
            src="/images/dewnithlogo.jpg"
            alt="Dawx666 Logo"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-lg tracking-wider text-fructus-gold">
            DAWX666 ADMIN
          </h2>
          <p className="text-[10px] text-cream-300 uppercase tracking-widest font-bold">
            Studio Control
          </p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                isActive
                  ? "bg-fructus-red text-white shadow-retro-sm"
                  : "text-cream-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-cream-200 hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" /> View Live Store
          </span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-fructus-pink hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
