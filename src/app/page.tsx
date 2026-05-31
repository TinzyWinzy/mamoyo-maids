import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedServices } from "@/components/FeaturedServices";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <WhyChooseUs />
      <FeaturedServices />
      <Testimonials />
      <CTASection />
    </>
  );
}
