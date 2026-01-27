"use server";

import { put } from "@vercel/blob";

export async function uploadImage(formData: FormData) {
  const imageFile = formData.get("file") as File;

  if (!imageFile) {
    throw new Error("No file stored");
  }

  // Create a safe filename with timestamp to avoid collisions
  const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;

  try {
    const blob = await put(filename, imageFile, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  } catch (error) {
    console.error("Vercel Blob Upload Error:", error);
    throw new Error("Failed to upload image. Check BLOB_READ_WRITE_TOKEN.");
  }
}
