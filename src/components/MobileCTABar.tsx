"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getWhatsAppWebUrl, getPhoneUrl } from "@/lib/utils";

export function MobileCTABar() {
  const whatsappRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = whatsappRef.current;
    if (!button) return;

    const handleClick = (e: MouseEvent) => {
      const nativeUrl = getWhatsAppUrl(
        SITE_CONFIG.whatsapp,
        "Hello! I'd like to learn more about your services."
      );
      const webUrl = getWhatsAppWebUrl(
        SITE_CONFIG.whatsapp,
        "Hello! I'd like to learn more about your services."
      );

      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = nativeUrl;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 1000);

        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1500);

        setTimeout(() => {
          window.location.href = webUrl;
        }, 1500);

        e.preventDefault();
      }
    };

    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  }, []);

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
        ref={whatsappRef}
        href={getWhatsAppWebUrl(
          SITE_CONFIG.whatsapp,
          "Hello! I'd like to learn more about your services."
        )}
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
