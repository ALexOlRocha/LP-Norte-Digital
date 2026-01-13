import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import PageBotDemo from "./PageBotDemo";
import { useRef } from "react";
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* GRID DE PONTO - CORRIGIDO */}
      <div 
        className="absolute z-20 inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
        }}
      />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary glow */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto flex px-6 relative justify-center z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Automação Inteligente
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Automatize seu negócio,
              <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
                converta mais e
              </span>{" "}
              escale sem esforço
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Soluções digitais que trabalham por você 24h por dia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary rounded-full hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary transition-all duration-300 group"
              >
                Quero um PageBot
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 rounded-full bg-white/25 hover:bg-secondary text-foreground font-semibold px-8 py-6 text-lg transition-all duration-300"
              >
                Ver soluções
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - PageBot Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <PageBotDemo />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
            fill="hsl(200 15% 6%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
