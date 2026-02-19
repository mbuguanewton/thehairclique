import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import FadeIn from "@/components/animations/FadeIn";
import CustomPortableText from "../CustomPortableText";

interface SecondaryFeature {
  title?: string;
  description?: string;
  image?: any;
  gridSize?: "normal" | "large";
}

interface FeatureBlockProps {
  title?: string;
  description?: string;
  image?: any;
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
    <section id={anchorId} className="py-10 px-6 bg-background overflow-hidden">
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
            className={cn("space-y-6", imagePosition === "left" ? "lg:order-2" : "lg:order-1")}
          >
            <div className="space-y-6">
              <Heading type="h2" className="text-4xl md:text-6xl">
                {title}
              </Heading>
              <div className="w-24 h-1 bg-accent/40 rounded-full" />
            </div>
            {description && (
              <CustomPortableText value={description} />
            )}
          </FadeIn>

          <FadeIn
            direction={imagePosition === "left" ? "right" : "left"}
            delay={0.2}
            className={cn(
              "relative aspect-[4/3] rounded-app overflow-hidden shadow-2xl group",
              imagePosition === "left" ? "lg:order-1" : "lg:order-2",
            )}
          >
            {image && (
              <Image
                src={urlForImage(image).url()}
                alt={title || "Feature Image"}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
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
                  "group space-y-4",
                  feature.gridSize === "large" ? "md:col-span-2" : "col-span-1",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-app bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  {feature.image && (
                    <Image
                      src={urlForImage(feature.image).url()}
                      alt={feature.title || "Feature"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <Heading type="h3" className="text-lg md:text-xl font-normal tracking-tight">
                    {feature.title}
                  </Heading>
                  {feature.description && (
                    <Text variant="muted" className="text-sm leading-relaxed max-w-xl">
                      {feature.description}
                    </Text>
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
