import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-serif mb-6 italic">The Collection</h1>
        <p className="text-soft-gray mb-12">Our curated selection is coming soon. Experience luxury in every detail.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-primary/20 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
