import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Firestore
    const leadRef = await adminDb.collection("leads").add({
      type: "contact",
      name,
      phone,
      email: email || "",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Mamoyo Maids <onboarding@resend.dev>", // Can update to a verified domain later
        to: "brandontinoz@gmail.com",
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: leadRef.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error - Contact:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
