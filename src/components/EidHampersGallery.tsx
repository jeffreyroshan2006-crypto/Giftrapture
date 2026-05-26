"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ShoppingBag, Check } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  tag?: string;
  category: string;
}

const FALLBACK_PRODUCTS: Product[] = [
  { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, strike_price: 7799, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers" },
  { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, strike_price: 10299, image: "/images/eid-hampers/IMG_3943.png", tag: "Signature", category: "eid-hampers" },
  { id: "eh-2", name: "Hilal Delights Basket", price: 5200, strike_price: 6299, image: "/images/eid-hampers/IMG_3942.png", tag: "Festive", category: "eid-hampers" },
  { id: "eh-5", name: "Barakah Abundance Hamper", price: 7299, strike_price: 8799, image: "/images/eid-hampers/IMG_3945.png", tag: "Bestseller", category: "eid-hampers" },
  { id: "eh-4", name: "Sacred Bloom Platter", price: 4800, strike_price: 5799, image: "/images/eid-hampers/IMG_3944.png", tag: "Elegant", category: "eid-hampers" },
];

export default function EidHampersGallery() {
  const containerRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "eid-hampers")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching Eid hampers:", error);
          setProducts(FALLBACK_PRODUCTS);
          return;
        }

        if (data && data.length > 0) {
          const mapped: Product[] = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            strike_price: p.strike_price ? Number(p.strike_price) : undefined,
            image: p.image || "/images/placeholder.jpg",
            tag: p.tag || "Premium",
            category: p.category,
          }));
          setProducts(mapped);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to fetch Eid hampers:", err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
              <div className="aspect-[3/4] bg-primary/10" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-secondary/50 rounded w-3/4" />
                <div className="h-3 bg-secondary/50 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          products.map((product, index) => (
            <EidHamperCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

function EidHamperCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
      className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={index < 4}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Mobile-optimized overlay layout */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {product.tag && (
          <div className="absolute top-2 left-2 z-20">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest font-bold text-text-main shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick Add - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-2 left-2 right-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAdd}
            className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md text-[10px] uppercase tracking-widest ${
              added 
                ? "bg-accent-sage text-white" 
                : "bg-white text-text-main hover:bg-accent-gold"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 bg-white relative z-10 flex-1">
        <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.strike_price && product.strike_price > product.price && (
              <span className="text-xs font-sans text-soft-gray line-through decoration-red-400">
                ₹{product.strike_price.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-sm font-bold text-accent-gold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
