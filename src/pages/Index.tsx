import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollPhrases from "@/components/ScrollPhrases";
import ServicesSection from "@/components/ServicesSection";
import DigitalPresenceSection from "@/components/DigitalPresenceSection";
import PortfolioSection from "@/components/PortfolioSection";
import WebSystemsSection from "@/components/WebSystemsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GaleriaSites from "@/components/GaleriaSites";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import VirtualAgentSection from "@/components/VirtualAgentSection";
import SectionPageBot from "@/components/SectionPageBot";
import SectionResolution from "@/components/sectionResolution";
import FlowComparisonSection from "@/components/FlowComparisonSection";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>

      <ScrollPhrases />

      <section id="whatsapp-bot">
        <SectionPageBot />
      </section>
      {/* <section id="whatsapp-bot">
        <PageBotSection />
      </section> */}
      <section>
        <SectionResolution />
      </section>

      <VirtualAgentSection />
      <FlowComparisonSection />

      <section id="services">
        <ServicesSection />
      </section>

      {/* <section id="digital-presence">
        <DigitalPresenceSection />
      </section> */}

      <section id="gallery">
        <GaleriaSites />
      </section>

      <section id="portfolio">
        <PortfolioSection />
      </section>

      <section id="web-systems">
        <WebSystemsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
};

export default Index;
