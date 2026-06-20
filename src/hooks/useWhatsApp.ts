"use client";

import { useCallback } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getWhatsAppWebUrl } from "@/lib/utils";

export function useWhatsApp(message?: string) {
  const defaultMessage = message || "Hello! I'd like to learn more about your services.";

  const handleWhatsAppClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const nativeUrl = getWhatsAppUrl(SITE_CONFIG.whatsapp, defaultMessage);
        const webUrl = getWhatsAppWebUrl(SITE_CONFIG.whatsapp, defaultMessage);

        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = nativeUrl;
        document.body.appendChild(iframe);

        const cleanup = () => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        };

        setTimeout(cleanup, 1000);
        setTimeout(cleanup, 1500);
        setTimeout(() => {
          window.location.href = webUrl;
        }, 1500);

        e.preventDefault();
      }
    },
    [defaultMessage]
  );

  const whatsappHref = getWhatsAppWebUrl(SITE_CONFIG.whatsapp, defaultMessage);

  return { handleWhatsAppClick, whatsappHref };
}