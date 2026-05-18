"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";

const hampers = [
  { id: 1, name: "Royal Celebration Hamper", price: "₹ 7,499", image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium" },
  { id: 2, name: "Gilded Indulgence Box", price: "₹ 6,999", image: "/images/themed-hampers/IMG_3899.jpg", tag: "Luxury" },
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
  { id: 14, name: "Luxury Artisan Casket", price: "₹ 8,900", image: "/images/themed-hampers/IMG_3929.png", tag: "Custom" },
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

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {hampers.map((hamper, index) => (
          <HamperCard key={hamper.id} hamper={hamper} index={index} />
        ))}
      </div>
    </div>
  );
}

function HamperCard({ hamper, index }: { hamper: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      style={{ willChange: "transform, opacity" }}
      className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-white shadow-premium hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-text-main/5"
    >
      <div className="relative w-full overflow-hidden bg-primary/10">
        <Image
          src={hamper.image}
          alt={hamper.name}
          width={600}
          height={800}
          priority={index < 2}
          className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="absolute top-5 left-5 z-20">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
            {hamper.tag}
          </span>
        </div>

        <button className="absolute top-5 right-5 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-text-main hover:text-accent-gold hover:scale-110 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          <Heart className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <button className="w-full py-4 bg-white text-text-main font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-text-main hover:text-white transition-colors duration-300 shadow-2xl text-sm uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-3 bg-white relative z-10">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl md:text-2xl font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300">
            {hamper.name}
          </h3>
          <div className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-md shrink-0 mt-1">
            <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
            <span className="text-xs font-bold text-text-main">5.0</span>
          </div>
        </div>
        <p className="text-lg font-sans text-soft-gray font-medium tracking-tight">
          {hamper.price}
        </p>
      </div>
    </motion.div>
  );
}
