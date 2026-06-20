"use client";

import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getPhoneUrl } from "@/lib/utils";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function MobileCTABar() {
  const { handleWhatsAppClick, whatsappHref } = useWhatsApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/98 border-t border-border px-2 py-2 safe-area-pb flex gap-1.5">
      <a
        href={getPhoneUrl(SITE_CONFIG.phone)}
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-dark text-white text-[13px] font-semibold transition-colors active:scale-[0.97] min-h-[48px]"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href={whatsappHref}
        onClick={handleWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-accent text-dark text-[13px] font-semibold transition-colors active:scale-[0.97] min-h-[48px]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <Link
        href="/mamoyo-maids/services"
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-white text-dark text-[13px] font-semibold border border-border transition-colors active:scale-[0.97] min-h-[48px]"
      >
        <Calendar className="h-4 w-4" />
        Services
      </Link>
    </div>
  );
}
