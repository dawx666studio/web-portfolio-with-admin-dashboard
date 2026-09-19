"use server";

import { createClient } from "@supabase/supabase-js";

export async function uploadImageToSupabase(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return { 
        success: false, 
        error: "Supabase configuration is missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file." 
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return { 
      success: true, 
      url: publicUrlData.publicUrl 
    };
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}
