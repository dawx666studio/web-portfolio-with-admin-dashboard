"use client";

import { useState } from "react";
import { OrderItemRecord } from "@/lib/types";
import { updateOrderStatus } from "@/lib/actions/orders";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Truck } from "lucide-react";

export function OrderStatusUpdater({ order }: { order: OrderItemRecord }) {
  const [status, setStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateOrderStatus(order.id, status, trackingNumber);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border-2 border-black/80 shadow-retro-sm">
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className="h-10 text-xs font-bold w-36"
      >
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </Select>

      <Input
        type="text"
        placeholder="Tracking # (USPS)"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="h-10 text-xs font-mono w-44"
      />

      <Button
        size="sm"
        onClick={handleUpdate}
        disabled={loading}
        className="h-10 rounded-xl px-4 text-xs font-bold"
      >
        {saved ? <Check className="w-4 h-4" /> : "Save Status"}
      </Button>
    </div>
  );
}
