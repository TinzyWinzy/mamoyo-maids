"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Shield, Users, Award, Building2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function WOBICHeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cleaning-team.jpg"
          alt={`${SITE_CONFIG.name} professional team`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4e2d7b]/85 via-[#4e2d7b]/70 to-[#4e2d7b]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-6 sm:mb-8">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
            Licensed Employment Agency — Harare
          </div>

          <h1 className="text-[clamp(2rem,8vw,4.5rem)] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
            <span className="block">Your Trusted</span>
            <span className="block text-gold">Employment</span>
            <span className="block">Partner</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-xl">
            We train and provide reliable people with police clearances. House maids,
            babysitters, security, drivers, gardeners, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-14">
            <Link
              href="/mamoyo-maids/booking"
              className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-gold-light active:scale-[0.97] transition-all duration-300 shadow-xl shadow-gold/30"
            >
              Hire Staff Now
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to learn more about your employment services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 min-h-[52px] rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 active:scale-[0.97] transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            {[
              { icon: Shield, label: "Police Clearance" },
              { icon: Users, label: "Trained Staff" },
              { icon: Award, label: "Verified Agency" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-white/60 text-xs sm:text-sm"
              >
                <badge.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
