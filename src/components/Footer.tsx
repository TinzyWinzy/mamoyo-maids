import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";
import { TikTokIcon } from "@/lib/icons";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Logo variant="light" />
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-xs">
              {SITE_CONFIG.tagline}. From cleaning and maid placement to
              counselling and cultural support — we help families live better.
            </p>
            <div className="flex gap-3">
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-pink/20 text-pink hover:bg-pink/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4.5 w-4.5" />
              </a>
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label={platform}
                >
                  {platform === "tiktok" ? (
                    <TikTokIcon className="h-4 w-4" />
                  ) : (
                    platform.charAt(0).toUpperCase()
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/services", label: "Our Services" },
                { href: "/employment", label: "Hire a Maid" },
                { href: "/aunt-for-hire", label: "Aunt for Hire" },
                { href: "/marriage-counselling", label: "Marriage Counselling" },
                { href: "/founder", label: "Our Founder" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Home Cleaning",
                "Deep Cleaning",
                "Laundry & Ironing",
                "Maid Training",
                "Organizing & Decluttering",
                "Move-in / Move-out",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-white/55 hover:text-white text-sm transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={getPhoneUrl(SITE_CONFIG.phone)}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors duration-300"
                >
                  <Phone className="h-4 w-4 text-pink" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors duration-300"
                >
                  <Mail className="h-4 w-4 text-pink" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/55 text-sm">
                  <MapPin className="h-4 w-4 text-pink" />
                  {SITE_CONFIG.address}
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[11px] text-pink font-semibold uppercase tracking-wider mb-2">
                Operating Hours
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-white/60">
                  Mon–Fri: {SITE_CONFIG.operatingHours.weekdays}
                </p>
                <p className="text-white/60">
                  Sat: {SITE_CONFIG.operatingHours.saturday}
                </p>
                <p className="text-white/60">
                  Sun: {SITE_CONFIG.operatingHours.sunday}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
            <p className="text-xs text-white/50">
              {SITE_CONFIG.tagline}
            </p>
        </div>
      </div>
    </footer>
  );
}
