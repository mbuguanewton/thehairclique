import { defineField, defineType } from "sanity";

export default defineType({
  name: "features",
  title: "Features",
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
      title: "Feature Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "featureItem",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Feature Title",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
            defineField({
              name: "icon",
              type: "string",
              title: "Lucide Icon Name (e.g. Home, Scissors)",
            }),
          ],
        },
      ],
    }),
  ],
});
