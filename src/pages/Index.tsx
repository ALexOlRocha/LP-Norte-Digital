import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollPhrases from "@/components/ScrollPhrases";
import CoreProductSection from "@/components/CoreProductSection";
import ServicesSection from "@/components/ServicesSection";
import DigitalPresenceSection from "@/components/DigitalPresenceSection";
import PortfolioSection from "@/components/PortfolioSection";
import WebSystemsSection from "@/components/WebSystemsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GaleriaSites from "@/components/GaleriaSites";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ScrollPhrases />
      <CoreProductSection />
      <ServicesSection />
      <DigitalPresenceSection />
      <GaleriaSites />
      <PortfolioSection />
      <WebSystemsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
