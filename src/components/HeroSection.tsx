"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Shield, Clock, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/kitchen-cleaning-team.jpg"
          alt="Mamoyo Maids professional cleaning team at work"
          fill
          sizes="100vw"
          className="object-cover animate-zoom-slow"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-6 sm:mb-8"
          >
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink" />
            Trusted by 500+ Families in Harare
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5 sm:mb-6"
          >
            Your Trusted Maids
            <span className="block text-pink">Clean Homes,</span>
            <span className="block">Happy Lives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8 sm:mb-10 max-w-xl"
          >
            Flexible schedules, reliable service, and a home that shines. Let our
            professional team take care of your cleaning while you focus on what
            matters most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-pink text-white font-semibold text-sm sm:text-base hover:bg-pink-light transition-all duration-300 shadow-xl shadow-pink/30"
            >
              Book Your Cleaning Today
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to book a cleaning service."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 sm:gap-6"
          >
            {[
              { icon: Shield, label: "Background Checked" },
              { icon: Clock, label: "Flexible Scheduling" },
              { icon: Award, label: "5-Star Rated" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-white/60 text-xs sm:text-sm"
              >
                <badge.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
