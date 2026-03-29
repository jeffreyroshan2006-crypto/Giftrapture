import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 italic capitalize">{category.replace('-', ' ')} Collection</h1>
        <p className="text-soft-gray mb-12 italic">Handcrafted excellence for these curated moments.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/5] bg-white rounded-[2rem] shadow-premium overflow-hidden border border-text-main/5 group">
                <div className="h-full bg-primary/20 animate-pulse-slow" />
            </div>
          ))}
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
