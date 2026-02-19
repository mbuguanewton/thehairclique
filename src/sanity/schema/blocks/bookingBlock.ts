import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookingBlock",
  title: "Booking Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Book Your Sanctuary Session",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue:
        "Select a date and time that works for you. Our team will confirm your session shortly.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isPromo",
      title: "Is Promo (CTA Only)",
      type: "boolean",
      description:
        "If enabled, the block will act as a CTA redirecting to the booking page instead of a functional form.",
      initialValue: false,
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
      description: "Destination URL for the CTA button (e.g., /booking)",
      hidden: ({ parent }) => !parent?.isPromo,
      initialValue: "/booking",
    }),
  ],
});
