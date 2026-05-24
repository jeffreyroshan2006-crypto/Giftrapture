"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ShoppingBag, Star, Check } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const bouquets = [
  { id: 1, name: "Velvet Crimson Rose", price: "₹ 3,499", image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller" },
  { id: 2, name: "Ethereal White Lilies", price: "₹ 2,999", image: "/images/bouquets/IMG_3894.jpg", tag: "Classic" },
  { id: 3, name: "Blush Peony Symphony", price: "₹ 4,200", image: "/images/bouquets/IMG_3895.jpg", tag: "Premium" },
  { id: 4, name: "Midnight Orchid Cascade", price: "₹ 5,499", image: "/images/bouquets/IMG_3897.jpg", tag: "Signature" },
  { id: 5, name: "Sunset Orange Tulips", price: "₹ 2,750", image: "/images/bouquets/IMG_3898.jpg", tag: "Seasonal" },
  { id: 6, name: "Golden Sunflower Burst", price: "₹ 2,299", image: "/images/bouquets/IMG_3926.png", tag: "Vibrant" },
  { id: 7, name: "Pastel Hydrangea Cloud", price: "₹ 3,800", image: "/images/bouquets/IMG_3927.png", tag: "Elegant" },
  { id: 8, name: "Royal Purple Iris", price: "₹ 3,100", image: "/images/bouquets/IMG_3928.png", tag: "Exotic" },
  { id: 9, name: "Wildflower Meadows", price: "₹ 2,650", image: "/images/bouquets/IMG_3930.png", tag: "Rustic" },
  { id: 10, name: "Scarlet Passion Mix", price: "₹ 4,500", image: "/images/bouquets/IMG_3931.png", tag: "Romantic" },
  { id: 11, name: "Frosty Morning Blooms", price: "₹ 3,300", image: "/images/bouquets/IMG_3932.png", tag: "Fresh" },
  { id: 12, name: "Enchanted Forest Ferns", price: "₹ 2,899", image: "/images/bouquets/IMG_3933.png", tag: "Verdant" },
  { id: 13, name: "Candy Pink Carnations", price: "₹ 1,999", image: "/images/bouquets/IMG_3936.png", tag: "Sweet" },
  { id: 14, name: "Sapphire Blue Delphinium", price: "₹ 4,100", image: "/images/bouquets/IMG_3937.png", tag: "Rare" },
  { id: 15, name: "Majestic Imperial Lily", price: "₹ 5,999", image: "/images/bouquets/IMG_3941.png", tag: "Signature" },
];

export default function BouquetsGallery() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-24 text-center max-w-4xl mx-auto pt-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block"
        >
          The Floral Atelier
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-text-main mb-8 leading-tight tracking-tighter"
        >
          Signature <span className="italic font-light">Bouquets</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-soft-gray text-lg md:text-2xl font-sans font-light leading-relaxed max-w-2xl mx-auto"
        >
          Curated expressions of love and elegance, meticulously handcrafted using the world's finest seasonal blooms.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
        {bouquets.map((bouquet, index) => (
          <BouquetCard key={bouquet.id} bouquet={bouquet} index={index} />
        ))}
      </div>
    </div>
  );
}

function BouquetCard({ bouquet, index }: { bouquet: any, index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const numericPrice = parseInt(bouquet.price.replace(/[^\d]/g, ""), 10);
    addItem({
      id: `bq-${bouquet.id}`,
      name: bouquet.name,
      price: numericPrice,
      image: bouquet.image,
      quantity: 1
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      style={{ willChange: "transform, opacity" }}
      className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
        <Image
          src={bouquet.image}
          alt={bouquet.name}
          fill
          priority={index < 4}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Mobile-optimized overlay layout */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-2 left-2 z-20">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest font-bold text-text-main shadow-sm">
            {bouquet.tag}
          </span>
        </div>

        {/* Quick Add - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-2 left-2 right-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAdd}
            className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md text-[10px] uppercase tracking-widest ${
              added 
                ? "bg-accent-sage text-white" 
                : "bg-white text-text-main hover:bg-accent-gold"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 bg-white relative z-10 flex-1">
        <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
          {bouquet.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-accent-gold">
            {bouquet.price}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
            <span className="text-[10px] font-bold text-soft-gray">5.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
