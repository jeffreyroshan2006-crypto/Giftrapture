"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageGallery({ images, alt, className = "" }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const allImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const prev = useCallback(() => {
    goTo(selectedIndex > 0 ? selectedIndex - 1 : allImages.length - 1);
  }, [selectedIndex, allImages.length, goTo]);

  const next = useCallback(() => {
    goTo(selectedIndex < allImages.length - 1 ? selectedIndex + 1 : 0);
  }, [selectedIndex, allImages.length, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Main Image Viewer */}
      <div
        className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-primary/10 shadow-premium group cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Images */}
        {allImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              idx === selectedIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-[1.02] z-0"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} - Image ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20 pointer-events-none" />

        {/* Image counter badge */}
        {allImages.length > 1 && (
          <div className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-[11px] font-bold tracking-widest">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Navigation Arrows - visible on hover */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-text-main" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-text-main" />
            </button>
          </>
        )}

        {/* Dot indicators at bottom */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 pointer-events-none">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`pointer-events-auto transition-all duration-300 rounded-full ${
                  idx === selectedIndex
                    ? "w-5 h-2 bg-white shadow-md"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - like Myntra/Amazon */}
      {allImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`relative flex-shrink-0 w-[72px] h-[90px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                idx === selectedIndex
                  ? "border-accent-gold shadow-lg ring-2 ring-accent-gold/30 scale-105"
                  : "border-transparent hover:border-text-main/20 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} - Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {/* Active overlay */}
              {idx === selectedIndex && (
                <div className="absolute inset-0 bg-accent-gold/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}