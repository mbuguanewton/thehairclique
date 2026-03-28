import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactBlock",
  title: "Contact Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: "Have questions? We'd love to hear from you. Join our circle or reach out directly.",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Used for anchor links (e.g., 'contact'). Do not include the #.",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "hello@thehairclique.com",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      initialValue: "+44 (0) 123 456 789",
    }),
    defineField({
      name: "showNewsletter",
      title: "Show Newsletter Join",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter Placeholder",
      type: "string",
      initialValue: "Enter your email",
      hidden: ({ parent }) => !parent?.showNewsletter,
    }),
    defineField({
      name: "newsletterButtonText",
      title: "Newsletter Button Text",
      type: "string",
      initialValue: "Join the Clique",
      hidden: ({ parent }) => !parent?.showNewsletter,
    }),
  ],
});
