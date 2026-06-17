"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative min-h-[70vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact WOBIC Employment Services"
          fill
          sizes="100vw"
          className="object-cover animate-zoom-slow"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4e2d7b]/90 via-[#4e2d7b]/80 to-[#4e2d7b]/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5"
          >
            Let&apos;s Find Your Ideal Staff
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto"
          >
            Get in touch with us today. We&apos;re here to answer your questions
            and help you find the right staff for your needs.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            <div>
              <AnimatedSection>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-dark mb-3 sm:mb-4">
                  Contact Information
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-8 sm:mb-10">
                  We&apos;d Love to Hear From You
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <a
                    href={getPhoneUrl(SITE_CONFIG.phone)}
                    className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-light-section transition-all duration-300 group"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4e2d7b] text-white group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
                        Phone
                      </p>
                      <p className="text-base sm:text-lg font-bold text-text-primary">
                        {SITE_CONFIG.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={getPhoneUrl(SITE_CONFIG.phoneSecondary)}
                    className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-light-section transition-all duration-300 group"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4e2d7b]/80 text-white group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
                        Alt. Phone
                      </p>
                      <p className="text-base sm:text-lg font-bold text-text-primary">
                        {SITE_CONFIG.phoneSecondary}
                      </p>
                    </div>
                  </a>

                  <a
                    href={getWhatsAppUrl(
                      SITE_CONFIG.whatsapp,
                      "Hello! I have a question about your services."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-light-section transition-all duration-300 group"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-[#4e2d7b] group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
                        WhatsApp
                      </p>
                      <p className="text-base sm:text-lg font-bold text-text-primary">
                        {SITE_CONFIG.whatsapp}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-light-section transition-all duration-300 group"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4e2d7b]/80 text-white group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
                        Email
                      </p>
                      <p className="text-base sm:text-lg font-bold text-text-primary">
                        {SITE_CONFIG.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#4e2d7b] text-white">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
                        Location
                      </p>
                      <p className="text-base sm:text-lg font-bold text-text-primary">
                        Karigamombe Centre, 11th Floor<br />
                        Corner Julius Nyerere & Samora Machel<br />
                        Harare, Zimbabwe
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-light-section rounded-2xl p-5 sm:p-6 border border-border/40 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                    <h3 className="text-sm sm:text-base font-bold text-text-primary">
                      Operating Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        Monday – Friday
                      </span>
                      <span className="font-semibold text-text-primary">
                        {SITE_CONFIG.operatingHours.weekdays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Saturday</span>
                      <span className="font-semibold text-text-primary">
                        {SITE_CONFIG.operatingHours.saturday}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Sunday</span>
                      <span className="font-medium text-text-secondary">
                        {SITE_CONFIG.operatingHours.sunday}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary mb-2 sm:mb-3">
                    Service Areas
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We serve Greater Harare and surrounding areas including
                    Borrowdale, Greendale, Avondale, Mount Pleasant, Chisipite,
                    Greystone Park, and all major suburbs across Zimbabwe.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection delay={0.2}>
                <div className="bg-light-section rounded-2xl sm:rounded-[2rem] border border-border/40 p-6 sm:p-8 md:p-10">
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1.5 sm:mb-2">
                      Quick Inquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Send us a message and we&apos;ll respond within 2 hours.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-8 sm:py-10">
                      <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-success/10 mb-5 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-success" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary mb-8">
                        Thank you for reaching out. We&apos;ll get back to you
                        soon.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-border text-text-primary font-semibold text-sm hover:bg-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
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
                          htmlFor="contact-email"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider"
                        >
                          Message *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
                      >
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-5 sm:mt-6 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-border/40 h-52 sm:h-64">
                  <iframe
                    title="WOBIC Employment Services Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.7!2d31.0522!3d-17.8252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931997f0e5e5e5d%3A0x5e5e5e5e5e5e5e5e!2sKarigamombe%20Centre!5e0!3m2!1sen!2szw!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#4e2d7b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
              Ready?
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
              Ready to Hire?
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-8 max-w-xl mx-auto">
              Choose your preferred way to get started with WOBIC Employment Services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/mamoyo-maids/booking"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors shadow-lg shadow-gold/25"
              >
                Hire Staff Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hello! I'd like to hire staff."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Chat on WhatsApp
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
