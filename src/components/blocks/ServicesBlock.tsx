import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import CustomPortableText from "@/components/CustomPortableText";

interface ServiceItem {
  name?: string;
  description?: any;
  price?: string;
  image?: any;
}

interface ServicesBlockProps {
  title?: string;
  items?: ServiceItem[];
}

export default function ServicesBlock({ title, items }: ServicesBlockProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {title && (
          <div className="space-y-4 text-center">
            <Heading type="h2">{title}</Heading>
            <div className="w-24 h-px bg-accent/30 mx-auto" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-500 hover:border-accent/40"
            >
              {item.image && (
                <Image
                  src={urlForImage(item.image).url()}
                  alt={item.name || "Service"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Service Name Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white px-6 py-2 rounded-full shadow-lg">
                  <Text
                    as="span"
                    className="text-sm font-medium text-black tracking-wide"
                  >
                    {item.name}
                  </Text>
                </div>
              </div>

              {/* Hover Info (Description/Price) - subtle overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-4 max-h-full overflow-y-auto custom-scrollbar">
                  {item.price && (
                    <Text
                      as="p"
                      className="text-white font-serif italic text-xl"
                    >
                      {item.price}
                    </Text>
                  )}
                  {item.description && (
                    <CustomPortableText
                      value={item.description}
                      className="text-white/90 text-sm font-light leading-snug prose-invert"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
