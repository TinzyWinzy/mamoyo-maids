"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { AnimatedSection } from "./AnimatedSection";
import { iconMap } from "@/lib/icons";

const serviceImages: Record<string, string> = {
  "home-cleaning": "/images/bed-making.jpg",
  "deep-cleaning": "/services/deep-cleaning.jpg",
  "laundry-ironing": "/services/laundry.jpg",
  "organizing-decluttering": "/services/organizing.jpg",
  "move-cleaning": "/services/move-cleaning.jpg",
};

export function FeaturedServices() {
  return (
    <section className="py-20 sm:py-28 bg-light-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-pink mb-3 sm:mb-4">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-5">
            Our <span className="text-pink">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            From home cleaning and maid training to full-service maid placement,
            we offer comprehensive solutions for your home and family.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-border/40 overflow-hidden hover:shadow-[0_15px_50px_rgba(232,139,167,0.1)] transition-all duration-500"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={serviceImages[service.id] || "/services/home-cleaning.jpg"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink" />
                        <span className="text-[11px] sm:text-xs font-semibold text-navy">
                          {service.shortTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 sm:mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink hover:text-pink-light transition-colors"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-10 sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-navy text-white font-semibold text-sm sm:text-base hover:bg-navy-light transition-all duration-300 shadow-lg shadow-navy/15"
          >
            View All Services
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
