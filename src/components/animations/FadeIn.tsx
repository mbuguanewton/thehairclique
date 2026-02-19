"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  staggerChildren?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  distance = 30,
  staggerChildren,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...(directions[direction] || {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1.0] as any, // cubic-bezier for a premium feel
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
