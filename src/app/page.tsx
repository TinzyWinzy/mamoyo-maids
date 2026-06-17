import { WOBICHeroSection } from "@/components/WOBICHeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { WOBICWhyChooseUs } from "@/components/WOBICWhyChooseUs";
import { WOBICServicesSection } from "@/components/WOBICServicesSection";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <WOBICHeroSection />
      <TrustBadges />
      <WOBICWhyChooseUs />
      <WOBICServicesSection />
      <CTASection />
    </>
  );
}
