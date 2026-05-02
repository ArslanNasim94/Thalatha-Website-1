import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";

const FeaturesSection = dynamic(() => import("@/components/landing/FeaturesSection"));
const HowItWorksSection = dynamic(
  () => import("@/components/landing/HowItWorksSection"),
  { ssr: false }
);
const ServicesSection = dynamic(() => import("@/components/landing/ServicesSection"));
const TestimonialsSection = dynamic(
  () => import("@/components/landing/TestimonialsSection")
);
const ScreenshotsSection = dynamic(
  () => import("@/components/landing/ScreenshotsSection")
);
const CTASection = dynamic(() => import("@/components/landing/CTASection"));
const Footer = dynamic(() => import("@/components/landing/Footer"));

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <ScreenshotsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
