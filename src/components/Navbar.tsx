"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Mamoyo Maids",
    href: "/mamoyo-maids",
    subLinks: [
      { href: "/mamoyo-maids/services", label: "Services" },
      { href: "/mamoyo-maids/employment", label: "Hire a Maid" },
      { href: "/mamoyo-maids/aunt-for-hire", label: "Aunt for Hire" },
      { href: "/mamoyo-maids/marriage-counselling", label: "Marriage Counselling" },
      { href: "/mamoyo-maids/booking", label: "Book a Service" },
      { href: "/mamoyo-maids/founder", label: "Founder" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMamoyoActive = pathname.startsWith("/mamoyo-maids");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-[0_1px_20px_rgba(26,39,68,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 lg:h-20 items-center justify-between">
          <Logo variant={scrolled ? "dark" : "light"} />

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.subLinks) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
                        isMamoyoActive
                          ? "text-[#4e2d7b] bg-gold"
                          : scrolled
                          ? "text-text-secondary hover:text-navy"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </Link>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-border/50 shadow-xl overflow-hidden"
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-5 py-3 text-sm font-medium transition-colors ${
                                pathname === sub.href
                                  ? "text-[#4e2d7b] bg-gold"
                                  : "text-text-secondary hover:text-dark hover:bg-accent-pale/30"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
                    pathname === link.href
                      ? "text-[#4e2d7b] bg-gold"
                      : scrolled
                      ? "text-text-secondary hover:text-navy"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getPhoneUrl(SITE_CONFIG.phone)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                scrolled
                  ? "text-text-secondary hover:text-navy"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG.whatsapp,
                "Hello! I'd like to learn more about your services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-[#4e2d7b] text-[13px] font-semibold hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
              scrolled || isOpen
                ? "text-dark hover:bg-accent-pale"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => {
                if (link.subLinks) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-sm font-medium transition-colors min-h-[52px] ${
                          isMamoyoActive
                            ? "bg-gold text-[#4e2d7b]"
                            : "text-text-secondary hover:text-dark hover:bg-accent-pale/30"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-1 space-y-1">
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-5 py-3 rounded-xl text-sm font-medium text-[#4e2d7b] bg-gold/50 min-h-[44px] flex items-center"
                              >
                                Overview
                              </Link>
                              {link.subLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block px-5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                                    pathname === sub.href
                                      ? "bg-gold text-[#4e2d7b]"
                                      : "text-text-secondary hover:text-dark hover:bg-accent-pale/30"
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-xl text-sm font-medium transition-colors min-h-[52px] flex items-center ${
                      pathname === link.href
                        ? "bg-accent-pale text-accent"
                        : "text-text-secondary hover:text-dark hover:bg-accent-pale/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 px-4 flex flex-col gap-3">
                <a
                  href={getPhoneUrl(SITE_CONFIG.phone)}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-border text-sm font-medium text-dark hover:bg-accent-pale transition-colors min-h-[52px]"
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>
                <a
                  href={getWhatsAppUrl(
                    SITE_CONFIG.whatsapp,
                    "Hello! I'd like to learn more about your services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-accent text-dark text-sm font-semibold hover:bg-accent-light transition-colors min-h-[52px]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
