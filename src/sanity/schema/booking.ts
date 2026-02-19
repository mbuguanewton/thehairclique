import { defineField, defineType } from "sanity";

export default defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Booking Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slot",
      title: "Time Slot",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "date",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Booking for ${subtitle}`,
      };
    },
  },
});
