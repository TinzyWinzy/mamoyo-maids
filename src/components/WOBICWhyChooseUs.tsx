"use client";

import { WHY_CHOOSE_US } from "@/lib/constants";
import { AnimatedSection } from "./AnimatedSection";
import { iconMap } from "@/lib/icons";

export function WOBICWhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-light-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
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
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl sm:rounded-3xl border border-border/50 p-5 sm:p-7 text-center transition-all duration-500"
              >
                <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-dark text-white mb-4 sm:mb-5 transition-all duration-500">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
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
  );
}
