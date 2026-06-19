import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, date, time, notes } = body;

    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Firestore
    const leadRef = await adminDb.collection("leads").add({
      type: "booking",
      name,
      phone,
      email: email || "",
      service,
      date,
      time,
      notes: notes || "",
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Mamoyo Maids <onboarding@resend.dev>",
        to: "brandontinoz@gmail.com",
        subject: `New Service Booking from ${name}`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Notes:</strong><br/>${notes ? notes.replace(/\n/g, "<br/>") : "None"}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: leadRef.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error - Booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
