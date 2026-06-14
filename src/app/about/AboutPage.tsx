"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ThumbsUp,
  CalendarCheck,
  Target,
  Users,
  Heart,
  Award,
  Star,
  Quote,
} from "lucide-react";
import { TEAM_MEMBERS, TESTIMONIALS } from "@/lib/constants";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Screened Staff",
    description:
      "Every team member undergoes thorough background checks and vetting before joining our team.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "We follow strict quality standards and conduct regular inspections to ensure consistent excellence.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Scheduling",
    description:
      "Book weekly, bi-weekly, or one-time cleans that fit your lifestyle and schedule.",
  },
  {
    icon: ThumbsUp,
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is guaranteed. If you're not happy, we'll make it right.",
  },
];

const values = [
  {
    icon: Target,
    title: "Reliability",
    description:
      "We show up on time, every time. You can count on us to keep your home sparkling clean.",
  },
  {
    icon: Users,
    title: "Professionalism",
    description:
      "Our trained team treats your home with the utmost respect and delivers exceptional results.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "We treat every home as if it were our own, with attention to detail and genuine care.",
  },
  {
    icon: ShieldCheck,
    title: "Customer-First",
    description:
      "Your needs drive everything we do. We listen, adapt, and always put you first.",
  },
];

const teamImages = [
  "/images/team-1.jpg",
  "/images/team-2.jpg",
  "/images/team-3.jpg",
  "/images/team-4.jpg",
];

export function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="About Mamoyo Services"
          fill
          sizes="100vw"
          className="object-cover animate-zoom-slow"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-pink mb-3 sm:mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5"
          >
            Why Families Trust{" "}
            <span className="text-pink">Mamoyo Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto"
          >
            We&apos;re your partners in creating a cleaner home, stronger
            family, and better quality of life.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-5 sm:mb-6">
              Helping Families <span className="text-dark">Thrive</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              To provide dependable, professional services that help families
              enjoy cleaner homes, stronger relationships, and more free time.
              Whether through cleaning, maid placement, training, counselling, or
              cultural support — we believe every family deserves to thrive.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-16 sm:mb-20">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(26,39,68,0.1)] max-w-4xl mx-auto">
              <Image
                src="/images/plumbing-service.jpg"
                alt="Mamoyo Services professional team"
                width={800}
                height={500}
                className="w-full h-auto object-cover animate-zoom-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                  <span className="text-xs sm:text-sm font-semibold text-navy">Beyond Cleaning — Complete Home Care</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-20 sm:mb-24">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 text-center h-full hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                    <div className="inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 sm:mb-5">
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

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Our People
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Meet Our <span className="text-dark">Team</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Dedicated professionals who make Mamoyo Services the trusted choice
              for hundreds of families.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-border/40 overflow-hidden h-full hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                  <div className="relative h-40 sm:h-56 overflow-hidden">
                    <Image
                      src={teamImages[index]}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-bold text-text-primary mb-0.5 sm:mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark font-semibold mb-2 sm:mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Trust Promise
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Our <span className="text-dark">Trust</span> Guarantee
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              We hold ourselves to the highest standards so you can feel
              confident inviting us into your home.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-20">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 text-center h-full">
                    <div className="inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-pink/10 text-dark mb-4 sm:mb-5">
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

          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Reviews
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              What Our <span className="text-dark">Customers</span> Say
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                <div className="relative bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 h-full flex flex-col">
                  <Quote className="absolute top-5 right-5 h-8 w-8 sm:h-10 sm:w-10 text-dark/10" />
                  <div className="flex gap-1 mb-4 sm:mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-pink text-dark"
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6 sm:mb-8 flex-1 text-base sm:text-lg">
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

      <CTASection />
    </>
  );
}
