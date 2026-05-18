"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ShoppingBag, Star, Heart, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const bouquets = [
  { id: 1, name: "Velvet Crimson Rose", price: "₹ 3,499", image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller" },
  { id: 2, name: "Ethereal White Lilies", price: "₹ 2,999", image: "/images/bouquets/IMG_3894.jpg", tag: "Classic" },
  { id: 3, name: "Blush Peony Symphony", price: "₹ 4,200", image: "/images/bouquets/IMG_3895.jpg", tag: "Premium" },
  { id: 4, name: "Midnight Orchid Cascade", price: "₹ 5,499", image: "/images/bouquets/IMG_3897.jpg", tag: "Luxury" },
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
          Luxury <span className="italic font-light">Bouquets</span>
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

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
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
      className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-white shadow-premium hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-text-main/5"
    >
      <div className="relative w-full overflow-hidden bg-primary/10">
        <Image
          src={bouquet.image}
          alt={bouquet.name}
          width={600}
          height={800}
          priority={index < 2}
          className="object-cover w-full h-auto transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Mobile-optimized overlay layout (always visible on touch, hover on desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="absolute top-5 left-5 z-20">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
            {bouquet.tag}
          </span>
        </div>

        <button className="absolute top-5 right-5 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-text-main hover:text-accent-gold hover:scale-110 transition-all duration-300 shadow-sm lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-4 lg:group-hover:translate-y-0">
          <Heart className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-center lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
          <button 
            onClick={handleAdd}
            className={`w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-2xl text-sm uppercase tracking-widest ${
              added 
                ? "bg-accent-sage text-white scale-95" 
                : "bg-white text-text-main hover:bg-text-main hover:text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-3 bg-white relative z-10">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl md:text-2xl font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300">
            {bouquet.name}
          </h3>
          <div className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-md shrink-0 mt-1">
            <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
            <span className="text-xs font-bold text-text-main">5.0</span>
          </div>
        </div>
        <p className="text-lg font-sans text-soft-gray font-medium tracking-tight">
          {bouquet.price}
        </p>
      </div>
    </motion.div>
  );
}
