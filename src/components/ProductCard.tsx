"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  id: string;
  name: string;
  regularPrice: number;
  salePrice?: number;
  image: string;
  href: string;
  discountPercentage?: number;
}

export default function ProductCard({
  id,
  name,
  regularPrice,
  salePrice,
  image,
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
      image,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col h-full">
      <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4 shrink-0">
        <Link href={href} className="absolute inset-0 z-0 block">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
              <ShoppingBag className="w-12 h-12 text-accent-gold/40" />
            </div>
          )}
          <span className="sr-only">{name}</span>
        </Link>

        <div className="absolute top-4 right-4 z-10">
          <span className="px-4 py-2 bg-text-main text-white text-[9px] font-bold uppercase tracking-[0.3em] rounded-full shadow-lg">
            Customize This Item
          </span>
        </div>
        
        {discountPercentage && (
          <div className="absolute top-4 left-4 bg-accent-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
            -{discountPercentage}%
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 space-y-2">
          <Link
            href="/shop/custom-box"
            className="block text-center w-full bg-accent-gold/90 text-text-main font-bold py-3 rounded-xl hover:bg-accent-gold transition-colors text-xs uppercase tracking-widest"
          >
            Customize This Item
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur text-text-main font-bold py-3 rounded-xl hover:bg-text-main hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center flex-1">
        <Link href={href} className="font-serif text-lg hover:text-accent-gold transition-colors mb-2 line-clamp-2 min-h-[2.8rem]">
          {name}
        </Link>
        <div className="flex items-center gap-3">
          {salePrice ? (
            <>
              <span className="text-soft-gray line-through text-sm">₹{regularPrice}</span>
              <span className="text-text-main font-bold">₹{salePrice}</span>
            </>
          ) : (
            <span className="text-text-main font-bold">₹{regularPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
