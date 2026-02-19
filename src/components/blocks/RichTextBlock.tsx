import CustomPortableText from "@/components/CustomPortableText";

interface RichTextBlockProps {
  content?: any;
  anchorId?: string;
}

export default function RichTextBlock({
  content,
  anchorId,
}: RichTextBlockProps) {
  return (
    <section id={anchorId} className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <CustomPortableText value={content} />
      </div>
    </section>
  );
}
