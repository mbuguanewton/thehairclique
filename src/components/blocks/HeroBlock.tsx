"use client";

import Heading from "@/components/ui/Heading";

import Text from "@/components/ui/Text";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: any;
  ctaText?: string;
  ctaLink?: string;
  anchorId?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaLink,
  anchorId,
}: HeroBlockProps) {
  return (
    <section id={anchorId} className="relative md:min-h-[60vh] w-full flex flex-col items-center justify-center bg-primary text-primary-foreground selection:bg-accent/30 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-16">
        {/* Left: Content */}
        <div className="space-y-6 md:space-y-8 text-left">
          <header className="space-y-4 md:space-y-6 group">
            <FadeIn direction="right" delay={0.1}>
              <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/20 rounded-full backdrop-blur-sm">
                <Text
                  as="span"
                  className="text-[10px] font-semibold uppercase tracking-[0.5em] text-accent"
                >
                  The Hair Clique
                </Text>
              </div>
            </FadeIn>

            {heading && (
              <FadeIn direction="right" delay={0.2}>
                <Heading type="hero" className="text-white">
                  {heading}
                </Heading>
              </FadeIn>
            )}

            {subheading && (
              <FadeIn direction="right" delay={0.3}>
                <Text
                  variant="muted"
                  className="text-primary-foreground/80 md:text-xl max-w-lg"
                >
                  {subheading}
                </Text>
              </FadeIn>
            )}
          </header>

          {ctaText && ctaLink && (
            <FadeIn direction="up" delay={0.4}>
              <div className="pt-4">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center bg-white text-primary px-10 py-5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl"
                >
                  {ctaText}
                </Link>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Right: Featured Image with Accents */}
        <FadeIn direction="left" delay={0.2} className="relative group lg:block hidden">
          {backgroundImage && (
            <div className="relative aspect-4/5 w-full max-w-md mx-auto rounded-app overflow-hidden border-12 border-white/5 shadow-2xl">
              <Image
                src={urlForImage(backgroundImage).url()}
                alt={heading || "Hero Image"}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              {/* <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" /> */}
            </div>
          )}

          {/* Floating Accent Card */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 bg-accent text-white p-8 rounded-app shadow-2xl max-w-50 space-y-2 transform transition-transform duration-700 group-hover:rotate-0"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">
              Sanctuary
            </p>
            <p className="text-lg font-serif italic leading-tight">
              Elite Styling Experience
            </p>
          </motion.div>

          {/* Animated decorative element */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
            <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-[-5%] right-[-5%] opacity-5 pointer-events-none select-none lg:block hidden">
        <span className="text-[30rem] font-serif italic tracking-tighter leading-none pr-10">
          Sanctuary
        </span>
      </div>
    </section>
  );
}
