import { client } from "@/sanity/lib/client";
import BlockRenderer from "@/components/BlockRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/image";

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    ...,
    ogImage {
      asset->
    }
  }`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

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

export default async function Page() {
  const pageData = await getPage("home");

  if (!pageData) {
    notFound();
  }

  return (
    <main>
      <BlockRenderer blocks={pageData.blocks} />
    </main>
  );
}
