"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, ShoppingBag as ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-secondary">
      {/* Immersive Background Container for all screens */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-secondary/90 z-10" />
        <div className="absolute inset-0">
           <Image 
            src="/images/hero.png" 
            alt="GIFTRAPTURE Signature" 
            fill 
            className="object-cover"
            priority 
            quality={100}
          />
        </div>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto py-20 w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
           className="flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-[10px] md:text-xs tracking-[0.3em] font-sans text-white uppercase font-bold mb-8 shadow-2xl">
            Signature Gifting Reimagined
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-10 drop-shadow-2xl">
            Curated Elegance <br/> <span className="italic font-normal">For Every Occasion</span>
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mt-8 w-full max-w-sm mx-auto">
            <Link 
              href="/shop/custom-box"
              className="group flex items-center justify-center gap-3 px-6 py-4 bg-accent-gold text-text-main font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,213,200,0.4)] active:scale-95 text-base shadow-xl border border-accent-gold/50"
            >
              <Gift className="w-5 h-5" />
              <span>Make Your Own Box</span>
            </Link>
            <Link 
              href="/shop"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all duration-300 hover:bg-white/20 active:scale-95 text-base"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Shop Now</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
