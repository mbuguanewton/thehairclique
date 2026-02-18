import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "blogList",
  title: "Blog List",
  type: "object",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Latest from our Blog",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "List", value: "list" },
        ],
      },
      initialValue: "grid",
    }),
    defineField({
      name: "limit",
      title: "Limit",
      type: "number",
      description: "Number of blog posts to show. Leave empty for all.",
    }),
  ],
});
