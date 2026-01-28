"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-transparent flex items-center justify-center  ">
      {/* Background Gradient Overlay - Mais sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Background Pattern Overlay - Para textura suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Painel Esquerdo */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.8 }}
        className="absolute left-0 top-0 h-full w-1/2 bg-black"
      />

      {/* Painel Direito */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1.8 }}
        className="absolute right-0 top-0 h-full w-1/2 bg-black"
      />

      {/* Conteúdo central */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative z-10 flex h-screen w-screen items-center  justify-center bg-linear-to-br from-black to-gray-900"
      >
        {" "}
        {/* Background Gradient Overlay - Mais sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        {/* Background Pattern Overlay - Para textura suave */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <h1 className="md:text-5xl text-3xl tracking-[0.7em] text-white text-center justify-center mx-auto font-bold">
          NORTE DIGITAL
        </h1>
      </motion.div>
    </div>
  );
}
