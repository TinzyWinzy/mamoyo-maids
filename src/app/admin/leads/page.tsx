"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  lookingFor?: string;
  clientUid?: string;
  message?: string;
  service?: string;
  date?: string;
  time?: string;
  serviceType?: string;
  maidAge?: string;
  bedrooms?: string;
  createdAt: string;
  status: string;
}

const statusOptions = ["new", "contacted", "matched", "placed", "closed"];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const q = query(
        collection(db, "leads"),
        orderBy("createdAt", "desc"),
        limit(100)
      );
      const snapshot = await getDocs(q);
      setLeads(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
      );
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLeads();
    })();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const filtered =
    filter === "all"
      ? leads
      : leads.filter((l) => l.type === filter);

  const typeCounts = leads.reduce(
    (acc, l) => {
      acc[l.type] = (acc[l.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Leads Management</h1>
        <button
          onClick={fetchLeads}
          className="px-4 py-2 rounded-xl bg-dark text-white text-sm font-semibold hover:bg-navy-light transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "contact", "booking", "staff-request", "maid-request"].map(
          (t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === t
                  ? "bg-gold text-dark"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              }`}
            >
              {t === "all" ? `All (${leads.length})` : `${t} (${typeCounts[t] || 0})`}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="text-center py-10 text-text-secondary">Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-text-secondary">No leads found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-2xl p-5 border border-border/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-dark capitalize">
                      {lead.type.replace("-", " ")}
                    </span>
                    {lead.lookingFor && (
                      <span className="text-xs text-text-secondary">
                        {lead.lookingFor}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-primary">{lead.name}</h3>
                  <p className="text-sm text-text-secondary">{lead.phone}</p>
                  {lead.email && (
                    <p className="text-xs text-text-secondary">{lead.email}</p>
                  )}
                  {lead.message && (
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                      {lead.message}
                    </p>
                  )}
                  {lead.service && (
                    <p className="text-xs text-text-secondary mt-1">
                      Service: {lead.service} — {lead.date} {lead.time}
                    </p>
                  )}
                  {lead.serviceType && (
                    <p className="text-xs text-text-secondary mt-1">
                      {lead.serviceType}
                      {lead.maidAge ? `, Age: ${lead.maidAge}` : ""}
                      {lead.bedrooms ? `, ${lead.bedrooms}` : ""}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                    disabled={updating === lead.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                      lead.status === "new"
                        ? "bg-blue-100 text-blue-800"
                        : lead.status === "contacted"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.status === "matched"
                            ? "bg-purple-100 text-purple-800"
                            : lead.status === "placed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-text-secondary">
                    {lead.createdAt
                      ? formatDistanceToNow(new Date(lead.createdAt), {
                          addSuffix: true,
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
