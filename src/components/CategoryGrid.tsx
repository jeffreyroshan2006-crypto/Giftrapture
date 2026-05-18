"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Luxury Bouquets",
    tagline: "Eternal Blooms",
    image: "/images/bouquets/IMG_3941.png",
    href: "/shop/bouquets",
    className: "col-span-1 md:col-span-6 lg:col-span-5 h-[350px] md:h-[500px]",
  },
  {
    title: "Themed Hampers",
    tagline: "Curated Joy",
    image: "/images/themed-hampers/IMG_3912.jpg",
    href: "/shop/themed-hampers",
    className: "col-span-1 md:col-span-6 lg:col-span-7 h-[350px] md:h-[500px]",
  },
  {
    title: "EID Hampers",
    tagline: "Festive Blessings",
    image: "/images/eid-hampers/IMG_3848.png",
    href: "/shop/eid-hampers",
    className: "col-span-1 md:col-span-7 h-[350px] md:h-[400px]",
  },
  {
    title: "Occasional Hampers",
    tagline: "Celebrating You",
    image: "/images/cat-occasional.png",
    href: "/shop/occasions",
    className: "col-span-1 md:col-span-5 h-[350px] md:h-[400px]",
  },
  {
    title: "Corporate Gifting",
    tagline: "Bespoke Professionalism",
    image: "/images/cat-corporate.png",
    href: "/services/corporate",
    className: "col-span-1 md:col-span-12 h-[350px] md:h-[400px]",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent-sage font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Collections
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-text-main tracking-tighter leading-tight drop-shadow-sm">
            Elevating Every <br /> <span className="italic font-normal">Gifting Gesture</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-soft-gray max-w-sm font-sans tracking-tight text-sm font-medium leading-relaxed"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore our meticulously crafted collections designed to celebrate the most precious moments of your life with unparalleled elegance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            className={cn("group relative rounded-3xl overflow-hidden shadow-2xl transition-transform", category.className)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={category.href} className="block w-full h-full relative cursor-pointer group">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 z-10 opacity-70 transition-opacity group-hover:opacity-90" />

              {/* Loading Placeholder */}
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />

              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Content */}
              <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                <span className="text-white/80 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-2 transform -translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {category.tagline}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tighter shadow-sm">
                    {category.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
