import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, GraduationCap, ThumbsUp, Building2 } from "lucide-react";
import { SITE_CONFIG, TRUST_BADGES } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

const trustIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, GraduationCap, ThumbsUp, Building2,
};

function TrustBadge({ label, icon }: { label: string; icon: string }) {
  const Icon = trustIcons[icon];
  if (!Icon) return null;
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-5 bg-white rounded-2xl border border-border/40">
      <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
      </div>
      <span className="text-[11px] sm:text-[13px] font-semibold text-text-primary leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/cleaning-team.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/85 to-dark/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 w-full">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2rem,8vw,4.5rem)] font-bold text-white leading-[1.1] mb-4 sm:mb-6">
              <span className="block">Your Trusted</span>
              <span className="block text-gold">Employment</span>
              <span className="block">Partner</span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-xl">
              We train and provide reliable people with police clearances. House maids,
              babysitters, security, drivers, gardeners, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/mamoyo-maids/booking"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
              >
                Hire Staff Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to learn more about your employment services."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="relative -mt-12 sm:-mt-16 z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {TRUST_BADGES.map((badge) => (
              <TrustBadge key={badge.label} label={badge.label} icon={badge.icon} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
