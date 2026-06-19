"use client";

import Link from "next/link";
import {
  Home,
  Baby,
  ShieldCheck,
  Car,
  TreePine,
  Building2,
  HeartPulse,
  Store,
  Briefcase,
  HardHat,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

const staffTypes = [
  { icon: Home, title: "House Maids", description: "Reliable domestic workers for your home." },
  { icon: Baby, title: "Babysitters", description: "Caring childcare professionals." },
  { icon: ShieldCheck, title: "Security", description: "Trained security personnel." },
  { icon: Car, title: "Drivers", description: "Experienced and licensed drivers." },
  { icon: TreePine, title: "Gardeners", description: "Skilled garden and grounds keepers." },
  { icon: Building2, title: "Caretakers", description: "Trusted property caretakers." },
  { icon: HeartPulse, title: "Nurse Aids", description: "Compassionate care assistants." },
  { icon: Store, title: "Shop Workers", description: "Reliable retail and shop staff." },
  { icon: Briefcase, title: "Office Workers", description: "Professional office personnel." },
  { icon: HardHat, title: "Construction", description: "Skilled construction workers." },
];

export function WOBICServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            We Provide
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
            Staff for Every <span className="text-[#4e2d7b]">Need</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            We train and provide reliable people with police clearances for homes, businesses, and organizations.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {staffTypes.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={index * 0.04}>
                <div className="group bg-light-section rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center border border-border/40 transition-all duration-500 h-full">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#4e2d7b]/10 text-[#4e2d7b] mb-3 sm:mb-4 transition-all duration-500">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1">
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

        <AnimatedSection className="text-center mt-10 sm:mt-14">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/mamoyo-maids/employment"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25"
            >
              Hire Staff Now
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to learn more about your staff placement services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#4e2d7b] text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-[#4e2d7b] hover:text-white transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Enquire on WhatsApp
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
