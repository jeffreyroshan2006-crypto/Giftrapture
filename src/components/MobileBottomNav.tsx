"use client";

import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Explore", href: "/categories" },
  { icon: ShoppingBag, label: "Cart", href: "/cart" },
  { icon: User, label: "Profile", href: "/profile" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-xl border-t border-text-main/5 pb-5 pt-3 px-6 shadow-2xl safe-area-inset-bottom">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {Tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="relative flex flex-col items-center justify-center p-2 group"
            >
              <div
                className={cn(
                  "p-2 rounded-full transition-all duration-300 relative",
                  isActive ? "text-accent-gold" : "text-soft-gray group-hover:text-text-main"
                )}
              >
                <tab.icon className={cn("w-6 h-6", isActive ? "fill-accent-gold/20" : "")} />
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/20 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium mt-1 tracking-tight transition-all duration-300",
                  isActive ? "text-text-main opacity-100" : "text-soft-gray opacity-80"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
