import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, date, slot, service, notes } = body;

    if (!customerName || !email || !date || !slot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create the booking document in Sanity
    const result = await writeClient.create({
      _type: "booking",
      customerName,
      email,
      phone,
      date,
      slot,
      service,
      notes,
      status: "pending",
    });

    return NextResponse.json({ success: true, bookingId: result._id });
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 },
    );
  }
}
