import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Giftrapture",
  description: "Learn about the philosophy and craftsmanship behind Gift Rapture's signature curated gifts.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <span className="text-accent-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block">
          Our Story
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-text-main mb-8 leading-tight tracking-tighter">
          Artistry in <span className="italic font-light">Gifting</span>
        </h1>
        <p className="text-soft-gray text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl mx-auto italic">
          "A gift is not merely an object; it is a bridge of emotion, a tangible whisper of care, and an experience that lingers."
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] bg-primary/20 rounded-[3rem] overflow-hidden relative shadow-premium border border-text-main/5">
          <Image
            src="/images/themed-hampers/IMG_3912.jpg"
            alt="Gift Philosophy"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif italic text-text-main">The Philosophy</h2>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            Gift Rapture was born out of a desire to elevate gifting from a routine transaction into a deeply personalized and memorable experience. We believe that true refinement lies in the details—the texture of the handmade box, the fragrance of fresh blooms, the selection of the finest treats, and the precision of the presentation.
          </p>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            Every bouquet we craft, every hamper we curate, and every bespoke trunk we pack is a testament to this philosophy. We search globally and source locally to present you with options that stand out and make your recipients feel genuinely cherished.
          </p>
        </div>
      </section>

      {/* Craft Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-serif italic text-text-main">The Craftsmanship</h2>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            From our signature leather trunks to reusable wooden boxes and exquisite velvet cases, we make sure that our packaging is just as precious as what lies inside. We collaborate with master artisans, florists, and gourmet curators to select high-grade nuts, fine chocolates, premium teas, and signature wellness items.
          </p>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            Whether you are choosing a single bouquet to celebrate an anniversary or seeking hundreds of tailored boxes for corporate partnerships, our team handles each request with the utmost attention, respect, and artistic refinement.
          </p>
        </div>
        <div className="aspect-[4/5] bg-primary/20 rounded-[3rem] overflow-hidden relative shadow-premium border border-text-main/5 order-1 md:order-2">
          <Image
            src="/images/bouquets/IMG_3941.png"
            alt="Gift Crafting"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Philosophy Call To Action */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-premium border border-text-main/5 space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif italic text-text-main">ExperienceCurated Elegance</h2>
          <p className="text-soft-gray max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Discover our premium bouquets, custom boxes, themed hampers, and holiday arrangements today. Let us make your next gesture extraordinary.
          </p>
          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 group px-8 py-4 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Browse Collections
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}
