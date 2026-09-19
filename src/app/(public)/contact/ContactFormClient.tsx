"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import confetti from "canvas-confetti";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields marked with *.");
      return;
    }

    setStatus("loading");
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          orderNumber: "",
          message: "",
        });
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ffd2d7", "#ffc72c", "#ffffff"],
        });
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white text-fructus-dark rounded-3xl border-3 border-black p-8 sm:p-12 shadow-retro-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-fructus-pink text-fructus-red border-2 border-black flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-3xl text-fructus-dark tracking-wide">
          Message Received!
        </h3>
        <p className="text-sm font-medium text-muted-foreground max-w-sm mx-auto">
          Thank you for reaching out! We have received your inquiry and will reply to your email shortly.
        </p>
        <div className="pt-2">
          <Button
            variant="default"
            onClick={() => setStatus("idle")}
            className="rounded-full"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 font-bold text-cream-100"
    >
      {/* Name row */}
      <div>
        <label className="block text-sm uppercase tracking-wider mb-1 text-cream-100 font-black">
          Name *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
              className="bg-white text-fructus-dark h-12"
            />
            <span className="text-[11px] text-cream-200 mt-1 block font-medium">
              First Name
            </span>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="bg-white text-fructus-dark h-12"
            />
            <span className="text-[11px] text-cream-200 mt-1 block font-medium">
              Last Name
            </span>
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm uppercase tracking-wider mb-1 text-cream-100 font-black">
          Email *
        </label>
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="bg-white text-fructus-dark h-12"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm uppercase tracking-wider mb-1 text-cream-100 font-black">
          Message *
        </label>
        <Textarea
          placeholder="Write your note, question or commission request here..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
          rows={5}
          className="bg-white text-fructus-dark min-h-[120px]"
        />
      </div>

      {/* Order Number (Optional) */}
      <div>
        <label className="block text-sm uppercase tracking-wider mb-1 text-cream-100 font-black">
          Order Number (Optional)
        </label>
        <Input
          type="text"
          placeholder="DWX-2025-XXXX"
          value={formData.orderNumber}
          onChange={(e) =>
            setFormData({ ...formData, orderNumber: e.target.value })
          }
          className="bg-white text-fructus-dark h-12"
        />
        <span className="text-[11px] text-cream-200 mt-1 block font-medium">
          Please also include your order # if your message regards a shop order!
        </span>
      </div>

      {status === "error" && (
        <p className="text-xs text-fructus-pink font-bold">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="pink"
          size="lg"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-10 rounded-full shadow-retro-sm hover:scale-105 transition-transform"
        >
          {status === "loading" ? "Sending..." : "Send!"}
        </Button>
      </div>
    </form>
  );
}
