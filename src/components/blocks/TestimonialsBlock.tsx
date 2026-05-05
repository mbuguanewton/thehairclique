"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Testimonial {
  _key: string;
  name: string;
  role?: string;
  avatar?: any;
  quote: string;
  rating?: number;
  platform?: string;
  reviewUrl?: string;
}

interface TestimonialsBlockProps {
  title?: string;
  subtitle?: string;
  anchorId?: string;
  testimonials?: Testimonial[];
}

const PLATFORM_LABELS: Record<string, string> = {
  google: "Google",
  instagram: "Instagram",
  facebook: "Facebook",
  yelp: "Yelp",
  other: "Review",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < rating
              ? "fill-accent text-accent"
              : "fill-muted text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const avatarUrl = item.avatar
    ? urlForImage(item.avatar).width(80).height(80).url()
    : null;

  return (
    <div className="flex flex-col justify-between gap-6 bg-card border border-border rounded-xl p-7 h-full min-w-[300px] max-w-sm w-full">
      {item.rating && <StarRating rating={item.rating} />}

      <Text variant="muted" className="text-sm leading-relaxed flex-1 italic">
        &ldquo;{item.quote}&rdquo;
      </Text>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={item.name}
              width={36}
              height={36}
              className="rounded-full object-cover w-9 h-9 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <span className="text-accent text-sm font-light">
                {item.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground leading-tight">
              {item.name}
            </p>
            {item.role && (
              <p className="text-xs text-muted-foreground font-light">
                {item.role}
              </p>
            )}
          </div>
        </div>

        {item.reviewUrl && (
          <a
            href={item.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors shrink-0"
            aria-label={`Read review on ${item.platform ? PLATFORM_LABELS[item.platform] : "original source"}`}
          >
            <span className="hidden sm:inline">
              {item.platform ? PLATFORM_LABELS[item.platform] : "Review"}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={cn(
          "flex gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {doubled.map((item, i) => (
          <div key={`${item._key}-${i}`} className="w-80 shrink-0">
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsBlock({
  title,
  subtitle,
  anchorId,
  testimonials,
}: TestimonialsBlockProps) {
  if (!testimonials?.length) return null;

  const useMarquee = testimonials.length > 4;

  const firstRow = useMarquee
    ? testimonials.slice(0, Math.ceil(testimonials.length / 2))
    : testimonials;
  const secondRow = useMarquee
    ? testimonials.slice(Math.ceil(testimonials.length / 2))
    : [];

  return (
    <section id={anchorId} className="py-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {(title || subtitle) && (
          <div className="space-y-3 text-center">
            {title && <Heading type="h2">{title}</Heading>}
            {subtitle && (
              <Text variant="muted" className="max-w-xl mx-auto">
                {subtitle}
              </Text>
            )}
            <div className="w-24 h-px bg-accent/30 mx-auto" />
          </div>
        )}
      </div>

      {useMarquee ? (
        <div className="space-y-5 mt-12">
          <MarqueeRow items={firstRow} />
          {secondRow.length > 0 && <MarqueeRow items={secondRow} reverse />}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div
            className={cn(
              "grid gap-5",
              testimonials.length === 1 && "grid-cols-1 max-w-sm mx-auto",
              testimonials.length === 2 && "grid-cols-1 md:grid-cols-2",
              testimonials.length === 3 && "grid-cols-1 md:grid-cols-3",
              testimonials.length === 4 &&
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {testimonials.map((item) => (
              <TestimonialCard key={item._key} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
