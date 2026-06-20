"use client";

import { useEffect } from "react";

export function LowEndDetector() {
  useEffect(() => {
    const isLowEnd = () => {
      if (typeof navigator === "undefined") return false;
      
      const hwConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isLowEndUA = /Android.*(?:Go Edition|Android [5-7]\.)/i.test(navigator.userAgent);
      
      return (
        hwConcurrency <= 4 ||
        deviceMemory <= 2 ||
        (isMobile && hwConcurrency <= 6) ||
        isLowEndUA
      );
    };

    if (isLowEnd()) {
      document.documentElement.classList.add("low-end-device");
    }
  }, []);

  return null;
}