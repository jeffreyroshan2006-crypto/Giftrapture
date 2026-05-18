import type { Metadata, Viewport } from "next";
import { montserrat, playfair } from "./fonts";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gift Rapture | Luxury Gifting & Trousseau Packing",
  description: "Curated Elegance for Every Occasion. Luxury Bouquets, Themed Hampers, Wedding Trousseau, Occasional Hampers, Corporate Gifting.",
  keywords: "luxury gifting, bouquets, hampers, trousseau packing, corporate gifting",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}>
      <body className="font-sans min-h-screen selection:bg-accent-gold/30 selection:text-text-main flex flex-col bg-secondary text-text-main scroll-smooth">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
