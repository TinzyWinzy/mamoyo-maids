"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { AnimatedSection } from "./AnimatedSection";

const STATS = [
  { value: "300+", label: "Homes Cleaned" },
  { value: "4.9", label: "Average Rating" },
  { value: "50+", label: "Trained Maids" },
  { value: "7 yrs", label: "Serving Harare" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold text-sm" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "\u2605" : "\u2606"}</span>
      ))}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
            Trusted by Families
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Real feedback from real customers across Harare.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {STATS.map((stat) => (
            <AnimatedSection key={stat.label} delay={0.05}>
              <div className="text-center p-4 sm:p-6 rounded-2xl bg-light-section border border-border/40">
                <p className="text-2xl sm:text-3xl font-bold text-dark">{stat.value}</p>
                <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.05}>
              <div className="h-full p-5 sm:p-6 rounded-2xl bg-light-section border border-border/40">
                <StarRating rating={t.rating} />
                <p className="text-sm sm:text-[15px] text-text-secondary mt-3 sm:mt-4 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border/30">
                  <p className="font-semibold text-sm text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
