import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import HampersGallery from "@/components/HampersGallery";

export const metadata = {
  title: "Themed Hampers | Giftrapture",
  description: "Explore our collection of world-class, premium themed hampers.",
};

export default function ThemedHampersPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic stunning gallery of hampers */}
      <HampersGallery />
      
      <MobileBottomNav />
    </main>
  );
}
