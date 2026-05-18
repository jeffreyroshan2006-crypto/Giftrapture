"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";

const eidHampers = [
  { id: 1, name: "Al-Noor Premium Eid Box", price: "₹ 6,499", image: "/images/eid-hampers/IMG_3848.png", tag: "Premium" },
  { id: 2, name: "Hilal Delights Basket", price: "₹ 5,200", image: "/images/eid-hampers/IMG_3942.png", tag: "Festive" },
  { id: 3, name: "Royal Mubarak Trunk", price: "₹ 8,500", image: "/images/eid-hampers/IMG_3943.png", tag: "Luxury" },
  { id: 4, name: "Sacred Bloom Platter", price: "₹ 4,800", image: "/images/eid-hampers/IMG_3944.png", tag: "Elegant" },
  { id: 5, name: "Barakah Abundance Hamper", price: "₹ 7,299", image: "/images/eid-hampers/IMG_3945.png", tag: "Bestseller" },
  { id: 6, name: "Zamarud Gold Artisan Tray", price: "₹ 3,999", image: "/images/eid-hampers/IMG_3946.png", tag: "Handcrafted" },
];

export default function EidHampersGallery() {
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
          The Festive Atelier
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-text-main mb-8 leading-tight tracking-tighter"
        >
          EID <span className="italic font-light">Hampers</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-soft-gray text-lg md:text-2xl font-sans font-light leading-relaxed max-w-2xl mx-auto"
        >
          Celebrate the joy and blessings of Eid with our exquisitely curated festive hampers, featuring premium dry fruits, gourmet treats, and elegant arrangements.
        </motion.p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {eidHampers.map((hamper, index) => (
          <EidHamperCard key={hamper.id} hamper={hamper} index={index} />
        ))}
      </div>
    </div>
  );
}

function EidHamperCard({ hamper, index }: { hamper: any, index: number }) {
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
