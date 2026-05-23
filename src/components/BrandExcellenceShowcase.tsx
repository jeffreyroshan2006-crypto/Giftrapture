"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";

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
        const { data, error } = await getSupabaseClient()
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-sage/20" />
      
      {/* Product samples grid */}
      <div className="absolute inset-0 p-8">
        <div className="grid grid-cols-2 gap-4 h-full">
          {loading ? (
            // Loading skeleton
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/10 rounded-lg animate-pulse">
                  <div className="aspect-square bg-white/20 rounded-lg" />
                </div>
              ))}
            </>
          ) : (
            <>
              {products.slice(0, 6).map((product, index) => (
                <Link 
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group relative overflow-hidden rounded-lg hover:scale-105 transition-all duration-300"
                  style={{
                    gridArea: `span 1 / span 1`,
                    marginLeft: index % 2 === 0 ? '0' : '2px',
                    marginTop: index < 2 ? '0' : '2px'
                  }}
                >
                  <div className="aspect-square bg-white/10 backdrop-blur-sm">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                      sizes="(max-width: 400px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-bold truncate">{product.name}</p>
                    <p className="text-accent-gold text-xs font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        
        {/* Curated perfection overlay text */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="relative z-10">
            <span className="text-white/60 text-[10px] tracking-widest font-bold uppercase mb-2 block">Brand Excellence</span>
            <h3 className="text-2xl font-serif text-white">Curated <br /> Perfection</h3>
          </div>
        </div>
      </div>
    </div>
  );
}