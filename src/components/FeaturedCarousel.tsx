"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const items = [
  {
    id: "bq-6",
    name: "Classic Ranunculus Bouquet",
    price: "₹ 2,499",
    tag: "Best Seller",
    image: "/images/bouquets/IMG_3926.png",
  },
  {
    id: "hm-6",
    name: "Signature Silk Trousseau Box",
    price: "₹ 5,999",
    tag: "Handcrafted",
    image: "/images/themed-hampers/IMG_3915.jpg",
  },
  {
    id: "hm-3",
    name: "Artisanal Chocolate Hamper",
    price: "₹ 3,250",
    tag: "Indulgent",
    image: "/images/themed-hampers/IMG_3900.jpg",
  },
  {
    id: "bq-3",
    name: "Premium Peony Arrangement",
    price: "₹ 4,799",
    tag: "Limited Edition",
    image: "/images/bouquets/IMG_3893.jpg",
  },
];

export default function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ""), 10);
    addItem({
      id: item.id,
      name: item.name,
      price: priceNumber,
      image: item.image,
      quantity: 1
    });

    setSuccessMsg(`Added ${item.name} to bag!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <section className="py-24 bg-primary/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 px-2">
          <div>
            <span className="text-accent-sage font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
              Curated for You
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main tracking-tighter shadow-sm">
              Most Loved <span className="italic font-normal">Creations</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center text-text-main hover:bg-white hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center text-text-main hover:bg-white hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global mini success toast */}
        <AnimatePresence>
          {successMsg && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-text-main text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold shadow-2xl flex items-center gap-2 border border-white/10 animate-fade-in-up">
              <ShoppingBag className="w-3.5 h-3.5 text-accent-gold" />
              <span>{successMsg}</span>
            </div>
          )}
        </AnimatePresence>

        <div
          ref={scrollRef}
          className="flex space-x-4 md:space-x-8 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2"
        >
          {items.map((item, index) => (
            <div
              key={item.name}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] snap-start"
            >
              <Link href={`/product/${item.id}`} className="group relative rounded-3xl overflow-hidden bg-white shadow-premium p-4 md:p-6 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/70 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main">
                    {item.tag}
                  </span>

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Quick Add Overlay - Responsive */}
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-md text-text-main font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs md:text-sm md:opacity-0 md:translate-y-12 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 z-30 hover:bg-accent-gold transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Quick Add
                  </button>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl md:text-2xl font-serif text-text-main transition-colors group-hover:text-accent-gold font-medium line-clamp-2 min-h-[3.2rem]">
                      {item.name}
                    </span>
                    <div className="flex items-center text-accent-gold shrink-0">
                      <Star className="w-3 h-3 fill-accent-gold" />
                      <span className="text-[10px] ml-1 font-bold">4.9</span>
                    </div>
                  </div>
                  <span className="text-lg md:text-xl font-sans text-text-main/70 font-bold tracking-tight mt-auto">
                    {item.price}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
