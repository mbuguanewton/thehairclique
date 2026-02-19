import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

interface SimpleHeroBlockProps {
  badge?: string;
  heading?: string;
  description?: string;
  theme?: "mint" | "teal" | "white";
  anchorId?: string;
}

export default function SimpleHeroBlock({
  badge,
  heading,
  description,
  theme = "mint",
  anchorId,
}: SimpleHeroBlockProps) {
  const themes = {
    mint: "bg-background text-foreground",
    teal: "bg-primary text-primary-foreground shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]",
    white: "bg-white text-foreground",
  };

  const isDark = theme === "teal";

  return (
    <section
      id={anchorId}
      className={cn(
        "relative py-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center",
        themes[theme],
      )}
    >
      {/* Decorative Atmosphere - subtle gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-3xl",
            isDark ? "bg-white/5" : "bg-accent/5",
          )}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {badge && (
          <div
            className={cn(
              "inline-flex items-center px-4 py-1.5 rounded-full border backdrop-blur-sm shadow-sm",
              isDark
                ? "border-white/20 bg-white/10"
                : "border-border bg-white/50",
            )}
          >
            <Text
              as="span"
              className={cn(
                "text-[10px] uppercase tracking-widest font-medium",
                isDark ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {badge}
            </Text>
          </div>
        )}

        {heading && (
          <Heading type="h1" className="leading-[0.9]">
            {heading}
          </Heading>
        )}

        {description && (
          <Text
            className={cn(
              "max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed",
              isDark ? "text-primary-foreground/80" : "text-foreground/70",
            )}
          >
            {description}
          </Text>
        )}
      </div>
    </section>
  );
}
