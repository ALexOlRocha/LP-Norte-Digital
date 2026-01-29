import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  Calculator,
  LineChart,
  Cog,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { IoChatbubblesOutline } from "react-icons/io5";

const systems = [
  {
    icon: Calculator,
    title: "Orçamentos",
    description: "Propostas automáticas com IA",
    color: "from-blue-500 to-cyan-400",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
    features: ["IA integrada", "Relatórios automáticos", "Multi-formatos"],
  },
  {
    icon: IoChatbubblesOutline,
    title: "Atendimento 24/7",
    description: "Chatbots inteligentes",
    color: "from-emerald-500 to-green-400",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
    features: [
      "Respostas instantâneas",
      "Análise de sentimentos",
      "Qualificação de leads",
    ],
  },
  {
    icon: LineChart,
    title: "Dashboards",
    description: "Métricas em tempo real",
    color: "from-purple-500 to-pink-400",
    gradient: "from-purple-500/20 via-purple-400/10 to-transparent",
    features: [
      "Visualização avançada",
      "Gestão de assinaturas",
      "Exportação em tempo real",
    ],
  },
  {
    icon: Cog,
    title: "Sob Medida",
    description: "Personalização total",
    color: "from-orange-500 to-amber-400",
    gradient: "from-orange-500/20 via-amber-400/10 to-transparent",
    features: [
      "Desenvolvimento exclusivo",
      "Integração flexível",
      "Suporte dedicado",
    ],
  },
];

const WebSystemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // URL para WhatsApp
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de agendar uma demonstração dos sistemas sob medida. Poderia me ajudar?",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="sistemas"
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/5"
    >
      <svg
        className="absolute -bottom-0 left-0 w-full h-8"
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
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
      {/* Background Elements mais elaborados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-[0.03]" />

        {/* Glow effects */}
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating elements */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-secondary/20 rounded-full animate-float delay-500" />
      </div>

      {/* Styles inline para evitar erro do jsx */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-primary " />
            <span className="text-sm font-semibold text-primary tracking-wide">
              SOLUÇÕES PERSONALIZADAS
            </span>
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Sistemas{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                Inteligentes com IA
              </span>
              <svg
                className="absolute -bottom-6 left-0 w-full h-8"
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
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Criamos uma plataforma modular que se adpta ao seu negócio e
            automatiza atendimento, vendas e processos tudo com intelignência
            artificial.
          </p>
        </motion.div>

        {/* Systems Grid - Cards Premium */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              variants={itemVariants}
              custom={index}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
              className="group relative"
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-br ${system.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-700 group-hover:duration-300`}
              />

              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-background/90 via-background/80 to-background/90 backdrop-blur-sm rounded-2xl border border-border/40 group-hover:border-primary/40 transition-all duration-500 overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${system.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`}
                />

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-xl group-hover:border-primary/60 transition-colors duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20">
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/30 rounded-bl-xl group-hover:border-primary/60 transition-colors duration-300" />
                </div>

                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon with animated ring */}
                  <div className="relative mb-8">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${system.color} rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative w-20 h-20 rounded-sm bg-gradient-to-br ${system.color} p-4 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                    >
                      <system.icon className="w-10 h-10 text-white" />
                      {/* Animated ring */}
                      <div className="absolute -inset-4 border-2 border-primary/30 rounded-3xl group-hover:border-primary/50 group-hover:scale-110 transition-all duration-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                      {system.title}
                    </h3>
                    <p className="text-muted-foreground/90 mb-6 text-lg leading-relaxed font-light">
                      {system.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-3 mb-8">
                      {system.features.map((feature, idx) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-center gap-3 text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action button with hover effect */}
                  <div className="pt-6 border-t border-border/40 group-hover:border-primary/30 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground/70 group-hover:text-primary/80 transition-colors">
                        Saiba mais
                      </span>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-full blur group-hover:blur-md transition-all duration-300" />
                        <button className="relative w-12 h-12 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary-glow/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/40">
                          <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect lines */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl transition-all duration-700" />
              </div>

              {/* Floating number indicator */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-background rounded-full border border-border shadow-lg flex items-center justify-center z-10">
                <span className="text-xs font-bold text-primary">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section Premium com WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          className="text-center"
        >
          <div className="relative inline-block group">
            {/* Glow effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full blur-xl opacity-20 group-hover:opacity-30 transition duration-1000" />
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary-glow/30 to-primary/30 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition duration-1500" />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground font-bold px-8 py-3 text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 group/btn rounded-full overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Agendar pelo WhatsApp
                <ArrowRight className="ml-3 w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-8 text-base text-muted-foreground/80 max-w-md mx-auto leading-relaxed font-light"
          >
            Clique no botão para falar diretamente pelo WhatsApp e agendar sua
            demonstração gratuita
          </motion.p>

          {/* WhatsApp Floating Button (opcional) */}
          <div className="fixed bottom-6 right-6 z-50 md:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebSystemsSection;
