import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { CheckCircle, Gift, Sparkles, Truck } from "lucide-react";

export const metadata = {
  title: "How It Works | GIFTRAPTURE",
  description: "Explore the four-step gifting journey with GIFTRAPTURE.",
};

const STEPS = [
  {
    title: "Choose",
    detail: "Select a bouquet, hamper, or start a custom box from our catalog.",
    icon: Gift
  },
  {
    title: "Customize",
    detail: "Pick packaging, add items, and personalize with message cards and colors.",
    icon: Sparkles
  },
  {
    title: "Order",
    detail: "Review pricing, shipping, and confirm your premium gifting order.",
    icon: CheckCircle
  },
  {
    title: "Delivery",
    detail: "We package by hand and deliver with concierge updates.",
    icon: Truck
  }
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto py-24">
        <div className="text-center mb-16">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">How It Works</span>
          <h1 className="text-4xl md:text-6xl font-serif text-text-main italic mb-6">Your 4-Step Gifting Journey</h1>
          <p className="text-soft-gray text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A clear, premium process from selection to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={step.title} className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-text-main/5 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent-sage">Step 0{index + 1}</span>
              <h3 className="font-serif text-xl text-text-main mt-3 mb-3 italic">{step.title}</h3>
              <p className="text-sm text-soft-gray">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
