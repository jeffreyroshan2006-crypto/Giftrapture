import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import BouquetsGallery from "@/components/BouquetsGallery";

export const metadata = {
  title: "Signature Bouquets | Giftrapture",
  description: "Explore our collection of world-class, exquisite signature bouquets.",
};

export default function SignatureBouquetsPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic stunning gallery of bouquets */}
      <BouquetsGallery />
      
      <MobileBottomNav />
    </main>
  );
}
