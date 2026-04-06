"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
  children: React.ReactNode;
}

/**
 * NavbarClient Component
 * Handles the dynamic scroll effects for the navigation bar.
 * Specifically, it toggles backdrop blur and background opacity on mobile
 * only when the user starts scrolling down.
 */
export default function NavbarClient({ children }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect after 20px of scrolling
      setIsScrolled(window.scrollY > 20);
    };

    // Initialize state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg"
          : "bg-primary backdrop-blur-none",
      )}
    >
      {children}
    </nav>
  );
}
