import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mamoyo Maids — our mission, our team, and why hundreds of families trust us for professional cleaning services in Harare.",
};

export default function About() {
  return <AboutPage />;
}
