import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import PortfolioGrid from "@/components/PortfolioGrid";
import BespokePreviewBox from "@/components/BespokePreviewBox";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <FeaturedCarousel />

      {/* Bestsellers Portfolio Grid */}
      <PortfolioGrid />

      {/* Make Your Own Box Promo */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-primary/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden flex flex-col items-center justify-center border border-accent-gold/20">
          <span className="text-accent-sage text-[10px] tracking-[0.3em] font-sans uppercase font-bold mb-4 block">Customized For Them</span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-main mb-6 italic">Make Your Own Box</h2>
          <p className="text-soft-gray mb-8 max-w-xl text-center">
            Handpick every item from our curated collection to build a hamper that truly speaks to their heart.
          </p>
          <Link
            href="/shop/custom-box"
            className="inline-flex items-center gap-2 group px-8 py-4 bg-accent-gold text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            Start Building
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Shop by Collections (Price & Relations) */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-24">
        {/* Shop by Price */}
        <div>
          <h3 className="text-3xl font-serif text-center mb-12 italic">Shop by Price</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', 'Above ₹10,000'].map((price) => (
              <Link 
                key={price} 
                href={`/shop?price=${encodeURIComponent(price)}`}
                className="px-8 py-4 rounded-full border border-text-main/10 hover:border-accent-gold hover:text-accent-gold transition-colors font-medium text-sm text-text-main bg-white shadow-sm"
              >
                {price}
              </Link>
            ))}
          </div>
        </div>

        {/* Shop by Relations */}
        <div>
          <h3 className="text-3xl font-serif text-center mb-12 italic">Shop by Relation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { label: 'For Her', icon: '💎', color: 'from-accent-gold/20 to-accent-gold/5', border: 'border-accent-gold/30' },
              { label: 'For Him', icon: '👔', color: 'from-slate-300/20 to-slate-300/5', border: 'border-slate-400/30' },
              { label: 'For Parents', icon: '👨👩👧', color: 'from-accent-sage/20 to-accent-sage/5', border: 'border-accent-sage/30' },
              { label: 'For Siblings', icon: '🤝', color: 'from-blue-200/20 to-blue-200/5', border: 'border-blue-300/30' },
              { label: 'For Colleagues', icon: '💼', color: 'from-amber-100/20 to-amber-100/5', border: 'border-amber-200/30' },
              { label: 'For Couples', icon: '❤️', color: 'from-rose-200/20 to-rose-200/5', border: 'border-rose-300/30' }
            ].map((relation) => (
              <Link 
                key={relation.label} 
                href={`/shop?relation=${encodeURIComponent(relation.label)}`}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/80 to-white/40 border border-text-main/5 p-4 md:p-6 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-500 hover:border-text-main/10"
              >
                {/* Decorative background circle */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${relation.color} opacity-50 group-hover:scale-150 transition-transform duration-700`} />
                
                <div className={`relative z-10 w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${relation.color} ${relation.border} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 text-xl`}>
                  {relation.icon}
                </div>
                <span className="relative z-10 text-sm md:text-base font-bold text-text-main group-hover:text-accent-gold transition-colors duration-300">
                  {relation.label}
                </span>
                <div className="mt-2 relative z-10">
                  <span className="text-xs text-soft-gray group-hover:text-accent-gold transition-colors duration-300 inline-flex items-center gap-1">
                    Explore 
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-primary/10 border-y border-accent-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-gold text-[10px] tracking-[0.3em] font-sans uppercase font-bold mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-serif mb-16 italic">Words of Rapture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The presentation was breathtaking. It felt less like a gift and more like an experience.", author: "Aanya S." },
              { text: "We trusted them with our corporate Diwali hampers, and the feedback was incredible.", author: "Rajiv M." },
              { text: "Perfect trousseau packing! It was elegant, cohesive, and incredibly refined.", author: "Sneha V." }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center">
                <p className="text-soft-gray italic mb-6">"{review.text}"</p>
                <p className="font-bold text-sm text-text-main">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}
