"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
          Something went wrong
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-dark mb-4">!</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3">
          Unexpected Error
        </h2>
        <p className="text-text-secondary mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
