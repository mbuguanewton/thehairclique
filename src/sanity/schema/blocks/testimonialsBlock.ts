import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsBlock",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for anchor links (e.g., 'testimonials'). Do not include the #.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "name", subtitle: "quote" },
          },
          fields: [
            defineField({
              name: "name",
              title: "Reviewer Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role / Description",
              type: "string",
              description: 'e.g. "Happy Client", "Verified Buyer"',
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "quote",
              title: "Review / Quote",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rating",
              title: "Rating (1–5)",
              type: "number",
              options: {
                list: [1, 2, 3, 4, 5],
              },
              initialValue: 5,
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Google", value: "google" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Yelp", value: "yelp" },
                  { title: "Other", value: "other" },
                ],
              },
            }),
            defineField({
              name: "reviewUrl",
              title: "Link to Review (optional)",
              type: "url",
              description: "Optional link to the original review on Google, Yelp, etc.",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Testimonials Block" };
    },
  },
});
