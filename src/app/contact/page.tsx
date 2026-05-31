import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mamoyo Maids. Call, WhatsApp, or send us an inquiry. We're here to help make your home shine.",
};

export default function Contact() {
  return <ContactPage />;
}
