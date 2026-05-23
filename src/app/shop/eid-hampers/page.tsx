import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import EidHampersGallery from "@/components/EidHampersGallery";

export const metadata = {
  title: "Eid Hampers | GIFTRAPTURE",
  description: "Explore our curated collection of signature Eid gifting hampers.",
};

export default function EidHampersPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic stunning gallery of Eid hampers */}
      <EidHampersGallery />
      
      <MobileBottomNav />
    </main>
  );
}
