import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Baby,
  ShieldCheck,
  Car,
  TreePine,
  Building2,
  HeartPulse,
  Store,
  Briefcase,
  HardHat,
  ArrowRight,
  MessageCircle,
  Phone,
  Users,
  Award,
  Star,
  GraduationCap,
  ThumbsUp,
} from "lucide-react";
import { SITE_CONFIG, WHY_CHOOSE_US, TESTIMONIALS, TRUST_BADGES } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

const staffTypes = [
  { icon: Home, title: "House Maids", description: "Reliable domestic workers for your home." },
  { icon: Baby, title: "Babysitters", description: "Caring childcare professionals." },
  { icon: ShieldCheck, title: "Security", description: "Trained security personnel." },
  { icon: Car, title: "Drivers", description: "Experienced and licensed drivers." },
  { icon: TreePine, title: "Gardeners", description: "Skilled garden and grounds keepers." },
  { icon: Building2, title: "Caretakers", description: "Trusted property caretakers." },
  { icon: HeartPulse, title: "Nurse Aids", description: "Compassionate care assistants." },
  { icon: Store, title: "Shop Workers", description: "Reliable retail and shop staff." },
  { icon: Briefcase, title: "Office Workers", description: "Professional office personnel." },
  { icon: HardHat, title: "Construction", description: "Skilled construction workers." },
];

const trustIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, GraduationCap, ThumbsUp, Building2,
};

function TrustBadge({ label, icon }: { label: string; icon: string }) {
  const Icon = trustIconMap[icon];
  if (!Icon) return null;
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-5 bg-white rounded-2xl shadow-[0_4px_25px_rgba(26,39,68,0.06)] border border-border/40">
      <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
      </div>
      <span className="text-[11px] sm:text-[13px] font-semibold text-text-primary leading-tight">
        {label}
      </span>
    </div>
  );
}

function WhyChooseUsCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  const Icon = trustIconMap[icon];
  if (!Icon) return null;
  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-border/50 p-5 sm:p-7 text-center">
      <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-dark text-white mb-4 sm:mb-5">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1.5 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function TestimonialCard({ name, role, rating, text }: { name: string; role: string; rating: number; text: string }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40">
      <div className="flex gap-0.5 mb-3 sm:mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < rating ? "text-gold fill-gold" : "text-border"}`} />
        ))}
      </div>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-5 italic">
        &ldquo;{text}&rdquo;
      </p>
      <div>
        <p className="text-sm font-bold text-text-primary">{name}</p>
        <p className="text-xs text-text-secondary">{role}</p>
      </div>
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
            alt={`${SITE_CONFIG.name} professional team`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/85 to-dark/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 w-full">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2rem,8vw,4.5rem)] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
              <span className="block">Your Trusted</span>
              <span className="block text-gold">Employment</span>
              <span className="block">Partner</span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-xl">
              We train and provide reliable people with police clearances. House maids,
              babysitters, security, drivers, gardeners, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-14">
              <Link
                href="/mamoyo-maids/booking"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light active:scale-[0.97] transition-colors duration-300 shadow-xl shadow-gold/30"
              >
                Hire Staff Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to learn more about your employment services."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 active:scale-[0.97] transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
                Families Served
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
                Police Cleared
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
                Licensed Agency
              </div>
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

      <AnimatedSection>
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
                We Provide
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
                Staff for Every <span className="text-dark">Need</span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                We train and provide reliable people with police clearances for homes, businesses, and organizations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {staffTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center border border-border/40 h-full"
                  >
                    <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-dark/10 text-dark mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10 sm:mt-14">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/mamoyo-maids/employment"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300 shadow-lg shadow-gold/25"
                >
                  Hire Staff Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <a
                  href={getWhatsAppUrl(
                    SITE_CONFIG.whatsapp,
                    "Hello! I'd like to learn more about your staff placement services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-dark text-dark font-semibold text-sm sm:text-base hover:bg-dark hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20 sm:py-28 bg-light-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
                Why Choose Us
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
                The <span className="text-dark">WOBIC</span> Difference
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                We go beyond recruitment — we deliver peace of mind. Here&apos;s what
                makes us the trusted choice for hundreds of families and businesses.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
              {WHY_CHOOSE_US.map((item) => (
                <WhyChooseUsCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
                Testimonials
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
                What Our <span className="text-dark">Clients</span> Say
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Real feedback from families and businesses who trust us.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {TESTIMONIALS.slice(0, 3).map((t) => (
                <TestimonialCard key={t.name} name={t.name} role={t.role} rating={t.rating} text={t.text} />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="relative py-20 sm:py-28">
        <Image
          src="/images/kitchen-cleaning-team.jpg"
          alt={`${SITE_CONFIG.name} professional team`}
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 to-dark/85" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-5 sm:mb-6">
              Get Started Today
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
              Ready to Find the Right Staff?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Join hundreds of satisfied families and businesses who trust {SITE_CONFIG.name}{" "}
              for all their recruitment and staffing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/mamoyo-maids/booking"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light active:scale-[0.97] transition-colors duration-300 shadow-xl shadow-gold/30"
              >
                Book a Service
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to learn more about your services."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 active:scale-[0.97] transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={getPhoneUrl(SITE_CONFIG.phone)}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full border-2 border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 active:scale-[0.97] transition-colors duration-300"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
