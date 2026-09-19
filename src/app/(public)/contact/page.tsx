import { ContactFormClient } from "./ContactFormClient";
import { Youtube, Instagram, Twitter, Mail, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-fructus-red text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-fructus-gold" />
            <span>Say Hello</span>
          </div> */}

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide uppercase">
            Get In Touch.
          </h1>

          <p className="text-base sm:text-lg text-cream-100 font-medium leading-relaxed">
            Please do not hesitate to contact me with questions, inquiries, commission ideas, or anything else that comes to mind! I&apos;d love to hear from you!
          </p>

          <div className="pt-4 flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-pink hover:text-fructus-red transition-all transform hover:-translate-y-1 shadow-retro-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-pink hover:text-fructus-red transition-all transform hover:-translate-y-1 shadow-retro-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-cream-100 text-fructus-dark hover:bg-fructus-pink hover:text-fructus-red transition-all transform hover:-translate-y-1 shadow-retro-sm"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Contact Form Column */}
        <div className="lg:col-span-7">
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}
