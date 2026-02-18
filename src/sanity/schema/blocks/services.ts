import { defineField, defineType } from "sanity";

export default defineType({
  name: "services",
  title: "Services",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Service Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "serviceItem",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Service Name",
            }),
            defineField({
              name: "description",
              type: "array",
              title: "Description",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "price",
              type: "string",
              title: "Price (e.g. From £30)",
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Service Image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
