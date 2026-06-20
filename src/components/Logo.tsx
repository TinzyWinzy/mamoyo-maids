import Link from "next/link";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 28L14 6L20 16L26 6L36 28"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 28L20 34L36 28"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20L20 24L26 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-dark" : "text-white";
  const mutedColor = variant === "dark" ? "text-text-secondary" : "text-white/60";

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <BrandMark className="h-9 w-9 sm:h-10 sm:w-10 text-gold group-hover:drop-shadow-[0_0_8px_rgba(229,183,84,0.4)] transition-shadow duration-500" />
      <div className="flex flex-col leading-none">
        <span className={`font-serif text-xl sm:text-2xl font-black tracking-tight ${textColor} leading-none`}>
          WOBIC
        </span>
        <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase ${mutedColor} leading-none mt-0.5`}>
          Employment Services
        </span>
      </div>
    </Link>
  );
}
