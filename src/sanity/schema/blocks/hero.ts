import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for anchor links (e.g., 'services'). Do not include the #.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
    }),
  ],
});
