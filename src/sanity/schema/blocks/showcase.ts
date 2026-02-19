import { defineField, defineType } from "sanity";

export default defineType({
  name: "showcase",
  title: "Showcase",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for anchor links (e.g., 'services'). Do not include the #.",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "showcaseItem",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
