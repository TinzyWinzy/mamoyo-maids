import type { IncomingMessage, ServerResponse } from "http";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
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

function readAuthHeader(req: IncomingMessage): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== "string") return null;
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const idToken = readAuthHeader(req);
  if (!idToken) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "Missing or invalid token" }));
    return;
  }

  let body: { uid?: string; phone?: string; action?: string };
  try {
    body = (await readBody(req)) as Record<string, unknown>;
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON body" }));
    return;
  }

  const action = body.action === "remove" ? "remove" : "set";

  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    const requester = await getAuth().getUser(decoded.uid);

    if (!requester.customClaims?.isAdmin) {
      const db = getFirestore();
      const existing = await db.collection("_admins").limit(1).get();
      if (!existing.empty) {
        res.statusCode = 403;
        res.end(JSON.stringify({ error: "Only admins can manage admin privileges" }));
        return;
      }
    }

    let targetUid = body.uid;
    if (!targetUid && body.phone) {
      const phone = String(body.phone).replace(/[^+\d]/g, "");
      const user = await getAuth().getUserByPhoneNumber(phone);
      targetUid = user.uid;
    }

    if (!targetUid || typeof targetUid !== "string") {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Provide uid or phone for the target user" }));
      return;
    }

    const db = getFirestore();

    if (action === "remove") {
      await getAuth().setCustomUserClaims(targetUid, {});
      await db.collection("_admins").doc(targetUid).delete();
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, action: "removed" }));
      return;
    }

    await getAuth().setCustomUserClaims(targetUid, { isAdmin: true });
    await db.collection("_admins").doc(targetUid).set({
      uid: targetUid,
      createdAt: new Date().toISOString(),
      grantedBy: decoded.uid,
    });

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, action: "added" }));
  } catch (err) {
    console.error("set-admin error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Failed to manage admin claim" }));
  }
}
