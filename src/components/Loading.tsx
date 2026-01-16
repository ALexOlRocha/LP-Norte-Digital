"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
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
        className="relative z-10 flex h-screen w-screen items-center justify-center bg-linear-to-br from-black to-gray-900"
      >
        <h1 className="text-4xl tracking-[0.7em] text-white">NORTE DIGITAL</h1>
      </motion.div>
    </div>
  );
}
