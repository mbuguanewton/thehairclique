import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import CustomPortableText from "@/components/CustomPortableText";
import { ArrowRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug && category == "blog"][0] {
    _id,
    title,
    slug,
    excerpt,
    author,
    "readTime": round(length(pt::text(body)) / 5 / 180),
    blogCategory,
    body,
    ogImage,
    _createdAt
  }`;
  return await client.fetch(query, { slug });
}

async function getRelatedBlogs(currentId: string) {
  const query = `*[_type == "page" && category == "blog" && _id != $currentId] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    "readTime": round(length(pt::text(body)) / 5 / 180),
    blogCategory,
    _createdAt
  }`;
  return await client.fetch(query, { currentId });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog._id);

  return (
    <article className="min-h-screen bg-[#F8F9FA]">
      {/* Premium Centered Header - Dark Teal Background */}
      <header
        className={cn(
          "bg-primary pt-32 px-6 text-center text-primary-foreground relative overflow-hidden",
          blog.ogImage ? "pb-60" : "pb-32",
        )}
      >
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Text className="text-sm uppercase tracking-[0.3em] font-bold text-primary-foreground/80">
            Published{" "}
            {new Date(blog._createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>

          <Heading
            type="h1"
            className="text-2xl md:text-6xl lg:text-5xl leading-tight tracking-tight max-w-5xl mx-auto"
          >
            {blog.title}
          </Heading>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {blog.blogCategory && (
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-widest font-bold">
                {blog.blogCategory}
              </span>
            )}
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-widest font-bold">
              {blog.readTime || 1} min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero Image - Wide aspect, slightly narrowed container */}
      {blog.ogImage && (
        <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-20">
          <div className="relative aspect-21/10 overflow-hidden rounded-2xl shadow-2xl border border-white/10">
            <Image
              src={urlForImage(blog.ogImage).url()}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Blog Content Section */}
      <div
        className={cn(
          "max-w-3xl mx-auto px-6",
          blog.ogImage ? "py-24" : "pt-12 pb-24",
        )}
      >
        {/* Content Typography */}
        <div className="prose prose-lg prose-slate max-w-none">
          <CustomPortableText value={blog.body} />
        </div>

        {/* Author Footer - Match design */}
        <footer className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5 group">
            <div className="w-16 h-16 rounded-full bg-accent/20 overflow-hidden border-2 border-accent/10 transition-transform group-hover:scale-105">
              {/* Placeholder for Author Avatar - using a nice gradient if no image */}
              <div className="w-full h-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-xl">
                {blog.author?.charAt(0) || "T"}
              </div>
            </div>
            <div className="space-y-1">
              <Text className="font-bold text-foreground text-lg leading-none">
                {blog.author || "The Hair Clique Team"}
              </Text>
              <Text
                variant="muted"
                className="text-sm uppercase tracking-widest font-medium opacity-60"
              >
                {blog.author ? "Contributing Writer" : "Editorial Team"}
              </Text>
            </div>
          </div>

          <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group">
            <Share2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Share stories</span>
          </button>
        </footer>
      </div>

      {/* Related Stories Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#EBEDED] py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <Text
                  variant="brand-secondary"
                  className="text-xs uppercase tracking-[0.3em] font-bold"
                >
                  Related Stories
                </Text>
                <Heading type="h2" className="text-4xl md:text-5xl font-bold">
                  All related stories post
                </Heading>
                <Text className="text-lg text-muted-foreground max-w-2xl font-light">
                  Subscribe for the latest marketing trends, marketing tools,
                  and exclusive interviews with leaders.
                </Text>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-3 rounded-full border border-border bg-white text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm shrink-0"
              >
                Explore more stories
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug.current}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-border/40 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                    {item.ogImage ? (
                      <Image
                        src={urlForImage(item.ogImage).url()}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5" />
                        <div className="w-full h-full flex items-center justify-center opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                          <Image
                            src="/favicon.ico"
                            alt="icon"
                            width={40}
                            height={40}
                            className="grayscale"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-8 space-y-6 flex flex-col justify-between min-h-[300px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-accent">
                        {item.blogCategory && <span>{item.blogCategory}</span>}
                        {item.blogCategory && <span>•</span>}
                        <span>
                          {new Date(item._createdAt).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </span>
                      </div>

                      <Heading
                        type="h3"
                        className="text-2xl leading-snug group-hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Heading>

                      {item.excerpt && (
                        <Text
                          variant="muted"
                          className="text-sm line-clamp-2 leading-relaxed opacity-80"
                        >
                          {item.excerpt}
                        </Text>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-border/40">
                      <div className="flex gap-2">
                        {/* Minimal category icons dummy */}
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px]">
                          📁
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
