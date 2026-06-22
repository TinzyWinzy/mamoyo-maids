"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ShieldCheck, Trash2, RefreshCw } from "lucide-react";

interface AdminEntry {
  uid: string;
  phone?: string;
  createdAt: string;
  grantedBy?: string;
}

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<AdminEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "_admins"));
      setAdmins(
        snapshot.docs.map((d) => d.data() as unknown as AdminEntry)
      );
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSaving(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const body: Record<string, string> = {};
      if (phone) body.phone = phone;
      if (uid) body.uid = uid;

      const res = await fetch("/api/set-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setStatus({ type: "success", msg: "Admin added successfully" });
      setPhone("");
      setUid("");
      fetchAdmins();
    } catch (err: any) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (targetUid: string) => {
    if (!confirm("Remove admin privileges from this user?")) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/set-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: targetUid, action: "remove" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setStatus({ type: "success", msg: "Admin removed" });
      fetchAdmins();
    } catch (err: any) {
      setStatus({ type: "error", msg: err.message });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Admin Management</h1>
        <button
          onClick={fetchAdmins}
          className="px-4 py-2 rounded-xl bg-dark text-white text-sm font-semibold hover:bg-navy-light transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {status && (
        <div
          className={`mb-6 px-5 py-3 rounded-xl text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {status.msg}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/40 mb-6">
        <h2 className="text-lg font-bold text-text-primary mb-4">Add Admin</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+263 77 123 4567"
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <p className="text-xs text-text-secondary mt-1">Full international format</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                Or User UID
              </label>
              <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Firebase Auth UID"
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving || (!phone && !uid)}
            className="px-6 py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving ? (
              <div className="h-4 w-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            )}
            {saving ? "Adding..." : "Make Admin"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 bg-gray-50">
          <h2 className="font-semibold text-text-primary">
            Current Admins ({admins.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No admins configured. Add the first admin above.
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {admins.map((admin) => (
              <div
                key={admin.uid}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{admin.uid}</p>
                  <p className="text-xs text-text-secondary">
                    Added {new Date(admin.createdAt).toLocaleDateString()}
                    {admin.phone && ` — ${admin.phone}`}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(admin.uid)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
