import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { getOrders } from "@/lib/actions/orders";
import { getProducts } from "@/lib/actions/products";
import { getContactMessages } from "@/lib/actions/contact";
import { getSubscribers } from "@/lib/actions/newsletter";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Mail,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [orders, products, messages, subscribers] = await Promise.all([
    getOrders(),
    getProducts(),
    getContactMessages(),
    getSubscribers(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Studio Dashboard"
        description="Welcome back, Dewnith! Here is a summary of your shop activity, orders, and messages."
        actionLabel="New Product"
        actionHref="/admin/products/new"
      />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="All-time sales"
          icon={DollarSign}
          trend="+24.5%"
          trendPositive={true}
        />
        <StatsCard
          title="Active Orders"
          value={orders.length}
          description="Orders to fulfill"
          icon={ShoppingCart}
          trend="2 Pending"
          trendPositive={true}
        />
        <StatsCard
          title="Live Products"
          value={products.length}
          description="Catalog items"
          icon={Package}
          trend="In Stock"
          trendPositive={true}
        />
        <StatsCard
          title="Subscribers"
          value={subscribers.length}
          description={`${unreadMessages} unread messages`}
          icon={Users}
          trend="Active"
          trendPositive={true}
        />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products/new"
          className="p-6 bg-white rounded-3xl border-2 border-black/80 shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-2xl bg-fructus-pink text-fructus-red">
              <Plus className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-fructus-red transition-colors" />
          </div>
          <h3 className="font-display text-xl text-fructus-dark">Add New Product</h3>
          <p className="text-xs text-muted-foreground mt-1">Upload new sticker, pixel print, or stationery merchandise</p>
        </Link>

        <Link
          href="/admin/blog/new"
          className="p-6 bg-white rounded-3xl border-2 border-black/80 shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-2xl bg-fructus-gold text-fructus-dark">
              <Sparkles className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-fructus-red transition-colors" />
          </div>
          <h3 className="font-display text-xl text-fructus-dark">Write Blog Post</h3>
          <p className="text-xs text-muted-foreground mt-1">Publish studio stories, tutorials, and art drop announcements</p>
        </Link>

        <Link
          href="/admin/settings"
          className="p-6 bg-white rounded-3xl border-2 border-black/80 shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2.5 rounded-2xl bg-cream-200 text-fructus-dark">
              <Mail className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-fructus-red transition-colors" />
          </div>
          <h3 className="font-display text-xl text-fructus-dark">Store Settings</h3>
          <p className="text-xs text-muted-foreground mt-1">Update top banner announcement text, bio, and social media links</p>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-fructus-dark tracking-wide">
            Recent Orders
          </h2>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link href="/admin/orders">View All Orders</Link>
          </Button>
        </div>

        <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-100 text-xs font-black uppercase tracking-wider text-fructus-dark">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-fructus-red">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="p-4 font-bold">{order.customerName}</td>
                  <td className="p-4 text-xs text-muted-foreground">
                    {order.items.map((i) => `${i.quantity}x ${i.productTitle}`).join(", ")}
                  </td>
                  <td className="p-4 font-black">{formatCurrency(order.total)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-cream-200 text-fructus-dark text-xs font-black uppercase border border-black/20">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
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
