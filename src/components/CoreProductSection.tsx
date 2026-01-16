import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  FileText,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Atendimento 24/7",
    description: "Seu cliente nunca fica sem resposta.",
  },
  {
    icon: Users,
    title: "Qualificação de leads",
    description: "Filtramos os melhores clientes para você.",
  },
  {
    icon: FileText,
    title: "Orçamentos automáticos",
    description: "Geração instantânea de propostas.",
  },
  {
    icon: MessageCircle,
    title: "Integração WhatsApp",
    description: "Conectado onde seu cliente está.",
  },
];

const CoreProductSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pagebot" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            PageBot{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              Norte Digital
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Atendimento inteligente, automático e focado em conversão.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
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
          <a
            href="#contato"
            className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary transition-all duration-300 group"
          >
            Quero automatizar
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreProductSection;
