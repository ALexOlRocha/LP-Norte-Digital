import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import PageBotDemo from "./PageBotDemo";
import { Link } from "react-router-dom";
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
        className="absolute z-10 inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)",
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
            duration: 15,
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
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto flex px-6 max-md:py-10 relative justify-center z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto z-40">
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
              <span className="text-sm text-muted-foreground font-display">
                Sistema inteligente de vendas e atendimento
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Automação que
              <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow font-display">
                {" "}
                vende por você{" "}
              </span>
              enquanto seu negócio cresce
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Automatize atendimento, qualifique leads e gere orçamentos
              automáticos com sistemas inteligentes trabalhando 24h por dia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/pagebot"
                className="
    group relative overflow-hidden
    rounded-full
    bg-primary hover:bg-primary-glow
    px-5 py-2 text-lg font-semibold
    text-primary-foreground
    transition-all duration-300
    flex items-center gap-3
    shadow-lg hover:shadow-primary/40
  "
              >
                {/* Glow interno */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

                {/* Texto */}
                <span className="relative z-10">Quero automatizar agora </span>

                {/* Ícone */}
                <span
                  className="
      relative z-10
      w-8 h-8
      flex items-center justify-center
      rounded-full
      bg-black/80
      text-white
      transition-all duration-300
      group-hover:translate-x-1
      group-hover:bg-black
    "
                >
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/50 rounded-full bg-white/25 hover:bg-secondary text-foreground font-semibold px-8 py-6 text-lg transition-all duration-300"
              >
                <a href="#sistemas">Ver soluções</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - PageBot Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
