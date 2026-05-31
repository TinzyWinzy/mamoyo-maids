import { ShieldCheck, Clock, ThumbsUp, CalendarCheck } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Clock,
  ThumbsUp,
  CalendarCheck,
};

export function TrustBadges() {
  return (
    <section className="relative -mt-12 sm:-mt-16 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {TRUST_BADGES.map((badge) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            return (
              <div
                key={badge.label}
                className="group flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-5 bg-white rounded-2xl shadow-[0_4px_25px_rgba(26,39,68,0.06)] border border-border/40 hover:shadow-[0_8px_35px_rgba(232,139,167,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-pink/10 group-hover:bg-pink/20 transition-colors">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-pink" />
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-text-primary leading-tight">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
