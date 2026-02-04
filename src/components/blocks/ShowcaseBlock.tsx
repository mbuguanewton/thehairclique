import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  title?: string;
  description?: string;
  image?: any;
}

interface ShowcaseBlockProps {
  title?: string;
  items?: ShowcaseItem[];
}

export default function ShowcaseBlock({ title, items }: ShowcaseBlockProps) {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-24">
        {title && (
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extralight text-foreground tracking-tighter">
              {title.split(" ").map((word, i) => (
                <span
                  key={word}
                  className={cn(i === 0 ? "italic font-serif text-accent" : "")}
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <div className="w-24 h-px bg-accent/30 mx-auto" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-4xl bg-card border border-border"
            >
              {item.image && (
                <Image
                  src={urlForImage(item.image).url()}
                  alt={item.title || "Showcase Image"}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-10 space-y-2">
                <h3 className="text-xl font-light text-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500 tracking-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 uppercase tracking-widest font-light">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
