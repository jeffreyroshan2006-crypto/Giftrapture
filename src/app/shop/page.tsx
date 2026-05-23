"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, SlidersHorizontal, X, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

// Combined Product Pool for shop listing
const ALL_PRODUCTS = [
  // Bouquets
  { id: "bq-1", name: "Velvet Crimson Rose", price: 3499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller", category: "bouquets", relation: "For Her" },
  { id: "bq-2", name: "Ethereal White Lilies", price: 2999, image: "/images/bouquets/IMG_3894.jpg", tag: "Classic", category: "bouquets", relation: "For Parents" },
  { id: "bq-3", name: "Blush Peony Symphony", price: 4200, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium", category: "bouquets", relation: "For Her" },
  { id: "bq-4", name: "Midnight Orchid Cascade", price: 5499, image: "/images/bouquets/IMG_3897.jpg", tag: "Signature", category: "bouquets", relation: "For Couples" },
  { id: "bq-5", name: "Sunset Orange Tulips", price: 2750, image: "/images/bouquets/IMG_3898.jpg", tag: "Seasonal", category: "bouquets", relation: "For Siblings" },
  { id: "bq-6", name: "Golden Sunflower Burst", price: 2299, image: "/images/bouquets/IMG_3926.png", tag: "Vibrant", category: "bouquets", relation: "For Colleagues" },
  { id: "bq-7", name: "Pastel Hydrangea Cloud", price: 3800, image: "/images/bouquets/IMG_3927.png", tag: "Elegant", category: "bouquets", relation: "For Her" },
  { id: "bq-8", name: "Royal Purple Iris", price: 3100, image: "/images/bouquets/IMG_3928.png", tag: "Exotic", category: "bouquets", relation: "For Him" },
  { id: "bq-9", name: "Wildflower Meadows", price: 2650, image: "/images/bouquets/IMG_3930.png", tag: "Rustic", category: "bouquets", relation: "For Siblings" },
  { id: "bq-10", name: "Scarlet Passion Mix", price: 4500, image: "/images/bouquets/IMG_3931.png", tag: "Romantic", category: "bouquets", relation: "For Her" },
  { id: "bq-11", name: "Frosty Morning Blooms", price: 3300, image: "/images/bouquets/IMG_3932.png", tag: "Fresh", category: "bouquets", relation: "For Parents" },
  { id: "bq-12", name: "Enchanted Forest Ferns", price: 2899, image: "/images/bouquets/IMG_3933.png", tag: "Verdant", category: "bouquets", relation: "For Colleagues" },
  { id: "bq-13", name: "Candy Pink Carnations", price: 1999, image: "/images/bouquets/IMG_3936.png", tag: "Sweet", category: "bouquets", relation: "For Siblings" },
  { id: "bq-14", name: "Sapphire Blue Delphinium", price: 4100, image: "/images/bouquets/IMG_3937.png", tag: "Rare", category: "bouquets", relation: "For Him" },
  { id: "bq-15", name: "Majestic Imperial Lily", price: 5999, image: "/images/bouquets/IMG_3941.png", tag: "Signature", category: "bouquets", relation: "For Parents" },

  // Hampers
  { id: "hm-1", name: "Royal Celebration Hamper", price: 7499, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium", category: "hampers", relation: "For Couples" },
  { id: "hm-2", name: "Gilded Indulgence Box", price: 6999, image: "/images/themed-hampers/IMG_3899.jpg", tag: "Signature", category: "hampers", relation: "For Colleagues" },
  { id: "hm-3", name: "Velvet Treasure Chest", price: 5499, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller", category: "hampers", relation: "For Her" },
  { id: "hm-4", name: "Midnight Bliss Hamper", price: 8200, image: "/images/themed-hampers/IMG_3912.jpg", tag: "Signature", category: "hampers", relation: "For Him" },
  { id: "hm-5", name: "Golden Glow Festive Basket", price: 4999, image: "/images/themed-hampers/IMG_3914.jpg", tag: "Festive", category: "hampers", relation: "For Parents" },
  { id: "hm-6", name: "Classic Elegance Trunk", price: 6200, image: "/images/themed-hampers/IMG_3915.jpg", tag: "Classic", category: "hampers", relation: "For Parents" },
  { id: "hm-7", name: "Opulent Harvest Tray", price: 3899, image: "/images/themed-hampers/IMG_3916.jpg", tag: "Organic", category: "hampers", relation: "For Siblings" },
  { id: "hm-8", name: "Champagne & Roses Box", price: 9500, image: "/images/themed-hampers/IMG_3917.jpg", tag: "Ultimate", category: "hampers", relation: "For Couples" },
  { id: "hm-9", name: "Sweet Serenade Basket", price: 4500, image: "/images/themed-hampers/IMG_3918.png", tag: "Sweet", category: "hampers", relation: "For Siblings" },
  { id: "hm-10", name: "Blossom & Bites Platter", price: 5100, image: "/images/themed-hampers/IMG_3920.png", tag: "Curated", category: "hampers", relation: "For Her" },
  { id: "hm-11", name: "Gourmet Symphony Trunk", price: 7999, image: "/images/themed-hampers/IMG_3921.png", tag: "Gourmet", category: "hampers", relation: "For Colleagues" },
  { id: "hm-12", name: "Aura of Gold Hamper", price: 6750, image: "/images/themed-hampers/IMG_3922.png", tag: "Limited", category: "hampers", relation: "For Him" },
  { id: "hm-13", name: "Pink Petal Perfection Box", price: 4200, image: "/images/themed-hampers/IMG_3923.png", tag: "Romantic", category: "hampers", relation: "For Her" },
  { id: "hm-14", name: "Artisan Casket", price: 8900, image: "/images/themed-hampers/IMG_3929.png", tag: "Custom", category: "hampers", relation: "For Colleagues" },
  { id: "hm-15", name: "Ethereal Treats Tray", price: 3600, image: "/images/themed-hampers/IMG_3938.jpg", tag: "Delight", category: "hampers", relation: "For Siblings" },
  { id: "hm-16", name: "Deluxe Wellness Hamper", price: 5800, image: "/images/themed-hampers/IMG_3940.jpg", tag: "Wellness", category: "hampers", relation: "For Parents" },

  // Eid Hampers
  { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers", relation: "For Parents" },
  { id: "eh-2", name: "Hilal Delights Basket", price: 5200, image: "/images/eid-hampers/IMG_3942.png", tag: "Festive", category: "eid-hampers", relation: "For Couples" },
  { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, image: "/images/eid-hampers/IMG_3943.png", tag: "Signature", category: "eid-hampers", relation: "For Parents" },
  { id: "eh-4", name: "Sacred Bloom Platter", price: 4800, image: "/images/eid-hampers/IMG_3944.png", tag: "Elegant", category: "eid-hampers", relation: "For Her" },
  { id: "eh-5", name: "Barakah Abundance Hamper", price: 7299, image: "/images/eid-hampers/IMG_3945.png", tag: "Bestseller", category: "eid-hampers", relation: "For Couples" },
  { id: "eh-6", name: "Zamarud Gold Artisan Tray", price: 3999, image: "/images/eid-hampers/IMG_3946.png", tag: "Handcrafted", category: "eid-hampers", relation: "For Siblings" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);

  // States
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activePriceRange, setActivePriceRange] = useState<string>("all");
  const [activeRelation, setActiveRelation] = useState<string>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Load products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error fetching shop products:", error);
          console.warn("Supabase fetch failed. Using local fallback dataset.");
          return;
        }
        if (data && data.length > 0) {
          const casted = data.map((p: any) => ({
            ...p,
            price: Number(p.price)
          }));
          setProducts(casted);
        }
      } catch (err) {
        console.warn("Supabase fetch failed or table doesn't exist yet. Safely using local fallback dataset.", err);
      }
    }
    fetchProducts();
  }, []);

  const handleQuickAdd = (productId: string, product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    setAddedItems(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  // Load URL filters
  useEffect(() => {
    const urlPrice = searchParams.get("price");
    const urlRelation = searchParams.get("relation");
    if (urlPrice) setActivePriceRange(urlPrice);
    if (urlRelation) setActiveRelation(urlRelation);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (activeCategory !== "all" && product.category !== activeCategory) return false;

      // Relation Filter
      if (activeRelation !== "all" && product.relation !== activeRelation) return false;

      // Price Range Filter
      if (activePriceRange !== "all") {
        const price = product.price;
        if (activePriceRange === "Under ₹2,000" && price >= 2000) return false;
        if (activePriceRange === "₹2,000 - ₹5,000" && (price < 2000 || price > 5000)) return false;
        if (activePriceRange === "₹5,000 - ₹10,000" && (price < 5000 || price > 10000)) return false;
        if (activePriceRange === "Above ₹10,000" && price <= 10000) return false;
      }

      return true;
    });
  }, [activeCategory, activePriceRange, activeRelation, products]);

  const clearFilters = () => {
    setActiveCategory("all");
    setActivePriceRange("all");
    setActiveRelation("all");
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">The Collection</span>
          <h1 className="text-5xl font-serif text-text-main italic mb-4">Discovery Shop</h1>
          <p className="text-soft-gray text-base font-light leading-relaxed max-w-xl mx-auto">
            Refine our handcrafted collection to find the perfect signature gesture for your special moments.
          </p>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5 space-y-8 sticky top-32">
            <div className="flex justify-between items-center pb-4 border-b border-text-main/10">
              <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-accent-gold" />
                Filters
              </h2>
              {(activeCategory !== "all" || activePriceRange !== "all" || activeRelation !== "all") && (
                <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:underline">
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Category</h3>
              <div className="flex flex-col gap-2 font-medium text-sm text-soft-gray">
                {[
                  { label: "All Masterpieces", value: "all" },
                  { label: "Signature Bouquets", value: "bouquets" },
                  { label: "Themed Hampers", value: "hampers" },
                  { label: "Eid Hampers", value: "eid-hampers" }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveCategory(opt.value)}
                    className={`text-left py-1 hover:text-accent-gold transition-colors ${
                      activeCategory === opt.value ? "text-accent-gold font-bold" : ""
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Price range</h3>
              <div className="flex flex-col gap-2 font-medium text-sm text-soft-gray">
                {["all", "Under ₹2,000", "₹2,000 - ₹5,000", "₹5,000 - ₹10,000", "Above ₹10,000"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActivePriceRange(opt)}
                    className={`text-left py-1 hover:text-accent-gold transition-colors ${
                      activePriceRange === opt ? "text-accent-gold font-bold" : ""
                    }`}
                  >
                    {opt === "all" ? "Any Price" : opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Relation/Recipient Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Recipient</h3>
              <div className="flex flex-col gap-2 font-medium text-sm text-soft-gray">
                {["all", "For Her", "For Him", "For Parents", "For Siblings", "For Colleagues", "For Couples"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActiveRelation(opt)}
                    className={`text-left py-1 hover:text-accent-gold transition-colors ${
                      activeRelation === opt ? "text-accent-gold font-bold" : ""
                    }`}
                  >
                    {opt === "all" ? "For Anyone" : opt}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Mobile Filter Toggle */}
            <div className="flex justify-between items-center lg:hidden bg-white p-4 rounded-2xl shadow-sm border border-text-main/5">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 font-bold text-sm text-text-main hover:text-accent-gold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Refine Selection
              </button>
              <span className="text-xs text-soft-gray font-bold">{filteredProducts.length} Treasures</span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] shadow-premium border border-text-main/5">
                <h3 className="text-2xl font-serif italic text-soft-gray mb-3">No Treasures Match</h3>
                <p className="text-sm text-soft-gray max-w-xs mx-auto mb-6">
                  Try clearing your filters or exploring another elegant collection category.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-text-main text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-accent-gold hover:text-text-main transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative group rounded-[2rem] overflow-hidden bg-white shadow-premium hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-text-main/5 flex flex-col h-full"
                  >
                    <div className="relative w-full aspect-[4/5] bg-primary/10 overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute top-5 left-5 z-20">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
                          {product.tag}
                        </span>
                      </div>

                      <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2">
                        <Link
                          href="/shop/custom-box"
                          className="px-3 py-2 bg-text-main text-white text-[9px] font-bold uppercase tracking-[0.3em] rounded-full shadow-lg"
                        >
                          Customize
                        </Link>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2 lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <Link
                          href="/shop/custom-box"
                          className="w-full py-3 text-center font-bold rounded-2xl bg-accent-gold/95 text-text-main text-[11px] uppercase tracking-widest shadow-2xl hover:bg-accent-gold transition-all"
                        >
                          Customize This Item
                        </Link>
                        <button
                          onClick={() => handleQuickAdd(product.id, product)}
                          className={`w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-2xl text-sm uppercase tracking-widest ${
                            addedItems[product.id]
                              ? "bg-accent-sage text-white scale-95"
                              : "bg-white text-text-main hover:bg-text-main hover:text-white"
                          }`}
                        >
                          {addedItems[product.id] ? (
                            <>
                              <Check className="w-4 h-4" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              Quick Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col gap-3 bg-white relative z-10 flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl md:text-2xl font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2 min-h-[3.2rem]">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-md shrink-0 mt-1">
                          <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
                          <span className="text-xs font-bold text-text-main">5.0</span>
                        </div>
                      </div>
                      <p className="text-lg font-sans text-soft-gray font-medium tracking-tight">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-secondary z-[70] shadow-2xl rounded-t-[3rem] p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-text-main/10">
                <h2 className="font-serif text-2xl font-bold flex items-center gap-2">Refine Selection</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8 pb-12">
                {/* Category */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Category</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { label: "All Items", value: "all" },
                      { label: "Bouquets", value: "bouquets" },
                      { label: "Hampers", value: "hampers" },
                      { label: "Eid Hampers", value: "eid-hampers" }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setActiveCategory(opt.value);
                          setMobileFiltersOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full border transition-all ${
                          activeCategory === opt.value
                            ? "bg-text-main border-text-main text-white"
                            : "border-text-main/10 bg-white text-soft-gray"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Price range</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {["all", "Under ₹2,000", "₹2,000 - ₹5,000", "₹5,000 - ₹10,000", "Above ₹10,000"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setActivePriceRange(opt);
                          setMobileFiltersOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full border transition-all ${
                          activePriceRange === opt
                            ? "bg-text-main border-text-main text-white"
                            : "border-text-main/10 bg-white text-soft-gray"
                        }`}
                      >
                        {opt === "all" ? "Any Price" : opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-text-main/60">Recipient</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {["all", "For Her", "For Him", "For Parents", "For Siblings", "For Colleagues", "For Couples"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setActiveRelation(opt);
                          setMobileFiltersOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full border transition-all ${
                          activeRelation === opt
                            ? "bg-text-main border-text-main text-white"
                            : "border-text-main/10 bg-white text-soft-gray"
                        }`}
                      >
                        {opt === "all" ? "For Anyone" : opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-accent-gold font-serif italic text-xl animate-pulse">Loading Collections...</div>
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}
