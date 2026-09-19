import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSiteSettings } from "@/lib/actions/settings";
import { SettingsFormClient } from "./SettingsFormClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 max-w-4xl">
      <AdminHeader
        title="Store & Brand Settings"
        description="Configure top announcement bar text, homepage hero banner, bio, and social channels."
      />

      <SettingsFormClient initialSettings={settings} />
    </div>
  );
}

