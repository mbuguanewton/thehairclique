import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Check if subscriber already exists (optional but good practice)
    // For now, we'll just create a new entry every time or rely on Sanity to handle it.
    // The user asked to "add the emails to a list", so a simple create is fine.
    
    const result = await writeClient.create({
      _type: "subscriber",
      email: email,
      subscribedAt: new Date().toISOString(),
      status: "active",
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe", details: error.message },
      { status: 500 },
    );
  }
}
