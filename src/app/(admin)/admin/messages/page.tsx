import { AdminHeader } from "@/components/admin/AdminHeader";
import { getContactMessages } from "@/lib/actions/contact";
import { formatDate } from "@/lib/utils";
import { Mail, CheckCircle2, MessageSquare, Clock } from "lucide-react";
import { MessagesInboxClient } from "./MessagesInboxClient";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-8 max-w-5xl">
      <AdminHeader
        title="Contact Form Inquiries"
        description="Read messages, custom commission requests, and order inquiries sent via the storefront."
      />

      <MessagesInboxClient initialMessages={messages} />
    </div>
  );
}

