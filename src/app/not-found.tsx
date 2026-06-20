import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
          Oops
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-dark mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-border text-dark font-semibold text-sm hover:bg-accent-pale transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
