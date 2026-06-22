"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ThumbsUp,
  CalendarCheck,
  Target,
  Users,
  Heart,
  Award,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Police Cleared Staff",
    description:
      "Every person we place undergoes thorough background checks and has a valid police clearance.",
  },
  {
    icon: Award,
    title: "Quality Training",
    description:
      "We train our candidates to ensure they deliver professional, high-quality service from day one.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Placement",
    description:
      "We work around your schedule — full-time, part-time, temporary, or permanent placements.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description:
      "Your satisfaction is guaranteed. If you're not happy with a placement, we'll make it right.",
  },
];

const values = [
  {
    icon: Target,
    title: "Reliability",
    description:
      "We deliver on our promises. Every candidate we send is vetted, trained, and ready to work.",
  },
  {
    icon: Users,
    title: "Professionalism",
    description:
      "Our team treats every client with respect and maintains the highest ethical standards.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "We genuinely care about matching the right people to the right roles for lasting success.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "Trust is our foundation. Police clearances, verification, and transparency are non-negotiable.",
  },
];

export function AboutPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/cleaning-team.jpg"
          alt="About WOBIC Employment Services"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 to-dark/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            About <span className="text-gold">WOBIC</span> Employment Services
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Your trusted partner for recruitment, staff placement, and training in Harare, Zimbabwe.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-5 sm:mb-6">
              Connecting Talent with <span className="text-dark">Opportunity</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              WOBIC Employment Services is a licensed employment agency based in Harare, Zimbabwe.
              We train and provide reliable people with police clearances for domestic work,
              security, driving, construction, and more. Founded on the principles of trust,
              transparency, and professionalism, we exist to connect talented individuals with
              meaningful employment opportunities.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-16 sm:mb-20">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(78,45,123,0.1)] max-w-4xl mx-auto">
              <Image
                src="/images/kitchen-cleaning-team.jpg"
                alt="WOBIC professional team"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90">
                  <span className="text-xs sm:text-sm font-semibold text-dark">Licensed & Verified Employment Agency</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-20 sm:mb-24">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 text-center h-full hover:shadow-[0_12px_40px_rgba(78,45,123,0.08)] transition-all duration-500">
                    <div className="inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-dark text-white mb-4 sm:mb-5">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-text-primary mb-1.5 sm:mb-2">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
              Trust Promise
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Our <span className="text-dark">Trust</span> Guarantee
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              We hold ourselves to the highest standards so you can feel confident hiring through us.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-20">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 text-center h-full">
                    <div className="inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gold/10 text-dark mb-4 sm:mb-5">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-text-primary mb-1.5 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center">
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-8">
              We are located at <strong>Karigamombe Centre, First Floor Room 109</strong>, corner of Julius Nyerere Way and Samora Machel Avenue, Harare.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25"
            >
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
              Our Brands
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              WOBIC & <span className="text-dark">Mamoyo Maids</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              WOBIC handles general recruitment and staff placement, while Mamoyo Maids specializes in
              home cleaning, maid placement, training, and family support services.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">WOBIC</h3>
              <p className="text-sm sm:text-base text-text-secondary">
                Employment Services — recruitment, staff placement, police clearances, and workforce solutions.
              </p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gold mb-3">Mamoyo Maids</h3>
              <p className="text-sm sm:text-base text-text-secondary">
                Domestic & home services — cleaning, maid training, aunt for hire, and marriage counselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
