"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getWhatsAppWebUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
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
    <a
      ref={buttonRef}
      href={getWhatsAppWebUrl(
        SITE_CONFIG.whatsapp,
        "Hello! I'd like to learn more about your services."
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[4.5rem] sm:bottom-6 right-4 sm:right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-dark shadow-[0_6px_25px_rgba(0,255,255,0.4)] hover:bg-accent-light hover:scale-110 hover:shadow-[0_10px_35px_rgba(0,255,255,0.5)] active:scale-95 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
    </a>
  );
}
