"use client";

import { useEffect } from "react";

export function LowEndDetector() {
  useEffect(() => {
    const isLowEnd = () => {
      if (typeof navigator === "undefined") return false;

      const hwConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isLowEndUA = /Android.*(?:Go Edition|Android [5-7]\.)/i.test(navigator.userAgent);
      const dpr = window.devicePixelRatio || 1;
      const screenPixels = window.screen.width * window.screen.height * dpr;

      return (
        hwConcurrency <= 4 ||
        isLowEndUA ||
        (isMobile && deviceMemory !== undefined && deviceMemory <= 4) ||
        (isMobile && screenPixels > 4000000 && hwConcurrency < 12)
      );
    };

    if (isLowEnd()) {
      document.documentElement.classList.add("low-end-device");
    }
  }, []);

  return null;
}