import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  ArrowUpRight,
  Star,
  MessageCircle,
  Mail,
  CheckCircle,
  FileText,
} from "lucide-react";
import abstractShapes from "@/assets/abstract-shapes.png";
import { useRef } from "react";

export const PageBotHeroSection = () => {
  const bgShapesRef = useRef<HTMLDivElement>(null);

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Background Image with better positioning */}
      <div
        ref={bgShapesRef}
        className="absolute -right-1/4 -top-1/4 w-[1000px] h-[1000px] opacity-[0.12] pointer-events-none z-0"
        style={{
          mixBlendMode: "soft-light",
          filter: "blur(1px) saturate(0.8) brightness(1.2)",
        }}
      >
        <img
          src={abstractShapes}
          alt=""
          className="w-full h-full object-contain"
          style={{
            filter: "contrast(0.9) brightness(1.1)",
          }}
        />
      </div>

      {/* Gradient Overlays with better z-index */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-60 z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-20 z-1" />

      {/* Main content with proper z-index */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center shadow-sm"
              >
                <span className="text-xs font-semibold text-primary">
                  {["N", "D", "S"][i - 1]}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                >
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground ml-1">
              +200 empresas automatizadas
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 leading-tight">
            <span className="text-foreground">Ecossistema Completo de</span>
            <br />
            <span className="italic  bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
              Automação Inteligente
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Seu atendente
          <strong className="text-foreground bg-primary/10 px-1.5 py-0.5 rounded">
            24 horas por dia
          </strong>{" "}
          Automatize seu atendimento, qualifique leads e gere orçamentos
          automáticos
          <strong className="text-foreground bg-primary/10 px-1.5 py-0.5 rounded">
            enquanto você foca no que importa.
          </strong>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-16"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 px-8 py-6 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group relative overflow-hidden"
          >
            <span className="relative z-10">Falar com a NØRA</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {[
            {
              icon: MessageCircle,
              label: "Chat",
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              color: "text-green-500",
              bg: "bg-green-50",
            },
            {
              icon: Mail,
              label: "Email",
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              icon: CheckCircle,
              label: "Web",
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              icon: FileText,
              label: "SMS",
              color: "text-orange-600",
              bg: "bg-orange-100",
            },
          ].map((platform, index) => (
            <motion.div
              key={platform.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${platform.bg} border border-transparent hover:border-current/20 transition-colors`}
            >
              <platform.icon className={`w-4 h-4 ${platform.color}`} />
              <span className="text-sm font-medium text-gray-700">
                {platform.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating icons decoration - LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg rotate-6"
          >
            <svg
              className="w-8 h-8 text-green-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg -rotate-3 ml-4"
          >
            <svg
              className="w-6 h-6 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating icons decoration - RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-lg rotate-3"
          >
            <svg
              className="w-6 h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg -rotate-6 ml-2"
          >
            <svg
              className="w-8 h-8 text-purple-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
