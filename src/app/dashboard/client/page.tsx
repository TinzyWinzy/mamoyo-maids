"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  limit,
} from "firebase/firestore";
import { Send, CheckCircle, MessageCircle, Clock } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const staffTypes = [
  "House Maids", "Babysitters", "Security", "Drivers", "Gardeners",
  "Caretakers", "Nurse Aids", "Shop Workers", "Office Workers", "Construction",
];

interface Lead {
  id: string;
  type: string;
  lookingFor?: string;
  name: string;
  phone: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function ClientDashboard() {
  const { user, loading, loginWithPhone, verifyOTP, logout } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", lookingFor: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.title = "Client Portal | Mamoyo Maids";
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "leads"),
        where("clientUid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      getDocs(q)
        .then((snapshot) => {
          setLeads(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
          );
        })
        .catch((err) => {
          console.error("Failed to load leads:", err);
        })
        .finally(() => setLeadsLoading(false));
    }
  }, [user]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const formatted = phone.startsWith("0")
        ? "+263" + phone.slice(1)
        : phone.startsWith("263")
          ? "+" + phone
          : phone;
      await loginWithPhone(formatted);
      setStep("otp");
    } catch {
      setAuthError("Failed to send code. Check the number and try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      await verifyOTP(otp);
    } catch {
      setAuthError("Invalid code. Try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "leads"), {
        type: "staff-request",
        clientUid: user.uid,
        clientPhone: user.phoneNumber || phone,
        name: formData.name,
        lookingFor: formData.lookingFor,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: "new",
      });
      setSubmitted(true);
      fetch(`${window.location.origin}/api/notify-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "staff-request",
          name: formData.name,
          phone: user.phoneNumber || phone,
          lookingFor: formData.lookingFor,
          message: formData.message,
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {
      setSubmitError("Failed to submit. Try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Client Portal</h1>
          <p className="text-sm text-text-secondary">
            Sign in with your phone to view your requests and hire staff.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border/40">
          {authError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">{authError}</div>
          )}

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="077 123 4567"
                />
                <p className="text-xs text-text-secondary mt-1">We&apos;ll send an SMS code to this number.</p>
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70"
              >
                {authLoading ? (
                  <div className="h-5 w-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Send Code"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-sm text-text-secondary text-center">
                Enter the code sent to <strong>{phone}</strong>
              </p>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">SMS Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70"
              >
                {authLoading ? (
                  <div className="h-5 w-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Verify Code"
                )}
              </button>
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-xs text-text-secondary hover:text-text-primary text-center"
              >
                Use a different number
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">My Requests</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {user.phoneNumber}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => { setShowForm(!showForm); setSubmitted(false); }}
            className="px-5 py-2.5 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors"
          >
            {showForm ? "Cancel" : "New Request"}
          </button>
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl border border-border/50 text-text-secondary text-sm hover:bg-gray-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/40">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
              <h3 className="text-lg font-bold text-text-primary mb-1">Request Submitted</h3>
              <p className="text-sm text-text-secondary mb-4">We&apos;ll contact you within 24 hours.</p>
              <button
                onClick={() => { setShowForm(false); setSubmitted(false); }}
                className="px-5 py-2 rounded-full border border-border text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Requests
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <h2 className="text-lg font-bold text-text-primary">New Staff Request</h2>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Your Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Staff Needed *</label>
                <select required value={formData.lookingFor} onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 bg-white">
                  <option value="">Select...</option>
                  {staffTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Details / Requirements</label>
                <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 resize-none"
                  placeholder="Number of staff, schedule, special skills needed..." />
              </div>
              {submitError && <p className="text-red-500 text-xs text-center">{submitError}</p>}
              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70">
                {submitting ? <div className="h-4 w-4 border-2 border-dark border-t-transparent rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      )}

      {leadsLoading ? (
        <div className="bg-white rounded-2xl border border-border/40 p-12 text-center">
          <div className="h-8 w-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Loading your requests...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/40 p-12 sm:p-16 text-center">
          <Clock className="h-12 w-12 text-border mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary mb-1">No Requests Yet</h3>
          <p className="text-sm text-text-secondary mb-6">Submit your first staff request to get started.</p>
          <button onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors">
            New Request
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-border/40 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-dark">
                    {lead.lookingFor || lead.type}
                  </span>
                  <p className="text-sm font-semibold text-text-primary mt-1">{lead.name}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  lead.status === "new" ? "bg-blue-100 text-blue-800" :
                  lead.status === "contacted" ? "bg-yellow-100 text-yellow-800" :
                  lead.status === "matched" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {lead.status}
                </span>
              </div>
              {lead.message && <p className="text-sm text-text-secondary mb-2">{lead.message}</p>}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Hello! I'm following up on my request for ${lead.lookingFor || "staff"}.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> Follow Up
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
