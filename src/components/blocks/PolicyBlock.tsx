import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import CustomPortableText from "@/components/CustomPortableText";

interface PolicyBlockProps {
  title?: string;
  lastUpdated?: string;
  content?: any;
}

export default function PolicyBlock({
  title,
  lastUpdated,
  content,
}: PolicyBlockProps) {
  return (
    <article className="bg-[#F8F9FA]">
      {/* Premium Centered Header - Replicates Blog Detail Page aesthetic */}
      <header className="bg-primary pt-32 pb-32 px-6 text-center text-primary-foreground relative overflow-hidden">
        {/* Subtle decorative elements matching the blog detail header */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          {lastUpdated && (
            <Text className="text-sm uppercase tracking-[0.3em] font-bold text-primary-foreground/80">
              Published{" "}
              {new Date(lastUpdated).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          )}

          <Heading
            type="h1"
            className="text-4xl md:text-6xl lg:text-5xl leading-tight tracking-tight max-w-5xl mx-auto text-white"
          >
            {title || "Legal Policy"}
          </Heading>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-widest font-bold">
              Legal Documentation
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Section - Matches Blog Detail Page Content layout */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="prose prose-lg prose-slate max-w-none">
          {content && <CustomPortableText value={content} />}
        </div>
      </div>
    </article>
  );
}
