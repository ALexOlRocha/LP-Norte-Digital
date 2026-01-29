import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* =======================
   TIPOS
======================= */
interface PortfolioItem {
  id: number;
  imageUrl: string;
  title: string;
  alt?: string;
}

interface PortfolioProps {
  items?: PortfolioItem[];
}

/* =======================
   COMPONENTE PRINCIPAL
======================= */
const Portfolio: React.FC<PortfolioProps> = ({
  items = defaultPortfolioItems,
}) => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex flex-col items-center justify-center py-24 overflow-hidden">
      {/* Badge */}
      {/* Wave */}
      <svg
        className="absolute  bottom-0 left-0 w-full border-none"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase border border-emerald-400/30 px-4 py-2 rounded-full z-10">
        Portfolio
      </span>

      {/* Texto decorativo */}
      <p className="hidden lg:block absolute -left-64 top-1/2 -translate-y-1/2 text-[12rem] font-black text-white/10 rotate-90 select-none">
        ENTRE EM
      </p>

      <p className="hidden lg:block absolute -right-64 top-1/2 -translate-y-1/2 text-[12rem] font-black text-white/10 -rotate-90 select-none">
        CONTATO
      </p>

      {/* Headline */}
      <div className="text-center z-10 max-w-5xl">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
          Ter um site não é suficiente.
          <span className="block text-emerald-600">
            Ele precisa gerar resultados.
          </span>
        </h1>
        <p className="text-zinc-300 text-xl md:text-2xl mb-8">
          Funcionalidades que convertem visitantes em clientes. Veja algumas
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10 px-4 max-w-7xl mx-auto">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
    </section>
  );
};

/* =======================
   CARD COM SCROLL ANIMATION
======================= */
const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="w-80 h-96 rounded-[40px] overflow-hidden relative group cursor-pointer border border-white/20 shadow-2xl"
    >
      {/* IMAGEM */}
      <img
        src={item.imageUrl}
        alt={item.alt || item.title}
        className="
          w-full h-full 
          object-cover object-top
          transition-all duration-[8000ms] ease-in-out
          group-hover:object-bottom
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <span className="text-white text-xl font-bold">{item.title}</span>
      </div>
    </motion.div>
  );
};

/* =======================
   DADOS
======================= */
const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    imageUrl: "/agendamento.jpg",
    title: "Agendamento",
  },
  {
    id: 2,
    imageUrl: "/screencapture-e-commerce-mk.png",
    title: "Orçamentos",
  },
  {
    id: 3,
    imageUrl: "/screencapture-zarpfy.png",
    title: "Vitrine Online",
  },
  {
    id: 4,
    imageUrl: "/screencapture-aryehsheva.png",
    title: "Quiz Interativo",
  },
  {
    id: 5,
    imageUrl: "/screencapture-pedronitools.png",
    title: "Envio de imagens",
  },
  {
    id: 6,
    imageUrl: "/screencapture-mkdistribuidora.png",
    title: "Catálogo Digital",
  },
];

export default Portfolio;
