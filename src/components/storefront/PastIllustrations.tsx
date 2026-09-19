import Image from "next/image";
const INITIAL_PAST_ILLUSTRATIONS = [
  {
    id: "past-1",
    title: "Animegurl",
    image: "/images/illustrations/animegurl.jpg.jpeg",
  },
  {
    id: "past-2",
    title: "Eyes Closed",
    image: "/images/illustrations/eyes-closed.jpg.jpeg",
  },
  {
    id: "past-3",
    title: "Jay Don",
    image: "/images/illustrations/jay-don.jpg.jpeg",
  },
  {
    id: "past-4",
    title: "Juice Road",
    image: "/images/illustrations/juice-road.jpg.jpeg",
  },
  {
    id: "past-5",
    title: "Travis and Stormi",
    image: "/images/illustrations/travis-and-stromi.jpg.jpeg",
  },
  {
    id: "past-6",
    title: "Uzi Love",
    image: "/images/illustrations/uzi-love.jpg.jpeg",
  },
];

export function PastIllustrations() {
  return (
    <section className="bg-fructus-red text-white py-16 border-y-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-white drop-shadow-sm mb-2">
            stay a while
          </h2>
          <p className="text-base sm:text-lg text-cream-100 font-bold">
            Browse my past illustrations & pixel art
          </p>
        </div>
      </div>

      {/* Gallery Slider (Full screen width) */}
      <div className="relative w-full overflow-hidden py-4 mt-4">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[...INITIAL_PAST_ILLUSTRATIONS, ...INITIAL_PAST_ILLUSTRATIONS].map((art, idx) => (
              <div
                key={`${art.id}-${idx}`}
                className="group relative h-56 sm:h-72 md:h-96 w-auto flex-shrink-0 flex items-center justify-center overflow-hidden cursor-pointer"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Subtle hover caption */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                  <span className="text-sm sm:text-base md:text-lg font-black text-fructus-gold line-clamp-1 mb-1">
                    {art.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
