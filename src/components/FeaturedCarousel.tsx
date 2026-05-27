"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Item {
  id: string;
  slug?: string;
  name: string;
  price: number;
  strike_price?: number;
  tag: string;
  image: string;
  images?: string[];
  category?: string;
}

// Fallback items in case Supabase is unreachable
const FALLBACK_ITEMS: Item[] = [
  { id: "1", name: "Classic Ranunculus Bouquet", price: 2499, strike_price: 2999, tag: "Best Seller", image: "/images/bouquets/IMG_3926.png" },
  { id: "2", name: "Signature Silk Trousseau Box", price: 5999, strike_price: 7299, tag: "Handcrafted", image: "/images/themed-hampers/IMG_3915.jpg" },
  { id: "3", name: "Artisanal Chocolate Hamper", price: 3250, strike_price: 3999, tag: "Indulgent", image: "/images/themed-hampers/IMG_3900.jpg" },
  { id: "4", name: "Premium Peony Arrangement", price: 4799, strike_price: 4999, tag: "Limited Edition", image: "/images/bouquets/IMG_3893.jpg" },
  { id: "5", name: "Royal Celebration Hamper", price: 7499, strike_price: 8999, tag: "Premium", image: "/images/themed-hampers/IMG_3723.jpg" },
  { id: "6", name: "Velvet Crimson Rose", price: 3499, strike_price: 4299, tag: "Bestseller", image: "/images/bouquets/IMG_3893.jpg" },
];

export default function FeaturedCarousel() {
  const { addItem } = useCartStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          console.error("Error fetching featured products:", error);
        }

        if (data && data.length > 0) {
          const mapped: Item[] = data.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            price: Number(p.price),
            strike_price: p.strike_price ? Number(p.strike_price) : undefined,
            tag: p.tag || "Premium",
            image: p.image || "/images/placeholder.jpg",
            category: p.category,
          }));
          setItems(mapped);
        } else {
          // No products in DB — use fallback
          setItems(FALLBACK_ITEMS);
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setItems(FALLBACK_ITEMS);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const addedItemsRef = useRef<Record<string, boolean>>({});

  const handleQuickAdd = (e: React.MouseEvent, item: Item) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });

    // Set flag in both React state and stable ref simultaneously
    const id = item.id;
    addedItemsRef.current[id] = true;
    setAddedItems(prev => ({ ...prev, [id]: true }));

    // Reset after 2.5s
    setTimeout(() => {
      addedItemsRef.current[id] = false;
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-primary/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">


        {/* Products Grid - Responsive layout */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-soft-gray font-serif italic">Curating featured selections...</p>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {items.map((item) => {
            const productHref = `/product/${item.slug || item.id}`;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-premium hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="relative w-full h-full">
                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-full scroll-smooth">
                      {(item.images && item.images.length > 0) ? (
                        item.images.map((img, idx) => (
                          <Link href={productHref} key={idx} className="min-w-full h-full relative snap-start shrink-0 block">
                            <Image
                              src={img}
                              alt={`${item.name} - Image ${idx + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </Link>
                        ))
                      ) : (
                        <Link href={productHref} className="min-w-full h-full relative snap-start shrink-0 block">
                          <Image
                            src={item.image || "/images/placeholder.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                      )}
                    </div>
                    
                    {/* Dot Indicators */}
                    {(item.images && item.images.length > 1) && (
                      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.images.map((_, idx) => (
                          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                  {/* Quick Add Button - Always visible on all devices */}
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    className={`absolute bottom-3 left-3 right-3 py-2 md:py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-[10px] md:text-xs z-30 transition-all duration-300 font-bold ${
                      addedItems[item.id]
                        ? "bg-accent-sage text-white scale-105"
                        : "bg-white/95 backdrop-blur-md text-text-main hover:bg-accent-gold hover:text-text-main"
                    }`}
                  >
                    {addedItems[item.id] ? (
                      <>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                        Quick Add
                      </>
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4 flex flex-col flex-1 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm md:text-base font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors line-clamp-2 flex-1">
                      <Link href={productHref} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-auto flex-wrap">
                    {item.strike_price && item.strike_price > item.price && (
                      <span className="text-xs md:text-sm font-sans text-soft-gray line-through decoration-red-400">
                        ₹{item.strike_price.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-sm md:text-base font-sans text-text-main/70 font-bold tracking-tight">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
