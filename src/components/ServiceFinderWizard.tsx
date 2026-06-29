"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Search,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { iconMap } from "@/lib/icons";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "home-care",
    label: "Home Care & Cleaning",
    description: "Regular cleaning, deep cleaning, laundry & organizing",
    icon: "Home",
    serviceIds: [
      "home-cleaning",
      "deep-cleaning",
      "laundry-ironing",
      "organizing-decluttering",
    ],
  },
  {
    id: "moving",
    label: "Moving & Relocation",
    description: "Move-in/move-out cleaning and decluttering",
    icon: "Truck",
    serviceIds: ["move-cleaning", "organizing-decluttering"],
  },
  {
    id: "training",
    label: "Maid Training",
    description: "Professional training for domestic workers",
    icon: "GraduationCap",
    serviceIds: ["maid-training"],
  },
  {
    id: "funeral",
    label: "Funeral & Cultural Support",
    description: "Professional mourners and funeral logistics",
    icon: "Heart",
    serviceIds: ["professional-moaners", "funeral-moving-support"],
  },
];

const URGENCY_OPTIONS = [
  { id: "asap", label: "ASAP", description: "Need help this week" },
  { id: "soon", label: "Soon", description: "Within the next 2 weeks" },
  { id: "planning", label: "Planning", description: "Sometime this month" },
  { id: "browsing", label: "Just Browsing", description: "Exploring options" },
];

interface ServiceFinderWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceFinderWizard({
  isOpen,
  onClose,
}: ServiceFinderWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);

  if (!isOpen) return null;

  const matchedServices = selectedCategory
    ? SERVICES.filter((s) =>
        CATEGORIES.find((c) => c.id === selectedCategory)?.serviceIds.includes(
          s.id
        )
      )
    : [];

  const handleClose = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedUrgency(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 overflow-y-auto py-8">
      <div className="relative w-full max-w-2xl mx-4 my-auto">
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 sm:absolute sm:-top-12 sm:right-0 text-white/60 hover:text-white transition-colors p-2 z-10"
          aria-label="Close finder"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              Step {step} of 3
            </span>
            <span className="text-[11px] font-semibold text-white/40">
              {Math.round(((step - 1) / 2) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold mb-2">
              Step 1
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What do you need help with?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
              Choose the category that best describes your needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group text-left p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl mb-3 sm:mb-4 transition-colors ${
                        isSelected
                          ? "bg-gold text-dark"
                          : "bg-white/10 text-white group-hover:bg-white/15"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedCategory}
              className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold mb-2">
              Step 2
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How soon do you need help?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
              This helps us prioritize your service.
            </p>
            <div className="space-y-3">
              {URGENCY_OPTIONS.map((opt) => {
                const isSelected = selectedUrgency === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedUrgency(opt.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-sm sm:text-base">
                          {opt.label}
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm">
                          {opt.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedUrgency}
                className="flex-[2] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
              >
                See My Matches
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-[11px] font-semibold uppercase tracking-wider mb-3">
              <CheckCircle className="h-3.5 w-3.5" />
              Your Matches
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {matchedServices.length === 1
                ? "We recommend this service"
                : `We found ${matchedServices.length} services for you`}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
              {selectedUrgency === "asap"
                ? "We'll prioritize your request for quick service."
                : selectedUrgency === "browsing"
                  ? "Take your time exploring. Here's where to start."
                  : "We'll schedule your service at your preferred time."}
            </p>
            <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {matchedServices.map((service) => {
                const Icon = iconMap[service.icon];
                return (
                  <div
                    key={service.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gold/20 text-gold shrink-0">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                          {service.title}
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-4">
                      <Link
                        href={`/mamoyo-maids/booking?service=${service.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gold text-dark font-semibold text-xs sm:text-sm hover:bg-gold-light transition-all"
                      >
                        Book Now
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={getWhatsAppUrl(
                          SITE_CONFIG.whatsapp,
                          `Hello! I'm interested in ${service.title}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/15 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={handleClose}
                className="flex-[2] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold/20 text-gold font-semibold text-sm hover:bg-gold/30 transition-all"
              >
                <Search className="h-4 w-4" />
                Browse All Services
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
