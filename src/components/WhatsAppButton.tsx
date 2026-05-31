"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(
        SITE_CONFIG.whatsapp,
        "Hello! I'd like to book a cleaning service."
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[4.5rem] sm:bottom-6 right-4 sm:right-5 z-50 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-pink text-white shadow-[0_6px_25px_rgba(232,139,167,0.4)] hover:bg-pink-light hover:scale-110 hover:shadow-[0_10px_35px_rgba(232,139,167,0.5)] transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
    </a>
  );
}
