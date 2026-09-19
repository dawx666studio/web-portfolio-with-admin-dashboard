import Link from "next/link";
import Image from "next/image";
import { Youtube, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#23202e] text-cream-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Mascot & Logo */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-fructus-gold flex items-center justify-center">
          <Image
            src="/images/dewnithlogo.jpg"
            alt="Dawx666 Mascot Logo"
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-display text-2xl tracking-widest text-fructus-gold mb-1">
          DAWX666 ILLUSTRATIONS
        </h3>
        <p className="text-xs font-bold uppercase tracking-widest text-cream-300 mb-6">
          EST. 2021 • ORIGINAL ART & PIXEL GOODS
        </p>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-bold text-cream-200">
          <Link href="/about" className="hover:text-fructus-pink transition-colors">
            About
          </Link>
          <Link href="/shop" className="hover:text-fructus-pink transition-colors">
            Shop
          </Link>
          <Link href="/faq" className="hover:text-fructus-pink transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-fructus-pink transition-colors">
            Contact
          </Link>
          <Link href="/blog" className="hover:text-fructus-pink transition-colors">
            The Dawx666 Blog
          </Link>
        </div>

        {/* Social media icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform hover:-translate-y-1 shadow-retro-sm"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform hover:-translate-y-1 shadow-retro-sm"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform hover:-translate-y-1 shadow-retro-sm"
            aria-label="TikTok"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform hover:-translate-y-1 shadow-retro-sm"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <Link
            href="/contact"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform hover:-translate-y-1 shadow-retro-sm"
            aria-label="Email Contact"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs tracking-wider text-cream-300/80 uppercase font-medium">
          © {currentYear} DAWX666 ILLUSTRATION. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
