"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = "Client Portal | Mamoyo Maids";
  }, []);
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-border/50 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Home
            </Link>
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              WOBIC Portal
            </span>
          </div>
        </header>
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
