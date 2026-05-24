"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageGallery({ images, alt, className = "" }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className={`relative aspect-[4/5] bg-primary/20 rounded-2xl overflow-hidden flex items-center justify-center ${className}`}>
        <div className="w-12 h-12 text-accent-gold/40" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${className}`}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
        />
        {selectedIndex === 0 && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-accent-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
            Main
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
        />
        <span className="absolute top-2 left-2 px-2 py-1 bg-accent-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
          {selectedIndex + 1} / {images.length}
        </span>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => prev > 0 ? prev - 1 : images.length - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-text-main" />
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => prev < images.length - 1 ? prev + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-text-main" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto py-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? "border-accent-gold shadow-lg scale-105"
                : "border-text-main/10 hover:border-accent-gold/50"
            }`}
          >
            <Image
              src={image}
              alt={`${alt} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}