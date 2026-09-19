import Image from "next/image";
import { getSiteSettings } from "@/lib/actions/settings";
import { InstagramGrid } from "@/components/storefront/InstagramGrid";
import { Sparkles, Heart, Palette, Paintbrush } from "lucide-react";

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-16">
      {/* Hero Red Banner Section */}
      <section className="bg-fructus-red text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Arch framed artist portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-full overflow-hidden border-4 border-white bg-fructus-pink">
              <Image
                src="/images/dewnithlogo.jpg"
                alt={settings.artistName}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6 text-cream-100">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-fructus-gold" />
              <span>Meet the Artist</span>
            </div> */}

            <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide uppercase">
              {settings.bioHeadline}
            </h1>

            <div className="space-y-4 text-base sm:text-lg font-medium leading-relaxed">
              <p>{settings.bioParagraph1}</p>
              <p>{settings.bioParagraph2}</p>
              <p>
                Currently, I mainly work digitally on my iPad Pro using Procreate, Apple Pencil, and Aseprite for pixel art. When I dive into traditional mediums, my favorites include acrylic gouache, colored pencils, and bold paint markers!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Corner Peek */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-fructus-dark tracking-wide mb-3">
              A Peek into the Studio Corner
            </h2>
            <p className="text-sm sm:text-base font-bold text-muted-foreground">
              Here is where all the magic happens! A cozy desk filled with sketchbooks, sticker sheets, anime figurines, and endless cup of iced matcha.
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/studio.jpg"
              alt="Dawx666 Art Workspace Studio"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white flex flex-col items-center">
              <div className="p-3 rounded-full bg-fructus-pink text-fructus-red mb-2">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg text-fructus-dark">Original Characters</h3>
              <p className="text-xs text-muted-foreground mt-1">Playful mascots, pokemon tributes, and cute animals</p>
            </div>

            <div className="p-4 rounded-2xl bg-white flex flex-col items-center">
              <div className="p-3 rounded-full bg-fructus-gold text-fructus-dark mb-2">
                <Paintbrush className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg text-fructus-dark">8-Bit Pixel Art</h3>
              <p className="text-xs text-muted-foreground mt-1">Hand-placed pixels inspired by retro game classics</p>
            </div>

            <div className="p-4 rounded-2xl bg-white flex flex-col items-center">
              <div className="p-3 rounded-full bg-cream-200 text-fructus-red mb-2">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg text-fructus-dark">Eco-Minded Goods</h3>
              <p className="text-xs text-muted-foreground mt-1">Recyclable backing boards & plastic-free packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Grid */}
      <InstagramGrid />
    </div>
  );
}
