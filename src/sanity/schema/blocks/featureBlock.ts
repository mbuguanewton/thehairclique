import { defineField, defineType } from "sanity";

export default defineType({
  name: "featureBlock",
  title: "Advanced Feature Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for anchor links (e.g., 'services'). Do not include the #.",
    }),
    defineField({
      name: "description",
      title: "Main Description",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "secondaryFeatures",
      title: "Secondary Features (Grid)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description" }),
            defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } }),
            defineField({
              name: "gridSize",
              title: "Grid Size",
              type: "string",
              options: {
                list: [
                  { title: "Normal", value: "normal" },
                  { title: "Large (Span 2)", value: "large" },
                ],
              },
              initialValue: "normal",
            }),
          ],
        },
      ],
    }),
  ],
});
