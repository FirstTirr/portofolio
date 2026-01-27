"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/app/lib/upload-action";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  label?: string;
}

export function ImageUpload({
  name,
  defaultValue = "",
  label = "Image URL",
}: ImageUploadProps) {
  const [preview, setPreview] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    // Create local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadImage(formData);
      setPreview(url);
    } catch (error) {
      console.error("Upload failed", error);
      let errorMessage = "Upload failed. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please try again or use a URL.";
      }
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const clearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview("");
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`hover:underline ${mode === "upload" ? "font-bold text-primary" : "text-muted-foreground"}`}
          >
            Upload
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`hover:underline ${mode === "url" ? "font-bold text-primary" : "text-muted-foreground"}`}
          >
            URL
          </button>
        </div>
      </div>

      {/* Hidden Input for Form Submission */}
      <input type="hidden" name={name} value={preview} />

      {mode === "url" ? (
        <Input
          placeholder="https://example.com/image.png"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
      ) : (
        <div
          {...getRootProps()}
          className={`
                        border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
                        ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
                        ${preview ? "p-2" : "p-6"}
                    `}
        >
          <input {...getInputProps()} />

          {preview ? (
            <div className="relative w-full aspect-video rounded-md overflow-hidden group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-medium">
                  Click or drop to replace
                </p>
              </div>
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors z-10"
              >
                <X size={16} />
              </button>
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-2 text-muted-foreground">
              <div className="p-3 bg-secondary rounded-full inline-block">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop image here, or click to select"}
              </p>
              <p className="text-xs text-muted-foreground/70">
                Supports: JPG, PNG, GIF (Max 4MB)
              </p>
            </div>
          )}
        </div>
      )}
      {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
    </div>
  );
}
