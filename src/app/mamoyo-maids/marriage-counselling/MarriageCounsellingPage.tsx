"use client";

import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

const services = [
  {
    title: "Pre-Marital Counselling",
    description:
      "Build a strong foundation before you say 'I do.' We cover communication, conflict resolution, financial planning, and shared values.",
    icon: Heart,
  },
  {
    title: "Couples Therapy",
    description:
      "Navigate challenges together with professional guidance. Strengthen your bond, rebuild trust, and rediscover connection.",
    icon: Users,
  },
  {
    title: "Traditional Marriage Guidance",
    description:
      "Blend modern counselling with cultural wisdom. Understand the roles and expectations within the Zimbabwean marriage context.",
    icon: Star,
  },
  {
    title: "Family & In-Law Relations",
    description:
      "Learn how to build healthy relationships with extended family and in-laws while maintaining boundaries and mutual respect.",
    icon: Users,
  },
];

const counsellingReviews = TESTIMONIALS.filter((t) =>
  ["Munyaradzi & Tsitsi"].includes(t.name)
);

export function MarriageCounsellingPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/about-hero.jpg"
          alt="Marriage Counselling"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            Relationship Support
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            Marriage <span className="text-gold">Counselling</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Pre-marital and couples counselling to build strong, lasting
            relationships. Professional guidance rooted in wisdom and
            experience.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              About
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-5 sm:mb-6">
              Build a Marriage That{" "}
              <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Lasts</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Marriage is a beautiful journey, but it comes with its own set of
              challenges. Whether you&apos;re preparing for marriage or looking
              to strengthen your existing relationship, our counselling services
              provide a safe, supportive space to grow together. With a blend of
              professional counselling techniques and cultural wisdom, we help
              couples communicate better, resolve conflicts, and build a
              partnership that stands the test of time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 h-full hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                    <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 sm:mb-5">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
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
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              What to Expect
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-5 sm:mb-6">
              A Safe Space to{" "}
              <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Grow</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                title: "Confidential Sessions",
                desc: "Every session is private and confidential. You can speak freely knowing your story is safe with us.",
              },
              {
                title: "Culturally Informed",
                desc: "We understand the unique dynamics of Zimbabwean marriages and blend tradition with modern counselling.",
              },
              {
                title: "Practical Tools",
                desc: "Walk away with real techniques and strategies you can use immediately to strengthen your relationship.",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.15}>
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 text-center h-full">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
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

      {counsellingReviews.length > 0 && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
                Testimonials
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
                What Couples <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Say</span>
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {counsellingReviews.map((t, i) => (
                <AnimatedSection key={t.name} delay={i * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-4 text-sm sm:text-[15px]">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-28 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
              Start Your Journey{" "}
              <span className="text-gold">Today</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Whether you&apos;re engaged, newly married, or decades in,
              it&apos;s never too early or too late to invest in your
              relationship.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to learn more about marriage counselling."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors shadow-lg shadow-gold/25"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={getPhoneUrl(SITE_CONFIG.phone)}
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full border-2 border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors"
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
