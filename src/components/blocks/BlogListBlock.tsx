import { client } from "@/sanity/lib/client";
import BlogListClient from "./BlogListClient";

interface BlogListBlockProps {
  title?: string;
  description?: string;
  layout?: "grid" | "list";
  limit?: number;
  anchorId?: string;
}

export default async function BlogListBlock({
  title,
  description,
  layout = "grid",
  limit,
  anchorId,
}: BlogListBlockProps) {
  const query = `*[_type == "page" && category == "blog"] | order(_createdAt desc) ${
    limit ? `[0...${limit}]` : ""
  } {
    _id,
    title,
    slug,
    excerpt,
    author,
    "readTime":round(length(pt::text(body)) / 5 / 180 ),
    blogCategory,
    _createdAt
  }`;

  const blogs = await client.fetch(query);

  return (
    <section id={anchorId} className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <BlogListClient
          blogs={blogs}
          title={title}
          description={description}
          layout={layout}
        />
      </div>
    </section>
  );
}
