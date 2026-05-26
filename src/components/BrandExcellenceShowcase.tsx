"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  category: string;
}

export default function BrandExcellenceShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const { data, error } = await supabase
           .from("products")
           .select("id, name, price, strike_price, image, category")
           .order("created_at", { ascending: false })
           .limit(6);

        // Supabase returns an `error` object when something goes wrong.
        if (error) {
          // Log the error object directly and also try to extract common Supabase error fields
          console.error("Supabase error fetching products - full error object:", error);
          console.error("Supabase error details:", {
            message: (error as any)?.message,
            code: (error as any)?.code,
            details: (error as any)?.details,
            hint: (error as any)?.hint,
            status: (error as any)?.status,
            path: (error as any)?.path,
            stack: (error as any)?.stack,
          });

          // Check for common error scenarios
          if ((error as any)?.code === "PGRST116") {
            console.error("Table 'products' not found or no read access. Check Supabase schema and RLS policies.");
          } else if ((error as any)?.code === "PGRST301") {
            console.error("Row-level security policy denied access. Check RLS policies on 'products' table.");
          } else if ((error as any)?.code === "42501") {
            console.error("Insufficient privileges. Ensure the 'products' table exists and has proper permissions.");
          } else if ((error as any)?.code === "42703") {
            console.error("Column not found. Check if the requested columns exist in the 'products' table.");
          }

          setProducts([]);
          return;
        }

        setProducts(data || []);
      } catch (err) {
        // Catch unexpected runtime errors and log useful fields.
        const e = err as any;
        console.error("Unexpected error fetching products:", {
          message: e?.message ?? String(e),
          stack: e?.stack,
          error: e,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-sage/20" />

      <div className="absolute inset-0 p-6 flex flex-col items-center justify-start pt-16">
        {loading ? (
          <div className="w-72 h-72 bg-white/10 rounded-2xl animate-pulse" />
        ) : products.length > 0 && currentProduct ? (
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Product Image Carousel */}
            <Link
              href={`/product/${currentProduct.id}`}
              className="group relative w-72 h-72 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </Link>

            {/* Product Info - Below Image */}
            <div className="mt-8 text-center w-full">
              <p className="text-white text-2xl font-bold mb-2">{currentProduct.name}</p>
              <div className="flex items-center justify-center gap-4 mb-8">
                {currentProduct.strike_price && currentProduct.strike_price > currentProduct.price && (
                  <span className="text-xl text-white/60 line-through decoration-red-400">
                    ₹{currentProduct.strike_price.toLocaleString("en-IN")}
                  </span>
                )}
                <p className="text-accent-gold text-3xl font-bold">₹{currentProduct.price.toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 my-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-3 items-center">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? "bg-accent-gold w-8 h-3" 
                        : "bg-white/40 hover:bg-white/60 w-3 h-3"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Label */}
            <div className="text-center mt-8">
              <span className="text-white/60 text-[11px] tracking-[0.2em] font-bold uppercase block mb-2">Brand Excellence</span>
              <h3 className="text-4xl font-serif text-white italic">Curated Perfection</h3>
            </div>
          </div>
        ) : (
          <div className="text-white text-center mt-16">
            <p className="text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
}