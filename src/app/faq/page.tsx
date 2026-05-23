import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata = {
  title: "FAQ | GIFTRAPTURE",
  description: "Answers to common questions about GIFTRAPTURE products, ordering, payments, and delivery.",
};

const FAQ_SECTIONS = [
  {
    title: "ABOUT OUR PRODUCTS",
    items: [
      {
        question: "What's in each hamper? Can I see individual items?",
        answer: "Each hamper includes a curated selection of items listed on the product page. If you need a full itemized preview, we can share a detailed list before confirmation."
      },
      {
        question: "Are items customizable? How does it work?",
        answer: "Yes. Use the Custom Box flow to select packaging, pick items from the catalog, and add personalization like message cards or color themes."
      },
      {
        question: "What about allergies or dietary restrictions?",
        answer: "Let us know during checkout or via WhatsApp. We will replace items with suitable alternatives of equal or higher value."
      }
    ]
  },
  {
    title: "ORDERING & CUSTOMIZATION",
    items: [
      {
        question: "How do I place an order?",
        answer: "Select a product, add to cart, and checkout. For bespoke orders, use the Custom Box builder and proceed to payment."
      },
      {
        question: "Can I add specific items or colors?",
        answer: "Absolutely. Choose your items in the Custom Box builder and add personalization such as ribbon color or message card."
      },
      {
        question: "What's your MOQ (minimum order quantity)?",
        answer: "There is no MOQ for individual orders. Corporate or event orders may have a minimum of 10 units depending on customization complexity."
      }
    ]
  },
  {
    title: "PAYMENT & REFUNDS",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept major cards, UPI, and bank transfers. For corporate orders, invoicing is available on request."
      },
      {
        question: "Is my payment secure?",
        answer: "Yes. Payments are processed through secure, encrypted gateways. We do not store card details."
      },
      {
        question: "What's your refund policy?",
        answer: "Custom and perishable items are non-refundable once dispatched. Eligible refunds follow our return policy timelines."
      }
    ]
  },
  {
    title: "DELIVERY & SHIPPING",
    items: [
      {
        question: "How long does delivery take?",
        answer: "Chennai same-day is available for select items. Pan-India delivery typically takes 5-10 days depending on location."
      },
      {
        question: "Do you deliver nationwide?",
        answer: "Yes. We deliver across India with premium protective packaging and tracked fulfillment."
      },
      {
        question: "Can I schedule delivery for a specific date or time?",
        answer: "Yes. Select a delivery date during checkout or contact our concierge to schedule a specific window."
      }
    ]
  }
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Navbar />

      <div className="pt-32 px-6 max-w-5xl mx-auto py-24">
        <div className="text-center mb-16">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 block">Help Center</span>
          <h1 className="text-4xl md:text-6xl font-serif text-text-main italic mb-6">Frequently Asked Questions</h1>
          <p className="text-soft-gray text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about our premium gifting experience.
          </p>
        </div>

        <div className="space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.title} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-text-main/5">
              <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-accent-sage mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.question} className="border-b border-text-main/5 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="font-serif text-lg text-text-main mb-3 italic">{item.question}</h3>
                    <p className="text-sm text-soft-gray leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </main>
  );
}
