import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Image from "next/image";

export const metadata = {
  title: "Our Story | Giftrapture",
  description: "Meet the founder and discover Gift Rapture's mission, values, and premium craftsmanship.",
};

const VALUES = [
  {
    title: "Premium Sourcing",
    detail: "We work with vetted growers, artisans, and gourmet partners to ensure only the finest items make it into your gift."
  },
  {
    title: "Handcrafted Detail",
    detail: "Every ribbon, filler, and card is assembled by hand for a bespoke finish."
  },
  {
    title: "Concierge Care",
    detail: "From consultation to delivery, we provide white-glove support to ensure every order feels effortless."
  }
];

const TESTIMONIALS = [
  {
    name: "Rhea Menon",
    quote: "The packaging was exquisite and the personalization felt truly thoughtful.",
    image: "/images/bouquets/IMG_3895.jpg"
  },
  {
    name: "Arjun Kapur",
    quote: "Our corporate gifting looked premium across all 80 orders. Seamless process.",
    image: "/images/themed-hampers/IMG_3912.jpg"
  },
  {
    name: "Sara Khan",
    quote: "The handcrafted details made it unforgettable. Worth every rupee.",
    image: "/images/bouquets/IMG_3927.png"
  }
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center">
        <span className="text-accent-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block">Our Story</span>
        <h1 className="text-5xl md:text-7xl font-serif text-text-main mb-8 leading-tight tracking-tighter">
          Crafted by <span className="italic font-light">Emotion</span>, Elevated by Design
        </h1>
        <p className="text-soft-gray text-lg md:text-xl font-sans font-light leading-relaxed max-w-3xl mx-auto">
          Gift Rapture was founded by Aanya Rao, a former luxury stylist, with a mission to turn gifting into an unforgettable ritual. Every box is built to express emotion, prestige, and intention.
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] bg-primary/20 rounded-[3rem] overflow-hidden relative shadow-premium border border-text-main/5">
          <Image
            src="/images/themed-hampers/IMG_3915.jpg"
            alt="Founder and studio"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif italic text-text-main">The Founder</h2>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            Aanya envisioned a gifting studio that blends artisanal craftsmanship with luxury hospitality. Her work spans fashion, floral design, and event styling, which now shapes the Gift Rapture signature aesthetic.
          </p>
          <p className="text-soft-gray leading-relaxed font-sans text-sm md:text-base">
            Our studio team hand-curates every product to match the tone of the occasion, with the goal of making the recipient feel deeply celebrated.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent-sage text-[10px] uppercase tracking-widest font-bold mb-4 block">Why We're Premium</span>
          <h2 className="text-4xl font-serif text-text-main italic">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-text-main/5">
              <h3 className="font-serif text-xl text-text-main mb-3 italic">{value.title}</h3>
              <p className="text-sm text-soft-gray leading-relaxed">{value.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent-gold text-[10px] uppercase tracking-widest font-bold mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-serif text-text-main italic">Loved by Our Clients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-text-main/5 flex flex-col">
              <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-soft-gray italic mb-4">"{testimonial.quote}"</p>
              <span className="text-xs uppercase tracking-widest font-bold text-text-main">{testimonial.name}</span>
            </div>
          ))}
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}
