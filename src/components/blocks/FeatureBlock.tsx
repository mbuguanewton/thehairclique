import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AmbientImage from "@/components/ui/AmbientImage";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import FadeIn from "@/components/animations/FadeIn";
import CustomPortableText from "../CustomPortableText";

interface SecondaryFeature {
  title?: string;
  description?: string;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  tag?: string;
  ctaText?: string;
  linkedPageSlug?: string;
  gridSize?: "normal" | "large";
}

interface FeatureBlockProps {
  title?: string;
  description?: string;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  imagePosition?: "left" | "right";
  secondaryFeatures?: SecondaryFeature[];
  anchorId?: string;
}

export default function FeatureBlock({
  title,
  description,
  image,
  imagePosition = "right",
  secondaryFeatures,
  anchorId,
}: FeatureBlockProps) {
  return (
    <section id={anchorId} className="py-20 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Feature */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
            imagePosition === "left" ? "lg:direction-rtl" : "",
          )}
        >
          <FadeIn
            direction={imagePosition === "left" ? "left" : "right"}
            className={cn(
              "space-y-6",
              imagePosition === "left" ? "lg:order-2" : "lg:order-1",
            )}
          >
            <div className="space-y-6">
              <Heading type="h2" className="text-4xl md:text-6xl">
                {title}
              </Heading>
              <div className="w-24 h-1 bg-accent/40 rounded-full" />
            </div>
            {description && <CustomPortableText value={description} />}
          </FadeIn>

          <FadeIn
            direction={imagePosition === "left" ? "right" : "left"}
            delay={0.2}
            className={cn(
              "relative aspect-4/3 group",
              imagePosition === "left" ? "lg:order-1" : "lg:order-2",
            )}
          >
            {image && (
              <AmbientImage
                src={urlForImage(image).url()}
                alt={title || "Feature Image"}
                containerClassName="rounded-app shadow-2xl"
                imageClassName="object-contain transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl z-20 pointer-events-none" />
          </FadeIn>
        </div>

        {secondaryFeatures && secondaryFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondaryFeatures.map((feature, index) => (
              <FadeIn
                key={index}
                direction="up"
                delay={index * 0.1}
                className={cn(
                  "group flex flex-col bg-card rounded-app border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20",
                  feature.gridSize === "large" ? "md:col-span-2" : "col-span-1",
                )}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {feature.image && (
                    <AmbientImage
                      src={urlForImage(feature.image).url()}
                      alt={feature.title || "Feature"}
                      containerClassName="rounded-none h-full"
                      imageClassName="object-contain scale-100 shadow-none transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  {feature.tag && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-border/20">
                        <Text
                          variant="brand-primary"
                          className="text-[10px] uppercase tracking-widest font-bold"
                        >
                          {feature.tag}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <Heading
                      type="h4"
                      className="text-lg md:text-xl font-medium tracking-tight group-hover:text-primary transition-colors"
                    >
                      {feature.title}
                    </Heading>
                    {feature.description && (
                      <Text
                        variant="muted"
                        className="text-sm leading-relaxed line-clamp-3 font-light"
                      >
                        {feature.description}
                      </Text>
                    )}
                  </div>

                  {feature.linkedPageSlug && (
                    <Link
                      href={`/${feature.linkedPageSlug}`}
                      className="mt-6 pt-6 border-t border-border/40 flex items-center justify-between group/btn"
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-inherit">
                          {feature.ctaText || "Explore Collection"}
                        </Text>
                        <ArrowRight
                          size={12}
                          strokeWidth={3}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-primary">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
