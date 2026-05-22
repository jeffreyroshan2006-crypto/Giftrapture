"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Star, ArrowRight, ArrowLeft } from "lucide-react";

const items = [
  {
    name: "Classic Ranunculus Bouquet",
    price: "₹ 2,499",
    tag: "Best Seller",
    image: "/images/bouquets/IMG_3926.png",
  },
  {
    name: "Luxury Silk Trousseau Box",
    price: "₹ 5,999",
    tag: "Handcrafted",
    image: "/images/cat-wedding.png",
  },
  {
    name: "Artisanal Chocolate Hamper",
    price: "₹ 3,250",
    tag: "Indulgent",
    image: "/images/cat-hampers.png",
  },
  {
    name: "Premium Peony Arrangement",
    price: "₹ 4,799",
    tag: "Limited Edition",
    image: "/images/bouquets/IMG_3893.jpg",
  },
];

export default function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-24 bg-primary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 px-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent-sage font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
              Curated for You
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main tracking-tighter shadow-sm">
              Most Loved <span className="italic font-normal">Creations</span>
            </h2>
          </motion.div>
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center text-text-main hover:bg-white hover:shadow-xl transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center text-text-main hover:bg-white hover:shadow-xl transition-all active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              className="min-w-[280px] md:min-w-[340px] snap-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group relative rounded-3xl overflow-hidden bg-white shadow-premium p-4 md:p-6 transition-transform duration-500 hover:-translate-y-2 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/50 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main">
                    {item.tag}
                  </span>

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Quick Add Overlay */}
                  <motion.button
                    className="absolute bottom-4 left-4 right-4 py-4 bg-white/90 backdrop-blur-md text-text-main font-bold rounded-xl transform translate-y-20 transition-all duration-500 group-hover:translate-y-0 shadow-2xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 text-sm md:text-base z-30"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Quick Add
                  </motion.button>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl md:text-2xl font-serif text-text-main transition-colors group-hover:text-accent-gold cursor-pointer font-medium line-clamp-2 min-h-[3.2rem]">
                      {item.name}
                    </span>
                    <div className="flex items-center text-accent-gold">
                      <Star className="w-3 h-3 fill-accent-gold" />
                      <span className="text-[10px] ml-1 font-bold">4.9</span>
                    </div>
                  </div>
                  <span className="text-lg md:text-xl font-sans text-text-main/70 font-bold tracking-tight">
                    {item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
