import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  title?: string;
  description?: string;
  icon?: string;
}

interface FeaturesBlockProps {
  title?: string;
  items?: FeatureItem[];
}

export default function FeaturesBlock({ title, items }: FeaturesBlockProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {items?.map((item, index) => {
            const IconComponent =
              (item.icon && (Icons as any)[item.icon]) || Icons.Sparkles;

            return (
              <div
                key={index}
                className="space-y-8 text-center md:text-left group relative p-10 bg-card rounded-4xl border border-border hover:border-accent/40 transition-all duration-500 shadow-sm"
              >
                <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-accent/5 border border-accent/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                  <IconComponent className="w-8 h-8 text-accent stroke-1" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground font-light leading-relaxed tracking-wide text-sm line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
