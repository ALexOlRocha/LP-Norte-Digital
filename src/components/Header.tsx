import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
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
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer - Slowest parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(13,79,79,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,79,79,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Large background orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Midground Layer - Medium parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: midgroundY }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-32 left-[15%] w-20 h-20 border border-primary/20 rounded-2xl"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          className="absolute top-48 right-[20%] w-16 h-16 border border-primary/15 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[8%] w-12 h-12 bg-primary/10 rounded-lg rotate-45"
          animate={{
            rotate: [45, 135, 225, 315, 405],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[10%] w-24 h-24 border-2 border-primary/10 rounded-full"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main Content - Foreground */}
      <motion.div
        className="container mx-auto px-6 relative z-10 pt-20"
        style={{ y: foregroundY, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center lg:text-left"
            style={{ y: textY }}
          >
            {/* Badge with 3D hover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateX: 10 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 cursor-default"
              style={{
                background:
                  "linear-gradient(135deg, hsl(200 15% 15% / 0.9) 0%, hsl(200 10% 10% / 0.8) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(200 10% 25% / 0.3)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.05)",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-muted-foreground font-medium">
                Automação Inteligente
              </span>
            </motion.div>

            {/* Headline with staggered animation */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                Automatize.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block gradient-text"
              >
                Converta.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="block"
              >
                Escale.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Soluções digitais que trabalham por você{" "}
              <span className="text-primary font-semibold">
                24 horas por dia
              </span>
              . Automatize seu atendimento e venda enquanto dorme.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start"
            >
              {[
                { icon: Clock, text: "24/7 Ativo" },
                { icon: Zap, text: "Resposta Instantânea" },
                { icon: Shield, text: "100% Seguro" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/30"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs with 3D hover effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold px-8 py-7 text-lg transition-all duration-300 group relative overflow-hidden"
                  style={{
                    boxShadow:
                      "0 10px 40px rgba(13, 79, 79, 0.4), 0 0 0 1px rgba(13, 79, 79, 0.1)",
                  }}
                >
                  <a href="/pagebot">
                    <span className="relative z-10 flex items-center">
                      Quero uma pagebot
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-border/50 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 text-foreground font-semibold px-8 py-7 text-lg transition-all duration-300"
                >
                  <a href="#sistemas">Ver soluções</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - PageBot Demo with 3D perspective */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="relative lg:ml-8"
            style={{ perspective: "1200px" }}
          >
            {/* Decorative elements behind the demo */}
            <div className="absolute -inset-10 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-60 blur-2xl" />

            <PageBotDemo />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Wave with parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120V80C180 40 360 20 540 30C720 40 900 80 1080 90C1260 100 1380 80 1440 70V120H0Z"
            fill="hsl(200 15% 6%)"
          />
          <path
            d="M0 120V90C240 50 480 30 720 50C960 70 1200 100 1440 80V120H0Z"
            fill="hsl(200 15% 6%)"
            fillOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
