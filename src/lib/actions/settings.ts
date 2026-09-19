"use server";

import { prisma } from "@/lib/prisma";
import { SiteSettingsData } from "@/lib/types";
import { SiteSettingsFormValues } from "@/lib/validators/faq";
import { revalidatePath } from "next/cache";

const DEFAULT_SETTINGS: SiteSettingsData = {
  announcementText: "Welcome to Dawx666 Art Store!",
  announcementActive: false,
  heroHeadline: "welcome!",
  heroSubheadline: "shop the new arrivals & original illustrations!",
  heroCtaText: "Let's Shop!",
  heroCtaLink: "/shop",
  artistName: "Dewnith (Dawx666)",
  artistTitle: "Illustrator, Pixel Artist & Merchandise Designer",
  bioHeadline: "Hello!",
  bioParagraph1: "Welcome to my store.",
  bioParagraph2: "Here is my story.",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  tiktokUrl: "https://tiktok.com",
  youtubeUrl: "https://youtube.com",
  email: "hello@dawx666.com",
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const config: any = { ...DEFAULT_SETTINGS };
    for (const item of settings) {
      if (item.key === "announcementActive") {
        config[item.key] = item.value === "true";
      } else {
        config[item.key] = item.value;
      }
    }
    return config;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSiteSettings(data: Partial<SiteSettingsFormValues>) {
  try {
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
