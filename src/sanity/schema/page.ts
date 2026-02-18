import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Marketing", value: "marketing" },
          { title: "Legal", value: "legal" },
          { title: "Service", value: "service" },
          { title: "Blog", value: "blog" },
        ],
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      hidden: ({ document }) => document?.category === "blog",
      of: [
        { type: "hero" },
        { type: "richText" },
        { type: "showcase" },
        { type: "services" },
        { type: "features" },
        { type: "imageWithText" },
        { type: "blogList" },
        { type: "simpleHero" },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      hidden: ({ document }) => document?.category !== "blog",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      hidden: ({ document }) => document?.category !== "blog",
    }),

    defineField({
      name: "blogCategory",
      title: "Blog Category",
      type: "string",
      options: {
        list: [
          { title: "Spotlight", value: "spotlight" },
          { title: "Product Updates", value: "product-updates" },
          { title: "Company", value: "company" },
          { title: "Productivity", value: "productivity" },
        ],
      },
      hidden: ({ document }) => document?.category !== "blog",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "table" },
      ],
      hidden: ({ document }) => document?.category !== "blog",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Social Image",
      type: "image",
      group: "seo",
    }),
  ],
  groups: [{ name: "seo", title: "SEO" }],
});
