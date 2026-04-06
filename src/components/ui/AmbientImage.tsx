"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AmbientImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  containerClassName?: string /* The bounding box */;
  imageClassName?: string /* The main image styling */;
  blurAmount?: string /* Custom blur strength */;
}

/**
 * AmbientImage Component
 * Creates a "Letterbox Filler" effect where a blurred, saturated version
 * of the image fills the background, allowing the main image to be
 * displayed in full (object-contain) without letterboxing bars.
 */
export default function AmbientImage({
  src,
  alt,
  fill = true,
  width,
  height,
  priority = false,
  containerClassName,
  imageClassName,
  blurAmount = "blur-2xl",
}: AmbientImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden isolate rounded-xl",
        fill ? "w-full h-full" : "w-full",
        containerClassName,
      )}
    >
      {/* 1. The Background Filler (Blurred) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={src}
          alt=""
          fill
          className={cn(
            "object-cover saturate-150", // scale-110 prevents white edges during blur
            blurAmount,
          )}
          priority={priority}
          aria-hidden="true"
        />
        {/* Semi-transparent overlay to provide contrast for the main image */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 2. The Main Image (Contained) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              "object-contain",
              "shadow-[0_0_40px_rgba(0,0,0,0.2)]",
              imageClassName,
            )}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "max-w-full max-h-full object-contain",
              "shadow-[0_0_40px_rgba(0,0,0,0.2)]",
              imageClassName,
            )}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
