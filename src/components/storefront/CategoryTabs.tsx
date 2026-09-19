import Link from "next/link";
import Image from "next/image";

export function CategoryTabs() {
  const categories = [
    {
      title: "SHOP STICKERS",
      href: "/shop?category=stickers",
      image: "/images/illustrations/uzi-love.jpg.jpeg",
      bgColor: "bg-fructus-pink",
    },
    {
      title: "SHOP PRINTS",
      href: "/shop?category=prints",
      image: "/images/illustrations/juice-road.jpg.jpeg",
      bgColor: "bg-fructus-gold",
    },
    {
      title: "SHOP ALL",
      href: "/shop",
      image: "/images/illustrations/animegurl.jpg.jpeg",
      bgColor: "bg-cream-300",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group flex flex-col items-center"
          >
            <div className="relative w-3/4 aspect-[4/5] rounded-2xl overflow-hidden border-3 border-black group-hover:-translate-y-1 transition-all duration-300 bg-white">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-fructus-dark mt-4 group-hover:text-fructus-red transition-colors text-center">
              {cat.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
