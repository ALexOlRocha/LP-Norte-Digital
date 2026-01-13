import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Package, LineChart, Cog, ArrowRight } from "lucide-react";

const systems = [
  {
    icon: Calculator,
    title: "Orçamentos",
    description: "Propostas automáticas",
  },
  {
    icon: Package,
    title: "Estoque",
    description: "Controle total",
  },
  {
    icon: LineChart,
    title: "Dashboards",
    description: "Métricas em tempo real",
  },
  {
    icon: Cog,
    title: "Sob Medida",
    description: "Do seu jeito",
  },
];

const WebSystemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sistemas" className="py-32 relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sistemas{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              sob medida
            </span>
          </h2>
          <p className="text-muted-foreground">
            Seu negócio é único. Seu sistema também.
          </p>
        </motion.div>

        {/* Systems - Horizontal Scroll */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-background border border-border/30 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <system.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground text-sm">{system.title}</h3>
                <p className="text-xs text-muted-foreground">{system.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary transition-all duration-300 group rounded-xl"
          >
            Agendar reunião
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WebSystemsSection;