import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Package,
  LineChart,
  Cog,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const systems = [
  {
    icon: Calculator,
    title: "Orçamentos",
    description: "Propostas automáticas com IA",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Package,
    title: "Estoque Inteligente",
    description: "Controle total com alertas",
    color: "from-emerald-500 to-green-400",
  },
  {
    icon: LineChart,
    title: "Dashboards",
    description: "Métricas em tempo real",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Cog,
    title: "Sob Medida",
    description: "Personalização total",
    color: "from-orange-500 to-amber-400",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="sistemas"
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Soluções Personalizadas
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Sistemas{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                sob medida
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-primary-glow/30 rounded-full" />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Desenvolvemos soluções únicas que se adaptam perfeitamente às
            necessidades específicas do seu negócio
          </p>
        </motion.div>

        {/* Systems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {systems.map((system) => (
            <motion.div
              key={system.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/20 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-300" />

              <div className="relative p-6 h-full flex flex-col">
                {/* Icon Container */}
                <div
                  className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${system.color} p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <system.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {system.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {system.description}
                </p>

                {/* Hover Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="relative inline-block">
            {/* Button Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <Button
              size="lg"
              className="relative bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground font-semibold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-xl"
            >
              <span className="relative z-10 flex items-center">
                Agendar uma demonstração
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Agende uma demonstração gratuita e descubra como podemos transformar
            seu negócio
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WebSystemsSection;
