"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px", threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const delayMs = delay * 1000;
  
  let style: React.CSSProperties = {};
  
  if (prefersReducedMotion) {
    style = { opacity: 1, transform: "none" };
  } else {
    style = isVisible
      ? {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          transition: `opacity 0.6s ease-out ${delayMs}ms, transform 0.6s ease-out ${delayMs}ms`,
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
        }
      : {
          opacity: 0,
          transform: "translate3d(0, 30px, 0)",
          transition: "none",
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
        };
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
