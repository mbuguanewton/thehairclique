"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import LogoComponent from "./Logo";

interface MobileNavProps {
  navLinks: { label: string; href: string }[];
  logoConfig?: {
    fontSize?: string;
    color?: string;
  };
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function MobileNav({ navLinks, logoConfig }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-primary-foreground focus:outline-none"
        aria-label="Open Menu"
      >
        <div className="flex flex-col gap-1.5 items-end">
          <div className="w-8 h-px bg-current" />
          <div className="w-5 h-px bg-current" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-primary flex flex-col pt-24 px-8"
          >
            {/* Header in Menu */}
            <div className="absolute top-0 left-0 right-0 h-24 px-6 flex items-center justify-between border-b border-primary-foreground/10">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <LogoComponent
                  size={logoConfig?.fontSize}
                  color={logoConfig?.color}
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-primary-foreground group"
                aria-label="Close Menu"
              >
                <X className="w-8 h-8 stroke-1 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-light text-primary-foreground/90 hover:text-accent transition-colors tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Decorative Element */}
            <div className="mt-auto pb-12 opacity-10">
               <span className="text-8xl font-serif italic text-primary-foreground selection:bg-none">
                Clique
               </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
