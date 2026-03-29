import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 flex flex-col items-center justify-center max-w-lg mx-auto py-24 text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 animate-pulse shadow-xl">
           <ShoppingBag className="w-10 h-10 text-accent-gold" />
        </div>
        <h1 className="text-4xl font-serif mb-4 italic">Your bag is empty</h1>
        <p className="text-sm text-soft-gray mb-10 italic">Start your luxury gifting journey and discover curated moments.</p>
        <Link 
          href="/shop"
          className="flex items-center gap-2 group px-8 py-4 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl"
        >
          Begin Discovery
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <MobileBottomNav />
    </main>
  );
}
