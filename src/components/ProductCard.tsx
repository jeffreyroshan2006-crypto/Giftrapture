"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  id: string;
  name: string;
  regularPrice: number;
  salePrice?: number;
  images: string[];
  relations: string[];
  href: string;
  discountPercentage?: number;
}

export default function ProductCard({
  id,
  name,
  regularPrice,
  salePrice,
  images,
  relations,
  href,
  discountPercentage,
}: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name,
      price: salePrice || regularPrice,
      image: images[0] || "/images/placeholder.jpg",
      quantity: 1,
    });
  };

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
        
        {/* Tag */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 z-20">
            <span className="px-2 py-1 bg-red-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-full">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-white text-text-main font-bold rounded-lg shadow-md hover:bg-accent-gold transition-all duration-300 flex items-center justify-center gap-1 text-[10px] uppercase tracking-widest"
          >
            <ShoppingBag className="w-3 h-3" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
          <Link href={href}>{name}</Link>
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-accent-gold">
            ₹{salePrice || regularPrice}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
            <span className="text-[10px] font-bold text-soft-gray">5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}