import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Automações", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sistemas", href: "#sistemas" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      {/* Glass container */}
      <div
        className={`relative mx-auto max-w-7xl rounded-full transition-all duration-500
        ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            : "bg-black/30 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Gradient border glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-gray-500/10" />

        <div className="relative px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ opacity: 0.9 }}
          >
            <div className="w-11 h-11 rounded-full bg-white p-1 shadow-md">
              <img
                src="/logo.png"
                alt="Norte Digital"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </motion.a>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center gap-6  bg-white/5 px-6 py-4 rounded-full"
            style={{
              clipPath:
                "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors"
                whileHover="hover"
              >
                {link.label}
                <motion.span
                  variants={{
                    hover: { width: "100%" },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-400 rounded-full"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="relative overflow-hidden rounded-full px-6 bg-primary text-white font-semibold hover:bg-[#1F5F5C]/90 transition-all shadow-[0_0_0_0_rgba(16,185,92,0.6)] hover:shadow-[0_0_40px_8px_rgba(16,185,129,0.35)]"
            >
              <a
                href="https://wa.me/5511999825835?text=Quero%20solicitar%20um%20orçamento"
                target="_blank"
                rel="noopener noreferrer"
              >
                Orçamento
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-md text-white"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 mx-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm uppercase tracking-widest text-white/40">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white text-base font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <Button className="mt-4 rounded-xl bg-emerald-500 text-black font-semibold">
                Orçamento
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
