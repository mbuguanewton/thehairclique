"use client";

import { motion } from "framer-motion";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
      {links.map((link, i) => {
        const label = link.label || link.platform;
        return (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.4em] font-medium text-primary-foreground/60 hover:text-accent transition-colors duration-300 relative group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
          </motion.a>
        );
      })}
    </div>
  );
}
