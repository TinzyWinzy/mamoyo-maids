"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/98 backdrop-blur-xl border-t border-border px-3 py-2.5 flex gap-2 safe-area-pb">
      <a
        href={getPhoneUrl(SITE_CONFIG.phone)}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-navy text-white text-xs font-semibold transition-colors"
      >
        <Phone className="h-3.5 w-3.5" />
        Call
      </a>
      <a
        href={getWhatsAppUrl(
          SITE_CONFIG.whatsapp,
          "Hello! I'd like to learn more about your services."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-pink text-white text-xs font-semibold transition-colors"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </a>
      <Link
        href="/booking"
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-success text-white text-xs font-semibold transition-colors"
      >
        Book
      </Link>
    </div>
  );
}
