import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Fluxo from "./Fluxo";

const services = [
  {
    title: "Agendamento Automático",
    description:
      "O cliente escolhe data e horário direto no chat. Sem conflitos, sem troca de mensagens.",
    image: "/agendamento.jpg",
  },
  {
    title: "Sistema de Orçamento Inteligentes",
    description:
      "A IA faz perguntas, entende a necessidade do cliente e gera orçamentos automaticamente.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop",
  },
  {
    title: "Vitrine & Produtos no Chat",
    description:
      "O chat muda para modo vitrine e apresenta produtos, serviços, imagens e catálogos.",
    image: "/e-comerce.jpg",
  },
  {
    title: "Checkout Conversacional",
    description:
      "Carrinho, pagamento e fechamento da venda sem sair da conversa.",
    image: "/checkout.jpg",
  },
  {
    title: "Documentos Inteligentes",
    description:
      "Envio, leitura e resumo automático de PDFs, contratos e arquivos enviados pelo cliente.",
    image: "/documentos.jpg",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="servicos" className="py-32 relative overflow-hidden">
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
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 space-x-2 max-w-4xl">
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              Automações
            </span>
            <span>que substituem trabalho humano</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Tudo acontece dentro de uma única conversa. Sem sistemas soltos. Sem
            perda de tempo.
          </p>
        </motion.div>

        {/* Interactive Slider */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-[2rem] overflow-hidden"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </motion.div>
            ))}

            {/* Floating label */}
            <motion.div
              className="absolute bottom-8 left-8 right-8"
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-primary text-3xl font-bold mb-2 block">
                0{activeIndex + 1}
              </span>
              <h3 className="font-display text-4xl font-bold text-foreground">
                {services[activeIndex].title}
              </h3>
              <p className="text-gray-300 mt-2">
                {services[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-500 border ${
                  activeIndex === index
                    ? "bg-primary/10 border-primary/30"
                    : "bg-transparent border-border/20 hover:border-border/40"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary/60 text-2xl font-bold mb-2 block">
                      0{index + 1}
                    </span>
                    <h4
                      className={`font-display text-xl font-semibold mt-1 transition-colors ${
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {service.title}
                    </h4>
                  </div>
                  <motion.div
                    animate={{
                      x: activeIndex === index ? 0 : -10,
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <div className="py-12">
          <Fluxo />
        </div>
        <div className="flex justify-center mx-auto">
          <a
            href="https://wa.me/5511999825835?text=Olá!%20Vim%20pelo%20site%20da%20Norte%20Digital%20e%20gostaria%20de%20automatizar%20meu%20negócio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="
      w-65 max-md:w-full mt-8
      rounded-full mx-auto
      bg-gradient-to-r from-primary to-primary-glow
      text-primary-foreground
      font-semibold text-lg
      py-6
      shadow-lg shadow-primary/30
      transition-all duration-300 ease-out
      hover:shadow-xl hover:shadow-primary/40
      hover:scale-[1.02]
      active:scale-[0.98]
      group
    "
            >
              Automatizar agora
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
