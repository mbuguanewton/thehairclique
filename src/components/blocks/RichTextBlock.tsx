import { PortableText } from "@portabletext/react";

interface RichTextBlockProps {
  content?: any;
}

export default function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="py-20 px-6 bg-zinc-950 text-zinc-300">
      <div className="max-w-3xl mx-auto prose prose-invert prose-zinc prose-lg">
        <PortableText value={content} />
      </div>
    </section>
  );
}
