import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services | Mamoyo Maids",
  description:
    "Professional home cleaning, deep cleaning, laundry, organizing, maid training, and move-in/move-out services. Book your service today with Mamoyo Maids.",
};

const services = [
  "Home Cleaning",
  "Deep Cleaning",
  "Laundry & Ironing",
  "Home Organizing",
  "Maid Training",
  "Move-in/Move-out Cleaning",
  "Baby Sitting",
  "House Management",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mamoyo Maids Services",
  description: "Professional domestic services offered by Mamoyo Maids under WOBIC Employment Services",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service,
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "Zimbabwe",
      serviceType: service,
    },
  })),
};

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage />
    </>
  );
}
