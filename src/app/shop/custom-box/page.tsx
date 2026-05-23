"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { Check, Plus, Minus, ShoppingBag, Gift } from "lucide-react";
import Image from "next/image";

const PACKAGING_OPTIONS = [
  { id: "box-craft", name: "Luxe Craft Cardboard Box", price: 350, description: "Minimalist eco-premium packaging with signature silk ribbon." },
  { id: "box-pine", name: "Premium Pine Wood Trunk", price: 750, description: "Solid, reusable wooden trunk with brass latch for a rustic-royal charm." },
  { id: "box-velvet", name: "Imperial Royal Velvet Chest", price: 1200, description: "Soft, deep velvet casing lined with gold satin sheets." },
  { id: "basket-wicker", name: "Heritage Wicker Basket", price: 480, description: "Handwoven basket finished with satin lining and a custom tag." },
  { id: "tray-lacquer", name: "Lacquered Celebration Tray", price: 650, description: "Glossy keepsake tray for floral + gourmet pairings." }
];

const CATALOG_ITEMS = [
  { id: "fill-almonds", name: "Gourmet Roasted Almonds (200g)", price: 450, category: "Gourmet", image: "/images/themed-hampers/IMG_3918.png" },
  { id: "fill-chocs", name: "Artisanal Dark Hazelnut Chocolates", price: 650, category: "Gourmet", image: "/images/themed-hampers/IMG_3900.jpg" },
  { id: "fill-candle", name: "Scented Lavender Soy Wax Candle", price: 399, category: "Wellness", image: "/images/themed-hampers/IMG_3940.jpg" },
  { id: "fill-tea", name: "Exotic Kashmiri Saffron Tea (50g)", price: 800, category: "Gourmet", image: "/images/themed-hampers/IMG_3921.png" },
  { id: "fill-roses", name: "Red Velvet Rose Arrangement", price: 1200, category: "Floral", image: "/images/bouquets/IMG_3893.jpg" },
  { id: "fill-perfume", name: "Handcrafted Sandalwood Perfume (50ml)", price: 1800, category: "Wellness", image: "/images/themed-hampers/IMG_3929.png" },
  { id: "fill-cookie", name: "Butter Pistachio Cookies (250g)", price: 520, category: "Gourmet", image: "/images/themed-hampers/IMG_3918.png" },
  { id: "fill-diffuser", name: "Bergamot Reed Diffuser", price: 950, category: "Wellness", image: "/images/themed-hampers/IMG_3940.jpg" }
];

const PERSONALIZATION_OPTIONS = [
  { id: "message-card", name: "Handwritten Message Card", price: 150 },
  { id: "ribbon-emerald", name: "Emerald Satin Ribbon", price: 120 },
  { id: "foil-name", name: "Gold Foil Name Tag", price: 250 },
  { id: "color-palette", name: "Custom Color Palette Wrap", price: 180 }
];

export default function CustomBoxPage() {
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<Record<string, number>>({});
  const [selectedPersonalization, setSelectedPersonalization] = useState<Record<string, boolean>>({});
  const addItem = useCartStore((state) => state.addItem);
  const [successMessage, setSuccessMessage] = useState(false);

  const toggleCatalogItem = (id: string, action: "add" | "remove") => {
    setSelectedCatalogItems((prev) => {
      const currentQty = prev[id] || 0;
      const nextQty = action === "add" ? currentQty + 1 : Math.max(0, currentQty - 1);
      
      const updated = { ...prev };
      if (nextQty === 0) {
        delete updated[id];
      } else {
        updated[id] = nextQty;
      }
      return updated;
    });
  };

  const togglePersonalization = (id: string) => {
    setSelectedPersonalization((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalAmount = useMemo(() => {
    let sum = selectedPackaging.price;
    Object.entries(selectedCatalogItems).forEach(([id, qty]) => {
      const item = CATALOG_ITEMS.find((f) => f.id === id);
      if (item) sum += item.price * qty;
    });
    Object.entries(selectedPersonalization).forEach(([id, selected]) => {
      if (!selected) return;
      const option = PERSONALIZATION_OPTIONS.find((p) => p.id === id);
      if (option) sum += option.price;
    });
    return sum;
  }, [selectedPackaging, selectedCatalogItems, selectedPersonalization]);

  const handleAddBoxToCart = () => {
    const itemNames = Object.entries(selectedCatalogItems)
      .map(([id, qty]) => {
        const item = CATALOG_ITEMS.find((f) => f.id === id);
        return item ? `${item.name} (x${qty})` : "";
      })
      .filter(Boolean)
      .join(", ");

    const personalizationNames = Object.entries(selectedPersonalization)
      .filter(([, selected]) => selected)
      .map(([id]) => PERSONALIZATION_OPTIONS.find((option) => option.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Bespoke Box (${selectedPackaging.name})${itemNames ? `: ${itemNames}` : ""}${
        personalizationNames ? ` | ${personalizationNames}` : ""
      }`,
      price: totalAmount,
      image: "/images/themed-hampers/IMG_3912.jpg",
      quantity: 1,
    };

    addItem(customBoxProduct);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        {/* Header */}
        <div className="text-center mb-16 bg-gradient-to-br from-accent-gold/20 via-secondary/80 to-accent-sage/20 rounded-[3rem] px-6 py-12 md:py-16 shadow-premium border border-accent-gold/20">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Bespoke Gifting</span>
          <h1 className="text-4xl md:text-6xl font-serif text-text-main italic mb-6">Build Your Own Box</h1>
          <p className="text-soft-gray text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Design a premium gifting experience in four easy steps. Select the packaging, handpick the contents, add personalization, and checkout with a live price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { step: "Step 01", title: "Select Packaging", detail: "Box, basket, tray, or trunk" },
            { step: "Step 02", title: "Choose Items", detail: "Pick from the catalog" },
            { step: "Step 03", title: "Personalize", detail: "Message, colors, tags" },
            { step: "Step 04", title: "Add to Cart", detail: "Live custom price" }
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-[2rem] shadow-premium border border-text-main/5 text-center">
              <span className="text-[10px] tracking-widest font-bold text-accent-gold uppercase block mb-2">{item.step}</span>
              <h3 className="font-serif text-lg text-text-main mb-2">{item.title}</h3>
              <p className="text-xs text-soft-gray">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Builder Options */}
          <div className="lg:col-span-8 space-y-12">
            {/* Step 1: Select Packaging */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5">
              <span className="text-[10px] tracking-widest font-bold text-accent-gold uppercase mb-2 block">Step 01</span>
              <h2 className="text-2xl font-serif text-text-main mb-6 italic">Select Your Packaging</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PACKAGING_OPTIONS.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedPackaging(box)}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      selectedPackaging.id === box.id
                        ? "border-accent-gold bg-accent-gold/5 shadow-md"
                        : "border-text-main/10 hover:border-text-main/30"
                    }`}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-text-main leading-tight">{box.name}</h3>
                        {selectedPackaging.id === box.id && (
                          <div className="w-5 h-5 rounded-full bg-accent-gold flex items-center justify-center text-white shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-soft-gray leading-relaxed font-sans">{box.description}</p>
                    </div>
                    <span className="font-bold text-accent-gold text-lg mt-4">₹{box.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Inclusions */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5">
              <span className="text-[10px] tracking-widest font-bold text-accent-gold uppercase mb-2 block">Step 02</span>
              <h2 className="text-2xl font-serif text-text-main mb-6 italic">Choose Items From the Catalog</h2>
              
               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {CATALOG_ITEMS.map((filler) => {
                   const qty = selectedCatalogItems[filler.id] || 0;
                   return (
                     <div
                       key={filler.id}
                       className="p-5 rounded-3xl border border-text-main/10 bg-white hover:shadow-sm transition-all group flex flex-col"
                     >
                       <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative bg-primary/10">
                         <Image
                           src={filler.image}
                           alt={filler.name}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                       </div>
                       <div className="flex items-start justify-between gap-4 mt-auto">
                         <div className="flex-1">
                           <span className="text-[9px] uppercase tracking-wider font-bold text-accent-sage block mb-1">{filler.category}</span>
                           <h3 className="font-bold text-sm text-text-main mb-1 line-clamp-2">{filler.name}</h3>
                           <p className="text-sm font-bold text-accent-gold">₹{filler.price}</p>
                         </div>
                         <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-text-main/10 self-start">
                           {qty > 0 ? (
                             <>
                               <button
                                 onClick={() => toggleCatalogItem(filler.id, "remove")}
                                 className="w-8 h-8 rounded-full bg-secondary hover:bg-text-main hover:text-white flex items-center justify-center transition-colors text-text-main"
                               >
                                 <Minus className="w-4 h-4" />
                               </button>
                               <span className="text-sm font-bold w-4 text-center">{qty}</span>
                               <button
                                 onClick={() => toggleCatalogItem(filler.id, "add")}
                                 className="w-8 h-8 rounded-full bg-secondary hover:bg-text-main hover:text-white flex items-center justify-center transition-colors text-text-main"
                               >
                                 <Plus className="w-4 h-4" />
                               </button>
                             </>
                           ) : (
                             <button
                               onClick={() => toggleCatalogItem(filler.id, "add")}
                               className="px-4 py-2 bg-text-main text-white text-xs font-bold rounded-full hover:bg-accent-gold hover:text-text-main transition-colors uppercase tracking-widest flex items-center gap-1.5"
                             >
                               <Plus className="w-3.5 h-3.5" />
                               Add
                             </button>
                           )}
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>

            {/* Step 3: Personalization */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5">
              <span className="text-[10px] tracking-widest font-bold text-accent-gold uppercase mb-2 block">Step 03</span>
              <h2 className="text-2xl font-serif text-text-main mb-6 italic">Add Personalization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PERSONALIZATION_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => togglePersonalization(option.id)}
                    className={`p-5 rounded-3xl border text-left transition-all duration-300 ${
                      selectedPersonalization[option.id]
                        ? "border-accent-gold bg-accent-gold/5 shadow-md"
                        : "border-text-main/10 hover:border-text-main/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-sm text-text-main mb-2">{option.name}</h3>
                        <p className="text-xs text-soft-gray">Personalize the presentation for a premium finish.</p>
                      </div>
                      {selectedPersonalization[option.id] ? (
                        <div className="w-5 h-5 rounded-full bg-accent-gold flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : null}
                    </div>
                    <span className="font-bold text-accent-gold text-sm mt-4 block">₹{option.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Builder Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5 sticky top-32 space-y-6">
              <div className="text-center pb-6 border-b border-text-main/10">
                <Gift className="w-10 h-10 text-accent-gold mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold">Your Custom Box</h3>
                <p className="text-xs text-soft-gray uppercase tracking-widest font-bold mt-1">Live curating summary</p>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-4 max-h-60 overflow-y-auto font-sans text-sm text-soft-gray">
                <div className="flex justify-between font-bold text-text-main">
                  <span>{selectedPackaging.name}</span>
                  <span>₹{selectedPackaging.price}</span>
                </div>

                {Object.entries(selectedCatalogItems).map(([id, qty]) => {
                  const item = CATALOG_ITEMS.find((f) => f.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs">
                      <span>{item.name} <span className="font-bold text-text-main">(x{qty})</span></span>
                      <span>₹{item.price * qty}</span>
                    </div>
                  );
                })}

                {Object.entries(selectedPersonalization)
                  .filter(([, selected]) => selected)
                  .map(([id]) => {
                    const option = PERSONALIZATION_OPTIONS.find((p) => p.id === id);
                    if (!option) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-xs">
                        <span>{option.name}</span>
                        <span>₹{option.price}</span>
                      </div>
                    );
                  })}

                {Object.keys(selectedCatalogItems).length === 0 && (
                  <p className="text-center italic py-4 text-xs text-soft-gray/60">No items selected yet. You can add items or proceed with a minimal curated set.</p>
                )}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-text-main/10 pt-4 flex justify-between items-end">
                <span className="font-bold text-sm">Estimated Total</span>
                <div className="text-right">
                  <span className="text-2xl font-serif text-accent-gold font-bold">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Button checkout */}
              <button
                onClick={handleAddBoxToCart}
                className="w-full py-4.5 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" />
                Add Custom Box to Cart
              </button>

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl text-center font-bold animate-pulse-slow">
                  ✓ Custom Box successfully loaded into your bag!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
