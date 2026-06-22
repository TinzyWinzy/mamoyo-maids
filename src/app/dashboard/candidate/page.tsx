"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export default function CandidateDashboard() {
  const { user, loading, loginWithPhone, verifyOTP, logout } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "", age: "", area: "", position: "", experience: "",
    availability: "Full-time", policeClearance: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.title = "Apply for Work | Mamoyo Maids";
  }, []);

  const positions = [
    "House Maid", "Babysitter", "Security Guard", "Driver",
    "Gardener", "Caretaker", "Nurse Aid", "Shop Worker",
    "Office Worker", "Construction",
  ];

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "candidates"),
        where("uid", "==", user.uid)
      );
      getDocs(q)
        .then((snapshot) => {
          if (!snapshot.empty) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = snapshot.docs[0].data() as Record<string, any>;
            setProfile({ id: snapshot.docs[0].id, ...data });
            setFormData({
              name: data.name || "",
              age: data.age?.toString() || "",
              area: data.area || "",
              position: data.position || "",
              experience: data.experience || "",
              availability: data.availability || "Full-time",
              policeClearance: data.policeClearance || false,
            });
          }
        })
        .catch((err) => {
          console.error("Failed to load profile:", err);
        })
        .finally(() => setProfileLoading(false));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const data = {
        uid: user.uid,
        phone: user.phoneNumber || phone,
        name: formData.name,
        age: Number(formData.age),
        area: formData.area,
        position: formData.position,
        experience: formData.experience,
        availability: formData.availability,
        policeClearance: formData.policeClearance,
        status: profile ? profile.status : "new",
        updatedAt: new Date().toISOString(),
      };

      if (profile?.id) {
        await updateDoc(doc(db, "candidates", profile.id), data);
      } else {
        await addDoc(collection(db, "candidates"), {
          ...data,
          createdAt: new Date().toISOString(),
          status: "new",
        });
      }
      setSubmitted(true);
      setEditing(false);
    } catch {
      setSubmitError("Failed to save. Try again.");
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
          <h1 className="text-2xl font-bold text-text-primary mb-2">Candidate Portal</h1>
          <p className="text-sm text-text-secondary">
            Sign in with your phone to apply for jobs or check your application status.
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
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="077 123 4567" />
                <p className="text-xs text-text-secondary mt-1">We&apos;ll send an SMS code to this number.</p>
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70">
                {authLoading ? <div className="h-5 w-5 border-2 border-dark border-t-transparent rounded-full animate-spin" /> : "Send Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-sm text-text-secondary text-center">Enter the code sent to <strong>{phone}</strong></p>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">SMS Code</label>
                <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="000000" maxLength={6} />
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70">
                {authLoading ? <div className="h-5 w-5 border-2 border-dark border-t-transparent rounded-full animate-spin" /> : "Verify Code"}
              </button>
              <button type="button" onClick={() => setStep("phone")}
                className="w-full text-xs text-text-secondary hover:text-text-primary text-center">
                Use a different number
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            {profile ? "My Application" : "Apply for Work"}
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">{user.phoneNumber}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {profile && (
            <button onClick={() => { setEditing(!editing); setSubmitted(false); }}
              className="px-5 py-2.5 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors">
              {editing ? "Cancel" : "Edit"}
            </button>
          )}
          <button onClick={logout}
            className="px-5 py-2.5 rounded-xl border border-border/50 text-text-secondary text-sm hover:bg-gray-100 transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      {profile && !editing && !submitted ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">{profile.name}</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
              profile.status === "new" ? "bg-blue-100 text-blue-800" :
              profile.status === "reviewed" ? "bg-yellow-100 text-yellow-800" :
              profile.status === "shortlisted" ? "bg-purple-100 text-purple-800" :
              profile.status === "placed" ? "bg-green-100 text-green-800" :
              "bg-red-100 text-red-800"
            }`}>
              {profile.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-text-secondary">Age:</span> <span className="font-medium">{profile.age}</span></div>
            <div><span className="text-text-secondary">Area:</span> <span className="font-medium">{profile.area}</span></div>
            <div className="col-span-2"><span className="text-text-secondary">Position:</span> <span className="font-medium">{profile.position}</span></div>
            <div className="col-span-2"><span className="text-text-secondary">Experience:</span> <span className="font-medium">{profile.experience}</span></div>
            <div><span className="text-text-secondary">Availability:</span> <span className="font-medium">{profile.availability}</span></div>
            <div><span className="text-text-secondary">Police Clearance:</span> <span className="font-medium">{profile.policeClearance ? "Yes" : "No"}</span></div>
          </div>

          {profile.status === "new" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
              Your application is under review. We&apos;ll contact you when there&apos;s a match.
            </div>
          )}

          <div className="mt-4">
            <a href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Hello! I applied as a ${profile.position} and want to follow up.`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors">
              <MessageCircle className="h-4 w-4" /> Follow up on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/40">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {profile ? "Profile Updated!" : "Application Submitted!"}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {profile ? "Your information has been saved." : "We'll review your application and contact you."}
              </p>
              <button onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-full border border-border text-sm font-semibold hover:bg-gray-50 transition-colors">
                Back
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-text-primary">
                {profile ? "Edit Your Profile" : "Tell Us About Yourself"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Age *</label>
                  <input type="number" required min={18} max={99} value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25" placeholder="18" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Your Area *</label>
                  <input type="text" required value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25"
                    placeholder="e.g. Harare, Chitungwiza" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Position Desired *</label>
                  <select required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 bg-white">
                    <option value="">Select...</option>
                    {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">Experience *</label>
                  <textarea required rows={2} value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 resize-none"
                    placeholder="Previous work experience, skills, training..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Availability *</label>
                  <select required value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 bg-white">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Live-In">Live-In</option>
                    <option value="Live-Out">Live-Out</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="police" checked={formData.policeClearance} onChange={(e) => setFormData({ ...formData, policeClearance: e.target.checked })}
                    className="rounded border-gray-300 h-5 w-5" />
                  <label htmlFor="police" className="text-sm font-medium text-text-primary">I have a police clearance</label>
                </div>
              </div>
              {submitError && <p className="text-red-500 text-xs text-center">{submitError}</p>}
              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-70">
                {submitting ? <div className="h-4 w-4 border-2 border-dark border-t-transparent rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Saving..." : profile ? "Update Profile" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
