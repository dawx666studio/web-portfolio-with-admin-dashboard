import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag } from "lucide-react";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({
  headline = "welcome!",
  subheadline = "shop the new arrivals!",
  ctaText = "Let's Shop!",
  ctaLink = "/shop",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2b2438] via-[#3a284c] to-[#1e1b24] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
      {/* Decorative sticker art collage background overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <Image
          src="/stuff/3.jpg"
          alt="Sticker Art Background Pattern"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
        
        {/* Artist Avatar Circle */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden shadow-retro-lg relative bg-fructus-pink">
            <Image
              src="/images/dewnithlogo.jpg"
              alt="Dawx666 Artist Portrait"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-fructus-gold text-fructus-dark border-2 border-black rounded-full p-2.5 shadow-retro-sm">
            <Sparkles className="w-5 h-5 text-fructus-dark animate-spin" style={{ animationDuration: "8s" }} />
          </div>
        </div>

        {/* Hero Copy & CTA */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-cream-100 drop-shadow-md">
            {headline}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-cream-200 tracking-wide">
            {subheadline}
          </p>

          <div className="pt-2">
            <Button
              asChild
              variant="pink"
              size="lg"
              className="rounded-full shadow-retro hover:scale-105 transition-transform"
            >
              <Link href={ctaLink} className="flex items-center gap-2 text-base font-black">
                <ShoppingBag className="w-5 h-5" />
                <span>{ctaText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
