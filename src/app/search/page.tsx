"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Image from "next/image";
import { Star, ShoppingBag, Heart, Search, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useMemo, Suspense } from "react";

// Combined Product Pool for search
const ALL_PRODUCTS = [
  // Bouquets
  { id: "bq-1", name: "Velvet Crimson Rose", price: 3499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller", category: "bouquets" },
  { id: "bq-2", name: "Ethereal White Lilies", price: 2999, image: "/images/bouquets/IMG_3894.jpg", tag: "Classic", category: "bouquets" },
  { id: "bq-3", name: "Blush Peony Symphony", price: 4200, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium", category: "bouquets" },
  { id: "bq-4", name: "Midnight Orchid Cascade", price: 5499, image: "/images/bouquets/IMG_3897.jpg", tag: "Luxury", category: "bouquets" },
  { id: "bq-5", name: "Sunset Orange Tulips", price: 2750, image: "/images/bouquets/IMG_3898.jpg", tag: "Seasonal", category: "bouquets" },
  { id: "bq-6", name: "Golden Sunflower Burst", price: 2299, image: "/images/bouquets/IMG_3926.png", tag: "Vibrant", category: "bouquets" },
  { id: "bq-7", name: "Pastel Hydrangea Cloud", price: 3800, image: "/images/bouquets/IMG_3927.png", tag: "Elegant", category: "bouquets" },
  { id: "bq-8", name: "Royal Purple Iris", price: 3100, image: "/images/bouquets/IMG_3928.png", tag: "Exotic", category: "bouquets" },
  { id: "bq-9", name: "Wildflower Meadows", price: 2650, image: "/images/bouquets/IMG_3930.png", tag: "Rustic", category: "bouquets" },
  { id: "bq-10", name: "Scarlet Passion Mix", price: 4500, image: "/images/bouquets/IMG_3931.png", tag: "Romantic", category: "bouquets" },
  { id: "bq-11", name: "Frosty Morning Blooms", price: 3300, image: "/images/bouquets/IMG_3932.png", tag: "Fresh", category: "bouquets" },
  { id: "bq-12", name: "Enchanted Forest Ferns", price: 2899, image: "/images/bouquets/IMG_3933.png", tag: "Verdant", category: "bouquets" },
  { id: "bq-13", name: "Candy Pink Carnations", price: 1999, image: "/images/bouquets/IMG_3936.png", tag: "Sweet", category: "bouquets" },
  { id: "bq-14", name: "Sapphire Blue Delphinium", price: 4100, image: "/images/bouquets/IMG_3937.png", tag: "Rare", category: "bouquets" },
  { id: "bq-15", name: "Majestic Imperial Lily", price: 5999, image: "/images/bouquets/IMG_3941.png", tag: "Signature", category: "bouquets" },

  // Hampers
  { id: "hm-1", name: "Royal Celebration Hamper", price: 7499, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium", category: "hampers" },
  { id: "hm-2", name: "Gilded Indulgence Box", price: 6999, image: "/images/themed-hampers/IMG_3899.jpg", tag: "Luxury", category: "hampers" },
  { id: "hm-3", name: "Velvet Treasure Chest", price: 5499, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller", category: "hampers" },
  { id: "hm-4", name: "Midnight Bliss Hamper", price: 8200, image: "/images/themed-hampers/IMG_3912.jpg", tag: "Signature", category: "hampers" },
  { id: "hm-5", name: "Golden Glow Festive Basket", price: 4999, image: "/images/themed-hampers/IMG_3914.jpg", tag: "Festive", category: "hampers" },
  { id: "hm-6", name: "Classic Elegance Trunk", price: 6200, image: "/images/themed-hampers/IMG_3915.jpg", tag: "Classic", category: "hampers" },
  { id: "hm-7", name: "Opulent Harvest Tray", price: 3899, image: "/images/themed-hampers/IMG_3916.jpg", tag: "Organic", category: "hampers" },
  { id: "hm-8", name: "Champagne & Roses Box", price: 9500, image: "/images/themed-hampers/IMG_3917.jpg", tag: "Ultimate", category: "hampers" },
  { id: "hm-9", name: "Sweet Serenade Basket", price: 4500, image: "/images/themed-hampers/IMG_3918.png", tag: "Sweet", category: "hampers" },
  { id: "hm-10", name: "Blossom & Bites Platter", price: 5100, image: "/images/themed-hampers/IMG_3920.png", tag: "Curated", category: "hampers" },
  { id: "hm-11", name: "Gourmet Symphony Trunk", price: 7999, image: "/images/themed-hampers/IMG_3921.png", tag: "Gourmet", category: "hampers" },
  { id: "hm-12", name: "Aura of Gold Hamper", price: 6750, image: "/images/themed-hampers/IMG_3922.png", tag: "Limited", category: "hampers" },
  { id: "hm-13", name: "Pink Petal Perfection Box", price: 4200, image: "/images/themed-hampers/IMG_3923.png", tag: "Romantic", category: "hampers" },
  { id: "hm-14", name: "Luxury Artisan Casket", price: 8900, image: "/images/themed-hampers/IMG_3929.png", tag: "Custom", category: "hampers" },
  { id: "hm-15", name: "Ethereal Treats Tray", price: 3600, image: "/images/themed-hampers/IMG_3938.jpg", tag: "Delight", category: "hampers" },
  { id: "hm-16", name: "Deluxe Wellness Hamper", price: 5800, image: "/images/themed-hampers/IMG_3940.jpg", tag: "Wellness", category: "hampers" },

  // Eid Hampers
  { id: "eh-1", name: "Al-Noor Premium Eid Box", price: 6499, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers" },
  { id: "eh-2", name: "Hilal Delights Basket", price: 5200, image: "/images/eid-hampers/IMG_3942.png", tag: "Festive", category: "eid-hampers" },
  { id: "eh-3", name: "Royal Mubarak Trunk", price: 8500, image: "/images/eid-hampers/IMG_3943.png", tag: "Luxury", category: "eid-hampers" },
  { id: "eh-4", name: "Sacred Bloom Platter", price: 4800, image: "/images/eid-hampers/IMG_3944.png", tag: "Elegant", category: "eid-hampers" },
  { id: "eh-5", name: "Barakah Abundance Hamper", price: 7299, image: "/images/eid-hampers/IMG_3945.png", tag: "Bestseller", category: "eid-hampers" },
  { id: "eh-6", name: "Zamarud Gold Artisan Tray", price: 3999, image: "/images/eid-hampers/IMG_3946.png", tag: "Handcrafted", category: "eid-hampers" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const addItem = useCartStore((state) => state.addItem);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (productId: string, product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    setAddedItems(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.toLowerCase();
    return ALL_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(normalized) || p.tag.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        {/* Elegant Search Input */}
        <div className="max-w-xl mx-auto mb-16 text-center">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Discovery</span>
          <h1 className="text-4xl font-serif mb-8 italic text-text-main">Search Collection</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search bouquets, hampers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full border border-text-main/10 bg-white text-base shadow-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
            />
            <Search className="absolute left-4 top-4.5 w-5 h-5 text-soft-gray" />
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif italic text-soft-gray mb-4">No treasures found</h2>
            <p className="text-sm text-soft-gray max-w-xs mx-auto">
              {query ? "Try entering different keywords like 'rose', 'royal', or 'eid'." : "Enter a search term above to begin discovery."}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs uppercase tracking-widest text-soft-gray font-bold mb-8 text-center sm:text-left">
              Found {results.length} exquisite match{results.length > 1 ? "es" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="relative group rounded-[2rem] overflow-hidden bg-white shadow-premium hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-text-main/5"
                >
                  <div className="relative w-full aspect-[4/5] bg-primary/10 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute top-5 left-5 z-20">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-text-main shadow-sm">
                        {product.tag}
                      </span>
                    </div>

                    <button className="absolute top-5 right-5 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-text-main hover:text-accent-gold hover:scale-110 transition-all duration-300 shadow-sm lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-4 lg:group-hover:translate-y-0">
                      <Heart className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-center lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
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

                  <div className="p-6 md:p-8 flex flex-col gap-3 bg-white relative z-10">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-xl md:text-2xl font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300">
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
          </div>
        )}
      </div>

      <MobileBottomNav />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-accent-gold font-serif italic text-xl animate-pulse">Loading Treasures...</div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}
