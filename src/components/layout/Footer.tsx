import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitch } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fructus-red text-cream-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Mascot & Logo */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <Image
            src="/images/logo.jpeg"
            alt="Dawx666 Mascot Logo"
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-display text-2xl tracking-widest text-white mb-1">
          DAWX666 ILLUSTRATIONS
        </h3>
        <p className="text-xs font-semibold uppercase tracking-widest text-cream-300 mb-6">
        ORIGINAL ART & PIXEL GOODS
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
            href="https://www.instagram.com/dawx666?igsh=bHk0MWQ5ZHd5djN6"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.twitch.tv/dawxtriple6ix"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform"
            aria-label="Twitch"
          >
            <Twitch className="w-5 h-5" />
          </a>
          <a
            href="https://pin.it/16qosn7Ao"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform"
            aria-label="Pinterest"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026h.032z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/0741513854"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-red hover:text-white transition-all transform"
            aria-label="WhatsApp"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs tracking-wider text-cream-300/80 font-medium">
          A Project by{" "}
          <a
            href="https://www.dineth-nethsara.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            dinethnethsara
          </a>{" "}
          from{" "}
          <a
            href="https://www.vexelit.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Vexel IT
          </a>
        </p>
      </div>
    </footer>
  );
}
