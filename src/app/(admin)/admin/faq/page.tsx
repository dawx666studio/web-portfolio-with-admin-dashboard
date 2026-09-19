import { AdminHeader } from "@/components/admin/AdminHeader";
import { getFaqs } from "@/lib/actions/faq";
import { FaqManagerClient } from "./FaqManagerClient";

export const revalidate = 0;

export default async function AdminFaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="space-y-8 max-w-5xl">
      <AdminHeader
        title="FAQ Manager"
        description="Add, edit, and organize frequently asked questions across Shipping, Returns, General, and Materials."
      />

      <FaqManagerClient initialFaqs={faqs} />
    </div>
  );
}
