"use client";

import { useState } from "react";
import { ContactMessageItem } from "@/lib/types";
import { markMessageRead } from "@/lib/actions/contact";
import { formatDate } from "@/lib/utils";
import { Mail, Check, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessagesInboxClient({
  initialMessages,
}: {
  initialMessages: ContactMessageItem[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  const toggleRead = async (id: string, currentRead: boolean) => {
    const nextRead = !currentRead;
    try {
      await markMessageRead(id, nextRead);
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, isRead: nextRead } : m))
      );
    } catch {
      alert("Failed to update message status.");
    }
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border-2 border-black/80">
          <p className="text-muted-foreground font-bold">No messages in your inbox.</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-3xl border-2 border-black/80 transition-all ${
              msg.isRead ? "bg-white shadow-retro-sm opacity-80" : "bg-cream-100 shadow-retro"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl ${
                    msg.isRead ? "bg-cream-200 text-muted-foreground" : "bg-fructus-pink text-fructus-red"
                  }`}
                >
                  {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-fructus-dark">
                    {msg.firstName} {msg.lastName || ""}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    &lt;{msg.email}&gt;
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {msg.orderNumber && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cream-200 text-xs font-mono font-bold border border-black/20">
                    Order: {msg.orderNumber}
                  </span>
                )}
                <span className="text-xs text-muted-foreground font-bold">
                  {formatDate(msg.createdAt)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRead(msg.id, msg.isRead)}
                  className="h-8 text-xs font-bold rounded-full px-3"
                >
                  {msg.isRead ? "Mark Unread" : "Mark as Read"}
                </Button>
              </div>
            </div>

            <p className="text-sm text-fructus-dark/90 font-medium whitespace-pre-line leading-relaxed pl-1 sm:pl-10">
              {msg.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
