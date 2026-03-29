import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import InstagramGrid from "@/components/InstagramGrid";
import { ArrowRight, Mail, Camera, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Category Bento Grid */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedCarousel />

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

      {/* Social Proof */}
      <InstagramGrid />

      {/* Footer */}
      <footer className="pt-24 pb-32 md:pb-12 px-6 border-t border-text-main/5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 mb-16">
            <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Link href="/" className="mb-8 flex items-center gap-4 group">
                 <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
                    <Image 
                      src="/images/logo.png" 
                      alt="Gift Rapture" 
                      fill 
                      className="object-contain"
                    />
                 </div>
                 <div className="flex flex-col text-left">
                    <span className="font-serif text-2xl tracking-tighter font-bold text-text-main">GIFT RAPTURE</span>
                    <p className="text-[10px] tracking-[0.2em] font-sans text-accent-sage uppercase font-medium mt-1">Curated Elegance</p>
                 </div>
              </Link>
              <p className="text-soft-gray text-sm md:text-base mb-8 max-w-xs font-sans tracking-tight leading-relaxed">
                Your premier destination for high-end luxury gifting, artistic bouquets, and bespoke trousseau services.
              </p>
              <div className="flex space-x-6 text-text-main">
                <Link href="#" className="hover:text-accent-gold transition-colors"><Camera className="w-6 h-6" /></Link>
                <Link href="#" className="hover:text-accent-gold transition-colors"><Globe className="w-6 h-6" /></Link>
                <Link href="#" className="hover:text-accent-gold transition-colors"><MessageSquare className="w-6 h-6" /></Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-serif text-xl font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-soft-gray text-sm font-medium tracking-tight">
                <li><Link href="#" className="hover:text-text-main transition-colors">Luxury Bouquets</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Themed Hampers</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Wedding Trousseau</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Occasional Hampers</Link></li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-serif text-xl font-bold mb-6">Concierge</h4>
              <ul className="space-y-4 text-soft-gray text-sm font-medium tracking-tight">
                <li><Link href="#" className="hover:text-text-main transition-colors">Corporate Gifting</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Bespoke Orders</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Track Order</Link></li>
                <li><Link href="#" className="hover:text-text-main transition-colors">Shipping & Returns</Link></li>
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="font-serif text-xl font-bold mb-6 italic">Gifts of Elegance, <span className="font-bold not-italic">Directly to You.</span></h4>
              <p className="text-soft-gray text-sm mb-6 max-w-xs font-sans tracking-tight">Subscribe for exclusive access to new collections and luxury gifting tips.</p>
              <div className="relative w-full max-w-sm">
                <input
                  type="email"
                  placeholder="Your exquisite email address"
                  className="w-full px-6 py-4 rounded-full border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all duration-300 font-sans tracking-tight italic"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-text-main text-white text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest hover:bg-accent-gold hover:text-text-main transition-all duration-300 shadow-xl">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-text-main/5 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.2em] text-soft-gray font-bold">
            <p>© 2024 Gift Rapture. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-text-main">Privacy Policy</Link>
              <Link href="#" className="hover:text-text-main">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </main>
  );
}
