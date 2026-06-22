import type { IncomingMessage, ServerResponse } from "http";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_URL = "https://api.resend.com/emails";

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact Form",
  booking: "Service Booking",
  "staff-request": "Staff Request",
  "maid-request": "Maid Request",
};

function esc(text: unknown): string {
  return String(text ?? "N/A")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(lead: Record<string, unknown>): string {
  return `<h2>New Lead Submitted</h2>
<table style="width:100%;border-collapse:collapse;font-family:sans-serif;">
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Name</td><td style="padding:8px;">${esc(lead.name)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Phone</td><td style="padding:8px;">${esc(lead.phone)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Type</td><td style="padding:8px;">${esc(TYPE_LABELS[String(lead.type ?? "")] || lead.type)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Service</td><td style="padding:8px;">${esc(lead.service || lead.lookingFor || lead.serviceType)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Message</td><td style="padding:8px;">${esc(lead.message || lead.notes)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Date</td><td style="padding:8px;">${esc(lead.date)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Time</td><td style="padding:8px;">${esc(lead.time)}</td></tr>
  <tr><td style="padding:8px;font-weight:600;color:#4e2d7b;">Submitted</td><td style="padding:8px;">${esc(lead.createdAt)}</td></tr>
</table>
<hr style="margin-top:16px;border:none;border-top:1px solid #e5b754;" />
<p style="font-size:12px;color:#666;">Mamoyo Maids — WOBIC Employment Services</p>`;
}

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set");
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Email not configured" }));
    return;
  }

  let lead: Record<string, unknown>;
  try {
    lead = await readBody(req);
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON body" }));
    return;
  }

  if (!lead.type || !lead.name || !lead.phone) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Missing required fields" }));
    return;
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Mamoyo Maids <notifications@mamoyo-maids.com>",
        to: ["info@wobic.co.zw"],
        subject: `New Lead: ${TYPE_LABELS[String(lead.type)] || lead.type}`,
        html: buildHtml(lead),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend error:", response.status, errText);
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "Email service error" }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Failed to send email:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal error" }));
  }
}
