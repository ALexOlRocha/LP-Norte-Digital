import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import HeroCore from "@/components/HeaderCore";

import NavbarBot from "@/components/NavbarBot";

const PageBot = () => {
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
      <NavbarBot />

      <section id="hero">
        <HeroCore />
      </section>

      <Footer />
    </main>
  );
};

export default PageBot;
