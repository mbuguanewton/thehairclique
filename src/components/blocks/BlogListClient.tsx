"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  author?: string;
  readTime?: string;
  blogCategory?: string;
  _createdAt: string;
}

interface BlogListClientProps {
  blogs: Blog[];
  title?: string;
  description?: string;
  layout?: "grid" | "list";
}

const CATEGORIES = [
  { id: "all", label: "All Articles", emoji: "📁" },
  { id: "spotlight", label: "Spotlight", emoji: "💡" },
  { id: "product-updates", label: "Product Updates", emoji: "🚀" },
  { id: "company", label: "Company", emoji: "🏢" },
  { id: "productivity", label: "Productivity", emoji: "📚" },
];

const POSTS_PER_PAGE = 10;

export default function BlogListClient({
  blogs,
  title,
  description,
  layout = "grid",
}: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.blogCategory === activeCategory,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [blogs, searchQuery, activeCategory]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  return (
    <div className="space-y-16">
      {/* Header with Title and Description */}
      <div
        className={cn(
          "flex flex-col gap-4 mx-auto",
          layout === "grid" ? "" : "max-w-4xl",
        )}
      >
        <div className="space-y-6 max-w-3xl">
          {title && (
            <Heading
              type="h3"
              className="text-2xl md:text-3xl tracking-tight text-foreground"
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text className="text-lg text-muted-foreground/80 leading-relaxed font-light">
              {description}
            </Text>
          )}
        </div>

        {/* Filter Bar - Match Design Image */}
        <div className="flex flex-col xl:flex-row items-center gap-4 py-2 overflow-x-auto no-scrollbar">
          {/* Search Input */}
          <div className="relative w-full xl:w-[450px] group shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 transition-colors" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-0 focus:border-accent/40 shadow-xs transition-all placeholder:text-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid mx-auto pt-8",
          layout === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "grid-cols-1 gap-16 max-w-4xl", // Targeted narrow width for list layout
        )}
      >
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog, index) => (
            <div key={blog._id} className="w-full">
              <Link
                href={`/blog/${blog.slug.current}`}
                className="group flex flex-col space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <Text
                      variant="brand-secondary"
                      className="text-xs uppercase tracking-widest font-bold text-accent"
                    >
                      {new Date(blog._createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    {(blog.author || blog.readTime) && (
                      <Text
                        variant="muted"
                        className="text-[11px] uppercase tracking-widest font-medium opacity-60"
                      >
                        {blog.author && <span>By {blog.author}</span>}
                        {blog.author && blog.readTime && (
                          <span className="mx-2">•</span>
                        )}
                        {blog.readTime && <span>{blog.readTime} min read</span>}
                      </Text>
                    )}
                  </div>

                  <Heading
                    type="h3"
                    className="text-3xl md:text-3xl group-hover:text-accent transition-colors duration-300 leading-tight"
                  >
                    {blog.title}
                  </Heading>

                  {blog.excerpt && (
                    <Text className="text-lg md:text-xl text-muted-foreground/90 line-clamp-3 font-light leading-relaxed prose prose-slate">
                      {blog.excerpt}
                    </Text>
                  )}

                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 group/btn">
                      <Text
                        as="span"
                        className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b-2 border-accent/10 pb-1 group-hover/btn:border-accent group-hover/btn:text-accent transition-all duration-300"
                      >
                        Read Full Story
                      </Text>
                    </div>
                  </div>
                </div>
              </Link>
              {layout === "list" && index < currentBlogs.length - 1 && (
                <div className="mt-16 border-b border-dashed border-border/40" />
              )}
            </div>
          ))
        ) : (
          <div className="py-32 text-center col-span-full space-y-6">
            <div className="text-4xl">🔍</div>
            <div className="space-y-2">
              <Text className="text-foreground font-medium">
                No articles found
              </Text>
              <Text className="text-muted-foreground text-sm">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </Text>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-2 bg-accent/10 text-accent rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-12 border-t border-border/40">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-xl border border-border/60 text-muted-foreground hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-12 h-12 rounded-xl text-sm font-bold transition-all",
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent",
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl border border-border/60 text-muted-foreground hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
