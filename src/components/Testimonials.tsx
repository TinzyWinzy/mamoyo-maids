"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { AnimatedSection } from "./AnimatedSection";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
            What Our <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Customers</span> Say
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it — hear from the families who
            trust us with their homes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.12}>
              <div className="relative bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 h-full flex flex-col hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                <Quote className="absolute top-5 right-5 h-8 w-8 sm:h-10 sm:w-10 text-pink/10" />
                <div className="flex gap-1 mb-4 sm:mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-pink text-pink"
                    />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 sm:mb-8 flex-1 text-sm sm:text-[15px]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-border/50">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-navy to-pink flex items-center justify-center text-xs sm:text-sm font-bold text-white shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
