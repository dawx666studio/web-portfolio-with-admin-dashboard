import { AdminHeader } from "@/components/admin/AdminHeader";
import { getOrders } from "@/lib/actions/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Eye, Package, CheckCircle2, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PROCESSING":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-cream-200 text-fructus-dark border-black/20";
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Customer Orders"
        description="Fulfill sticker orders, add tracking numbers, and view customer shipment details."
      />

      <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-100 text-xs font-black uppercase tracking-wider text-fructus-dark">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tracking</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-fructus-red">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>

                  <td className="p-4">
                    <div className="font-bold">{order.customerName}</div>
                    <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </span>
                  </td>

                  <td className="p-4 font-black">{formatCurrency(order.total)}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    {order.trackingNumber || "—"}
                  </td>

                  <td className="p-4 text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" asChild className="p-2 h-9 w-9">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
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
