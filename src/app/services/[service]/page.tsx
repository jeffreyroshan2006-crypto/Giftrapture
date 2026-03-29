import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function ServicePage({ params }: { params: { service: string } }) {
  const { service } = await params;

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 italic capitalize">{service.replace('-', ' ')} Service</h1>
        <p className="text-soft-gray mb-12 italic">Elevate your celebration with our world-class attention to detail.</p>
        <div className="p-12 md:p-24 bg-white rounded-[3rem] shadow-premium mb-24 border border-text-main/5 text-left flex flex-col items-center">
           <div className="w-16 h-1 bg-accent-gold mb-10 rounded-full" />
           <p className="text-xl md:text-2xl text-text-main/80 text-center font-serif mb-12 italic">"We bring curated elegance to life with unparalleled precision and grace."</p>
           <button className="px-12 py-5 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl">Book Consultation</button>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
