"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const posts = [
  { 
    id: 1, 
    type: "video", 
    src: "/images/cat-bouquets.png", 
    className: "col-span-12 md:col-span-4 row-span-2 h-[400px] md:h-[620px]" 
  },
  { 
    id: 2, 
    type: "image", 
    src: "/images/cat-hampers.png", 
    className: "col-span-6 md:col-span-4 row-span-1 h-[200px] md:h-[300px]" 
  },
  { 
    id: 3, 
    type: "video", 
    src: "/images/cat-wedding.png", 
    className: "col-span-6 md:col-span-4 row-span-1 h-[200px] md:h-[300px]" 
  },
  { 
    id: 4, 
    type: "image", 
    src: "/images/hero.png", 
    className: "col-span-12 md:col-span-8 row-span-1 h-[250px] md:h-[300px]" 
  },
];

export default function InstagramGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="flex items-center gap-3 mb-6 bg-primary/20 bg-opacity-30 p-4 rounded-full"
        >
          <Camera className="w-6 h-6 text-accent-gold" />
          <span className="text-text-main font-sans text-xs uppercase tracking-[0.3em] font-bold">
            Spotted in the Wild
          </span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-serif text-text-main tracking-tighter leading-tight drop-shadow-sm mb-6">
           Join our world of <br/> <span className="italic font-normal underline decoration-accent-gold/40 underline-offset-8 decoration-wavy">Curated Happiness</span>
        </h2>
        
        <p className="text-soft-gray max-w-sm font-sans tracking-tight text-sm font-medium leading-relaxed opacity-80">
          Tag us @GiftRapture to be featured in our gallery of elegant celebrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className={cn(
              "group relative rounded-3xl overflow-hidden shadow-premium cursor-pointer transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 bg-primary/10",
              post.className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500" />
            
            <Image 
              src={post.src} 
              alt={`Instagram post ${post.id}`} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {post.type === "video" && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white transform scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-white" />
              </div>
            )}
            
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
