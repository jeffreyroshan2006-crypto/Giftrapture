"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductPreview {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
}

const FALLBACK_PRODUCTS: Record<string, ProductPreview[]> = {
  bouquets: [
    { id: "bq-3", name: "Blush Peony Symphony", price: 4200, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium" },
    { id: "bq-1", name: "Velvet Crimson Rose", price: 3499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller" }
  ],
  hampers: [
    { id: "hm-1", name: "Royal Celebration Hamper", price: 7499, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium" },
    { id: "hm-3", name: "Velvet Treasure Chest", price: 5499, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller" }
  ],
  "eid-hampers": [
    { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium" },
    { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, image: "/images/eid-hampers/IMG_3943.png", tag: "Luxury" }
  ],
  corporate: [
    { id: "bs-3", name: "Corporate Executive Kit", price: 9999, image: "/images/themed-hampers/IMG_3899.jpg", tag: "Signature" },
    { id: "hm-2", name: "Gilded Indulgence Box", price: 6999, image: "/images/themed-hampers/IMG_3899.jpg", tag: "Luxury" }
  ]
};

const TABS = [
  { key: "bouquets", label: "Bouquets" },
  { key: "hampers", label: "Hampers" },
  { key: "eid-hampers", label: "Eid" },
  { key: "corporate", label: "Corporate" }
];

export default function BespokePreviewBox() {
  const [activeTab, setActiveTab] = useState<string>("bouquets");
  const [products, setProducts] = useState<Record<string, ProductPreview[]>>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { supabase } = await import("@/lib/supabaseClient");
        const { data, error } = await supabase.from("products").select("*");
        
        if (error) {
          console.error("Supabase error in preview box:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const categorized: Record<string, ProductPreview[]> = {
            bouquets: [],
            hampers: [],
            "eid-hampers": [],
            corporate: []
          };

          data.forEach((p: any) => {
            const item: ProductPreview = {
              id: p.id,
              name: p.name,
              price: Number(p.price),
              image: p.image,
              tag: p.tag || "Seeded"
            };

            if (p.category === "bouquets") {
              categorized.bouquets.push(item);
            } else if (p.category === "eid-hampers") {
              categorized["eid-hampers"].push(item);
            } else if (p.category === "hampers") {
              if (p.relation === "For Colleagues" || p.id === "bs-3") {
                categorized.corporate.push(item);
              } else {
                categorized.hampers.push(item);
              }
            }
          });

          // Fallback to static if any category ended up empty
          const finalProducts = {
            bouquets: categorized.bouquets.length > 0 ? categorized.bouquets.slice(0, 2) : FALLBACK_PRODUCTS.bouquets,
            hampers: categorized.hampers.length > 0 ? categorized.hampers.slice(0, 2) : FALLBACK_PRODUCTS.hampers,
            "eid-hampers": categorized["eid-hampers"].length > 0 ? categorized["eid-hampers"].slice(0, 2) : FALLBACK_PRODUCTS["eid-hampers"],
            corporate: categorized.corporate.length > 0 ? categorized.corporate.slice(0, 2) : FALLBACK_PRODUCTS.corporate
          };

          setProducts(finalProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products for preview box:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const activeItems = products[activeTab] || [];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-6 shadow-2xl w-full max-w-md relative overflow-hidden group/box">
      {/* Glow Effect */}
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-accent-gold/20 rounded-full blur-2xl group-hover/box:bg-accent-gold/30 transition-all duration-700" />
      
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-accent-gold animate-pulse" />
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent-gold">Collection Preview</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-black/20 p-1 rounded-full mb-6 border border-white/5 relative z-10">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 relative rounded-full cursor-pointer text-white/70 hover:text-white"
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-preview-tab"
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Product List */}
      <div className="space-y-4 relative min-h-[180px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {activeItems.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-3 rounded-2xl transition-all duration-300 group/item hover:scale-[1.02] active:scale-[0.99] block"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                  />
                </div>

                {/* Product Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-accent-gold/20 text-accent-gold rounded-full text-[9px] uppercase tracking-wider font-extrabold">
                      {product.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm text-white font-medium truncate group-hover/item:text-accent-gold transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-sans text-xs text-white/60 mt-0.5">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Navigate Indicator */}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover/item:bg-white group-hover/item:text-text-main transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/item:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
