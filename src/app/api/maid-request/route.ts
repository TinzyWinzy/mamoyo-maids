import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, serviceType, maidAge, bedrooms, requirements } = body;

    if (!name || !phone || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Firestore
    const leadRef = await adminDb.collection("leads").add({
      type: "maid-request",
      name,
      phone,
      email: email || "",
      serviceType,
      maidAge: maidAge || "No preference",
      bedrooms: bedrooms || "Not specified",
      requirements: requirements || "None",
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Mamoyo Maids <onboarding@resend.dev>",
        to: "brandontinoz@gmail.com",
        subject: `New Maid Request from ${name}`,
        html: `
          <h2>New Maid Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Preferred Maid Age:</strong> ${maidAge || "No preference"}</p>
          <p><strong>Bedrooms:</strong> ${bedrooms || "Not specified"}</p>
          <p><strong>Specific Requirements:</strong><br/>${requirements ? requirements.replace(/\n/g, "<br/>") : "None"}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: leadRef.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error - Maid Request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
