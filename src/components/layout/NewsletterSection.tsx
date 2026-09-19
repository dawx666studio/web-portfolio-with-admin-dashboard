"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setMessage("Yay! You are now subscribed to Dawx666 digital freebies!");
        setEmail("");
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#e61d2b", "#ffd2d7", "#ffc72c", "#ffffff"],
        });
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="bg-[#1e1b24] text-white py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-cream-100 mb-3">
          Stay in the loop!
        </h2>
        <p className="text-sm sm:text-base text-cream-300 font-medium mb-8">
          Signup for digital freebies, special offers, sticker drops, and updates!
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-3 bg-white/10 border-2 border-fructus-pink px-6 py-4 rounded-2xl text-cream-100 font-bold">
            <CheckCircle2 className="w-6 h-6 text-fructus-pink" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-fructus-dark h-13 rounded-full px-6 font-medium border-2 border-white focus-visible:ring-fructus-pink"
            />
            <Button
              type="submit"
              variant="pink"
              size="lg"
              disabled={status === "loading"}
              className="rounded-full shadow-retro-sm whitespace-nowrap"
            >
              {status === "loading" ? (
                "Signing up..."
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Sign Up!
                </span>
              )}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-fructus-pink mt-3 font-semibold">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
