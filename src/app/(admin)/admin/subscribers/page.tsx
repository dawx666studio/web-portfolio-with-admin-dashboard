import { AdminHeader } from "@/components/admin/AdminHeader";
import { getSubscribers } from "@/lib/actions/newsletter";
import { formatDate } from "@/lib/utils";
import { Users, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="space-y-8 max-w-5xl">
      <AdminHeader
        title="Newsletter Subscribers"
        description="View and export email addresses collected via the 'Stay in the loop!' storefront section."
      />

      <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
        <div className="p-4 bg-cream-100 border-b-2 border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-fructus-red" />
            <span className="font-display text-lg text-fructus-dark">
              Total Active Subscribers: {subscribers.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-50 text-xs font-black uppercase tracking-wider text-fructus-dark">
                <th className="p-4">Subscriber Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="p-4 font-bold text-fructus-dark flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{sub.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">
                    {formatDate(sub.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
