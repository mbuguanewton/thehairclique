import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroBlockProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: any;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroBlockProps) {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(backgroundImage).url()}
            alt={heading || "Hero Image"}
            fill
            className="object-cover opacity-50 mix-blend-luminosity scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-transparent to-primary/60 mix-blend-multiply opacity-40" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl px-6 text-center space-y-10 group">
        <div className="space-y-6">
          {heading && (
            <h1 className="text-6xl md:text-9xl font-extralight tracking-tighter leading-[0.9] text-foreground">
              {heading.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={cn(
                    i % 2 === 1 ? "italic font-serif text-accent" : "",
                  )}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
          )}
          {subheading && (
            <p className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
              {subheading}
            </p>
          )}
        </div>

        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className={cn(
              "inline-flex items-center justify-center bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground px-12 py-5 text-sm uppercase tracking-[0.3em] font-medium transition-all duration-500 rounded-full shadow-2xl shadow-accent/20",
            )}
          >
            {ctaText}
          </Link>
        )}
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-px h-12 bg-linear-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
