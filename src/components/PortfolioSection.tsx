import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Clínicas e Consultórios",
    category: "Automação de Agendamentos",
    description:
      "Sistema inteligente para marcação de consultas e lembretes automáticos",
    image: "/clinicas.jpg",
    features: [
      "Agendamento online",
      "Lembretes por WhatsApp",
      "Painel administrativo",
    ],
  },
  {
    id: 2,
    title: "Advocacias e Escritórios",
    category: "Gestão de Clientes",
    description: "Organize prazos, documentos e comunicação com clientes",
    image: "/Advocacias-Escritórios.jpg",
    features: [
      "Chatbot jurídico",
      "Agendamento de reuniões",
      "Envio automático de documentos",
    ],
  },
  {
    id: 3,
    title: "Lojas e E-commerce",
    category: "Vendas Automatizadas",
    description: "Venda 24h com catálogo virtual e atendimento inteligente",
    image: "/lojas-ecommerce.jpg",
    features: ["Catálogo virtual", "Checkout no chat", "Envio de pedidos"],
  },
  {
    id: 4,
    title: "Prestadores de Serviços",
    category: "Qualificação de Leads",
    description:
      "Automatize o atendimento e qualifique clientes interessados nos seus serviços",
    image: "/prestadores-serviços.jpg",
    features: [
      "Orçamento automático",
      "Agendamento de horários",
      "Envio de contratos",
    ],
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="" className="py-5 relative overflow-hidden -top-[1.5px]">
      {/* Wave */}
      <svg
        className="absolute top-0 left-0 w-full rotate-180 border-none"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* SOLUÇÕES ESPECÍFICAS badge */}
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            SOLUÇÕES ESPECÍFICAS
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 space-x-2">
            <span> Para quem é o</span>
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              PageBot?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Oferecemos soluções personalizadas de automação com IA para
            diferentes setores. Veja como podemos transformar seu negócio:
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-200 mb-6 text-lg">
            Não encontrou seu segmento?{" "}
            <span className="font-semibold">90% dos negócios</span> podem ser
            automatizados com nossa plataforma.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
            Falar com Especialista
          </button>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define o clip-path baseado no índice
  const getClipPathStyle = () => {
    if (index < 2) {
      // Primeiros dois projetos (índices 0 e 1) - estilo original
      return {
        clipPath:
          index % 2 === 0
            ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
        borderRadius: "1.5rem",
      };
    } else {
      // Últimos dois projetos (índices 2 e 3) - estilo invertido na parte de cima
      return {
        clipPath:
          index === 2
            ? "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)" // Esquerdo superior
            : "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)", // Direito superior
        borderRadius: "1.5rem",
      };
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Card com clip-path variável */}
      <div
        className="relative overflow-hidden bg-secondary/30"
        style={getClipPathStyle()}
      >
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.span
            className="text-gray-300 text-sm font-semibold mb-2 block"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
          >
            {project.category}
          </motion.span>
          <motion.h3
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2"
            animate={{ y: isHovered ? 0 : 5 }}
          >
            {project.title}
          </motion.h3>

          {/* Description (aparece no hover) */}
          <motion.p
            className="text-foreground/80 text-sm mb-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Features (aparece no hover) */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            rotate: isHovered ? 0 : -45,
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
