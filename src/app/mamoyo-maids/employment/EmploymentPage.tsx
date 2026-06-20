"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle,
  Send,
  Users,
  Star,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { SITE_CONFIG, EMPLOYMENT_BENEFITS } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { iconMap } from "@/lib/icons";
import { db } from "@/lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import type { MaidProfile } from "@/app/admin/maids/page";

const howItWorks = [
  {
    step: 1,
    title: "Tell Us What You Need",
    description:
      "Share your requirements — from cleaning frequency to specific skills and experience levels.",
    icon: Briefcase,
  },
  {
    step: 2,
    title: "We Match You",
    description:
      "Our team carefully selects the best candidates based on your specific needs and preferences.",
    icon: Users,
  },
  {
    step: 3,
    title: "Interview & Hire",
    description:
      "Meet your preferred candidates, conduct interviews, and hire the perfect maid for your home.",
    icon: Star,
  },
];

const maidTypes = [
  {
    title: "Live-In Maid",
    description:
      "A dedicated helper who lives in your home and provides full-time domestic support.",
    features: [
      "Full-time availability",
      "Comprehensive house duties",
      "Cooking & meal prep",
      "Child & elder care support",
    ],
  },
  {
    title: "Live-Out Maid",
    description:
      "A professional who works during set hours and returns home after their shift.",
    features: [
      "Fixed working hours",
      "Cleaning & laundry",
      "Kitchen maintenance",
      "Flexible scheduling",
    ],
  },
  {
    title: "Part-Time Helper",
    description:
      "Ideal for smaller households that need occasional help with specific tasks.",
    features: [
      "Flexible days",
      "Task-focused work",
      "Budget-friendly",
      "Perfect for singles",
    ],
  },
];

export function EmploymentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    maidAge: "",
    bedrooms: "",
    requirements: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [maids, setMaids] = useState<MaidProfile[]>([]);
  const [maidsLoading, setMaidsLoading] = useState(true);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const q = query(collection(db, "maids"));
        const snapshot = await getDocs(q);
        const maidsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MaidProfile[];
        setMaids(maidsData);
      } catch (err) {
        console.error("Failed to load maids", err);
      } finally {
        setMaidsLoading(false);
      }
    };
    fetchMaids();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/maid-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello! I'm looking to hire a maid.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService Type: ${formData.serviceType}%0APreferred Maid Age: ${formData.maidAge}%0ABedrooms: ${formData.bedrooms}%0ARequirements: ${formData.requirements}`;
    window.open(getWhatsAppUrl(SITE_CONFIG.whatsapp, message), "_blank");
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/about-hero.jpg"
          alt="Hire a maid from Mamoyo Maids"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            Maid Placement Agency
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            Hire a Trusted <span className="text-gold">Maid</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10">
            Looking for a reliable domestic worker? We connect you with
            background-checked, trained, and trustworthy maids for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="#request-form"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-xl shadow-gold/30"
            >
              Request a Maid
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to hire a maid for my home."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 sm:-mt-8 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: ShieldCheck, label: "Background Checked", desc: "All maids are vetted" },
              { icon: Award, label: "Trained & Skilled", desc: "Professional training provided" },
              { icon: Star, label: "Satisfaction Guaranteed", desc: "Love your maid or we'll replace" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-[0_4px_25px_rgba(26,39,68,0.06)] border border-border/40"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                  <badge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-text-primary">
                    {badge.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-text-secondary">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Maid Types
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Choose the <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Right Fit</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              We offer different types of domestic workers to match your household
              needs and lifestyle.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {maidTypes.map((type, index) => (
              <AnimatedSection key={type.title} delay={index * 0.1}>
                <div className="bg-light-section rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 h-full hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-dark text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
                    <Users className="h-3.5 w-3.5" />
                    {type.title}
                  </div>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-5 sm:mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-2.5">
                    {type.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-text-secondary"
                      >
                        <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Simple <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">3-Step</span> Process
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.step} delay={index * 0.15}>
                  <div className="text-center">
                    <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-navy to-navy-light text-white mb-5 sm:mb-6 shadow-xl shadow-navy/15">
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-[11px] font-bold text-dark uppercase tracking-wider mb-3 sm:mb-4">
                      Step {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                      {step.description}
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
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Benefits
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Why Work With <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Us</span>?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              We value our team members and provide excellent opportunities for
              growth and stability.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {EMPLOYMENT_BENEFITS.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <AnimatedSection key={benefit.title} delay={index * 0.08}>
                  <div className="bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 text-center hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                    <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 sm:mb-5">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-text-primary mb-1.5 sm:mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {benefit.description}
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
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
              Available Maids
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
              Meet Our <span className="text-dark underline decoration-accent decoration-2 underline-offset-4">Available</span> Maids
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Browse profiles of trusted, background-checked domestic workers
              ready to join your home. Tap any profile to connect via WhatsApp.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {maidsLoading ? (
              <div className="col-span-full text-center py-10 text-text-secondary">Loading available maids...</div>
            ) : maids.length === 0 ? (
              <div className="col-span-full text-center py-10 text-text-secondary">No maids available at the moment. Please check back later.</div>
            ) : maids.map((maid, index) => (
              <AnimatedSection key={maid.id} delay={index * 0.05}>
                <div className="bg-light-section rounded-2xl sm:rounded-3xl border border-border/40 p-5 sm:p-6 h-full flex flex-col hover:shadow-[0_12px_40px_rgba(232,139,167,0.08)] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy to-pink flex items-center justify-center text-lg font-bold text-white shrink-0">
                      {maid.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">
                        {maid.name}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {maid.age} years
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{maid.areaOfOrigin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <Users className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{maid.church}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <UserCheck className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{maid.children} {maid.children === 1 ? "child" : "children"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <DollarSign className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>${maid.salaryExpectation}/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>Off: {maid.daysOff}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{maid.policeClearance ? "Police Clearance" : "Pending clearance"}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary mt-1">
                      <Briefcase className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                      <span>{maid.previousWork}</span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(
                      SITE_CONFIG.whatsapp,
                      `Hello! I'm interested in hiring ${maid.name} (${maid.age} yrs, ${maid.areaOfOrigin}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors shadow-md shadow-gold/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="request-form" className="py-20 sm:py-28 bg-light-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-border/40 p-6 sm:p-10 shadow-[0_8px_40px_rgba(26,39,68,0.04)]">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-success/10 mb-5 sm:mb-6">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-success" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                    Request Received!
                  </h3>
                  <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    We&apos;ll match you with the perfect maid and get back to
                    you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Confirm via WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          serviceType: "",
                          maidAge: "",
                          bedrooms: "",
                          requirements: "",
                        });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-border text-text-primary font-semibold text-sm hover:bg-light-section transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8 sm:mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                      Request a Maid
                    </h3>
                    <p className="text-base sm:text-lg text-text-secondary">
                      Tell us what you need and we&apos;ll find the perfect match
                      for your home.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="emp-name"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="emp-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="emp-phone"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="emp-phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                          placeholder="+263 77 123 4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="emp-email"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="emp-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="emp-serviceType"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Maid Type Needed *
                        </label>
                        <select
                          id="emp-serviceType"
                          name="serviceType"
                          required
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        >
                          <option value="">Select type</option>
                          <option value="Live-In Maid">Live-In Maid</option>
                          <option value="Live-Out Maid">Live-Out Maid</option>
                          <option value="Part-Time Helper">Part-Time Helper</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="emp-maidAge"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Preferred Maid Age
                        </label>
                        <select
                          id="emp-maidAge"
                          name="maidAge"
                          value={formData.maidAge}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        >
                          <option value="">No preference</option>
                          <option value="18-25">18–25 years</option>
                          <option value="26-35">26–35 years</option>
                          <option value="36-45">36–45 years</option>
                          <option value="46+">46+ years</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="emp-bedrooms"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Number of Bedrooms
                        </label>
                        <select
                          id="emp-bedrooms"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        >
                          <option value="">Select</option>
                          <option value="1-2">1–2 Bedrooms</option>
                          <option value="3-4">3–4 Bedrooms</option>
                          <option value="5+">5+ Bedrooms</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="emp-requirements"
                        className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                      >
                        Specific Requirements
                      </label>
                      <textarea
                        id="emp-requirements"
                        name="requirements"
                        rows={3}
                        value={formData.requirements}
                        onChange={handleChange}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all resize-none"
                        placeholder="e.g., cooking skills, childcare experience, languages spoken..."
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 disabled:opacity-70"
                      >
                        {loading ? (
                          <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                        {loading ? "Sending..." : "Submit Request"}
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-full bg-navy text-white font-semibold text-sm sm:text-base hover:bg-navy-light transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        Send via WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
              Looking to <span className="text-gold">Join</span> Our Team?
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-8 max-w-xl mx-auto">
              We&apos;re always looking for reliable, hardworking individuals to
              join the Mamoyo Maids family.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to apply to work with Mamoyo Maids."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors shadow-lg shadow-gold/25"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Apply via WhatsApp
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
