import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "branding",
    }),
    defineField({
      name: "logoConfig",
      title: "Logo Configuration",
      type: "object",
      group: "branding",
      fields: [
        {
          name: "fontSize",
          title: "Font Size",
          type: "string",
          initialValue: "3xl",
          options: {
            list: [
              { title: "2XL", value: "2xl" },
              { title: "3XL", value: "3xl" },
              { title: "4XL", value: "4xl" },
              { title: "5XL", value: "5xl" },
              { title: "6XL", value: "6xl" },
            ],
          },
        },
        {
          name: "color",
          title: "Logo Color",
          type: "string",
          initialValue: "accent",
          options: {
            list: [
              { title: "Accent", value: "accent" },
              { title: "Primary", value: "primary" },
              { title: "White", value: "white" },
              { title: "Neutral", value: "neutral-800" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Social Image",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      group: "footer",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Email", value: "email" },
                ],
              },
            },
            { name: "label", title: "Display Label", type: "string", description: "Optional: Override the platform name" },
            { name: "url", type: "string" },
          ],
        },
      ],
    }),
  ],
  groups: [
    { name: "branding", title: "Branding" },
    { name: "seo", title: "SEO" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
  ],
});
