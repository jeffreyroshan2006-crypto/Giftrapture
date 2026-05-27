"use client";

import { motion } from "framer-motion";
import { Gift, ShoppingBag as ShoppingBagIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFF8E7' }}>
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large soft gold circle — top right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />
        {/* Large soft blush circle — bottom left */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #F8E8E8 0%, transparent 70%)' }} />
        {/* Thin gold horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-px opacity-[0.08]" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24 md:py-32 w-full">
        {/* Staggered entrance animation container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center"
        >
          {/* Small ornamental line */}
          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px mb-8"
            style={{ backgroundColor: '#C9A227' }}
          />

          {/* Badge */}
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-5 py-2 rounded-full text-[10px] md:text-xs tracking-[0.35em] font-sans uppercase font-bold mb-8"
            style={{ backgroundColor: 'rgba(201,162,39,0.1)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.25)' }}
          >
            Signature Gifting Reimagined
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-[0.9] mb-6"
            style={{ color: '#2C1E1E' }}
          >
            Curated Elegance <br />
            <span className="italic font-normal" style={{ color: '#C9A227' }}>For Every Occasion</span>
          </motion.h1>

          {/* Action Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/shop/custom-box"
              className="group flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 text-base w-full sm:w-auto"
              style={{ backgroundColor: '#C9A227', color: '#FFFFFF' }}
            >
              <Gift className="w-5 h-5" />
              <span>Make Your Own Box</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0" />
            </Link>
            <Link
              href="/shop"
              className="group flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-full transition-all duration-300 hover:shadow-md active:scale-95 text-base w-full sm:w-auto"
              style={{ backgroundColor: 'transparent', color: '#2C1E1E', border: '2px solid rgba(44,30,30,0.15)' }}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Shop Now</span>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-14 pt-8"
            style={{ borderTop: '1px solid rgba(201,162,39,0.12)' }}
          >
            {[
              { label: "Handcrafted", detail: "With Love" },
              { label: "Same Day", detail: "Delivery" },
              { label: "Premium", detail: "Packaging" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] font-sans" style={{ color: '#C9A227' }}>{item.label}</span>
                <span className="text-[11px] font-sans mt-0.5" style={{ color: '#7A7A7A' }}>{item.detail}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
