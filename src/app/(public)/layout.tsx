import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { getSiteSettings } from "@/lib/actions/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#fef8ed] text-fructus-dark selection:bg-fructus-pink selection:text-fructus-red">
      <AnnouncementBar
        text={settings.announcementText}
        active={settings.announcementActive}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <NewsletterSection />
      <Footer />
      <CartDrawer />
    </div>
  );
}
