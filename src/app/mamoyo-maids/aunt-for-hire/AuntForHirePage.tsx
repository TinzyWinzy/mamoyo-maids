"use client";

import {
  Heart,
  Users,
  Star,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

const services = [
  {
    title: "Marriage Preparation",
    description:
      "Step-by-step guidance through traditional marriage customs, family introductions, and lobola negotiations.",
    icon: Heart,
  },
  {
    title: "Family Mediation",
    description:
      "Act as a bridge between families during marriage discussions, ensuring respectful and smooth communication.",
    icon: Users,
  },
  {
    title: "Cultural Mentorship",
    description:
      "Teach the roles, responsibilities, and etiquette expected in a married life within the Zimbabwean tradition.",
    icon: Star,
  },
  {
    title: "Wedding Support",
    description:
      "Help plan and coordinate traditional wedding ceremonies, from attire to rituals and family protocols.",
    icon: Heart,
  },
];

const auntReviews = TESTIMONIALS.filter((t) =>
  ["Tariro N.", "Grace M."].includes(t.name)
);

export function AuntForHirePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent mb-3 sm:mb-4">
            Cultural Guidance
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            Aunt for <span className="text-accent">Hire</span>
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Traditional marriage mentorship and cultural guidance for your
            wedding journey. Let an experienced aunt guide you through every
            step.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              What Is an Aunt for Hire?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-5 sm:mb-6">
              Your Guide Through{" "}
              <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Tradition</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              In Zimbabwean culture, a <em>tete</em> (aunt) plays a vital role
              in marriage preparation. She guides, mediates, and supports the
              bride and groom through traditional customs, family negotiations,
              and wedding ceremonies. Our Aunt for Hire service brings this
              cherished tradition to anyone who needs an experienced,
              trustworthy maternal figure to walk with them on their journey to
              marriage.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 h-full hover:shadow-[0_12px_40px_rgba(0,255,255,0.06)] transition-all duration-500">
                    <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-dark text-white mb-4 sm:mb-5">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4 sm:mb-5">
              Simple <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Process</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                step: 1,
                title: "Reach Out",
                desc: "Contact us via WhatsApp or phone to discuss your needs and what kind of support you're looking for.",
              },
              {
                step: 2,
                title: "Get Matched",
                desc: "We'll connect you with an experienced aunt who understands your family background and cultural needs.",
              },
              {
                step: 3,
                title: "Walk Together",
                desc: "Your aunt will guide you through traditions, negotiations, and ceremonies every step of the way.",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-dark text-white mb-5 sm:mb-6 shadow-xl shadow-dark/15">
                    <span className="text-xl sm:text-2xl font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {auntReviews.length > 0 && (
        <section className="py-20 sm:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12 sm:mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark">
                What Families <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Say</span>
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {auntReviews.map((t, i) => (
                <AnimatedSection key={t.name} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 sm:h-5 sm:w-5 fill-dark text-dark"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-4 text-sm sm:text-[15px]">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="text-sm font-bold text-dark">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
              Ready for a <span className="text-accent">Guide</span>?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Whether you&apos;re planning a traditional wedding or need support
              with family discussions, we&apos;re here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to learn more about the Aunt for Hire service."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-accent text-dark font-semibold text-sm sm:text-base hover:bg-accent-light active:scale-[0.97] transition-all duration-300 shadow-lg shadow-accent/25"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={getPhoneUrl(SITE_CONFIG.phone)}
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 min-h-[52px] rounded-full border-2 border-white/20 text-white/90 font-semibold text-sm sm:text-base hover:bg-white/10 active:scale-[0.97] transition-all duration-300"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Call Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
