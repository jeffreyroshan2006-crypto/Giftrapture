import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const WHATSAPP_NUMBER = "917200623758";
const WEDDING_ENQUIRE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello GIFTRAPTURE, I would like to enquire about Wedding Trousseau services."
)}`;
const CORPORATE_ENQUIRE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello GIFTRAPTURE, I would like to enquire about Corporate Gifting services."
)}`;

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-serif mb-8 italic">Bulk Gifting</h1>
        <p className="text-soft-gray mb-12 italic">Whether it's the elegance of a wedding trousseau or the scale of corporate gifting, we craft every detail to perfection.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 bg-primary rounded-3xl shadow-premium text-left border border-white/50">
               <h2 className="text-3xl font-serif mb-4 italic">Wedding Trousseau</h2>
               <p className="text-sm text-soft-gray mb-8">Personalized consultation and packing for your big day.</p>
              <a
                href={WEDDING_ENQUIRE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-8 py-3 bg-accent-gold text-text-main font-bold rounded-full"
              >
                Enquire Now
              </a>
            </div>
            <div className="p-12 bg-text-main text-white rounded-3xl shadow-2xl text-left">
              <h2 className="text-3xl font-serif mb-4 italic">Corporate Gifting</h2>
               <p className="text-sm text-white/60 mb-8">Elevated branding and strategy gifting that reflects your brand.</p>
              <a
                href={CORPORATE_ENQUIRE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-text-main font-bold rounded-full"
              >
                Enquire Now
              </a>
            </div>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
