"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  phone: string;
  age: number;
  area: string;
  position: string;
  experience: string;
  availability: string;
  policeClearance: boolean;
  status: string;
  createdAt: string;
}

const statusOptions = ["new", "reviewed", "shortlisted", "placed", "rejected"];

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      const q = query(
        collection(db, "candidates"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      setCandidates(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Candidate))
      );
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCandidates();
    })();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, "candidates", id), { status: newStatus });
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this candidate?")) return;
    try {
      await deleteDoc(doc(db, "candidates", id));
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const filtered =
    filter === "all"
      ? candidates
      : candidates.filter((c) => c.status === filter);

  const statusCounts = candidates.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Candidates</h1>
        <button
          onClick={fetchCandidates}
          className="px-4 py-2 rounded-xl bg-dark text-white text-sm font-semibold hover:bg-navy-light transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === "all"
              ? "bg-gold text-dark"
              : "bg-gray-100 text-text-secondary hover:bg-gray-200"
          }`}
        >
          All ({candidates.length})
        </button>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === s
                ? "bg-gold text-dark"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            {s} ({statusCounts[s] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-text-secondary">Loading candidates...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-text-secondary">No candidates found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 border border-border/40 relative group"
            >
              <button
                onClick={() => handleDelete(c.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-primary">{c.name}</h3>
                    <span className="text-xs text-text-secondary">({c.age})</span>
                  </div>
                  <p className="text-sm text-text-secondary">{c.phone}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-text-secondary">
                    <span>📍 {c.area}</span>
                    <span>💼 {c.position}</span>
                    <span>📅 {c.availability}</span>
                    <span>
                      ✅ {c.policeClearance ? "Police Clearance" : "No Clearance"}
                    </span>
                  </div>
                  {c.experience && (
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                      {c.experience}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                    disabled={updating === c.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                      c.status === "new"
                        ? "bg-blue-100 text-blue-800"
                        : c.status === "reviewed"
                          ? "bg-yellow-100 text-yellow-800"
                          : c.status === "shortlisted"
                            ? "bg-purple-100 text-purple-800"
                            : c.status === "placed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                    }`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-text-secondary">
                    {c.createdAt
                      ? formatDistanceToNow(new Date(c.createdAt), {
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
