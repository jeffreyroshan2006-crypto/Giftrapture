import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PolicyContent {
  title: string;
  lastUpdated: string;
  sections: { title: string; paragraphs: string[] }[];
}

const policies: Record<string, PolicyContent> = {
  shipping: {
    title: "Shipping & Delivery Policy",
    lastUpdated: "May 2026",
    sections: [
      {
        title: "1. Premium Packing & Protection",
        paragraphs: [
          "All GIFTRAPTURE hampers, corporate kits, and signature bouquets are meticulously secured in double-strength insulated packaging to ensure they survive temperature variations and rough handling during transport.",
          "Our fresh flowers are delivered in specialized water-packs to preserve their freshness for up to 48 hours in transit."
        ]
      },
      {
        title: "2. Shipping Timelines",
        paragraphs: [
          "Standard Delivery: Chennai orders are delivered within 4-12 hours of dispatch. Domestic orders outside Tamil Nadu are delivered within 2-4 business days.",
          "Express Delivery: Available for select floral bouquets and ready hampers in Chennai. Express orders are fulfilled within 2-4 hours from confirmation."
        ]
      },
      {
        title: "3. Delivery Charges",
        paragraphs: [
          "Standard ground delivery is complimentary for all orders above ₹5,000. For orders under ₹5,000, a flat delivery fee of ₹250 applies.",
          "Express and same-day courier options are calculated at checkout or discussed during the WhatsApp confirmation process."
        ]
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "May 2026",
    sections: [
      {
        title: "1. Collection of Personal Data",
        paragraphs: [
          "We collect essential details such as your name, contact phone number, delivery address, and preferences when you curate custom hampers or initiate orders through our website and WhatsApp flow.",
          "We do not store financial credentials or credit card numbers. All payments are verified separately through secure merchant gates or bank transfers."
        ]
      },
      {
        title: "2. How We Use Your Information",
        paragraphs: [
          "Your data is solely used to coordinate concierge-grade delivery, optimize our product availability, send bespoke collection previews, and process transactional confirmations.",
          "We will never trade, sell, or rent your personal coordinates to any third-party marketing companies."
        ]
      },
      {
        title: "3. Security Practices",
        paragraphs: [
          "Our platforms implement high-grade SSL encryption and robust tokenization layers to ensure all personal addresses and selections remain entirely confidential."
        ]
      }
    ]
  },
  returns: {
    title: "Return & Refund Policy",
    lastUpdated: "May 2026",
    sections: [
      {
        title: "1. Fresh Floral Bouquets & Food Products",
        paragraphs: [
          "Due to the perishable nature of fresh flowers, gourmet food items, and hand-decorated fresh fruits, we cannot accept returns or provide exchanges for these selections once they have been dispatched.",
          "If your arrangement arrives damaged due to transport, please contact our concierge team with photo evidence within 2 hours of delivery for a complimentary priority replacement."
        ]
      },
      {
        title: "2. Non-Perishable Custom Hampers",
        paragraphs: [
          "Custom hampers, leather trunks, and wooden boxes are tailored specifically for each customer and are non-refundable.",
          "For standard boxed gifts that do not contain flowers or fresh items, returns are accepted within 3 days of arrival if the original seals and signature tags remain completely intact."
        ]
      },
      {
        title: "3. Refund Execution",
        paragraphs: [
          "Approved refunds are processed via bank transfer or credit card reversals within 5-7 business days of the returned item arriving back at our Chennai headquarters."
        ]
      }
    ]
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "May 2026",
    sections: [
      {
        title: "1. Service Agreements",
        paragraphs: [
          "By accessing the GIFTRAPTURE site, placing custom orders, or utilizing our WhatsApp checkout, you consent to our terms of curated service and custom-designed policies.",
          "All signature branding, product concepts, design assets, and photos displayed on our site are the exclusive intellectual property of GIFTRAPTURE."
        ]
      },
      {
        title: "2. Customizations & Cancellations",
        paragraphs: [
          "For custom-designed wedding trousseau or corporate projects, orders cannot be cancelled or fully refunded once materials or specific items have been sourced.",
          "Minor alterations in bouquet elements (due to seasonal flower scarcity) may occur. Our master florists guarantee to replace missing species with blooms of equal or greater value."
        ]
      }
    ]
  }
};

export async function generateStaticParams() {
  return [{ policy: "shipping" }, { policy: "privacy" }, { policy: "returns" }, { policy: "terms" }];
}

export default async function PolicyPage({ params }: { params: { policy: string } }) {
  const { policy } = await params;
  const content = policies[policy];

  if (!content) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <div className="pt-32 px-6 max-w-4xl mx-auto py-24">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-soft-gray hover:text-text-main transition-colors mb-12 group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif text-text-main mb-2 italic">{content.title}</h1>
        <p className="text-xs uppercase tracking-widest text-soft-gray font-bold mb-12">Last Updated: {content.lastUpdated}</p>

        <div className="space-y-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-text-main/5">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-serif text-text-main font-bold">{section.title}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-soft-gray leading-relaxed text-sm md:text-base font-sans">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
