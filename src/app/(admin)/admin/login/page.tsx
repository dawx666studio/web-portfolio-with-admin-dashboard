"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@dawx666.com");
  const [password, setPassword] = useState("admin123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Use demo credentials below.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1b24] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-cream-50 rounded-3xl border-3 border-black p-8 sm:p-10 shadow-retro-lg space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full border-3 border-black overflow-hidden mx-auto bg-fructus-gold shadow-retro-sm">
            <Image
              src="/images/dewnithlogo.jpg"
              alt="Dawx666 Mascot"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="font-display text-3xl text-fructus-dark tracking-wide">
            DAWX666 ADMIN
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Studio Management Portal
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-fructus-dark mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-11 bg-white text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-fructus-dark mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-11 bg-white text-xs font-bold"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading}
            className="w-full rounded-full shadow-retro font-black"
          >
            {loading ? "Signing in..." : "Sign In to Admin"}
          </Button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-cream-200/80 rounded-2xl border border-black/20 text-xs text-fructus-dark space-y-1">
          <span className="font-black uppercase text-fructus-red flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Demo Credentials:
          </span>
          <p className="font-mono text-[11px]">Email: <strong>admin@dawx666.com</strong></p>
          <p className="font-mono text-[11px]">Password: <strong>admin123456</strong></p>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-fructus-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
