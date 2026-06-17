"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { BOOKING_STEPS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { iconMap } from "@/lib/icons";

export function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const message = `Hello! I'd like to book a service.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ANotes: ${formData.notes}`;
    window.open(getWhatsAppUrl(SITE_CONFIG.whatsapp, message), "_blank");
  };

  return (
    <>
      <section className="relative min-h-[70vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/booking-hero.jpg"
          alt="Book a service"
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
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4"
          >
            Simple Process
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5"
          >
            How Booking Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto"
          >
            Booking your service is just 3 simple steps away.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-20 sm:mb-24">
            {BOOKING_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <AnimatedSection key={step.step} delay={index * 0.15}>
                  <div className="relative text-center">
                    {index < 2 && (
                      <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                    )}
                    <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 sm:mb-6 shadow-xl shadow-navy/15">
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-[10px] sm:text-[11px] font-bold text-[#4e2d7b] uppercase tracking-wider mb-3 sm:mb-4">
                      Step {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection>
            <div className="bg-light-section rounded-2xl sm:rounded-[2rem] border border-border/40 p-6 sm:p-10 md:p-14">
              {submitted ? (
                <div className="text-center py-8 sm:py-10">
                  <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-success/10 mb-5 sm:mb-6">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-success" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                    Booking Request Received!
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary mb-8 max-w-md mx-auto">
                    We&apos;ll get back to you within 2 hours to confirm your
                    appointment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
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
                          service: "",
                          date: "",
                          time: "",
                          notes: "",
                        });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-border text-text-primary font-semibold text-sm hover:bg-white transition-colors"
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8 sm:mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                      Book Your Service
                    </h3>
                    <p className="text-sm sm:text-[15px] text-text-secondary">
                      Fill out the form below and we&apos;ll confirm your
                      appointment quickly.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
                        { id: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+263 77 123 4567" },
                        { id: "email", label: "Email Address", type: "email", required: false, placeholder: "you@example.com" },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
                            {field.label} {field.required && "*"}
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            value={(formData as Record<string, string>)[field.id]}
                            onChange={handleChange}
                            className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                      <div>
                        <label htmlFor="service" className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        >
                          <option value="">Select a service</option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
                          Preferred Time *
                        </label>
                        <select
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all"
                        >
                          <option value="">Select a time</option>
                          {["7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-[11px] sm:text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 sm:px-5 py-3.5 rounded-xl border border-border/50 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all resize-none"
                        placeholder="Any special instructions or requests..."
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 min-h-[52px] rounded-full bg-gold text-[#4e2d7b] font-semibold text-sm sm:text-base hover:bg-gold-light active:scale-[0.97] transition-all duration-300 shadow-lg shadow-gold/20"
                      >
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        Book Now
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 min-h-[52px] rounded-full bg-navy text-white font-semibold text-sm sm:text-base hover:bg-navy-light active:scale-[0.97] transition-colors"
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
    </>
  );
}
