import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

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
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {title && (
          <div className="space-y-4 text-center">
            <Heading type="h2">{title}</Heading>
            <div className="w-24 h-px bg-accent/30 mx-auto" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items?.map((item, index) => {
            const IconComponent =
              (item.icon && (Icons as any)[item.icon]) || Icons.Sparkles;

            return (
              <div
                key={index}
                className="space-y-8 text-center md:text-left group relative p-8 bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-500 shadow-sm"
              >
                <div className="inline-flex items-center justify-center p-6 rounded-lg bg-accent/5 border border-accent/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                  <IconComponent className="w-8 h-8 text-accent stroke-1" />
                </div>
                <div className="space-y-4">
                  <Heading type="h3">{item.title}</Heading>
                  {item.description && (
                    <Text variant="muted" className="text-sm line-clamp-3">
                      {item.description}
                    </Text>
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
