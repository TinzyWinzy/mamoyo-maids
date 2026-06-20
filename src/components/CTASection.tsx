"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28">
      <Image
        src="/images/kitchen-cleaning-team.jpg"
        alt={`${SITE_CONFIG.name} professional team`}
        fill
        sizes="100vw"
        className="object-cover"
        quality={85}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 to-dark/85" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-5 sm:mb-6">
            Get Started Today
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
            Ready to Find the Right Staff?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join hundreds of satisfied families and businesses who trust {SITE_CONFIG.name}{" "}
            for all their recruitment and staffing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/mamoyo-maids/booking"
              className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light active:scale-[0.97] transition-colors duration-300 shadow-xl shadow-gold/30"
            >
              Book a Service
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to learn more about your services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 active:scale-[0.97] transition-colors duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Chat on WhatsApp
            </a>
            <a
              href={getPhoneUrl(SITE_CONFIG.phone)}
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full border-2 border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 active:scale-[0.97] transition-colors duration-300"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Call Us Now
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
