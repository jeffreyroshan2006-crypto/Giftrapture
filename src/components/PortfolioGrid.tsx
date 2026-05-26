"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useCartStore } from "@/store/cartStore";
import { ArrowRight } from "lucide-react";

const FALLBACK_PORTFOLIO: Product[] = [
  { id: "bq-1", name: "Velvet Crimson Rose", price: 3499, strike_price: 4499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller", category: "bouquets", relation: "For Her" },
  { id: "bq-2", name: "Ethereal White Lilies", price: 2999, strike_price: 3599, image: "/images/bouquets/IMG_3894.jpg", tag: "Classic", category: "bouquets", relation: "For Parents" },
  { id: "bq-3", name: "Blush Peony Symphony", price: 4200, strike_price: 4999, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium", category: "bouquets", relation: "For Her" },
  { id: "bq-6", name: "Classic Ranunculus Bouquet", price: 2499, strike_price: 2999, image: "/images/bouquets/IMG_3926.png", tag: "Best Seller", category: "bouquets", relation: "For Colleagues" },
  { id: "bq-7", name: "Pastel Hydrangea Cloud", price: 3800, strike_price: 4599, image: "/images/bouquets/IMG_3927.png", tag: "Elegant", category: "bouquets", relation: "For Her" },
  { id: "hm-1", name: "Royal Celebration Hamper", price: 7499, strike_price: 8999, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium", category: "hampers", relation: "For Couples" },
  { id: "hm-3", name: "Artisanal Chocolate Hamper", price: 3250, strike_price: 3999, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller", category: "hampers", relation: "For Her" },
  { id: "hm-6", name: "Signature Silk Trousseau Box", price: 5999, strike_price: 7299, image: "/images/themed-hampers/IMG_3915.jpg", tag: "Handcrafted", category: "hampers", relation: "For Parents" },
  { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, strike_price: 7799, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers", relation: "For Parents" },
  { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, strike_price: 10299, image: "/images/eid-hampers/IMG_3943.png", tag: "Signature", category: "eid-hampers", relation: "For Parents" },
];

interface Product {
  id: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  images?: string[];
  relations?: string[];
  tag: string | null;
  category: string;
  relation: string;
}

function ProductItem({ product, index }: { product: Product; index: number }) {

  const href = `/product/${product.id}`;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full">
          {/* Image Carousel */}
          <div className="relative aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
            <div className="relative w-full h-full">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-full scroll-smooth">
                {(product.images && product.images.length > 0) ? (
                  product.images.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full relative snap-start shrink-0">
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))
                ) : (
                  <div className="min-w-full h-full relative snap-start shrink-0">
                    <Image
                      src={product.image || "/images/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
              
              {/* Dot Indicators */}
              {(product.images && product.images.length > 1) && (
                <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.images.map((_, idx) => (
                    <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                  ))}
                </div>
              )}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Product Info */}
          <div className="p-3 flex flex-col flex-1">
            <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-auto">
               <div className="flex items-center gap-1.5 flex-wrap">
                 {product.strike_price && product.strike_price > product.price && (
                   <>
                     <span className="text-xs font-sans text-soft-gray line-through decoration-red-400">
                       ₹{product.strike_price.toLocaleString("en-IN")}
                     </span>
                     <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                       {Math.round(((product.strike_price - product.price) / product.strike_price) * 100)}% OFF
                     </span>
                   </>
                 )}
                 <span className="text-sm font-bold text-accent-gold">
                   ₹{product.price.toLocaleString("en-IN")}
                 </span>
               </div>
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: "all", label: "All" },
    { key: "bouquets", label: "Bouquets" },
    { key: "hampers", label: "Hampers" },
    { key: "eid-hampers", label: "Eid Hampers" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          console.error("Supabase error fetching portfolio products:", error);
          console.error("Error details:", {
            message: (error as any)?.message,
            code: (error as any)?.code,
            status: (error as any)?.status,
          });
          setProducts([]);
          setFiltered([]);
          return;
        }
        const sorted = (data || []).sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        setProducts(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="portfolio">
      {/* Header */}
      <div className="text-center mb-16">
          <span className="text-accent-gold text-[10px] tracking-[0.3em] font-sans uppercase font-bold mb-4 block">
            Most Loved
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tighter italic mb-6">
            <span className="font-bold not-italic">Bestsellers</span>
          </h2>
        <p className="text-soft-gray max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Every piece in our collection is curated with intention. Explore our signature bouquets, themed hampers, and festive Eid selections.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-3xl px-3">
          <div className="rounded-full border border-text-main/10 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 px-1.5 py-1 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold rounded-full whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-text-main text-white shadow-md"
                      : "text-text-main/60 hover:text-text-main hover:bg-secondary/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-white/50 animate-pulse aspect-[3/4]">
              <div className="aspect-[3/4] bg-secondary/50 rounded-t-3xl" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-secondary/50 rounded w-3/4" />
                <div className="h-3 bg-secondary/50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-soft-gray text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, index) => (
                <ProductItem key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </>
      )}

      {/* View All CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 group px-8 py-3.5 border border-text-main/10 bg-white text-text-main font-bold rounded-full transition-all duration-300 hover:bg-text-main hover:text-white hover:shadow-2xl text-sm"
        >
          Explore Full Collection
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
