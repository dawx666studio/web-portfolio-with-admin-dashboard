import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Dawx666 — Illustration Art, Pixel Art & Shop",
  description: "Official online store and portfolio of freelancer and illustrator Dawx666 (Dewnith). Shop stickers, art prints, buttons, stationery, and explore original pixel art illustration.",
  keywords: ["Dawx666", "Dewnith", "Illustration", "Stickers", "Pixel Art", "Art Prints", "Merchandise", "Portfolio"],
  icons: {
    icon: "/images/dewnithlogo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#fef8ed] antialiased font-sans ${jakartaSans.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
