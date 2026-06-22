import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/utils";

const staffTypes = [
  { title: "House Maids", description: "Reliable domestic workers for your home." },
  { title: "Babysitters", description: "Caring childcare professionals." },
  { title: "Security", description: "Trained security personnel." },
  { title: "Drivers", description: "Experienced and licensed drivers." },
  { title: "Gardeners", description: "Skilled garden and grounds keepers." },
  { title: "Caretakers", description: "Trusted property caretakers." },
  { title: "Nurse Aids", description: "Compassionate care assistants." },
  { title: "Shop Workers", description: "Reliable retail and shop staff." },
  { title: "Office Workers", description: "Professional office personnel." },
  { title: "Construction", description: "Skilled construction workers." },
];

const reasons = [
  { title: "Police Clearance Guaranteed", description: "Every person we place has a valid police clearance. Your safety comes first." },
  { title: "Trained & Reliable Staff", description: "We train our candidates so they arrive ready to deliver professional service." },
  { title: "Wide Range of Services", description: "From house maids to security guards — we cover all your staffing needs." },
  { title: "Affordable Rates", description: "Competitive pricing with no hidden fees." },
  { title: "Trusted Since Day One", description: "Hundreds of families and businesses trust us." },
];

function GoldBar() {
  return <div className="w-10 sm:w-12 h-0.5 bg-gold mx-auto mb-4 sm:mb-5" />;
}

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />;
}

export default function HomePage() {
  return (
    <>
      <section className="bg-dark py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold/80 mb-3 sm:mb-4">
              {SITE_CONFIG.name}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 sm:mb-7">
              Your Trusted Employment Partner
            </h1>
            <GoldBar />
            <p className="text-sm sm:text-lg text-white/70 max-w-xl mb-8 sm:mb-10 leading-relaxed">
              We train and provide reliable people with police clearances. House maids,
              babysitters, security, drivers, gardeners, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-4 min-h-[52px] rounded-md sm:rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
              >
                Hire Staff Now
              </Link>
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, "Hello! I'd like to learn more about your employment services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-4 min-h-[52px] rounded-md sm:rounded-full border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
              We Provide
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Staff for Every <span className="text-dark">Need</span>
            </h2>
            <GoldBar />
            <p className="text-sm sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Trained, police-cleared staff for homes, businesses, and organizations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {staffTypes.map((item) => (
              <a
                key={item.title}
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Hello! I'm interested in hiring a ${item.title}. Please tell me more.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:rounded-xl lg:border lg:border-border/40 lg:p-5 hover:bg-accent-pale hover:border-gold/40 transition-all duration-200 no-underline"
              >
                <p className="text-sm sm:text-base font-bold text-text-primary mb-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-2.5 align-middle" />
                  {item.title}
                </p>
                <p className="text-sm text-text-secondary pl-4 sm:pl-[22px]">
                  {item.description}
                </p>
              </a>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-md sm:rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
              >
                Hire Staff Now
              </Link>
              <a
                href={getWhatsAppUrl(SITE_CONFIG.whatsapp, "Hello! I'd like to learn more about your staff placement services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-md sm:rounded-full border border-dark text-dark font-semibold text-sm sm:text-base hover:bg-dark hover:text-white transition-colors duration-300"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-light-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              The <span className="text-dark">WOBIC</span> Difference
            </h2>
            <GoldBar />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {reasons.map((item) => (
              <div
                key={item.title}
                className="lg:rounded-xl lg:border lg:border-border/50 lg:p-5 lg:bg-white"
              >
                <p className="text-sm sm:text-base font-bold text-text-primary mb-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-2.5 align-middle" />
                  {item.title}
                </p>
                <p className="text-sm text-text-secondary pl-4 sm:pl-[22px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-dark py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5">
            Ready to Find the Right Staff?
          </h2>
          <GoldBar />
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join hundreds of satisfied families and businesses who trust {SITE_CONFIG.name}{" "}
            for all their recruitment and staffing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mamoyo-maids/booking"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-4 min-h-[52px] rounded-md sm:rounded-full bg-gold text-dark font-semibold text-sm sm:text-base hover:bg-gold-light transition-colors duration-300"
            >
              Book a Service
            </Link>
            <a
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp, "Hello! I'd like to learn more about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-4 min-h-[52px] rounded-md sm:rounded-full border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors duration-300"
            >
              Chat on WhatsApp
            </a>
            <a
              href={getPhoneUrl(SITE_CONFIG.phone)}
              className="inline-flex items-center justify-center px-7 sm:px-8 py-4 min-h-[52px] rounded-md sm:rounded-full border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
