"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, Sparkles, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { openDrawer, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "The Dawx666 Blog" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fef8ed]/95 backdrop-blur-md border-b-2 border-black/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile toggle & Logo */}
          <div className="flex items-center gap-4 flex-1">
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-cream-200 border-2 border-black text-fructus-dark hover:bg-cream-300 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            
            <Link href="/" className="relative w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src="/images/dewnithlogo.jpg"
                alt="Dawx666 Logo"
                fill
                className="object-cover scale-105"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base font-bold transition-all relative py-1",
                    isActive
                      ? "text-fructus-red font-black underline decoration-2 underline-offset-8"
                      : "text-fructus-dark hover:text-fructus-red"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (Cart) */}
          <div className="flex items-center justify-end gap-3 flex-1">            <button
              onClick={openDrawer}
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-full bg-fructus-red hover:bg-fructus-redDark text-white  transition-all flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-sm">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full pt-3 pb-2 border-t border-black/10 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-base font-bold transition-all",
                    isActive
                      ? "bg-fructus-red text-white"
                      : "text-fructus-dark hover:bg-cream-200"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:bg-cream-200"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
