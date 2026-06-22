import * as functions from "firebase-functions/v1";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

initializeApp();

interface LeadData {
  name?: string;
  phone?: string;
  type?: string;
  service?: string;
  lookingFor?: string;
  serviceType?: string;
  message?: string;
  notes?: string;
  date?: string;
  time?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export const onLeadCreate = functions.firestore
  .document("leads/{leadId}")
  .onCreate(async (snapshot) => {
    const lead = snapshot.data() as LeadData | undefined;
    if (!lead) return;

    const apiKey = functions.config().resend?.api_key;
    if (!apiKey) {
      functions.logger.warn("RESEND_API_KEY not configured — skipping email");
      return;
    }

    const typeMap: Record<string, string> = {
      contact: "Contact Form",
      booking: "Service Booking",
      "staff-request": "Staff Request",
      "maid-request": "Maid Request",
    };

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Mamoyo Maids <notifications@mamoyo-maids.com>",
        to: ["info@wobic.co.zw"],
        subject: `New Lead: ${typeMap[lead.type ?? ""] || lead.type || "General Inquiry"}`,
        html: `<h2>New Lead Submitted</h2>
<table style="width:100%;border-collapse:collapse;font-family:sans-serif;">
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Name</td><td style="padding:8px;">${lead.name || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Phone</td><td style="padding:8px;">${lead.phone || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Type</td><td style="padding:8px;">${typeMap[lead.type ?? ""] || lead.type || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Service</td><td style="padding:8px;">${lead.service || lead.lookingFor || lead.serviceType || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Message</td><td style="padding:8px;">${lead.message || lead.notes || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Date</td><td style="padding:8px;">${lead.date || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Time</td><td style="padding:8px;">${lead.time || "N/A"}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Submitted</td><td style="padding:8px;">${lead.createdAt || new Date().toISOString()}</td></tr>
</table>
<hr style="margin-top:16px;border:none;border-top:1px solid #e5b754;" />
<p style="font-size:12px;color:#666;">Mamoyo Maids — WOBIC Employment Services</p>`,
      }),
    });
  });

export const setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Authentication required."
    );
  }

  const requester = await getAuth().getUser(context.auth.uid);
  if (!requester.customClaims?.isAdmin) {
    const db = getFirestore();
    const adminSnapshot = await db
      .collection("_admins")
      .limit(1)
      .get();

    if (!adminSnapshot.empty) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Only admins can grant admin privileges."
      );
    }
  }

  const uid = data.uid;
  if (!uid || typeof uid !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "User UID is required."
    );
  }

  await getAuth().setCustomUserClaims(uid, { isAdmin: true });

  const db = getFirestore();
  await db.collection("_admins").doc(uid).set({
    uid,
    createdAt: new Date().toISOString(),
    grantedBy: context.auth.uid,
  });

  return { success: true };
});
