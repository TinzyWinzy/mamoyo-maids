"use client";

import { MessageCircle } from "lucide-react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function WhatsAppButton() {
  const { handleWhatsAppClick, whatsappHref } = useWhatsApp();

  return (
    <a
      href={whatsappHref}
      onClick={handleWhatsAppClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[4.5rem] sm:bottom-6 right-4 sm:right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-dark shadow-lg active:scale-95 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
    </a>
  );
}
