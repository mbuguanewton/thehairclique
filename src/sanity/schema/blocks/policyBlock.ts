import { defineField, defineType } from "sanity";

export default defineType({
  name: "policyBlock",
  title: "Policy Content Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
    }),
    defineField({
      name: "content",
      title: "Policy Content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Policy",
        subtitle: "Premium Legal Layout",
      };
    },
  },
});
