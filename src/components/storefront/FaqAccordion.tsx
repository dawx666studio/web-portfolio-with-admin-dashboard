import { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryFaqs = faqs.filter((f) => f.category === category);
        return (
          <div key={category} className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide border-b-2 border-white/20 pb-2">
              {category}
            </h2>

            <div className="space-y-4 pt-2">
              {categoryFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden p-5 space-y-2"
                >
                  <h3 className="font-bold text-lg sm:text-xl text-white">
                    {faq.question}
                  </h3>
                  <div className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
