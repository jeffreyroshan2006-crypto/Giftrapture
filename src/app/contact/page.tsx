import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/SocialLinks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact Us | GIFTRAPTURE",
  description: "Get in touch with GIFTRAPTURE for signature bouquets, custom hamper curation, and bespoke wedding trousseau services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        <div className="text-center mb-20">
          <span className="text-accent-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-text-main mb-8 leading-tight tracking-tighter">
            Connect with <span className="italic font-light">Us</span>
          </h1>
          <p className="text-soft-gray text-base md:text-lg font-sans font-light leading-relaxed max-w-xl mx-auto">
            Let us assist you in choosing the perfect curated gift, or collaborate on custom orders for your special events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-10">
            <h2 className="text-3xl font-serif italic text-text-main mb-8">Showroom & Studio</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-gold shadow-premium border border-text-main/5 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main mb-1">Our Location</h3>
                  <p className="text-soft-gray text-sm leading-relaxed">
                    GIFTRAPTURE Studio,<br />
                    102, Khader Nawaz Khan Road, Nungambakkam,<br />
                    Chennai - 600006, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-gold shadow-premium border border-text-main/5 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main mb-1">Call / WhatsApp</h3>
                  <p className="text-soft-gray text-sm leading-relaxed">
                    General Inquiries: +91 99999 99999<br />
                    Corporate orders: +91 98888 88888
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-gold shadow-premium border border-text-main/5 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main mb-1">Email Correspondence</h3>
                  <p className="text-soft-gray text-sm leading-relaxed">
                    concierge@giftrapture.com<br />
                    partnerships@giftrapture.com
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-primary/20 rounded-[2rem] border border-accent-gold/20">
              <h3 className="font-serif italic text-lg text-text-main mb-2">Learn More About Us</h3>
              <p className="text-xs text-soft-gray leading-relaxed mb-4">
                Discover the story, philosophy, and craftsmanship behind every GIFTRAPTURE piece.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-text-main uppercase tracking-widest hover:text-accent-gold transition-colors border border-text-main/10 px-6 py-3 rounded-full bg-white hover:border-accent-gold"
              >
                About Us
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.instagram.com/giftrapture?igsh=MXVncmJyOXR4b3c5bQ=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center gap-3 rounded-full border border-text-main/5 bg-white px-5 py-2.5 shadow-premium transition-all duration-500 hover:scale-[1.05] hover:-translate-y-0.5 hover:shadow-lg hover:border-text-main/10"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-text-main/10 bg-white text-text-main group-hover:text-white transition-all duration-500 overflow-hidden relative shadow-sm group-hover:shadow-[0_8px_20px_rgba(221,42,123,0.3)]">
                  <span className="absolute inset-0 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <InstagramIcon className="w-4.5 h-4.5 relative z-10 transition-transform duration-500 group-hover:rotate-[12deg]" />
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-text-main transition-colors duration-300 group-hover:text-accent-gold">Instagram</span>
              </a>
              <a
                href="https://wa.me/917200623758"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="group inline-flex items-center gap-3 rounded-full border border-text-main/5 bg-white px-5 py-2.5 shadow-premium transition-all duration-500 hover:scale-[1.05] hover:-translate-y-0.5 hover:shadow-lg hover:border-text-main/10"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-text-main/10 bg-white text-text-main group-hover:text-white transition-all duration-500 overflow-hidden relative shadow-sm group-hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)]">
                  <span className="absolute inset-0 bg-gradient-to-tr from-[#075e54] to-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <WhatsAppIcon className="w-4.5 h-4.5 relative z-10 transition-transform duration-500 group-hover:rotate-[12deg]" />
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-text-main transition-colors duration-300 group-hover:text-accent-sage">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-premium border border-text-main/5">
            <h2 className="text-3xl font-serif italic text-text-main mb-8">Send an Inquiry</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-text-main/50">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-full border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-text-main/50">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-full border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-text-main/50">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                    className="w-full px-6 py-4 rounded-full border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs uppercase tracking-widest font-bold text-text-main/50">Subject</label>
                  <select
                    id="subject"
                    className="w-full px-6 py-4 rounded-full border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Custom Hamper Curation</option>
                    <option>Corporate Orders</option>
                    <option>Wedding Trousseau Services</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-bold text-text-main/50">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we elevate your gifting moment?"
                  className="w-full px-6 py-4 rounded-3xl border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-text-main text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main hover:scale-[1.02] flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
