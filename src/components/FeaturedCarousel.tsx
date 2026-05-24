"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface Item {
  id: string;
  name: string;
  price: number;
  tag: string;
  images: string[];
  category?: string;
}

const items: Item[] = [
  {
    id: "bq-6",
    name: "Classic Ranunculus Bouquet",
    price: 2499,
    tag: "Best Seller",
    images: ["/images/bouquets/IMG_3926.png"],
  },
  {
    id: "hm-6",
    name: "Signature Silk Trousseau Box",
    price: 5999,
    tag: "Handcrafted",
    images: ["/images/themed-hampers/IMG_3915.jpg"],
  },
  {
    id: "hm-3",
    name: "Artisanal Chocolate Hamper",
    price: 3250,
    tag: "Indulgent",
    images: ["/images/themed-hampers/IMG_3900.jpg"],
  },
  {
    id: "bq-3",
    name: "Premium Peony Arrangement",
    price: 4799,
    tag: "Limited Edition",
    images: ["/images/bouquets/IMG_3893.jpg"],
  },
  {
    id: "hm-1",
    name: "Royal Celebration Hamper",
    price: 7499,
    tag: "Premium",
    images: ["/images/themed-hampers/IMG_3723.jpg"],
  },
  {
    id: "bq-1",
    name: "Velvet Crimson Rose",
    price: 3499,
    tag: "Bestseller",
    images: ["/images/bouquets/IMG_3893.jpg"],
  },
];

export default function FeaturedCarousel() {
  const { addItem } = useCartStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (e: React.MouseEvent, item: Item) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images[0] || "/images/placeholder.jpg",
      quantity: 1
    });

    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-primary/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent-sage font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Curated for You
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-main tracking-tighter">
            Most Loved <span className="italic font-normal">Creations</span>
          </h2>
        </div>

        {/* Products Grid - Responsive layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-premium hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <span className="absolute top-3 left-3 z-20 px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
                  {item.tag}
                </span>

                <Link href={`/product/${item.id}`} className="block w-full h-full">
                  <Image
                    src={item.images[0] || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick Add Button - Mobile always visible, desktop on hover */}
                <button
                  onClick={(e) => handleQuickAdd(e, item)}
                  className={`absolute bottom-3 left-3 right-3 py-2 md:py-3 bg-white/95 backdrop-blur-md text-text-main font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-[10px] md:text-xs transition-all duration-500 z-30 hover:bg-accent-gold hover:text-text-main ${
                    addedItems[item.id]
                      ? "opacity-100 translate-y-0"
                      : "opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                  }`}
                >
                  <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                  {addedItems[item.id] ? "Added" : "Quick Add"}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm md:text-base font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors line-clamp-2 flex-1">
                    <Link href={`/product/${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
                    <span className="text-[10px] md:text-xs font-bold text-text-main">4.9</span>
                  </div>
                </div>
                <p className="text-sm md:text-base font-sans text-text-main/70 font-bold tracking-tight mt-auto">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}