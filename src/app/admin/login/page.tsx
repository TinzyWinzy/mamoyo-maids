"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-border/40">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold font-serif text-3xl font-bold mb-4 shadow-lg shadow-navy/20">
            M
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Portal</h1>
          <p className="text-sm text-text-secondary mt-2">
            Sign in to manage Mamoyo Maids
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
