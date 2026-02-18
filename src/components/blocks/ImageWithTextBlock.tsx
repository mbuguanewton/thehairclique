import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import CustomPortableText from "@/components/CustomPortableText";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";

interface ImageWithTextBlockProps {
  title?: string;
  text?: any;
  image?: any;
  imagePosition?: "left" | "right";
  imageSize: "sm" | "md" | "lg";
}

export default function ImageWithTextBlock({
  title,
  text,
  image,
  imagePosition = "left",
  imageSize = "lg",
}: ImageWithTextBlockProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div
          className={cn(
            "relative aspect-4/5 rounded-sm overflow-hidden border border-border",
            imagePosition === "right" && "md:order-last",
            imageSize === "sm" && "h-1/2",
            imageSize === "md" && "h-3/4",
            imageSize === "lg" && "h-full",
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
          <div className="pt-6">
            <div className="w-0 group-hover:w-full h-px bg-accent/20 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
