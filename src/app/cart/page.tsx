"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialLinks";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemSummary = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    [items]
  );

  const handleWhatsAppCheckout = async () => {
    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      setAddressError("Please enter a delivery address before continuing.");
      return;
    }

    setAddressError("");
    setIsSubmitting(true);
    // Generate text for WhatsApp
    const orderNumber = Math.floor(Math.random() * 1000000);
    let message = `Hello GIFTRAPTURE!\nI'd like to place an order (Ref: #${orderNumber}).\n\n*Order Details:*\n`;
    
    itemSummary.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    
    message += `\n*Total Amount:* ₹${getTotal()}\n\n*Delivery Address:*\n${trimmedAddress}\n\nPlease confirm availability and payment details. Thank you!`;
    
    // Replace this with your actual WhatsApp business number (with country code)
    const phoneNumber = "917200623758"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    let shouldOpenWhatsApp = true;
    try {
      const supabaseClient = getSupabaseClient();
      const { error } = await supabaseClient.from("orders").insert([
        {
          order_number: orderNumber.toString(),
          address: trimmedAddress,
          total_amount: getTotal(),
          status: "whatsapp_pending",
          items: itemSummary,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        shouldOpenWhatsApp = false;
        setAddressError("We couldn't save your order details. Please try again in a moment.");
      }
    } catch (err) {
      console.error("Order save failed:", err);
      shouldOpenWhatsApp = false;
      setAddressError("We couldn't save your order details. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
      if (shouldOpenWhatsApp) {
        const opened = window.open(whatsappUrl, "_blank");
        if (!opened) {
          window.location.href = whatsappUrl;
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 max-w-5xl mx-auto py-24">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center italic">Your Selection</h1>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 shadow-xl">
               <ShoppingBag className="w-10 h-10 text-accent-gold" />
            </div>
            <h2 className="text-2xl font-serif mb-4 italic">Your bag is empty</h2>
            <p className="text-sm text-soft-gray mb-10">Start your gifting journey and discover curated moments.</p>
            <Link 
              href="/shop"
              className="flex items-center gap-2 group px-8 py-3 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl"
            >
              Begin Discovery
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-3xl shadow-sm items-center">
                  <div className="relative w-24 h-24 shrink-0 bg-primary/10 rounded-2xl overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag className="text-accent-gold w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-lg font-bold">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-soft-gray hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-accent-gold font-bold mb-4">₹{item.price}</p>
                    <div className="flex items-center gap-4 bg-secondary inline-flex rounded-full p-1 border border-text-main/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-text-main hover:bg-text-main hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-text-main hover:bg-text-main hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-text-main/5 sticky top-32">
                <h3 className="font-serif text-2xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 text-sm text-soft-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text-main font-bold">₹{getTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-accent-sage italic">Calculated on WhatsApp</span>
                  </div>
                </div>
                <div className="border-t border-text-main/10 pt-4 mb-8 flex justify-between items-end">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-serif text-accent-gold font-bold">₹{getTotal()}</span>
                </div>
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2 block">
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (addressError) {
                        setAddressError("");
                      }
                    }}
                    rows={3}
                    placeholder="Enter full delivery address"
                    className="w-full px-4 py-3 rounded-2xl border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all resize-none"
                  />
                  {addressError && (
                    <p className="mt-2 text-xs text-red-500 font-semibold">{addressError}</p>
                  )}
                </div>
                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#075e54] to-[#25d366] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed group text-sm md:text-base"
                  >
                    <WhatsAppIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-center tracking-wide font-sans">{isSubmitting ? "Preparing WhatsApp..." : "Checkout via WhatsApp"}</span>
                  </button>
                <p className="text-[10px] text-center text-soft-gray mt-4 tracking-widest uppercase font-bold">
                  Secure checkout & personalized service
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileBottomNav />
    </main>
  );
}
