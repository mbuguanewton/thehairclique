"use client";

import Heading from "@/components/ui/Heading";

import Text from "@/components/ui/Text";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: any;
  secondaryImages?: any[];
  ctaText?: string;
  ctaLink?: string;
  anchorId?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  backgroundImage,
  secondaryImages,
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

        {/* Right: Featured Image with Surrounding Collage */}
        <FadeIn direction="left" delay={0.2} className="relative group lg:block hidden">
          <div className="relative w-full max-w-md mx-auto aspect-4/5">
            {/* Main Image */}
            {backgroundImage && (
              <div className="relative z-10 w-full h-full rounded-app overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image
                  src={urlForImage(backgroundImage).url()}
                  alt={heading || "Hero Image"}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority
                />
              </div>
            )}

            {/* Secondary Images (Collage) */}
            {secondaryImages && secondaryImages.length > 0 && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                {secondaryImages.map((img, i) => {
                  // Position styles for surrounding effect
                  const positions = [
                    "absolute -top-12 -left-12 w-32 h-32 rotate-[-12deg]",
                    "absolute -bottom-8 -right-12 w-36 h-36 rotate-[8deg]",
                    "absolute top-20 -right-16 w-28 h-28 rotate-[15deg]",
                    "absolute -bottom-16 left-8 w-24 h-24 rotate-[-10deg]",
                  ];
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }}
                      className={cn(
                        "rounded-app overflow-hidden border-4 border-white shadow-xl ring-1 ring-black/5",
                        positions[i % positions.length]
                      )}
                    >
                      <Image
                        src={urlForImage(img).url()}
                        alt={`Collage Image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

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
