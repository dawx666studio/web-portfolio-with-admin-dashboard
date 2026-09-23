import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";

export function InstagramGrid() {
  const instaTiles = [
    {
      id: "insta-1",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
      caption: "New sticker drop live on the shop!",
    },
    {
      id: "insta-2",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
      caption: "Studio vibes sketching with coffee",
    },
    {
      id: "insta-3",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
      caption: "Packing anniversary orders!",
    },
    {
      id: "insta-4",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80",
      caption: "iPad Pro color mixing study",
    },
    {
      id: "insta-5",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
      caption: "Adding stickers to my water bottle",
    },
    {
      id: "insta-6",
      image: "/images/Trippie Redd & Charizard.jpg",
      caption: "Pixel art tribute process",
    },
    {
      id: "insta-7",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80",
      caption: "Mini sticker packs ready to ship",
    },
    {
      id: "insta-8",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      caption: "Magical creature sketchbook page",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-wide">
            Find me on Instagram!
          </h2>
          <p className="text-sm font-bold text-muted-foreground mt-1">
            Follow @dawx666 for daily sketchbook peeks, packaging reels, and shop drops
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fructus-red hover:bg-fructus-redDark text-white font-black text-sm transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow @dawx666</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {instaTiles.map((tile) => (
          <a
            key={tile.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-black bg-cream-200 shadow-retro-sm hover:shadow-retro transition-all duration-300"
          >
            <Image
              src={tile.image}
              alt={tile.caption}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-fructus-red/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Instagram className="w-6 h-6 text-white animate-bounce" />
                <span className="text-xs font-bold">{tile.caption}</span>
              </div>
            </div>
          </a>
        ))}
      </div> */}
    </section>
  );
}
