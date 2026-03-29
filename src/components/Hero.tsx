"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-secondary">
      {/* Immersive Background Container */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-secondary z-10" />
        <div className="absolute inset-0 bg-primary/20">
           <Image 
            src="/images/hero.png" 
            alt="Gift Rapture Luxury" 
            fill 
            className="object-cover"
            priority 
          />
        </div>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto py-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-[10px] md:text-xs tracking-[0.3em] font-sans text-white uppercase font-bold mb-8 shadow-2xl">
             Luxury Gifting Reimagined
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-10 drop-shadow-2xl">
            Curated Elegance <br/> <span className="italic font-normal">For Every Occasion</span>
          </h1>
          <p className="text-sm md:text-lg text-white/90 font-sans max-w-xl mx-auto mb-12 leading-relaxed drop-shadow-lg tracking-tight font-medium">
             Discover a world where every gift tells a story. From bespoke bouquets to artisanal themed hampers, we create moments that resonate forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
               href="/shop"
               className="group relative px-10 py-5 bg-accent-gold text-text-main font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(229,213,200,0.4)] transform hover:-translate-y-1 active:scale-95 text-base w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                 Explore Collection
                 <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link 
               href="/services"
               className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 transform hover:-translate-y-1 text-base w-full sm:w-auto"
            >
               Trousseau & Corporate
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 md:flex flex-col items-center opacity-60 hidden"
      >
        <span className="text-[10px] uppercase tracking-widest text-white mb-3 font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
