import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | WOBIC Employment Services",
  description:
    "Get in touch with WOBIC Employment Services. Call, WhatsApp, or visit our office at Karigamombe Centre, 11th Floor, Harare.",
};

export default function Contact() {
  return <ContactPage />;
}
