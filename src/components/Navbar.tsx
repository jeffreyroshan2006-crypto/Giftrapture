"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Luxury Bouquets", href: "/shop" },
  { name: "Themed Hampers", href: "/shop" },
  { name: "Wedding Trousseau", href: "/services" },
  { name: "Corporate Gifting", href: "/services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
          scrolled ? "bg-white/80 backdrop-blur-lg py-3 shadow-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            className="md:hidden p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 md:w-12 h-10 md:h-12 transition-transform duration-500 group-hover:scale-110">
               <Image 
                 src="/images/logo.png" 
                 alt="Gift Rapture" 
                 fill 
                 className="object-contain" 
                 priority 
               />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl tracking-tighter text-text-main font-bold leading-none transition-all duration-500 group-hover:tracking-normal">
                GIFT RAPTURE
              </span>
              <span className="text-[8px] md:text-[10px] tracking-[0.3em] font-sans text-accent-sage uppercase font-medium mt-1">
                Curated Elegance
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-main/80 hover:text-text-main transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-5">
            <button className="p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-gold rounded-full border border-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-secondary z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-xl font-bold">GIFT RAPTURE</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                {NavLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-serif text-text-main hover:text-accent-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t border-text-main/10 flex flex-col space-y-4">
                <p className="text-sm text-soft-gray">Express Delivery Available</p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/30" />
                  <div className="w-8 h-8 rounded-full bg-primary/30" />
                  <div className="w-8 h-8 rounded-full bg-primary/30" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
