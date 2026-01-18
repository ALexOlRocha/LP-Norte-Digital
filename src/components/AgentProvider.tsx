"use client";

import { useEffect, useState } from "react";
import DigitalAgent from "./DigitalAgent";

const AgentProvider = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    const sections = ["hero", "services", "portfolio", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);

            // Mostra o agente apenas nas seções específicas
            if (["hero", "services", "portfolio"].includes(sectionId)) {
              setShowAgent(true);
            } else {
              setShowAgent(false);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px", // Ajuste fino para melhor timing
      }
    );

    // Observa todas as seções
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Adicione IDs às suas seções principais:
  // <section id="hero">...</section>
  // <section id="services">...</section>
  // <section id="portfolio">...</section>
  // <section id="contact">...</section>

  return showAgent ? <DigitalAgent /> : null;
};

export default AgentProvider;
