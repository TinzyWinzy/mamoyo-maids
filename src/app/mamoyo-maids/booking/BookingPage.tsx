"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Send,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";
import { BOOKING_STEPS, SERVICES, SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { AnimatedSection } from "@/components/AnimatedSection";
import { iconMap } from "@/lib/icons";

const TIME_SLOTS = [
  "7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
];

export function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const initial = {
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    };
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceId = params.get("service");
      if (serviceId) {
        const matched = SERVICES.find((s) => s.id === serviceId);
        if (matched) initial.service = matched.title;
      }
    }
    return initial;
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^(\+?263|0)?[7-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Invalid phone number";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.date) newErrors.date = "Date is required";
    else if (new Date(formData.date) < new Date(new Date().toDateString())) newErrors.date = "Date cannot be in the past";
    if (!formData.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (s: number) => {
    const newErrors: Record<string, string> = {};
    if (s === 1 && !formData.service) newErrors.service = "Please select a service";
    if (s === 2) {
      if (!formData.date) newErrors.date = "Date is required";
      else if (new Date(formData.date) < new Date(new Date().toDateString())) newErrors.date = "Date cannot be in the past";
      if (!formData.time) newErrors.time = "Time is required";
    }
    if (s === 3) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      else if (!/^(\+?263|0)?[7-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3) || !validate()) return;
    setLoading(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "leads"), {
        type: "booking",
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "",
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || "",
        createdAt: new Date().toISOString(),
        status: "new",
      });
      setSubmitted(true);
      fetch(`${window.location.origin}/api/notify-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {
      setSubmitError("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello! I'd like to book a service.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0ADate: ${formData.date}%0ATime: ${formData.time}%0ANotes: ${formData.notes}`;
    window.open(getWhatsAppUrl(SITE_CONFIG.whatsapp, message), "_blank");
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
    setErrors({});
  };

  const selectedService = SERVICES.find((s) => s.title === formData.service);

  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/booking-hero.jpg"
          alt="Book a service"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center w-full">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-3 sm:mb-4">
            Simple Process
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5">
            How Booking Works
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Booking your service is just 3 simple steps away.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-20 sm:mb-24">
            {BOOKING_STEPS.map((s, index) => {
              const Icon = iconMap[s.icon];
              return (
                <AnimatedSection key={s.step} delay={index * 0.15}>
                  <div className="relative text-center">
                    {index < 2 && (
                      <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                    )}
                    <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 sm:mb-6 shadow-xl shadow-navy/15">
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-[10px] sm:text-[11px] font-bold text-dark uppercase tracking-wider mb-3 sm:mb-4">
                      Step {s.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-text-secondary">
                      {s.description}
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
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Confirm via WhatsApp
                    </button>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-border text-text-primary font-semibold text-sm hover:bg-white transition-colors"
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-dark/50 mb-1">
                        Step {step} of 3
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                        {step === 1 && "Pick Your Service"}
                        {step === 2 && "Select Date & Time"}
                        {step === 3 && "Your Details"}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-dark/30">
                      {Math.round(((step - 1) / 2) * 100)}%
                    </span>
                  </div>

                  <div className="h-1 bg-border/40 rounded-full overflow-hidden mb-8 sm:mb-10">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: step >= 1 ? undefined : "none" }}>
                      <div className="mb-6 sm:mb-8">
                        <p className="text-sm sm:text-[15px] text-text-secondary mb-5">
                          Choose the service that fits your needs.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {SERVICES.map((s) => {
                            const Icon = iconMap[s.icon];
                            const isSelected = formData.service === s.title;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, service: s.title });
                                  if (errors.service) setErrors({ ...errors, service: "" });
                                }}
                                className={`group text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                                  isSelected
                                    ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                                    : "border-border/40 bg-white hover:border-gold/30 hover:shadow-md"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-gold text-dark"
                                      : "bg-gold/10 text-dark group-hover:bg-gold/15"
                                  }`}>
                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-sm sm:text-[15px] text-text-primary">
                                      {s.title}
                                    </h4>
                                    <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5 line-clamp-1">
                                      {s.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-2">{errors.service}</p>}
                      </div>
                      <div className="hidden sm:flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: step >= 2 ? undefined : "none" }}>
                      <div className="mb-6 sm:mb-8">
                        <p className="text-sm sm:text-[15px] text-text-secondary mb-5">
                          Pick a date and time that works best for you.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="date" className="block text-[11px] font-semibold text-text-primary mb-2 uppercase tracking-wider">
                              Preferred Date *
                            </label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              required
                              value={formData.date}
                              onChange={handleChange}
                              className={`w-full px-4 sm:px-5 py-3.5 rounded-xl border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all ${
                                errors.date ? "border-red-400" : "border-border/50"
                              }`}
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                          </div>
                          <div>
                            <label htmlFor="time" className="block text-[11px] font-semibold text-text-primary mb-2 uppercase tracking-wider">
                              Preferred Time *
                            </label>
                            <select
                              id="time"
                              name="time"
                              required
                              value={formData.time}
                              onChange={handleChange}
                              className={`w-full px-4 sm:px-5 py-3.5 rounded-xl border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all ${
                                errors.time ? "border-red-400" : "border-border/50"
                              }`}
                            >
                              <option value="">Select a time</option>
                              {TIME_SLOTS.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border/60 text-text-primary font-semibold text-sm hover:bg-white transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: step >= 3 ? undefined : "none" }}>
                      {selectedService && (
                        <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-border/40">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-dark/40 mb-2">
                            Your Selection
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-dark shrink-0">
                              <CalendarDays className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-text-primary">
                                {selectedService.title}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {formData.date || "Date TBC"} &middot; {formData.time || "Time TBC"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mb-6 sm:mb-8">
                        <p className="text-sm sm:text-[15px] text-text-secondary mb-5">
                          Just need your contact info to confirm the booking.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {[
                            { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                            { id: "phone", label: "Phone Number", type: "tel", placeholder: "+263 77 123 4567" },
                            { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                          ].map((field) => (
                            <div key={field.id}>
                              <label htmlFor={field.id} className="block text-[11px] font-semibold text-text-primary mb-2 uppercase tracking-wider">
                                {field.label} {field.id !== "email" ? "*" : ""}
                              </label>
                              <input
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                required={field.id !== "email"}
                                value={(formData as Record<string, string>)[field.id]}
                                onChange={handleChange}
                                className={`w-full px-4 sm:px-5 py-3.5 rounded-xl border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold transition-all ${
                                  errors[field.id] ? "border-red-400" : "border-border/50"
                                }`}
                                placeholder={field.placeholder}
                              />
                              {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                            </div>
                          ))}
                        </div>
                        <div className="mt-5">
                          <label htmlFor="notes" className="block text-[11px] font-semibold text-text-primary mb-2 uppercase tracking-wider">
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
                      </div>

                      {submitError && <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{submitError}</p>}

                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border/60 text-text-primary font-semibold text-sm hover:bg-white transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 disabled:opacity-60 disabled:pointer-events-none"
                        >
                          {loading ? (
                            <div className="h-4 w-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          {loading ? "Submitting..." : "Confirm Booking"}
                        </button>
                        <button
                          type="button"
                          onClick={handleWhatsApp}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-all"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </button>
                      </div>
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
