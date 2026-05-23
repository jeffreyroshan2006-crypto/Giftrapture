"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

// Modern, official Instagram Glyph SVG
export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// Modern, official WhatsApp Speech Bubble SVG
export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 0C5.39 0 .002 5.39.002 12.03c0 2.12.553 4.184 1.607 6.002L0 24l6.136-1.611a12.016 12.016 0 0 0 5.89 1.542h.005c6.639 0 12.029-5.39 12.029-12.03C24.06 5.391 18.672 0 12.03 0zm0 22.02c-1.8 0-3.56-.484-5.1-1.4l-.366-.217-3.792.996.99-3.701-.237-.378a9.988 9.988 0 0 1-1.533-5.289c-.001-5.516 4.49-10.007 10.011-10.007 2.673 0 5.187 1.042 7.078 2.934 1.89 1.89 2.93 4.404 2.93 7.078-.002 5.518-4.493 10.006-10.01 10.006zm5.49-7.506c-.3-.15-1.77-.875-2.05-.975-.27-.1-.47-.15-.67.15-.2.3-.77.975-.95 1.175-.17.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.066-.952-1.616-2.128-1.826-2.488-.21-.36-.022-.554.127-.703.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.496-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.113 3.227 5.12 4.525.715.309 1.273.493 1.708.63.72.228 1.374.195 1.892.118.577-.087 1.774-.725 2.024-1.425.25-.7.25-1.3 1.75-1.425z" />
    </svg>
  );
}

interface SocialLinkProps {
  href: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function InstagramLink({ href, className, size = "md" }: SocialLinkProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  };

  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className={cn("group relative block", className)}
    >
      <span className={cn(
        "flex items-center justify-center rounded-full border border-text-main/10 bg-white shadow-md text-text-main hover:text-white transition-all duration-500 hover:scale-110 hover:-translate-y-1 overflow-hidden relative",
        sizeClasses[size],
        "group-hover:shadow-[0_10px_25px_-5px_rgba(221,42,123,0.4)] group-hover:border-transparent"
      )}>
        {/* Animated Brand Gradient Background Overlay */}
        <span className="absolute inset-0 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        
        {/* SVG Icon with Rotation */}
        <InstagramIcon className={cn(
          "relative z-10 transition-transform duration-500 ease-out group-hover:rotate-[12deg]",
          iconClasses[size]
        )} />
      </span>
    </Link>
  );
}

export function WhatsAppLink({ href, className, size = "md" }: SocialLinkProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  };

  const iconClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={cn("group relative block", className)}
    >
      <span className={cn(
        "flex items-center justify-center rounded-full border border-text-main/10 bg-white shadow-md text-text-main hover:text-white transition-all duration-500 hover:scale-110 hover:-translate-y-1 overflow-hidden relative",
        sizeClasses[size],
        "group-hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] group-hover:border-transparent"
      )}>
        {/* Animated Brand Gradient Background Overlay */}
        <span className="absolute inset-0 bg-gradient-to-tr from-[#075e54] to-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        
        {/* SVG Icon with Rotation */}
        <WhatsAppIcon className={cn(
          "relative z-10 transition-transform duration-500 ease-out group-hover:rotate-[12deg]",
          iconClasses[size]
        )} />
      </span>
    </Link>
  );
}
