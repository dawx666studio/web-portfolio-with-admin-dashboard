"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Link2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImageToSupabase } from "@/lib/actions/upload";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({
  value = [],
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [customUrl, setCustomUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAddUrl = () => {
    if (!customUrl) return;
    if (value.length < maxImages) {
      onChange([...value, customUrl]);
      setCustomUrl("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImageToSupabase(formData);
    
    if (result.success && result.url) {
      if (value.length < maxImages) {
        onChange([...value, result.url]);
      }
    } else {
      alert(result.error || "Failed to upload image.");
    }
    setUploading(false);
    setShowUrlInput(false);
  };

  // Sample presets for quick testing
  const presets = [
    "/images/Trippie Redd & Charizard.jpg",
    "/images/Ash & Charizard_.jpg",
    "/images/Landing Page.jpg",
    "/images/Shop Page.jpg",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="space-y-4">
      {/* Current Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {value.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black bg-cream-100 group shadow-retro-sm"
          >
            <Image
              src={url}
              alt={`Uploaded ${idx + 1}`}
              fill
              className="object-cover"
            />
            {idx === 0 && (
              <span className="absolute top-2 left-2 bg-fructus-gold text-fructus-dark text-[10px] font-black px-2 py-0.5 rounded-md border border-black">
                PRIMARY
              </span>
            )}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 p-1.5 bg-fructus-red text-white rounded-full opacity-90 group-hover:opacity-100 shadow-retro-sm hover:scale-110 transition-transform"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <div
            onClick={() => setShowUrlInput(true)}
            className="aspect-square rounded-2xl border-2 border-dashed border-black/40 hover:border-fructus-red bg-cream-100/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-cream-100 transition-all group"
          >
            <div className="p-3 rounded-full bg-cream-200 text-fructus-dark group-hover:bg-fructus-red group-hover:text-white transition-colors mb-2">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-fructus-dark">
              Add Photo / Art
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              URL or Preset
            </span>
          </div>
        )}
      </div>

      {/* URL or Preset selector modal/drawer */}
      {showUrlInput && (
        <div className="p-4 rounded-2xl border-2 border-black bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-fructus-dark">
              Enter Image URL or Pick Artwork
            </span>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-muted-foreground hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-2 border-black border-dashed bg-cream-100 hover:bg-cream-200"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                ) : (
                  <><ImageIcon className="w-4 h-4" /> Upload from Computer</>
                )}
              </Button>
            </div>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-black/20"></div>
              <span className="flex-shrink-0 mx-2 text-xs text-muted-foreground uppercase font-bold">Or</span>
              <div className="flex-grow border-t border-black/20"></div>
            </div>

            <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="h-10 text-xs"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddUrl}
              className="rounded-xl px-4 text-xs font-bold"
            >
              Add URL
            </Button>
          </div>
          </div>

          <div className="pt-2 border-t border-black/10">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Quick Artwork Presets:
            </span>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {presets.map((preset, pIdx) => (
                <button
                  type="button"
                  key={pIdx}
                  onClick={() => {
                    onChange([...value, preset]);
                    setShowUrlInput(false);
                  }}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cream-200 hover:bg-fructus-pink hover:text-fructus-red border border-black/20 transition-colors"
                >
                  Preset {pIdx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
