"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Check, Plus, Minus, ShoppingBag, Gift, Package, Sparkles, ShoppingBag as ShoppingBagIcon } from "lucide-react";
import Image from "next/image";

type Option = { id: string; name: string; description?: string | null; price: number; image?: string | null; category?: string | null };

export default function CustomBoxClient({
  packaging,
  items,
  personalization,
}: {
  packaging: Option[];
  items: Option[];
  personalization: Option[];
}) {
  const packagingOptions = packaging.length
    ? packaging
    : [
        { id: "box-craft", name: "Luxe Craft Cardboard Box", price: 350, description: "Minimalist eco-premium packaging with signature silk ribbon.", image: null },
        { id: "box-pine", name: "Premium Pine Wood Trunk", price: 750, description: "Solid, reusable wooden trunk with brass latch for a rustic-royal charm.", image: null },
        { id: "box-velvet", name: "Imperial Royal Velvet Chest", price: 1200, description: "Soft, deep velvet casing lined with gold satin sheets.", image: null },
        { id: "basket-wicker", name: "Heritage Wicker Basket", price: 480, description: "Handwoven basket finished with satin lining and a custom tag.", image: null },
        { id: "tray-lacquer", name: "Lacquered Celebration Tray", price: 650, description: "Glossy keepsake tray for floral + gourmet pairings.", image: null },
      ];

  const [selectedPackaging, setSelectedPackaging] = useState<Option | null>(packagingOptions.length > 0 ? packagingOptions[0] : null);
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<Record<string, number>>({});
  const [selectedPersonalization, setSelectedPersonalization] = useState<Record<string, boolean>>({});
  const addItem = useCartStore((state) => state.addItem);
  const [successMessage, setSuccessMessage] = useState(false);

  const catalogItems = items.length
    ? items
    : [
        { id: "fill-almonds", name: "Gourmet Roasted Almonds (200g)", price: 450, category: "Gourmet", image: "/images/themed-hampers/IMG_3918.png" },
        { id: "fill-chocs", name: "Artisanal Dark Hazelnut Chocolates", price: 650, category: "Gourmet", image: "/images/themed-hampers/IMG_3900.jpg" },
        { id: "fill-candle", name: "Scented Lavender Soy Wax Candle", price: 399, category: "Wellness", image: "/images/themed-hampers/IMG_3940.jpg" },
        { id: "fill-tea", name: "Exotic Kashmiri Saffron Tea (50g)", price: 800, category: "Gourmet", image: "/images/themed-hampers/IMG_3921.png" },
        { id: "fill-roses", name: "Red Velvet Rose Arrangement", price: 1200, category: "Floral", image: "/images/bouquets/IMG_3893.jpg" },
        { id: "fill-perfume", name: "Handcrafted Sandalwood Perfume (50ml)", price: 1800, category: "Wellness", image: "/images/themed-hampers/IMG_3929.png" },
        { id: "fill-cookie", name: "Butter Pistachio Cookies (250g)", price: 520, category: "Gourmet", image: "/images/themed-hampers/IMG_3918.png" },
        { id: "fill-diffuser", name: "Bergamot Reed Diffuser", price: 950, category: "Wellness", image: "/images/themed-hampers/IMG_3940.jpg" },
      ];

  const personalizationOptions = personalization.length
    ? personalization
    : [
        { id: "message-card", name: "Handwritten Message Card", price: 150, description: "Personalize the presentation for a premium finish." },
        { id: "ribbon-emerald", name: "Emerald Satin Ribbon", price: 120, description: "Personalize the presentation for a premium finish." },
        { id: "foil-name", name: "Gold Foil Name Tag", price: 250, description: "Personalize the presentation for a premium finish." },
        { id: "color-palette", name: "Custom Color Palette Wrap", price: 180, description: "Personalize the presentation for a premium finish." },
      ];

  const CUSTOM_BOX_STEPS = [
    { title: "Select Packaging", detail: "Box, basket, tray, or trunk", icon: Package },
    { title: "Choose Items", detail: "Pick from the catalog", icon: ShoppingBagIcon },
    { title: "Add Personalization", detail: "Message, colors, tags", icon: Sparkles },
    { title: "Add to Cart", detail: "Live custom price", icon: Gift },
  ];

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
      [id]: !prev[id],
    }));
  };

  const totalAmount = useMemo(() => {
    if (!selectedPackaging) return 0;
    let sum = selectedPackaging.price;
    Object.entries(selectedCatalogItems).forEach(([id, qty]) => {
      const item = catalogItems.find((f) => f.id === id);
      if (item) sum += Number(item.price || 0) * qty;
    });
    Object.entries(selectedPersonalization).forEach(([id, selected]) => {
      if (!selected) return;
      const option = personalizationOptions.find((p) => p.id === id);
      if (option) sum += Number(option.price || 0);
    });
    return sum;
  }, [selectedPackaging, selectedCatalogItems, selectedPersonalization, catalogItems, personalizationOptions]);

  // Check step completion status
 const isStep1Complete = !!selectedPackaging;
  const isStep2Complete = Object.keys(selectedCatalogItems).length > 0;
  const isStep3Complete = Object.keys(selectedPersonalization).some(key => selectedPersonalization[key]);
  const isStep4Complete = totalAmount > (selectedPackaging?.price || 0);

  const handleAddBoxToCart = () => {
    if (!selectedPackaging) {
      alert("Please select packaging first");
      return;
    }
    const itemNames = Object.entries(selectedCatalogItems)
      .map(([id, qty]) => {
        const item = catalogItems.find((f) => f.id === id);
        return item ? `${item.name} (x${qty})` : "";
      })
      .filter(Boolean)
      .join(", ");

    const personalizationNames = Object.entries(selectedPersonalization)
      .filter(([, selected]) => selected)
      .map(([id]) => personalizationOptions.find((option) => option.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Bespoke Box (${selectedPackaging.name})${itemNames ? `: ${itemNames}` : ""}${personalizationNames ? ` | ${personalizationNames}` : ""}`,
      price: totalAmount,
      image: selectedPackaging.image || "/images/themed-hampers/IMG_3912.jpg",
      quantity: 1,
    };

    addItem(customBoxProduct);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16 bg-gradient-to-br from-accent-gold/20 via-secondary/80 to-accent-sage/20 rounded-[2rem] sm:rounded-[3rem] px-6 py-8 sm:py-12 shadow-premium border border-accent-gold/20">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-3 sm:mb-4 block">Bespoke Gifting</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-text-main italic mb-4 sm:mb-6">Build Your Own Box</h1>
          <p className="text-soft-gray text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Design a premium gifting experience in four easy steps. Select the packaging, handpick the contents, add personalization, and checkout with a live price.
          </p>
        </div>

        <div className="mb-12 sm:mb-16 bg-white/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem] px-4 py-4 sm:px-6 sm:py-6 shadow-premium">
          <div className="relative">
            <div className="absolute left-6 right-6 top-6 hidden md:block h-px bg-text-main/10" />
            <div className="flex items-start justify-between gap-2 sm:gap-4 overflow-x-auto pb-2 md:overflow-visible scrollbar-hide">
              {CUSTOM_BOX_STEPS.map((item, index) => {
                const Icon = item.icon;
                
                let isStepComplete = false;
                if (index === 0) isStepComplete = isStep1Complete;
                if (index === 1) isStepComplete = isStep2Complete;
                if (index === 2) isStepComplete = isStep3Complete;
                if (index === 3) isStepComplete = isStep4Complete;
                
                return (
                  <div key={`${item.title}-${index}`} className="relative flex min-w-[80px] sm:min-w-[100px] md:min-w-0 flex-1 flex-col items-center text-center shrink-0">
                    <div className="relative z-10 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border-2 sm:border-3 shadow-md transition-all duration-300">
                      {isStepComplete ? (
                        <div className="w-full h-full bg-accent-gold rounded-full flex items-center justify-center">
                          <Check className="text-white h-5 sm:h-6 w-5 sm:w-6" />
                        </div>
                      ) : (
                        <Icon className="text-black h-4 sm:h-5 w-4 sm:w-5" />
                      )}
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1">
                      <span className="block text-[9px] sm:text-[10px] font-bold lowercase tracking-[0.12em] text-accent-gold">{index + 1}.</span>
                      <h3 className="text-xs sm:text-sm font-serif text-text-main italic leading-tight line-clamp-2">{item.title}</h3>
                      <p className="text-[8px] sm:text-xs text-soft-gray max-w-[8rem] sm:max-w-[10rem] mx-auto line-clamp-2">{item.detail}</p>
                    </div>
                    {index < CUSTOM_BOX_STEPS.length - 1 && (
                      <div className="absolute left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] top-6 hidden md:block h-px bg-text-main/10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-16">
            {/* Select Packaging Section */}
            <div className="py-8">
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] tracking-widest font-bold text-accent-gold mb-2 block">1.</span>
                <h2 className="text-2xl font-serif text-text-main mb-8 italic">Select Packaging</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
                  {packagingOptions.map((box) => {
                    const selectedForPackaging = selectedPackaging?.id === box.id;
                    return (
                      <div key={box.id} className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
                          <img src={box.image || '/images/placeholder.jpg'} alt={box.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-2 left-2 right-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPackaging(box);
                              }}
                              className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md text-[10px] uppercase tracking-widest ${
                                selectedForPackaging 
                                  ? "bg-accent-gold text-white" 
                                  : "bg-white text-text-main hover:bg-accent-gold"
                              }`}
                            >
                              <Package className="w-3 h-3" />
                              {selectedForPackaging ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>

                        <div className="p-3 flex flex-col gap-2 bg-white relative z-10 flex-1">
                          <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
                            {box.name}
                          </h3>
                          <p className="text-xs text-soft-gray line-clamp-2">{box.description || 'No description available.'}</p>
                          <div className="text-accent-gold font-bold text-sm">₹{Number(box.price || 0).toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Choose Items Section */}
            <div className="py-8">
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] tracking-widest font-bold text-accent-gold mb-2 block">2.</span>
                <h2 className="text-2xl font-serif text-text-main mb-8 italic">Choose Items</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
                  {catalogItems.map((item) => {
                    const qty = selectedCatalogItems[item.id] || 0;
                    return (
                      <div key={item.id} className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-soft-gray">No image</div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-2 left-2 right-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCatalogItem(item.id, "add");
                              }}
                              className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md text-[10px] uppercase tracking-widest ${
                                qty > 0 
                                  ? "bg-accent-sage text-white" 
                                  : "bg-white text-text-main hover:bg-accent-gold"
                              }`}
                            >
                              {qty > 0 ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Added ({qty})
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  Quick Add
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="p-3 flex flex-col gap-2 bg-white relative z-10 flex-1">
                          <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="text-accent-gold font-bold text-sm">₹{Number(item.price || 0).toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add Personalization Section */}
            <div className="py-8">
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] tracking-widest font-bold text-accent-gold mb-2 block">3.</span>
                <h2 className="text-2xl font-serif text-text-main mb-8 italic">Add Personalization</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
                  {personalizationOptions.map((option) => {
                    const selectedForPersonalization = !!selectedPersonalization[option.id];
                    return (
                      <div key={option.id} className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-text-main/5 flex flex-col h-full">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 shrink-0">
                          <img src={option.image || '/images/placeholder.jpg'} alt={option.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-2 left-2 right-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePersonalization(option.id);
                              }}
                              className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-md text-[10px] uppercase tracking-widest ${
                                selectedForPersonalization 
                                  ? "bg-accent-gold text-white" 
                                  : "bg-white text-text-main hover:bg-accent-gold"
                              }`}
                            >
                              <Sparkles className="w-3 h-3" />
                              {selectedForPersonalization ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>

                        <div className="p-3 flex flex-col gap-2 bg-white relative z-10 flex-1">
                          <h3 className="text-sm font-serif text-text-main leading-tight group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
                            {option.name}
                          </h3>
                          <p className="text-xs text-soft-gray line-clamp-2">{option.description || 'Personalize the presentation for a premium finish.'}</p>
                          <div className="text-accent-gold font-bold text-sm">₹{Number(option.price || 0).toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] shadow-premium border border-accent-gold/20 sticky top-24 space-y-6">
              <div className="text-center pb-6 border-b border-accent-gold/10">
                <Gift className="w-8 sm:w-10 h-8 sm:h-10 text-accent-gold mx-auto mb-3 sm:mb-4" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold">Your Custom Box</h3>
                <p className="text-xs text-soft-gray uppercase tracking-widest font-bold mt-1">Live curating summary</p>
              </div>

              <div className="space-y-4 max-h-60 overflow-y-auto font-sans text-sm text-soft-gray">
                {selectedPackaging ? (
                  <div className="flex justify-between font-bold text-text-main">
                    <span>{selectedPackaging.name}</span>
                    <span>₹{Number(selectedPackaging.price || 0).toLocaleString("en-IN")}</span>
                  </div>
                ) : (
                  <p className="text-center italic py-4 text-xs text-soft-gray/60">Select packaging to see your custom box summary</p>
                )}
                {Object.entries(selectedCatalogItems).map(([id, qty]) => {
                  const item = catalogItems.find((f) => f.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs">
                      <span>
                        {item.name} <span className="font-bold text-text-main">(x{qty})</span>
                      </span>
                      <span>₹{Number(item.price || 0) * qty}</span>
                    </div>
                  );
                })}

                {Object.entries(selectedPersonalization)
                  .filter(([, selected]) => selected)
                  .map(([id]) => {
                    const option = personalizationOptions.find((p) => p.id === id);
                    if (!option) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-xs">
                        <span>{option.name}</span>
                        <span>₹{Number(option.price || 0)}</span>
                      </div>
                    );
                  })}

                {Object.keys(selectedCatalogItems).length === 0 && (
                  <p className="text-center italic py-4 text-xs text-soft-gray/60">No items selected yet. You can add items or proceed with a minimal curated set.</p>
                )}
              </div>

              <div className="border-t border-text-main/10 pt-4 flex justify-between items-end">
                <span className="font-bold text-sm">Estimated Total</span>
                <div className="text-right">
                  <span className="text-2xl font-serif text-accent-gold font-bold">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handleAddBoxToCart}
                disabled={!isStep1Complete}
                className={`w-full py-4.5 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest ${
                  isStep1Complete ? "hover:shadow-2xl hover:scale-105" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
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
