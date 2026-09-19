"use client";

import { useState } from "react";
import { SiteSettingsData } from "@/lib/types";
import { updateSiteSettings } from "@/lib/actions/settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Check, Sparkles } from "lucide-react";

export function SettingsFormClient({
  initialSettings,
}: {
  initialSettings: SiteSettingsData;
}) {
  const [formData, setFormData] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateSiteSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Announcement Bar Settings */}
      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-4">
        <h3 className="font-display text-2xl text-fructus-dark tracking-wide">
          Announcement Bar
        </h3>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-1">
            Top Banner Message Text
          </label>
          <Input
            type="text"
            value={formData.announcementText}
            onChange={(e) =>
              setFormData({ ...formData, announcementText: e.target.value })
            }
            className="h-11 font-bold"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold pt-2">
          <input
            type="checkbox"
            checked={formData.announcementActive}
            onChange={(e) =>
              setFormData({ ...formData, announcementActive: e.target.checked })
            }
            className="rounded border-black text-fructus-red focus:ring-fructus-red w-4 h-4"
          />
          <span>Enable Announcement Banner on Top of Store</span>
        </label>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-4">
        <h3 className="font-display text-2xl text-fructus-dark tracking-wide">
          Homepage Hero Banner
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Headline
            </label>
            <Input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) =>
                setFormData({ ...formData, heroHeadline: e.target.value })
              }
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Subheadline
            </label>
            <Input
              type="text"
              value={formData.heroSubheadline}
              onChange={(e) =>
                setFormData({ ...formData, heroSubheadline: e.target.value })
              }
              className="h-11 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              CTA Button Text
            </label>
            <Input
              type="text"
              value={formData.heroCtaText}
              onChange={(e) =>
                setFormData({ ...formData, heroCtaText: e.target.value })
              }
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              CTA Button Link
            </label>
            <Input
              type="text"
              value={formData.heroCtaLink}
              onChange={(e) =>
                setFormData({ ...formData, heroCtaLink: e.target.value })
              }
              className="h-11 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Artist Bio Section */}
      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-4">
        <h3 className="font-display text-2xl text-fructus-dark tracking-wide">
          About & Artist Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Artist Name
            </label>
            <Input
              type="text"
              value={formData.artistName}
              onChange={(e) =>
                setFormData({ ...formData, artistName: e.target.value })
              }
              className="h-11 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Bio Headline
            </label>
            <Input
              type="text"
              value={formData.bioHeadline}
              onChange={(e) =>
                setFormData({ ...formData, bioHeadline: e.target.value })
              }
              className="h-11 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-1">
            Bio Story (Paragraph 1)
          </label>
          <Textarea
            value={formData.bioParagraph1}
            onChange={(e) =>
              setFormData({ ...formData, bioParagraph1: e.target.value })
            }
            rows={3}
            className="font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider mb-1">
            Art Style & Process (Paragraph 2)
          </label>
          <Textarea
            value={formData.bioParagraph2}
            onChange={(e) =>
              setFormData({ ...formData, bioParagraph2: e.target.value })
            }
            rows={3}
            className="font-medium"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-3xl border-3 border-black p-6 sm:p-8 shadow-retro space-y-4">
        <h3 className="font-display text-2xl text-fructus-dark tracking-wide">
          Social Media & Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Instagram URL
            </label>
            <Input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) =>
                setFormData({ ...formData, instagramUrl: e.target.value })
              }
              className="h-10 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              TikTok URL
            </label>
            <Input
              type="url"
              value={formData.tiktokUrl}
              onChange={(e) =>
                setFormData({ ...formData, tiktokUrl: e.target.value })
              }
              className="h-10 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Twitter / X URL
            </label>
            <Input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) =>
                setFormData({ ...formData, twitterUrl: e.target.value })
              }
              className="h-10 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Contact Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-10 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={loading}
          className="rounded-full font-black px-10 shadow-retro"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> Settings Saved!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-5 h-5" /> Save All Settings
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
