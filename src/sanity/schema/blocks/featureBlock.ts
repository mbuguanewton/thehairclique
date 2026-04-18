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
      description:
        "Used for anchor links (e.g., 'services'). Do not include the #.",
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
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            }),
            defineField({
              name: "tag",
              type: "string",
              title: "Badge Tag",
              options: {
                list: [
                  { title: "None", value: "" },
                  { title: "Exclusive", value: "Exclusive" },
                  { title: "New", value: "New" },
                  { title: "Limited", value: "Limited" },
                  { title: "Bestseller", value: "Bestseller" },
                  { title: "Coming Soon", value: "Coming Soon" },
                ],
              },
              initialValue: "Exclusive",
            }),
            defineField({
              name: "ctaText",
              type: "string",
              title: "CTA Text",
              description: "Text for the link at the bottom",
              initialValue: "Explore Collection",
            }),
            defineField({
              name: "linkedPage",
              type: "reference",
              to: [{ type: "page" }],
              title: "Linked Page",
              description:
                "Select a page to link to. If selected, the CTA section will be visible pointing to /{slug}",
              options: {
                filter: 'category == "products"',
              },
            }),
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
