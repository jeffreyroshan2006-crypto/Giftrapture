"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const NavLinks = [
  { name: "Luxury Bouquets", href: "/shop/bouquets" },
  { name: "Themed Hampers", href: "/shop/themed-hampers" },
  { name: "EID Hampers", href: "/shop/eid-hampers" },
  { name: "Corporate Gifting", href: "/services" },
  { name: "CUSTOM BOX", href: "/shop/custom-box", isPrimary: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

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
            scrolled
              ? "bg-white/95 py-3 shadow-sm"
              : "bg-white/80 backdrop-blur-md py-4 shadow-sm"
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
              <span className="font-serif text-xl md:text-2xl text-text-main font-bold leading-none">
                GIFTRAPTURE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  link.isPrimary
                    ? "text-text-main bg-accent-gold/60 border border-accent-gold/50 px-4 py-2 rounded-full shadow-sm hover:bg-accent-gold"
                    : "text-text-main/80 hover:text-text-main"
                )}
              >
                {link.name}
                {!link.isPrimary && (
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-5">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  className="w-48 pl-3 pr-8 py-1.5 rounded-full border border-text-main/20 bg-white text-sm focus:outline-none focus:border-accent-gold transition-all"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-2 top-1.5 text-text-main/50 hover:text-text-main">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors hidden sm:block"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            <Link href="/login" className="p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>

            <Link href="/cart" className="p-2 text-text-main hover:bg-primary/20 rounded-full transition-colors relative block">
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-gold rounded-full border border-white text-[9px] flex items-center justify-center text-white font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
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
