"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Users, UserCheck, Clock } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalCandidates: 0,
    totalMaids: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadSnapshot, newLeadSnapshot, candidateSnapshot, maidSnapshot] =
          await Promise.all([
            getDocs(
              query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(20))
            ),
            getCountFromServer(
              query(collection(db, "leads"), orderBy("createdAt", "desc"))
            ),
            getCountFromServer(collection(db, "candidates")),
            getCountFromServer(collection(db, "maids")),
          ]);

        setLeads(
          leadSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
        );
        setMetrics({
          totalLeads: newLeadSnapshot.data().count,
          newLeads: leadSnapshot.docs.filter(
            (d) => d.data().status === "new"
          ).length,
          totalCandidates: candidateSnapshot.data().count,
          totalMaids: maidSnapshot.data().count,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      label: "Total Leads",
      value: metrics.totalLeads,
      icon: MessageSquare,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/leads",
    },
    {
      label: "Pending (New)",
      value: metrics.newLeads,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
      href: "/admin/leads",
    },
    {
      label: "Candidates",
      value: metrics.totalCandidates,
      icon: UserCheck,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/candidates",
    },
    {
      label: "Maids",
      value: metrics.totalMaids,
      icon: Users,
      color: "bg-green-50 text-green-600",
      href: "/admin/maids",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Dashboard Overview
      </h1>

      {loading ? (
        <div className="text-center py-20 text-text-secondary">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="bg-white rounded-2xl p-5 border border-border/40 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">
                        {card.value}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {card.label}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-border/50 bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-text-primary">
                Recent Inquiries
              </h2>
              <Link
                href="/admin/leads"
                className="text-xs text-gold hover:text-gold-light font-semibold"
              >
                View All
              </Link>
            </div>

            {leads.length === 0 ? (
              <div className="p-8 text-center text-text-secondary">
                No inquiries yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/50 text-text-secondary border-b border-border/50">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Type</th>
                      <th className="px-6 py-3 font-semibold">Contact</th>
                      <th className="px-6 py-3 font-semibold">Time</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-text-primary">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-dark capitalize">
                            {lead.type.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {lead.phone}
                          <br />
                          <span className="text-xs">{lead.email}</span>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {lead.createdAt
                            ? formatDistanceToNow(new Date(lead.createdAt), {
                                addSuffix: true,
                              })
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
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
                            {lead.status || "new"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
