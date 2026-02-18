import CustomPortableText from "@/components/CustomPortableText";

interface RichTextBlockProps {
  content?: any;
}

export default function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <CustomPortableText value={content} />
      </div>
    </section>
  );
}
