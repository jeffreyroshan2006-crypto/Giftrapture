import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import BouquetsGallery from "@/components/BouquetsGallery";

export const metadata = {
  title: "Luxury Bouquets | Giftrapture",
  description: "Explore our collection of world-class, exquisite luxury bouquets.",
};

export default function LuxuryBouquetsPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic stunning gallery of bouquets */}
      <BouquetsGallery />
      
      <MobileBottomNav />
    </main>
  );
}
