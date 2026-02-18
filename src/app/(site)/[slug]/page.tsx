import { client } from "@/sanity/lib/client";
import BlockRenderer from "@/components/BlockRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import CustomPortableText from "@/components/CustomPortableText";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    ...,
    ogImage {
      asset->
    }
  }`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) return {};

  const title = page.seoTitle || page.title;
  const description = page.seoDescription;
  const ogImageUrl = page.ogImage ? urlForImage(page.ogImage).url() : undefined;

  return {
    title: `${title} | The Hair Clique`,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getPage(slug);

  if (!pageData) {
    notFound();
  }

  // Redirect blogs if they happen to land here, though they should be handled by /blog/[slug]
  if (pageData.category === "blog") {
    // This is a safety measure; the getPage query might still return blogs if slug matches.
    // In Next.js App Router, more specific routes usually take precedence.
  }

  return (
    <main className="min-h-screen bg-background">
      <BlockRenderer blocks={pageData.blocks} />
    </main>
  );
}
