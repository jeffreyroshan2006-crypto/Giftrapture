import Link from "next/link";
import Image from "next/image";
import { Camera, Globe, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-24 pb-32 md:pb-12 px-6 border-t border-text-main/5 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="mb-8 flex flex-col lg:flex-row items-center gap-4 group">
               <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/logo.png" 
                    alt="Gift Rapture" 
                    fill 
                    className="object-contain"
                  />
               </div>
               <div className="flex flex-col text-center lg:text-left">
                  <span className="font-serif text-2xl tracking-tighter font-bold text-text-main">GIFT RAPTURE</span>
                  <p className="text-[10px] tracking-[0.2em] font-sans text-accent-sage uppercase font-medium mt-1">Curated Elegance</p>
               </div>
            </Link>
            <p className="text-soft-gray text-sm md:text-base mb-8 max-w-xs font-sans tracking-tight leading-relaxed">
              Your premier destination for high-end luxury gifting, artistic bouquets, and bespoke trousseau services.
            </p>
            <div className="flex space-x-6 text-text-main justify-center lg:justify-start w-full">
              <Link href="#" className="hover:text-accent-gold transition-colors"><Camera className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-accent-gold transition-colors"><Globe className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-accent-gold transition-colors"><MessageSquare className="w-6 h-6" /></Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-xl font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-soft-gray text-sm font-medium tracking-tight">
              <li><Link href="/shop/luxury-bouquets" className="hover:text-text-main transition-colors">Luxury Bouquets</Link></li>
              <li><Link href="/shop/themed-hampers" className="hover:text-text-main transition-colors">Themed Hampers</Link></li>
              <li><Link href="/shop/eid-hampers" className="hover:text-text-main transition-colors">EID Hampers</Link></li>
              <li><Link href="/shop/custom-box" className="hover:text-text-main transition-colors">Make Your Own Box</Link></li>
              <li><Link href="/about" className="hover:text-text-main transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-text-main transition-colors">Blogs</Link></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-xl font-bold mb-6">Policies</h4>
            <ul className="space-y-4 text-soft-gray text-sm font-medium tracking-tight">
              <li><Link href="/policies/shipping" className="hover:text-text-main transition-colors">Shipping Policy</Link></li>
              <li><Link href="/policies/returns" className="hover:text-text-main transition-colors">Return & Refund Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-text-main transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-text-main transition-colors">Privacy Policy</Link></li>
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
            
            <div className="mt-8 pt-8 border-t border-text-main/10 w-full">
               <span className="text-[10px] uppercase font-bold tracking-widest text-text-main/40 mb-4 block">Popular Searches</span>
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-soft-gray font-medium">
                  <Link href="/search?q=Corporate+gifts" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">Corporate gifts</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=Wedding+gifts" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">Wedding gifts</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=EID+gifts" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">EID gifts</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=Gifts+Chennai" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">Gifts Chennai</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=Gifts+Mumbai" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">Gifts Mumbai</Link>
                  <span>&bull;</span>
                  <Link href="/search?q=Gifts+Bangalore" className="hover:text-text-main underline decoration-text-main/20 underline-offset-4">Gifts Bangalore</Link>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-text-main/5 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.2em] text-soft-gray font-bold">
          <p>© {new Date().getFullYear()} Gift Rapture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
