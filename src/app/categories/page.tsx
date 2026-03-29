import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import CategoryGrid from "@/components/CategoryGrid";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 italic">Explore Our World</h1>
        <CategoryGrid />
      </div>
      <MobileBottomNav />
    </main>
  );
}
