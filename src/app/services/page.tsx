import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-serif mb-8 italic italic">Bespoke Services</h1>
        <p className="text-soft-gray mb-12 italic">Whether it's the elegance of a wedding trousseau or the scale of corporate gifting, we craft every detail to perfection.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-12 bg-white rounded-3xl shadow-premium text-left">
              <h2 className="text-3xl font-serif mb-4 italic">Wedding Trousseau</h2>
              <p className="text-sm text-soft-gray mb-8">Personalized consultation and packing for your big day.</p>
              <button className="px-8 py-3 bg-accent-gold text-text-main font-bold rounded-full">Enquire Now</button>
           </div>
           <div className="p-12 bg-text-main text-white rounded-3xl shadow-2xl text-left">
              <h2 className="text-3xl font-serif mb-4 italic">Corporate Gifting</h2>
              <p className="text-sm text-white/60 mb-8">Elevated branding and bulk curators for business events.</p>
              <button className="px-8 py-3 bg-white text-text-main font-bold rounded-full">Enquire Now</button>
           </div>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
