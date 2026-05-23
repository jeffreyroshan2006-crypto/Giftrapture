"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useMemo, use, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Star, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dynamic Product Details Pool
const PRODUCTS_POOL: Record<string, {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  description: string;
  inclusions: string[];
  reviews: { author: string; text: string; rating: number }[];
}> = {
  "royal-azure": {
    id: "bs-1",
    name: "The Royal Azure Box",
    price: 6800,
    image: "/images/themed-hampers/IMG_3723.jpg",
    tag: "Bestseller",
    description: "Our signature premium hamper packed in a majestic indigo leather trunk, decorated with dried golden lavender stems. Features top-tier organic dry fruits, custom almond dragees, and an exquisite scented soy candle.",
    inclusions: ["Indigo Leather Trunk with Brass Latch", "Gourmet Roasted Salted Almonds (200g)", "Artisanal White Chocolate Dragees (150g)", "Midnight Lavender Scented Candle", "Handwritten Calligraphy Wish Card"],
    reviews: [
      { author: "Ananya S.", text: "Absolutely stunning presentation. It looked so grand and royal!", rating: 5 },
      { author: "Vikram K.", text: "High quality leather trunk, and the chocolates were divine.", rating: 5 }
    ]
  },
  "blush-peony": {
    id: "bs-2",
    name: "Blush Peony Symphony",
    price: 4200,
    image: "/images/bouquets/IMG_3895.jpg",
    tag: "Premium",
    description: "An elegant, hand-tied premium floral bouquet showcasing premium blush Dutch peonies, miniature pastel pink roses, and fresh eucalyptus foliage, wrapped in heavy waterproof Parisian craft paper.",
    inclusions: ["10 Fresh Imported Blush Peonies", "8 Premium Miniature Pink Roses", "Fresh Eucalyptus Stems", "Parisian Waterproof Wrapping & Silk Ribbon", "Water-pack hydration wrapping"],
    reviews: [
      { author: "Sneha R.", text: "Peonies are incredibly hard to find fresh. These were pristine and smelled beautiful!", rating: 5 }
    ]
  },
  "corporate-kit": {
    id: "bs-3",
    name: "Corporate Executive Kit",
    price: 9999,
    image: "/images/themed-hampers/IMG_3899.jpg",
    tag: "Signature",
    description: "A state-of-the-art corporate gifting case engineered for executive partnerships. Conceived with premium writing tools, insulated thermal cups, gourmet teas, and custom leather accessories.",
    inclusions: ["Sleek Charcoal Wooden Case with Logo Slot", "Insulated Brushed Gold Thermos (500ml)", "Handmade Leather Journal with Pen", "Assorted Kashmiri Saffron Tea Bags (20)", "Single Estate Organic Honey Jar with Dipper"],
    reviews: [
      { author: "Meghna D.", text: "Our clients absolutely loved these for Diwali. Great corporate finish.", rating: 5 }
    ]
  },
  "trousseau-trunk": {
    id: "bs-4",
    name: "Classic Trousseau Trunk",
    price: 15000,
    image: "/images/themed-hampers/IMG_3915.jpg",
    tag: "Wedding Special",
    description: "An opulent wedding trousseau chest made of sheer wood and brass. Beautifully decorated with pastel roses, orchids, and custom net wrapping. The ultimate chest for bridal blessings.",
    inclusions: ["Opulent Pine Wood Trousseau Trunk", "Pastel Silk Net Draping & Floral Garlands", "Curated Signature Scented Drawer Sachets", "Custom gold foil greeting board"],
    reviews: [
      { author: "Rahul P.", text: "Beautifully decorated! It became the centerpiece of our wedding gifts.", rating: 5 }
    ]
  },
  "bq-6": {
    id: "bq-6",
    name: "Classic Ranunculus Bouquet",
    price: 2499,
    image: "/images/bouquets/IMG_3926.png",
    tag: "Best Seller",
    description: "A breathtaking hand-tied bouquet featuring fresh imported ranunculus, garden roses, and eucalyptus foliage, wrapped in premium Parisian craft paper. Perfect for birthdays, anniversaries, and heartfelt celebrations.",
    inclusions: ["Fresh Imported Ranunculus Stems", "Premium Garden Roses", "Fresh Eucalyptus Foliage", "Parisian Craft Paper Wrapping & Silk Ribbon", "Handwritten Luxury Note Card"],
    reviews: [
      { author: "Priya M.", text: "The ranunculus were incredibly fresh and lasted over a week. Stunning presentation!", rating: 5 },
      { author: "Arjun K.", text: "Beautiful bouquet, exactly as pictured. My wife loved it.", rating: 5 }
    ]
  },
  "hm-6": {
    id: "hm-6",
    name: "Signature Silk Trousseau Box",
    price: 5999,
    image: "/images/themed-hampers/IMG_3915.jpg",
    tag: "Handcrafted",
    description: "An exquisite silk-lined trousseau box crafted for weddings and bridal gifting. Filled with premium keepsakes, artisanal treats, and a bespoke fragrance collection, wrapped in hand-dyed silk and finished with a wax seal.",
    inclusions: ["Handcrafted Silk-Lined Wooden Box", "Artisanal Almond & Saffron Brittle (200g)", "Bespoke Luxury Scented Candle", "Hand-Embroidered Silk Pouch with Keepsakes", "Personalised Greeting Card with Wax Seal"],
    reviews: [
      { author: "Lakshmi R.", text: "The presentation was absolutely royal! The silk lining made it feel so luxurious.", rating: 5 },
      { author: "Devika S.", text: "Perfect for my sister's wedding. Every item inside felt curated with love.", rating: 5 }
    ]
  },
  "hm-3": {
    id: "hm-3",
    name: "Artisanal Chocolate Hamper",
    price: 3250,
    image: "/images/themed-hampers/IMG_3900.jpg",
    tag: "Indulgent",
    description: "A decadent hamper for the true chocolate connoisseur, featuring an assortment of single-origin, bean-to-bar chocolates, handmade truffles, and premium cocoa-dipped almonds, presented in a reusable luxury keepsake box.",
    inclusions: ["Reusable Luxury Wooden Keepsake Box", "Single-Origin Dark Chocolate Bar (70%)", "Handmade Hazelnut Truffles (12 pcs)", "Premium Cocoa-Dipped Almonds (150g)", "Artisan Hot Cocoa Mix with Whisk"],
    reviews: [
      { author: "Rohan T.", text: "Best chocolate hamper I've ever gifted. The single-origin bar was exceptional.", rating: 5 },
      { author: "Ananya P.", text: "Looks so premium and tastes even better. Will definitely reorder.", rating: 5 }
    ]
  },
  "bq-3": {
    id: "bq-3",
    name: "Premium Peony Arrangement",
    price: 4799,
    image: "/images/bouquets/IMG_3893.jpg",
    tag: "Limited Edition",
    description: "An opulent arrangement of the finest imported Dutch peonies, hand-selected at peak bloom, paired with soft blush roses and cascading greenery. A rare and luxurious floral gift for the most discerning recipient.",
    inclusions: ["12 Fresh Imported Dutch Peonies", "8 Premium Blush Roses", "Seasonal Eucalyptus & Dusty Miller", "Elegant Vase-Ready Wrapping", "Care Guide & Hydration Sachet"],
    reviews: [
      { author: "Meera J.", text: "Peonies are my favourite and these were absolutely perfect. Full, fluffy, and incredibly fragrant.", rating: 5 },
      { author: "Kunal S.", text: "Worth every rupee. The arrangement looked like it came straight from a luxury florist in London.", rating: 5 }
    ]
  }
};

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  description: string;
  inclusions: string[];
  reviews: { author: string; text: string; rating: number }[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const poolProduct = useMemo(() => PRODUCTS_POOL[id], [id]);
  const [product, setProduct] = useState<ProductDetail | null>(poolProduct || null);
  const [loading, setLoading] = useState(!poolProduct);
  const [fetchError, setFetchError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const [successMessage, setSuccessMessage] = useState(false);
  const [shippingZone, setShippingZone] = useState("chennai");
  const [shippingSpeed, setShippingSpeed] = useState("standard");

  useEffect(() => {
    if (poolProduct) {
      setProduct(poolProduct);
      setLoading(false);
      return;
    }

    async function fetchDbProduct() {
      setLoading(true);
      try {
        const { supabase } = await import("@/lib/supabaseClient");
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("slug", `${id}%`)
          .maybeSingle();

        if (error) {
          console.error("Error fetching product from Supabase:", error);
          setFetchError(true);
        } else if (!data) {
          // Product not found in Supabase — notFound() will serve the 404 page
          setFetchError(true);
        } else {
          // Fallbacks for luxury metadata if not fully specified in simple database rows
          const dbProduct = {
            id: data.id,
            name: data.name,
            price: Number(data.price),
            image: data.image,
            tag: data.tag || "Premium",
            description: data.description || "An exquisite selection curated by GIFTRAPTURE to bring elegance, luxury, and curated joy to your special gifting moments.",
            inclusions: Array.isArray(data.inclusions) 
              ? data.inclusions 
              : (typeof data.inclusions === "string" ? JSON.parse(data.inclusions) : ["Premium gift wrapping", "Signature Giftrapture satin ribbon", "Handwritten luxury note card"]),
            reviews: Array.isArray(data.reviews)
              ? data.reviews
              : [
                  { author: "Verified Patron", text: "Stunning presentation, top-notch quality, and incredibly fast delivery. Will order again!", rating: 5 }
                ]
          };
          setProduct(dbProduct);
        }
      } catch (err) {
        console.error("Failed to load product from DB:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDbProduct();
  }, [id, poolProduct]);

  const shippingCost = useMemo(() => {
    const base = shippingZone === "chennai" ? 150 : 450;
    const speedFee = shippingSpeed === "express" ? 300 : 0;
    return base + speedFee;
  }, [shippingZone, shippingSpeed]);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <Navbar />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-soft-gray font-serif italic text-lg">Curating your selection...</p>
        </div>
        <MobileBottomNav />
      </main>
    );
  }

  if (fetchError || !product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-soft-gray hover:text-text-main transition-colors mb-12 group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Product Image Column */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] w-full bg-primary/10 rounded-[3rem] overflow-hidden relative shadow-premium border border-text-main/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full text-xs uppercase tracking-widest font-bold text-text-main shadow-md">
                  {product.tag}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-1 bg-primary/20 px-3 py-1.5 rounded-full w-fit mb-4">
                <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                <span className="text-xs font-bold text-text-main">5.0 Star Praise</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-text-main mb-4 leading-tight">{product.name}</h1>
              <p className="text-3xl font-sans text-accent-gold font-bold">₹{product.price.toLocaleString("en-IN")}</p>
            </div>

            <p className="text-soft-gray leading-relaxed text-sm md:text-base font-sans font-light">
              {product.description}
            </p>

            {/* Inclusions List */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-text-main/5 shadow-sm space-y-4">
              <h3 className="font-serif italic text-lg font-bold text-text-main">Inclusions & Packaging</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-soft-gray font-sans font-medium">
                {product.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart & Quick Checkout Triggers */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main hover:scale-[1.02] flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" />
                Secure Selection (Add to Bag)
              </button>

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl text-center font-bold animate-pulse-slow">
                  ✓ Successfully added to your bag!
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-text-main/5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif italic text-lg font-bold text-text-main">Shipping Calculator</h3>
                <Link href="/delivery-info" className="text-[10px] uppercase tracking-widest font-bold text-accent-gold">
                  View Delivery Info
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-text-main/70">
                <div className="space-y-2">
                  <p>Delivery Zone</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "chennai", label: "Chennai" },
                      { id: "pan-india", label: "Pan-India" }
                    ].map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => setShippingZone(zone.id)}
                        className={`px-3 py-2 rounded-full border text-[10px] transition-all ${
                          shippingZone === zone.id
                            ? "bg-text-main text-white border-text-main"
                            : "border-text-main/10 text-soft-gray bg-secondary/20"
                        }`}
                      >
                        {zone.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p>Speed</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "standard", label: "Standard" },
                      { id: "express", label: "Express" }
                    ].map((speed) => (
                      <button
                        key={speed.id}
                        onClick={() => setShippingSpeed(speed.id)}
                        className={`px-3 py-2 rounded-full border text-[10px] transition-all ${
                          shippingSpeed === speed.id
                            ? "bg-text-main text-white border-text-main"
                            : "border-text-main/10 text-soft-gray bg-secondary/20"
                        }`}
                      >
                        {speed.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-text-main/10">
                <span className="text-xs uppercase tracking-widest text-soft-gray font-bold">Estimated Shipping</span>
                <span className="text-lg font-serif text-accent-gold font-bold">₹{shippingCost}</span>
              </div>
              <p className="text-[11px] text-soft-gray">Chennai same-day options may include a rush fee for select items.</p>
            </div>

            {/* Premium Trust Accoutrements */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-text-main/10 text-center font-sans text-[10px] uppercase tracking-wider font-bold text-soft-gray">
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5 text-accent-sage" />
                <span>Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent-sage" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 text-accent-sage" />
                <span>Premium Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-16 border-t border-text-main/10">
          <h2 className="text-3xl font-serif mb-12 italic text-center">Words of Appreciation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-text-main/5">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-soft-gray italic mb-6 text-sm">"{review.text}"</p>
                <p className="font-bold text-xs text-text-main">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
