import { getFaqs } from "@/lib/actions/faq";
import { FaqAccordion } from "@/components/storefront/FaqAccordion";
import { HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="bg-fructus-red text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">

          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-cream-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Everything you need to know about order processing, shipping times, international VAT, returns, and illustration materials!
          </p>
        </div>

        {/* Faq Accordion List */}
        <FaqAccordion faqs={faqs} />

        {/* Still Have Questions Box */}
        <div className="bg-cream-100 text-fructus-dark rounded-3xl p-8 sm:p-10 text-center space-y-4 mt-16">
          <h3 className="font-display text-2xl sm:text-3xl tracking-wide">
            Still Have Questions?
          </h3>
          <p className="text-sm font-medium text-muted-foreground max-w-md mx-auto">
            Can&apos;t find what you are looking for? Reach out directly and we will get back to you within 24 hours.
          </p>
          <div className="pt-2">
            <Button variant="default" size="lg" asChild className="rounded-full">
              <Link href="/contact" className="flex items-center gap-2 font-black">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
