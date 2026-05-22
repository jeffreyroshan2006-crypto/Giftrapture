import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import InstagramGrid from "@/components/InstagramGrid";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Mail, Camera, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <FeaturedCarousel />

      {/* Bestsellers Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-gold text-[10px] tracking-[0.3em] font-sans uppercase font-bold mb-4 block">Most Loved</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tighter italic">Bestsellers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            id="bs-1"
            name="The Royal Azure Box"
            regularPrice={7500}
            salePrice={6800}
            discountPercentage={9}
            image="/images/themed-hampers/IMG_3723.jpg"
            href="/product/royal-azure"
          />
          <ProductCard
            id="bs-2"
            name="Blush Peony Symphony"
            regularPrice={4200}
            image="/images/bouquets/IMG_3895.jpg"
            href="/product/blush-peony"
          />
          <ProductCard
            id="bs-3"
            name="Corporate Executive Kit"
            regularPrice={12000}
            salePrice={9999}
            discountPercentage={16}
            image="/images/themed-hampers/IMG_3899.jpg"
            href="/product/corporate-kit"
          />
          <ProductCard
            id="bs-4"
            name="Classic Trousseau Trunk"
            regularPrice={15000}
            image="/images/themed-hampers/IMG_3915.jpg"
            href="/product/trousseau-trunk"
          />
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 group px-8 py-3 border border-text-main text-text-main font-bold rounded-full transition-all duration-300 hover:bg-text-main hover:text-white"
          >
            View Entire Collection
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

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

      {/* Promotional Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto rounded-[3rem] md:rounded-[4rem] bg-text-main text-white p-8 md:p-20 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-sage/20 opacity-40 transition-opacity group-hover:opacity-60" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-accent-gold text-[10px] md:text-xs tracking-[0.3em] font-sans uppercase font-bold mb-6 block">
                Bespoke Services
              </span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-8 italic font-normal leading-tight">
                Crafting <span className="font-bold cursor-default">Extraordinary</span> Memories <br /> for Corporates & Weddings.
              </h2>
              <p className="text-white/60 text-sm md:text-lg mb-10 max-w-xl font-sans tracking-tight leading-relaxed">
                From customized branding for corporate events to exquisite trousseau packing for your big day, we bring your vision to life with precision and grace.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 group px-8 py-4 bg-white text-text-main font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Inquire for Custom Orders
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative w-full md:w-[400px] h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-6 transition-transform duration-700 group-hover:skew-y-0 transform-gpu bg-primary/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className="text-white/60 text-[10px] tracking-widest font-bold uppercase mb-2">Portfolio</span>
                <h3 className="text-2xl font-serif text-white">Classic Elegance <br /> Collection</h3>
              </div>
            </div>
          </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['For Her', 'For Him', 'For Parents', 'For Siblings', 'For Colleagues', 'For Couples'].map((relation) => (
              <Link 
                key={relation} 
                href={`/shop?relation=${encodeURIComponent(relation)}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 overflow-hidden border border-transparent group-hover:border-accent-gold/40">
                  <span className="font-serif italic text-lg text-text-main">{relation.split(' ')[1]}</span>
                </div>
                <span className="text-sm font-bold text-text-main">{relation}</span>
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
              { text: "Perfect trousseau packing! It was elegant, cohesive, and incredibly luxurious.", author: "Sneha V." }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center">
                <p className="text-soft-gray italic mb-6">"{review.text}"</p>
                <p className="font-bold text-sm text-text-main">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <InstagramGrid />

      <MobileBottomNav />
    </main>
  );
}
