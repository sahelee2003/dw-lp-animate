import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientMarqueeSection from "../components/ClientMarqueeSection";
import CommercialRealitySection from "../components/CommercialRealitySection";
import PointOfViewSection from "../components/PointOfViewSection";
import CaseStudiesSection from "../components/CaseStudiesSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import HowWeWorkSection from "../components/HowWeWorkSection";
import CreativeIntelligenceSection from "../components/CreativeIntelligenceSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000]">
      <Navbar />
      <main>
        <Hero />
        <ClientMarqueeSection />
        <CommercialRealitySection />
        <PointOfViewSection />
        <CaseStudiesSection />
        <CapabilitiesSection />
        <HowWeWorkSection />
        <CreativeIntelligenceSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
