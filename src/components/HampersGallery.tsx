"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ShoppingBag, Star, Check } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const hampers = [
  { id: 1, name: "Royal Celebration Hamper", price: "₹ 7,499", image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium" },
  { id: 2, name: "Gilded Indulgence Box", price: "₹ 6,999", image: "/images/themed-hampers/IMG_3899.jpg", tag: "Signature" },
  { id: 3, name: "Velvet Treasure Chest", price: "₹ 5,499", image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller" },
  { id: 4, name: "Midnight Bliss Hamper", price: "₹ 8,200", image: "/images/themed-hampers/IMG_3912.jpg", tag: "Signature" },
  { id: 5, name: "Golden Glow Festive Basket", price: "₹ 4,999", image: "/images/themed-hampers/IMG_3914.jpg", tag: "Festive" },
  { id: 6, name: "Classic Elegance Trunk", price: "₹ 6,200", image: "/images/themed-hampers/IMG_3915.jpg", tag: "Classic" },
  { id: 7, name: "Opulent Harvest Tray", price: "₹ 3,899", image: "/images/themed-hampers/IMG_3916.jpg", tag: "Organic" },
  { id: 8, name: "Champagne & Roses Curated Box", price: "₹ 9,500", image: "/images/themed-hampers/IMG_3917.jpg", tag: "Ultimate" },
  { id: 9, name: "Sweet Serenade Basket", price: "₹ 4,500", image: "/images/themed-hampers/IMG_3918.png", tag: "Sweet" },
  { id: 10, name: "Blossom & Bites Platter", price: "₹ 5,100", image: "/images/themed-hampers/IMG_3920.png", tag: "Curated" },
  { id: 11, name: "Gourmet Symphony Trunk", price: "₹ 7,999", image: "/images/themed-hampers/IMG_3921.png", tag: "Gourmet" },
  { id: 12, name: "Aura of Gold Hamper", price: "₹ 6,750", image: "/images/themed-hampers/IMG_3922.png", tag: "Limited" },
  { id: 13, name: "Pink Petal Perfection Box", price: "₹ 4,200", image: "/images/themed-hampers/IMG_3923.png", tag: "Romantic" },
  { id: 14, name: "Artisan Casket", price: "₹ 8,900", image: "/images/themed-hampers/IMG_3929.png", tag: "Custom" },
  { id: 15, name: "Ethereal Treats Tray", price: "₹ 3,600", image: "/images/themed-hampers/IMG_3938.jpg", tag: "Delight" },
  { id: 16, name: "Deluxe Wellness & Bloom Hamper", price: "₹ 5,800", image: "/images/themed-hampers/IMG_3940.jpg", tag: "Wellness" },
];

export default function HampersGallery() {
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
          The Gifting Atelier
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-text-main mb-8 leading-tight tracking-tighter"
        >
          Themed <span className="italic font-light">Hampers</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-soft-gray text-lg md:text-2xl font-sans font-light leading-relaxed max-w-2xl mx-auto"
        >
          An extraordinary collection of curated hampers, featuring gourmet delicacies, artisanal gifts, and stunning floral arrangements.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
        {hampers.map((hamper, index) => (
          <HamperCard key={hamper.id} hamper={hamper} index={index} />
        ))}
      </div>
    </div>
  );
}

function HamperCard({ hamper, index }: { hamper: any, index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const numericPrice = parseInt(hamper.price.replace(/[^\d]/g, ""), 10);
    addItem({
      id: `hm-${hamper.id}`,
      name: hamper.name,
      price: numericPrice,
      image: hamper.image,
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
          src={hamper.image}
          alt={hamper.name}
          fill
          priority={index < 4}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Mobile-optimized overlay layout */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-2 left-2 z-20">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest font-bold text-text-main shadow-sm">
            {hamper.tag}
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
          {hamper.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-accent-gold">
            {hamper.price}
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
