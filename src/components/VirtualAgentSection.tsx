import { motion, useInView, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { MessageCircle, Sparkles, Zap } from "lucide-react";

const agentMessages = [
  {
    text: "Olá 👋 Eu sou o agente digital da Norte Digital.",
    emotion: "friendly",
  },
  {
    text: "Estou aqui para te guiar, vender, atender e explicar — em tempo real.",
    emotion: "helpful",
  },
  {
    text: "Posso agir como vendedor, suporte ou guia do sistema.",
    emotion: "professional",
  },
  {
    text: "Continue navegando… eu acompanho você.",
    emotion: "calm",
  },
];

const VirtualAgentSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAgentActive, setIsAgentActive] = useState(false);

  // Inicia o agente quando entra na viewport
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsAgentActive(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Ciclo de mensagens
  useEffect(() => {
    if (!isAgentActive) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) =>
        prev === agentMessages.length - 1 ? 0 : prev + 1,
      );
    }, 3800);

    return () => clearInterval(interval);
  }, [isAgentActive]);

  const currentMessage = agentMessages[messageIndex];

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      {/* Grid de partículas sutis */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Texto institucional */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Agente Inteligente
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Conheça{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                NØRA
              </span>
              <svg
                className="absolute -bottom-4 left-0 w-full h-8"
                viewBox="0 0 400 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,20 
                     C40,5 80,35 120,20
                     C160,5 200,35 240,20
                     C280,5 320,35 360,20"
                  stroke="url(#wave-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <defs>
                  <linearGradient
                    id="wave-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="50%"
                      stopColor="hsl(var(--primary-glow))"
                      stopOpacity="1"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.8"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            seu agente estratégico,
            <span className="block mt-2">trabalhando 24h</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Um sistema vivo que entende o usuário e age no momento certo —
            combinando inteligência artificial com design intuitivo para uma
            experiência fluida e personalizada.
          </p>
        </div>

        {/* AGENTE */}
        <div className="relative flex justify-center items-center min-h-[500px] lg:min-h-[600px]">
          {/* Auras concêntricas */}
          <motion.div
            animate={
              isAgentActive
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }
                : {}
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/60 via-primary-glow/60 to-primary/60 blur-3xl"
          />

          <motion.div
            animate={
              isAgentActive
                ? {
                    scale: [1, 1.15, 1],
                    opacity: [0.05, 0.15, 0.05],
                  }
                : {}
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-2xl"
          />

          {/* Esfera principal com gradiente dinâmico */}
          <motion.div
            animate={
              isAgentActive
                ? {
                    y: [0, -12, 0],
                    rotate: [0, 5, 0],
                  }
                : {}
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-80 md:h-80"
          >
            {/* Brilho interno */}
            <motion.div
              animate={
                isAgentActive
                  ? {
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }
                  : {}
              }
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-xl"
            />

            {/* Esfera de vidro */}
            <div
              className="
              relative w-full h-full
              rounded-full
              bg-gradient-to-br from-primary to-white/20
              backdrop-blur-2xl
              border border-white/40
              shadow-2xl
              overflow-hidden
            "
            >
              {/* Reflexo */}
              <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/70 to-transparent blur-sm rounded-full" />

              {/* Partículas flutuantes */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    isAgentActive
                      ? {
                          y: [0, -20, 0],
                          x: [0, 10, 0],
                          opacity: [0.4, 0.8, 0.4],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full blur-sm"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                />
              ))}

              {/* Iniciais no centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isAgentActive ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl md:text-7xl font-black bg-gradient-to-b from-white to-primary-glow bg-clip-text text-transparent">
                    <div>
                      <p className="text-sm font-medium text-white/90 mb-1">
                        Agente Digital
                      </p>
                      <p className="text-2xl font-bold text-white/95">NØRA</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* BALÕES DE FALA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="absolute -top-20 right-0 lg:-top-4 lg:-right-4"
            >
              {/* Cauda do balão */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white/90 backdrop-blur-md rotate-45" />

              {/* Balão principal */}
              <div
                className="
                relative 
                bg-white/90 backdrop-blur-xl
                border border-white/40
                rounded-2xl rounded-br-sm
                px-6 py-4
                shadow-2xl
                max-w-[280px]
                text-left
              "
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                    <span className="text-xs font-bold text-white">N</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    {currentMessage.text}
                  </p>
                </div>

                {/* Indicador de digitação */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex gap-1 mt-3 ml-9"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-1 h-1 rounded-full bg-primary/60"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Sombra do balão */}
              <div className="absolute inset-0 -z-10 bg-black/80 blur-xl rounded-2xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Background decorativo */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl -z-10" />

      {/* Linhas conectivas sutis */}
      <svg className="absolute inset-0 w-full h-full -z-10">
        <motion.path
          d="M100,300 Q400,200 700,400"
          stroke="url(#gradient-line)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0" />
            <stop
              offset="50%"
              stopColor="rgb(var(--primary))"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--primary))"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default VirtualAgentSection;
