import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { urlForImage } from "@/sanity/lib/image";
import FadeIn from "@/components/animations/FadeIn";

interface ShowcaseItem {
  title?: string;
  description?: string;
  image?: any;
}

interface ShowcaseBlockProps {
  title?: string;
  items?: ShowcaseItem[];
  anchorId?: string;
}

export default function ShowcaseBlock({
  title,
  items,
  anchorId,
}: ShowcaseBlockProps) {
  return (
    <section id={anchorId} className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {title && (
          <div className="space-y-4 text-left">
            <Heading type="h2">{title}</Heading>
            <div className="w-24 h-px bg-accent/30" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <FadeIn
              key={index}
              direction="up"
              delay={index * 0.1}
              className="group relative aspect-square overflow-hidden rounded-app bg-card border border-border"
            >
              {item.image && (
                <Image
                  src={urlForImage(item.image).url()}
                  alt={item.title || "Showcase Image"}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              )}

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 p-10 space-y-2 z-10">
                <Heading
                  type="h3"
                  className="text-xl font-light text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 tracking-tight"
                >
                  {item.title}
                </Heading>
                {item.description && (
                  <Text className="text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 uppercase tracking-widest font-light">
                    {item.description}
                  </Text>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
