import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import CustomPortableText from "@/components/CustomPortableText";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import Heading from "@/components/ui/Heading";

interface ImageWithTextBlockProps {
  title?: string;
  text?: any;
  image?: any;
  imagePosition?: "left" | "right";
  imageSize: "sm" | "md" | "lg";
  anchorId?: string;
}

export default function ImageWithTextBlock({
  title,
  text,
  image,
  imagePosition = "left",
  imageSize = "lg",
  anchorId,
}: ImageWithTextBlockProps) {
  return (
    <section id={anchorId} className="py-12 md:py-24 px-6 bg-white overflow-hidden">
      <FadeIn className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div
          className={cn(
            "relative w-full aspect-video md:aspect-4/5 overflow-hidden border border-border shadow-2xl rounded-app mx-auto",
            imagePosition === "right" && "md:order-last",
            imageSize === "sm" && "md:max-w-md",
            imageSize === "md" && "md:max-w-lg",
            imageSize === "lg" && "md:max-w-full",
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
        </div>

        <div className="space-y-6 group">
          <div className="space-y-4">
            {title && (
              <Heading type="h2" className="leading-tight">
                {title}
              </Heading>
            )}
            <div className="w-16 h-px bg-accent/40" />
          </div>
          <CustomPortableText value={text} />
          <div className="pt-2">
            <div className="w-0 group-hover:w-full h-px bg-accent/20 transition-all duration-700" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
