"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface ScrollObserverContextValue {
  observe: (element: HTMLElement) => void;
  unobserve: (element: HTMLElement) => void;
  prefersReducedMotion: boolean;
}

const ScrollObserverContext = createContext<ScrollObserverContextValue | null>(null);

export function ScrollObserverProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerRef.current?.unobserve(entry.target);
        }
      },
      { rootMargin: "-50px", threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const observe = (element: HTMLElement) => {
    elementsRef.current.add(element);
    observerRef.current?.observe(element);
  };

  const unobserve = (element: HTMLElement) => {
    elementsRef.current.delete(element);
    observerRef.current?.unobserve(element);
  };

  return (
    <ScrollObserverContext.Provider value={{ observe, unobserve, prefersReducedMotion }}>
      {children}
    </ScrollObserverContext.Provider>
  );
}

export function useScrollObserver() {
  const context = useContext(ScrollObserverContext);
  if (!context) {
    throw new Error("useScrollObserver must be used within ScrollObserverProvider");
  }
  return context;
}

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
  const { observe, unobserve, prefersReducedMotion } = useScrollObserver();
  const ref = useRef<HTMLDivElement>(null);
  const delayClass = delay > 0 ? `delay-${delay}` : "";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) {
      element.classList.add("is-visible", "reduce-motion");
      return;
    }

    observe(element);
    return () => unobserve(element);
  }, [observe, unobserve, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`animated-section ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}