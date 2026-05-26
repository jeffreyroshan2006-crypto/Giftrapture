"use client";

import Image from "next/image";
import Link from "next/link";


interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  strikePrice?: number;
  images: string[];
  relations: string[];
  href: string;
  tag?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  strikePrice,
  images,
  relations,
  href,
  tag,
}: ProductCardProps) {

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
        <div className="relative w-full h-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-full scroll-smooth">
            {images.length > 0 ? (
              images.map((img, idx) => (
                <Link key={idx} href={href} className="min-w-full h-full relative snap-start shrink-0 block">
                  <Image
                    src={img}
                    alt={`${name} - Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))
            ) : (
              <Link href={href} className="min-w-full h-full relative snap-start shrink-0 block">
                <Image
                  src="/images/placeholder.jpg"
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            )}
          </div>
          
          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
              ))}
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        



      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
          <Link href={href}>{name}</Link>
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 flex-wrap">
            {strikePrice && strikePrice > price && (
              <>
                <span className="text-xs font-sans text-soft-gray line-through decoration-red-400">
                  ₹{strikePrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                  {Math.round(((strikePrice - price) / strikePrice) * 100)}% OFF
                </span>
              </>
            )}
            <span className="text-sm font-bold text-accent-gold">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}