import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";

interface ImageWithTextBlockProps {
  title?: string;
  text?: any;
  image?: any;
  imagePosition?: "left" | "right";
}

export default function ImageWithTextBlock({
  title,
  text,
  image,
  imagePosition = "left",
}: ImageWithTextBlockProps) {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div
          className={cn(
            "relative aspect-4/5 rounded-4xl overflow-hidden border border-border shadow-2xl",
            imagePosition === "right" && "md:order-last",
          )}
        >
          {image && (
            <Image
              src={urlForImage(image).url()}
              alt={title || "Image"}
              fill
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
        </div>

        <div className="space-y-10 group">
          <div className="space-y-6">
            {title && (
              <h2 className="text-4xl md:text-7xl font-extralight text-foreground tracking-tighter leading-none">
                {title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={cn(
                      i === 1 ? "italic font-serif text-accent" : "",
                    )}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>
            )}
            <div className="w-16 h-px bg-accent/40" />
          </div>
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed tracking-wide text-lg">
            <PortableText value={text} />
          </div>
          <div className="pt-6">
            <div className="w-0 group-hover:w-full h-px bg-accent/20 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
