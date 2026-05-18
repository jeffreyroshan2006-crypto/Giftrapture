"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { Check, Plus, Minus, ShoppingBag, Gift, HelpCircle } from "lucide-react";
import Image from "next/image";

const BOX_BASES = [
  { id: "box-craft", name: "Luxe Craft Cardboard Box", price: 350, description: "Minimalist eco-luxury packaging with signature silk ribbon." },
  { id: "box-pine", name: "Premium Pine Wood Trunk", price: 750, description: "Solid, reusable wooden trunk with brass latch for a rustic-royal charm." },
  { id: "box-velvet", name: "Imperial Royal Velvet Chest", price: 1200, description: "Soft, deep velvet casing lined with gold satin sheets." },
];

const FILLERS = [
  { id: "fill-almonds", name: "Gourmet Roasted Almonds (200g)", price: 450, category: "Gourmet" },
  { id: "fill-chocs", name: "Artisanal Dark Hazelnut Chocolates", price: 650, category: "Gourmet" },
  { id: "fill-candle", name: "Scented Lavender Soy Wax Candle", price: 399, category: "Wellness" },
  { id: "fill-tea", name: "Exotic Kashmiri Saffron Tea (50g)", price: 800, category: "Gourmet" },
  { id: "fill-roses", name: "Red Velvet Rose Arrangement", price: 1200, category: "Floral" },
  { id: "fill-perfume", name: "Handcrafted Sandalwood Perfume (50ml)", price: 1800, category: "Wellness" },
];

export default function CustomBoxPage() {
  const [selectedBox, setSelectedBox] = useState(BOX_BASES[0]);
  const [selectedFillers, setSelectedFillers] = useState<Record<string, number>>({});
  const addItem = useCartStore((state) => state.addItem);
  const [successMessage, setSuccessMessage] = useState(false);

  const toggleFiller = (id: string, action: "add" | "remove") => {
    setSelectedFillers((prev) => {
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

  const totalAmount = useMemo(() => {
    let sum = selectedBox.price;
    Object.entries(selectedFillers).forEach(([id, qty]) => {
      const item = FILLERS.find((f) => f.id === id);
      if (item) sum += item.price * qty;
    });
    return sum;
  }, [selectedBox, selectedFillers]);

  const handleAddBoxToCart = () => {
    const itemNames = Object.entries(selectedFillers)
      .map(([id, qty]) => {
        const item = FILLERS.find((f) => f.id === id);
        return item ? `${item.name} (x${qty})` : "";
      })
      .filter(Boolean)
      .join(", ");

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Bespoke Box (${selectedBox.name}): ${itemNames || "Empty Box"}`,
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
        <div className="text-center mb-16">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Bespoke Gifting</span>
          <h1 className="text-4xl md:text-6xl font-serif text-text-main italic mb-6">Make Your Own Box</h1>
          <p className="text-soft-gray text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Select an elegant outer box, then fill it with our finest handpicked goodies to create an unmatched personalized gesture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Builder Options */}
          <div className="lg:col-span-8 space-y-12">
            {/* Step 1: Select Box Base */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-text-main/5">
              <span className="text-[10px] tracking-widest font-bold text-accent-gold uppercase mb-2 block">Step 01</span>
              <h2 className="text-2xl font-serif text-text-main mb-6 italic">Select Your Base</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BOX_BASES.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box)}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      selectedBox.id === box.id
                        ? "border-accent-gold bg-accent-gold/5 shadow-md"
                        : "border-text-main/10 hover:border-text-main/30"
                    }`}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-text-main leading-tight">{box.name}</h3>
                        {selectedBox.id === box.id && (
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
              <h2 className="text-2xl font-serif text-text-main mb-6 italic">Handpick the Inclusions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FILLERS.map((filler) => {
                  const qty = selectedFillers[filler.id] || 0;
                  return (
                    <div
                      key={filler.id}
                      className="p-5 rounded-3xl border border-text-main/10 flex items-center justify-between gap-4 bg-secondary/10 hover:shadow-sm transition-all"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-accent-sage block mb-1">{filler.category}</span>
                        <h3 className="font-bold text-sm text-text-main mb-1">{filler.name}</h3>
                        <p className="text-sm font-bold text-accent-gold">₹{filler.price}</p>
                      </div>

                      <div className="flex items-center gap-3 bg-white p-1 rounded-full border border-text-main/10">
                        {qty > 0 ? (
                          <>
                            <button
                              onClick={() => toggleFiller(filler.id, "remove")}
                              className="w-8 h-8 rounded-full bg-secondary hover:bg-text-main hover:text-white flex items-center justify-center transition-colors text-text-main"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button
                              onClick={() => toggleFiller(filler.id, "add")}
                              className="w-8 h-8 rounded-full bg-secondary hover:bg-text-main hover:text-white flex items-center justify-center transition-colors text-text-main"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => toggleFiller(filler.id, "add")}
                            className="px-4 py-2 bg-text-main text-white text-xs font-bold rounded-full hover:bg-accent-gold hover:text-text-main transition-colors uppercase tracking-widest flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                  <span>{selectedBox.name}</span>
                  <span>₹{selectedBox.price}</span>
                </div>

                {Object.entries(selectedFillers).map(([id, qty]) => {
                  const item = FILLERS.find((f) => f.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs">
                      <span>{item.name} <span className="font-bold text-text-main">(x{qty})</span></span>
                      <span>₹{item.price * qty}</span>
                    </div>
                  );
                })}

                {Object.keys(selectedFillers).length === 0 && (
                  <p className="text-center italic py-4 text-xs text-soft-gray/60">No goodies selected yet. Standard fillings will be curated.</p>
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
