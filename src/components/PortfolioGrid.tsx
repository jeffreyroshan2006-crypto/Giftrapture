"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Star, Eye, ArrowRight } from "lucide-react";

const FALLBACK_PORTFOLIO: Product[] = [
  { id: "bq-1", name: "Velvet Crimson Rose", price: 3499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller", category: "bouquets", relation: "For Her" },
  { id: "bq-2", name: "Ethereal White Lilies", price: 2999, image: "/images/bouquets/IMG_3894.jpg", tag: "Classic", category: "bouquets", relation: "For Parents" },
  { id: "bq-3", name: "Blush Peony Symphony", price: 4200, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium", category: "bouquets", relation: "For Her" },
  { id: "bq-6", name: "Classic Ranunculus Bouquet", price: 2499, image: "/images/bouquets/IMG_3926.png", tag: "Best Seller", category: "bouquets", relation: "For Colleagues" },
  { id: "bq-7", name: "Pastel Hydrangea Cloud", price: 3800, image: "/images/bouquets/IMG_3927.png", tag: "Elegant", category: "bouquets", relation: "For Her" },
  { id: "hm-1", name: "Royal Celebration Hamper", price: 7499, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium", category: "hampers", relation: "For Couples" },
  { id: "hm-3", name: "Artisanal Chocolate Hamper", price: 3250, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller", category: "hampers", relation: "For Her" },
  { id: "hm-6", name: "Signature Silk Trousseau Box", price: 5999, image: "/images/themed-hampers/IMG_3915.jpg", tag: "Handcrafted", category: "hampers", relation: "For Parents" },
  { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers", relation: "For Parents" },
  { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, image: "/images/eid-hampers/IMG_3943.png", tag: "Signature", category: "eid-hampers", relation: "For Parents" },
];

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string | null;
  category: string;
  relation: string;
}

function ProductItem({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCartStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const categorySlug =
    product.category === "bouquets"
      ? "bouquets"
      : product.category === "hampers"
      ? "themed-hampers"
      : product.category === "eid-hampers"
      ? "eid-hampers"
      : "shop";

  const href = `/product/${product.id}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-premium hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tag */}
            {product.tag && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
                  {product.tag}
                </span>
              </div>
            )}

            {/* Hover Overlay Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-white text-text-main font-bold rounded-full shadow-2xl hover:bg-accent-gold transition-colors text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 right-4 z-20">
              <span className="px-4 py-2 bg-text-main text-white rounded-full text-sm font-bold shadow-lg">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-serif text-base text-text-main group-hover:text-accent-gold transition-colors line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-text-main/5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-soft-gray">
                {product.category.replace("hampers", "Hampers").replace("bouquets", "Bouquets").replace("eid-", "Eid ")}
              </span>
              <div className="flex items-center gap-1 text-accent-gold">
                <Star className="w-3 h-3 fill-accent-gold" />
                <span className="text-[10px] font-bold">4.8</span>
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
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
              activeCategory === cat.key
                ? "bg-text-main text-white border-text-main shadow-lg"
                : "bg-white text-text-main/70 border-text-main/10 hover:border-accent-gold hover:text-accent-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
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
