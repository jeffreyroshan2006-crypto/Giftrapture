"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export default function BrandExcellenceShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, price, image_url, category")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-sage/20" />

      <div className="absolute inset-0 p-6">
        <div className="grid grid-cols-2 gap-3 h-full">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/10 rounded-lg animate-pulse">
                  <div className="aspect-square bg-white/20 rounded-lg" />
                </div>
              ))}
            </>
          ) : (
            <>
              {products.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group relative overflow-hidden rounded-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-square bg-white/10 backdrop-blur-sm relative">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                      sizes="(max-width: 400px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-[10px] font-bold truncate">{product.name}</p>
                    <p className="text-accent-gold text-[10px] font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="relative z-10">
            <span className="text-white/60 text-[10px] tracking-widest font-bold uppercase mb-1 block">Brand Excellence</span>
            <h3 className="text-xl font-serif text-white">Curated <br /> Perfection</h3>
          </div>
        </div>
      </div>
    </div>
  );
}