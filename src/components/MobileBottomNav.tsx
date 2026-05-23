"use client";

import { Home, LayoutGrid, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Explore", href: "/categories" },
  { icon: ShoppingBag, label: "Cart", href: "/cart" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // HIDDEN: bottom nav is fully removed on mobile per client request
  return null;
}
