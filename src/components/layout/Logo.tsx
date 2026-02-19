"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: string;
  color?: string;
}

export default function Logo({ className, size = "3xl", color = "accent" }: LogoProps) {
  // Map size and color to tailwind classes
  const sizeClass = {
    "2xl": "text-2xl",
    "3xl": "text-3xl md:text-4xl",
    "4xl": "text-4xl md:text-5xl",
    "5xl": "text-5xl md:text-6xl",
    "6xl": "text-6xl md:text-7xl",
  }[size] || "text-3xl md:text-4xl";

  const colorClass = {
    accent: "text-accent",
    primary: "text-primary",
    white: "text-white",
    "neutral-800": "text-neutral-800",
  }[color] || "text-accent";

  return (
    <span
      className={cn(
        "font-script tracking-normal select-none transition-colors duration-300",
        sizeClass,
        colorClass,
        className
      )}
    >
      The Hair Clique
    </span>
  );
}
