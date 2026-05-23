import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata = {
  title: "Delivery Information | GIFTRAPTURE",
  description: "View delivery zones, shipping costs, and express options for GIFTRAPTURE orders.",
};

const ZONES = [
  {
    title: "Chennai Same-Day",
    detail: "Available for select bouquets and ready hampers. Rush fee applies based on distance and item type.",
    timeline: "2-6 hours",
    cost: "₹150 base + rush fee"
  },
  {
    title: "Chennai Standard",
    detail: "Scheduled delivery window with concierge updates on the day of dispatch.",
    timeline: "Same day / Next day",
    cost: "₹150"
  },
  {
    title: "Pan-India Standard",
    detail: "Premium protective packaging for non-perishables and select floral items.",
    timeline: "5-10 days",
    cost: "₹450"
  }
];

const SHIPPING_TABLE = [
  { area: "Chennai City", standard: "₹150", express: "₹450" },
  { area: "Tamil Nadu (outside Chennai)", standard: "₹350", express: "₹650" },
  { area: "Metro Cities", standard: "₹450", express: "₹800" },
  { area: "Rest of India", standard: "₹450", express: "₹900" }
];

export default function DeliveryInfoPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto py-24">
        <div className="text-center mb-16">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Delivery & Shipping</span>
          <h1 className="text-4xl md:text-6xl font-serif text-text-main italic mb-6">Delivery Information</h1>
          <p className="text-soft-gray text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Transparent timelines and costs so your gifting experience stays predictable and premium.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ZONES.map((zone) => (
            <div key={zone.title} className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-text-main/5">
              <h3 className="font-serif text-xl text-text-main mb-3 italic">{zone.title}</h3>
              <p className="text-sm text-soft-gray mb-6">{zone.detail}</p>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold text-text-main/60">
                <span>Timeline</span>
                <span className="text-text-main">{zone.timeline}</span>
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold text-text-main/60 mt-3">
                <span>Cost</span>
                <span className="text-accent-gold">{zone.cost}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-premium border border-text-main/5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent-sage block mb-2">Shipping Costs</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-main italic">By Delivery Zone</h2>
            </div>
            <p className="text-xs text-soft-gray max-w-sm">
              Express delivery includes priority handling and dedicated courier assignment.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-widest text-text-main/60 border-b border-text-main/10">
                <tr>
                  <th className="py-4 pr-4">Area</th>
                  <th className="py-4 pr-4">Standard</th>
                  <th className="py-4">Express</th>
                </tr>
              </thead>
              <tbody>
                {SHIPPING_TABLE.map((row) => (
                  <tr key={row.area} className="border-b border-text-main/5">
                    <td className="py-4 pr-4 font-medium text-text-main">{row.area}</td>
                    <td className="py-4 pr-4 text-soft-gray">{row.standard}</td>
                    <td className="py-4 text-accent-gold font-semibold">{row.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <MobileBottomNav />
    </main>
  );
}
