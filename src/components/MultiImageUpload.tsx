"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ImageIcon, Plus, Loader2 } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  singleImage?: boolean;
}

export default function MultiImageUpload({
  images,
  onChange,
  maxImages = 10,
  singleImage = false,
}: MultiImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return null;
    }

    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `product-images/${fileName}`;
      const supabaseClient = getSupabaseClient();

      const { error } = await supabaseClient.storage
        .from("products")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload failed:", error);
        return null;
      }

      const { data } = supabaseClient.storage
        .from("products")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    if (singleImage && images.length >= 1) return;
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        onChange([...images, url]);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (singleImage) {
          await handleImageUpload(e.dataTransfer.files[0]);
        } else {
          const files = Array.from(e.dataTransfer.files).filter((file) =>
            file.type.startsWith("image/")
          );
          for (const file of files) {
            if (images.length >= maxImages) break;
            await handleImageUpload(file);
          }
        }
      }
    },
    [images, maxImages, singleImage]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const reorderImages = (dragIndex: number, dropIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, removed);
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      {/* Image Grid */}
      {images.length > 0 && !singleImage && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={img + index}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", index.toString());
                (e.currentTarget as HTMLElement).style.opacity = "0.5";
              }}
              onDragEnd={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                if (!isNaN(dragIndex) && dragIndex !== index) {
                  reorderImages(dragIndex, index);
                }
              }}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-text-main/10 bg-white cursor-move"
            >
              <Image
                src={img}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:scale-110 transition-all"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
              {/* First image badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-accent-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                  Main
                </span>
              )}
              {/* Drag indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold uppercase tracking-widest">
                  Drag to Reorder
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Single Image Display */}
      {singleImage && images.length > 0 && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <Image src={images[0]} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange([])}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      {(!singleImage || images.length === 0) && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
            dragActive
              ? "border-accent-gold bg-accent-gold/5"
              : "border-text-main/10 bg-white"
          }`}
        >
          <div className="space-y-3">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-accent-gold mx-auto animate-spin" />
            ) : (
              <ImageIcon className="w-8 h-8 text-soft-gray/40 mx-auto" />
            )}
            <div className="text-sm text-soft-gray">
              <span className="text-accent-gold font-bold">
                {uploading ? "Uploading..." : "Click to upload"}
              </span>{" "}
              {singleImage ? "an image" : "or drag and drop"}
            </div>
            {!singleImage && (
              <p className="text-xs text-soft-gray/50">
                SVG, PNG, JPG or WebP (Max 5MB each). Drag to reorder. First
                image is the main image.
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple={!singleImage}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                if (singleImage) {
                  handleImageUpload(e.target.files[0]);
                } else {
                  const files = Array.from(e.target.files);
                  for (const file of files) {
                    if (images.length >= maxImages) break;
                    if (file.type.startsWith("image/")) {
                      handleImageUpload(file);
                    }
                  }
                }
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
        </div>
      )}

      {/* Add More Button */}
      {!singleImage && images.length > 0 && images.length < maxImages && !uploading && (
        <label className="w-full py-3 border-2 border-dashed border-text-main/10 rounded-xl text-soft-gray text-sm font-medium hover:border-accent-gold/30 hover:text-accent-gold transition-all flex items-center justify-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> Add More Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const files = Array.from(e.target.files);
                for (const file of files) {
                  if (images.length >= maxImages) break;
                  if (file.type.startsWith("image/")) {
                    handleImageUpload(file);
                  }
                }
              }
            }}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
