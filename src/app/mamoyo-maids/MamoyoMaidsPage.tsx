"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Home,
  Sparkles,
  Shirt,
  GraduationCap,
  Heart,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const services = [
  {
    title: "Home Cleaning",
    description: "Regular cleaning to keep your home fresh, tidy, and welcoming every day.",
    icon: Home,
    href: "/mamoyo-maids/services",
  },
  {
    title: "Deep Cleaning",
    description: "Thorough top-to-bottom cleaning for a truly spotless home.",
    icon: Sparkles,
    href: "/mamoyo-maids/services",
  },
  {
    title: "Laundry & Ironing",
    description: "Wash, dry, fold, and iron — we handle it all so you don't have to.",
    icon: Shirt,
    href: "/mamoyo-maids/services",
  },
  {
    title: "Maid Training",
    description: "Professional training programs for domestic workers to build skills and earn certification.",
    icon: GraduationCap,
    href: "/mamoyo-maids/services",
  },
  {
    title: "Aunt for Hire",
    description: "Traditional marriage mentorship and cultural guidance for your wedding preparations.",
    icon: Heart,
    href: "/mamoyo-maids/aunt-for-hire",
  },
  {
    title: "Marriage Counselling",
    description: "Pre-marital and couples counselling to build strong, lasting relationships.",
    icon: Heart,
    href: "/mamoyo-maids/marriage-counselling",
  },
];

const quickLinks = [
  { label: "Our Services", href: "/mamoyo-maids/services" },
  { label: "Hire a Maid", href: "/mamoyo-maids/employment" },
  { label: "Aunt for Hire", href: "/mamoyo-maids/aunt-for-hire" },
  { label: "Marriage Counselling", href: "/mamoyo-maids/marriage-counselling" },
  { label: "Book a Service", href: "/mamoyo-maids/booking" },
  { label: "Meet Our Founder", href: "/mamoyo-maids/founder" },
];

export function MamoyoMaidsPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/kitchen-cleaning-team.jpg"
          alt="Mamoyo Maids professional team"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 to-dark/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            A Division of {SITE_CONFIG.name}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            Mamoyo <span className="text-gold">Maids</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Professional home cleaning, maid placement, training, and family support services.
            Helping your home and family thrive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mamoyo-maids/services"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25"
            >
              View Services
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/mamoyo-maids/booking"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14 sm:mb-18">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
              Our Services
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              What Mamoyo Maids Offers
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              From cleaning and maid placement to counselling and cultural support.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={service.title} delay={index * 0.05}>
                  <Link
                    href={service.href}
                    className="group block bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 hover:shadow-[0_12px_40px_rgba(78,45,123,0.08)] transition-all duration-500 h-full"
                  >
                    <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-dark/10 text-dark mb-4 sm:mb-5 group-hover:bg-dark group-hover:text-white transition-all duration-500">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 sm:mt-5 flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              More from <span className="text-dark">Mamoyo Maids</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Explore all the ways we help families live better.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {quickLinks.map((link, index) => (
              <AnimatedSection key={link.label} delay={index * 0.05}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between gap-3 bg-white rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5 border border-border/40 hover:shadow-[0_8px_30px_rgba(78,45,123,0.06)] transition-all duration-300 group"
                >
                  <span className="text-sm sm:text-base font-semibold text-text-primary">
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <Image
                src="/images/cleaning-team.jpg"
                alt="Mamoyo Maids team"
                width={1200}
                height={400}
                className="w-full h-[250px] sm:h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-transparent flex items-center">
                <div className="px-6 sm:px-12 max-w-lg">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-5 sm:mb-6">
                    Book any Mamoyo Maids service today and let us take care of the rest.
                  </p>
                  <Link
                    href="/mamoyo-maids/booking"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25"
                  >
                    Book a Service
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
