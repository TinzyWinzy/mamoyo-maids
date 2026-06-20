"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  serviceType?: string;
  service?: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(
          collection(db, "leads"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const leadsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lead[];
        setLeads(leadsData);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard Overview</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-text-primary">Recent Inquiries</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">No inquiries found.</div>
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
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-dark capitalize">
                        {lead.type.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {lead.phone}<br/>
                      <span className="text-xs">{lead.email}</span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {lead.createdAt ? formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true }) : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      } capitalize`}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
