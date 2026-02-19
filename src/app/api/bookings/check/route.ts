import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    const query = `*[_type == "booking" && date == $date && status != "cancelled"] {
      slot
    }`;
    const bookings = await client.fetch(query, { date });
    const bookedSlots = bookings.map((b: any) => b.slot);

    return NextResponse.json({ bookedSlots });
  } catch (error: any) {
    console.error("Booking check error:", error);
    return NextResponse.json(
      { error: "Failed to check bookings" },
      { status: 500 },
    );
  }
}
