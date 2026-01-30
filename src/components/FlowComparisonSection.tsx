import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  User,
  Brain,
  MousePointer,
  CreditCard,
  Zap,
} from "lucide-react";

const FlowComparisonSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const normalFlowSteps = [
    { icon: User, text: "Usuário entra", color: "text-gray-400" },
    { icon: Brain, text: "lê conteúdo", color: "text-gray-400" },
    { icon: Brain, text: "pensa sozinho", color: "text-gray-400" },
    { icon: MousePointer, text: "talvez clique", color: "text-gray-400" },
  ];

  const pagebotFlowSteps = [
    { icon: User, text: "Usuário entra", color: "text-primary" },
    { icon: MessageSquare, text: "conversa", color: "text-green-500" },
    { icon: Brain, text: "entende", color: "text-blue-500" },
    { icon: Brain, text: "decide", color: "text-purple-500" },
    { icon: CreditCard, text: "paga", color: "text-emerald-500" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24  relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-200 -right-80 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-0 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Não é leitura
                <br />
                <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
                  É diálogo
                </span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformamos visitantes passivos em clientes ativos através da
              conversa
            </p>
          </div>

          {/* Comparison Container */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Normal Landing Page Flow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  Landing pages normais fazem isso:
                </h3>
                <p className="text-gray-500">
                  O processo tradicional e passivo
                </p>
              </div>

              <div className="space-y-6">
                {normalFlowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 font-bold">
                        {index + 1}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex items-center gap-4 bg-gray-900/50 rounded-2xl p-4 flex-1">
                      <div
                        className={`p-3 rounded-full bg-gray-800/50 ${step.color}`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-300">
                          {step.text}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          {index === 2
                            ? "Sem interação, apenas consumo"
                            : "Processo unilateral"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Result */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 pt-6 border-t border-gray-800/50"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
                      <span className="text-gray-400">Resultado:</span>
                      <span className="text-red-400 font-semibold">
                        Conversão Baixa
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      Taxa de conversão tradicional: 1-3%
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* PageBot Flow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/30 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

              <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-white">
                    PageBot faz isso:
                  </h3>
                </div>
                <p className="text-primary-foreground/80">
                  O processo interativo e guiado
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                {pagebotFlowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary/50 bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {index + 1}
                      </span>
                    </div>
                    {/* Step Content */}
                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 flex-1 border border-primary/20 shadow-lg shadow-primary/5">
                      <div
                        className={`p-3 rounded-full bg-white/10 ${step.color}`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-white">
                          {step.text}
                        </h4>
                        <p className="text-primary-foreground/70 text-sm mt-1">
                          {index === 1
                            ? "Conversa em tempo real com IA"
                            : index === 4
                              ? "Pagamento facilitado e seguro"
                              : "Processo guiado e natural"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Result */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-8 pt-6 border-t border-primary/30"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/30">
                      <span className="text-primary-foreground">
                        Resultado:
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        Conversão Alta
                      </span>
                    </div>
                    <p className="text-primary-foreground/70 text-sm mt-2">
                      Taxa de conversão PageBot: 15-30%+
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 text-center max-w-8xl mx-auto"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="text-left">
                <h4 className="text-xl font-bold text-white mb-2">
                  Transforme visitantes em clientes
                </h4>
                <p className="text-primary-foreground/80">
                  Enquanto outras landing pages apenas informam, nossa IA vende
                  para você
                </p>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                Começar Agora
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlowComparisonSection;
