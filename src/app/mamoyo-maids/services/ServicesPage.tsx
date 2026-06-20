"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";
import { iconMap } from "@/lib/icons";

const serviceImages: Record<string, string> = {
  "home-cleaning": "/images/bed-making.jpg",
  "deep-cleaning": "/services/deep-cleaning.jpg",
  "laundry-ironing": "/services/laundry.jpg",
  "organizing-decluttering": "/services/organizing.jpg",
  "move-cleaning": "/services/move-cleaning.jpg",
};

export function ServicesPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/about-hero.jpg"
          alt="Our services"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            Our Professional Services
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            From home cleaning to maid training, we offer services that help
            your home and family thrive.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isReversed = index % 2 !== 0;
            return (
              <AnimatedSection key={service.id}>
                <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gold/10 text-dark text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {service.shortTitle}
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-5">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed mb-6 sm:mb-8">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-semibold text-dark mb-3 sm:mb-4 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                          Benefits
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {service.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary"
                            >
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold shrink-0 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-semibold text-dark mb-3 sm:mb-4 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                          What&apos;s Included
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-text-secondary"
                            >
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-navy shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-[11px] sm:text-xs font-semibold text-dark mb-2.5 sm:mb-3 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                        Ideal For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-light-section text-[11px] sm:text-xs font-medium text-text-secondary border border-border/50"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/mamoyo-maids/booking"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
                      >
                        Book This Service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={getWhatsAppUrl(
                          SITE_CONFIG.whatsapp,
                          `Hello! I'm interested in ${service.title}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className={`${isReversed ? "lg:order-1" : ""}`}>
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(26,39,68,0.1)]">
                      <Image
                        src={serviceImages[service.id] || "/services/home-cleaning.jpg"}
                        alt={service.title}
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <AnimatedSection className="text-center">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Why Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Leave the Hard Work to{" "}
              <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Us</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Save time, reduce stress, and let our professional team handle the
              hard work so you can focus on what matters most to your family.
            </p>
            <Link
              href="/mamoyo-maids/booking"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
            >
              Get Started Today
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}

