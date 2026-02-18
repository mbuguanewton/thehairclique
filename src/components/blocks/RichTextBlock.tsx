import CustomPortableText from "@/components/CustomPortableText";

interface RichTextBlockProps {
  content?: any;
}

export default function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <CustomPortableText value={content} />
      </div>
    </section>
  );
}
