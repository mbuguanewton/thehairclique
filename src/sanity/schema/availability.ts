import { defineField, defineType } from "sanity";

export default defineType({
  name: "availability",
  title: "Availability Settings",
  type: "document",
  fields: [
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
            },
            {
              name: "open",
              title: "Opening Time",
              type: "string",
              description: "Format: HH:mm (e.g., 09:00)",
            },
            {
              name: "close",
              title: "Closing Time",
              type: "string",
              description: "Format: HH:mm (e.g., 17:00)",
            },
            { name: "isClosed", title: "Closed", type: "boolean" },
          ],
        },
      ],
    }),
    defineField({
      name: "blockedDates",
      title: "Blocked Dates",
      type: "array",
      of: [{ type: "date" }],
      description: "Dates when no bookings are allowed (holidays, etc.)",
    }),
    defineField({
      name: "slotDuration",
      title: "Slot Duration (minutes)",
      type: "number",
      initialValue: 60,
    }),
    defineField({
      name: "consultationTypes",
      title: "Consultation Types",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Virtual Consultation", "In-Studio Consultation"],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Availability Settings",
        subtitle: "Manage working hours and blocked dates",
      };
    },
  },
});
