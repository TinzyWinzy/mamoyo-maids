"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Heart, Target, Eye, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";

const milestones = [
  { year: "2020", event: "Founded Mamoyo with a vision to change how families access home services." },
  { year: "2021", event: "Expanded from cleaning to full-service maid placement and training." },
  { year: "2023", event: "Launched Aunt for Hire and Marriage Counselling — supporting families beyond the home." },
  { year: "2025", event: "Rebranded to Mamoyo Services, serving hundreds of families across Harare." },
];

export function FounderPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-end sm:items-center overflow-hidden bg-dark">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pb-24 pt-28 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border-2 border-white/10">
                <Image
                  src="/founder.jpg"
                  alt="Mamoyo — Founder of Mamoyo Services"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                Meet the Founder
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-4">
                Mamoyo{" "}
                <span className="text-accent">Moyo</span>
              </h1>
              <p className="text-base sm:text-lg text-white/50 font-medium tracking-wider uppercase mb-6">
                Founder &amp; CEO — Mamoyo Services
              </p>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mx-auto lg:mx-0">
                &ldquo;I started Mamoyo because I saw how hard it was for families
                to find trustworthy home services. Every family deserves peace of
                mind — and that belief drives everything we do.&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                <a
                  href={getWhatsAppUrl(SITE_CONFIG.whatsapp, "Hello Mamoyo! I'd like to connect with you.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-accent text-dark font-semibold text-sm hover:bg-accent-light transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  Connect with Mamoyo
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
                >
                  Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                The Beginning
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                A Vision Born from{" "}
                <span className="text-accent">Real Need</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                <p>
                  Mamoyo founded Mamoyo Services in 2020 after experiencing
                  firsthand the struggle of finding reliable, trustworthy home
                  service providers in Harare. Too many families were being let
                  down by inconsistent services and unvetted staff.
                </p>
                <p>
                  She saw an opportunity to build something different — a company
                  that treats every home with respect, every client with care, and
                  every employee with dignity. What started as a small cleaning
                  operation has grown into a multi-service family support platform.
                </p>
                <p>
                  Today, Mamoyo Services employs dozens of trained professionals
                  and has served hundreds of families across Harare&apos;s premier
                  suburbs. But for Mamoyo, it&apos;s never been about size —
                  it&apos;s about impact.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border/40">
                <Image
                  src="/images/team-1.jpg"
                  alt="Mamoyo — Founder"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14 sm:mb-18">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              What Drives Her
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-5">
              Mission &amp;{" "}
              <span className="text-accent">Vision</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Mission",
                text: "To provide dependable, professional services that help families enjoy cleaner homes, stronger relationships, and more free time.",
              },
              {
                icon: Eye,
                title: "Vision",
                text: "A Zimbabwe where every family has access to trusted, high-quality home and life services that help them thrive.",
              },
              {
                icon: Heart,
                title: "Core Belief",
                text: "Every family deserves peace of mind. We build trust through consistency, transparency, and genuine care for our clients.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 text-center h-full hover:shadow-[0_12px_40px_rgba(0,255,255,0.06)] transition-all duration-500">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-dark mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14 sm:mb-18">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-5">
              How It All{" "}
              <span className="text-accent">Happened</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-10 sm:space-y-14">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 0.1}>
                  <div className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                      <div className={`bg-white rounded-2xl p-5 sm:p-6 border border-border/40 ${i % 2 === 0 ? "sm:mr-8" : "sm:ml-8"}`}>
                        <span className="text-accent font-bold font-serif text-xl">{m.year}</span>
                        <p className="text-sm text-text-secondary mt-2 leading-relaxed">{m.event}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-accent border-4 border-background flex items-center justify-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <Sparkles className="h-3 w-3 text-dark" />
                    </div>
                    <div className="flex-1 hidden sm:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Quote */}
      <section className="py-20 sm:py-28 bg-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="text-accent text-5xl sm:text-6xl font-serif leading-none mb-6">&ldquo;</div>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-snug font-medium mb-8">
              We&apos;re not just cleaning homes — we&apos;re giving families
              back their most valuable resource: <span className="text-accent">time</span>.
            </blockquote>
            <p className="text-white/50 text-sm uppercase tracking-widest font-semibold">
              — Mamoyo
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Let&apos;s Connect
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-5">
              Want to Say{" "}
              <span className="text-accent">Hello</span>?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Mamoyo personally reads every message. Whether you have a question
              about services, want to partner with us, or just want to say hi —
              she&apos;d love to hear from you.
            </p>
            <a
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp, "Hello Mamoyo! I came across your founder page and wanted to connect.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-semibold text-sm sm:text-base hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Message Mamoyo
            </a>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
