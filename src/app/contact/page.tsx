import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | WOBIC Employment Services",
  description:
    "Get in touch with WOBIC Employment Services. Call, WhatsApp, or visit our office at Karigamombe Centre, First Floor Room 109, Harare.",
};

export default function Contact() {
  return <ContactPage />;
}
