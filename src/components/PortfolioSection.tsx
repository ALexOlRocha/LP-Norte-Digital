import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Sistemas personalizados",
    category: "Sistema Web",
    image: "/sistemas.jpg",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    category: "Sistema Web",
    image: "/dashboard.jpg",
  },
  {
    id: 3,
    title: "Apps",
    category: "Aplicativo software",
    image: "/app.jpg",
  },
  {
    id: 4,
    title: "Portal Imobiliário",
    category: "Site Institucional",
    image: "/imobiliario.jpg",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="portfolio"
      className="py-5 relative overflow-hidden -top-[1.5px]"
    >
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
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Projetos que{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              convertem
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Resultados reais para empresas reais.
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
            className="text-primary text-sm font-medium mb-2 block"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
          >
            {project.category}
          </motion.span>
          <motion.h3
            className="font-display text-2xl md:text-3xl font-bold text-foreground"
            animate={{ y: isHovered ? 0 : 5 }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            rotate: isHovered ? 0 : -45,
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
