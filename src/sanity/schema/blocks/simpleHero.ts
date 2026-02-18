import { defineField, defineType } from "sanity";
import { Layout } from "lucide-react";

export default defineType({
  name: "simpleHero",
  title: "Simple Hero",
  type: "object",
  icon: Layout,
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Small text above the heading (e.g., 📖 Blog)",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Mint (Default)", value: "mint" },
          { title: "Teal (Dark)", value: "teal" },
          { title: "White", value: "white" },
        ],
      },
      initialValue: "mint",
    }),
  ],
});
