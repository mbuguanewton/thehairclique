import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name?: string;
  description?: string;
  price?: string;
  image?: any;
}

interface ServicesBlockProps {
  title?: string;
  items?: ServiceItem[];
}

export default function ServicesBlock({ title, items }: ServicesBlockProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-card border border-border rounded-4xl overflow-hidden hover:border-accent/40 shadow-sm transition-all duration-500 group"
            >
              {item.image && (
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.name || "Service"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-40" />
                </div>
              )}
              <div className="p-10 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-light text-foreground tracking-tight">
                    {item.name}
                  </h3>
                  {item.price && (
                    <span className="text-xl font-serif italic text-accent whitespace-nowrap">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-muted-foreground font-light leading-relaxed text-sm tracking-wide">
                    {item.description}
                  </p>
                )}
                <div className="pt-4">
                  <div className="w-8 h-px bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
