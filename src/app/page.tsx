import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MessageCircle, Phone, Star, Home, Baby, ShieldCheck, Car,
  TreePine, Building2, HeartPulse, Store, Briefcase, HardHat,
  GraduationCap, LayoutGrid, Wallet, Heart,
} from "lucide-react";
import { SITE_CONFIG, WHY_CHOOSE_US, TESTIMONIALS } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";

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

const whyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, GraduationCap, LayoutGrid, Wallet, Heart,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
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

      {/* Services */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
              We Provide
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Staff for Every <span className="text-dark">Need</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              We train and provide reliable people with police clearances for homes, businesses, and organizations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {staffTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-light-section rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center sm:border sm:border-border/40"
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
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
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

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              The <span className="text-dark">WOBIC</span> Difference
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We go beyond recruitment — we deliver peace of mind.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-5">
            {WHY_CHOOSE_US.map((item) => {
              const Icon = whyIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 text-center sm:border sm:border-border/50"
                >
                  <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-dark text-white mb-4 sm:mb-5">
                    {Icon && <Icon className="h-6 w-6 sm:h-8 sm:w-8" />}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
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
              <div
                key={t.name}
                className="bg-white sm:rounded-2xl lg:rounded-3xl p-5 sm:p-7 sm:border sm:border-border/40"
              >
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < t.rating ? "text-gold fill-gold" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-bold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <Image
          src="/images/kitchen-cleaning-team.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 to-dark/85" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5 sm:mb-6">
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
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
            >
              Book a Service
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to learn more about your services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-colors duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Chat on WhatsApp
            </a>
            <a
              href={getPhoneUrl(SITE_CONFIG.phone)}
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full border-2 border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors duration-300"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
