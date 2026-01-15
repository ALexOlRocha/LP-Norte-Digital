import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const gradientOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0, 0.5, 1]
  );
  const contentY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const orbScale = useTransform(smoothProgress, [0, 1], [0.5, 1.2]);

  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#portfolio" },
    { label: "Sistemas", href: "#sistemas" },
    { label: "Contato", href: "#contato" },
  ];

  const contacts = [
    { icon: MessageCircle, text: "WhatsApp", href: "#" },
    { icon: Mail, text: "nortedigital2026@gmail.com", href: "#" },
    { icon: MapPin, text: "Cajamar, São Paulo", href: "#" },
  ];
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/nortedigital.oficial/",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nortedigitalofc/?viewAsMember=true",
    },
    {
      label: "GitHub",
      href: "https://github.com/nortedigital",
    },
  ];

  return (
    <footer ref={footerRef} className="relative pt-32 pb-12 overflow-hidden">
      {/* Background Gradient Layers */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gradientOpacity }}
      >
        {/* Main gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(200 15% 6%) 0%, hsl(200 15% 8%) 30%, hsl(174 30% 12%) 70%, hsl(200 15% 6%) 100%)",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, hsl(174 60% 28% / 0.2), transparent)",
          }}
        />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(174 60% 28% / 0.3), transparent)",
          scale: orbScale,
        }}
      />
      <motion.div
        className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(174 70% 35% / 0.2), transparent)",
          scale: orbScale,
        }}
      />

      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(200 15% 6%)" />
              <stop offset="50%" stopColor="hsl(200 15% 6%)" />
              <stop offset="100%" stopColor="hsl(200 15% 6%)" />
            </linearGradient>
          </defs>
          <path
            d="M0 0V60C360 100 720 40 1080 80C1260 100 1350 60 1440 60V0H0Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y: contentY }}
      >
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg glow-primary">
                <img
                  src="/logo.png"
                  alt="Norte Digital"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-foreground block leading-none">
                  Norte Digital
                </span>
                <span className="text-sm text-primary">Automação & Vendas</span>
              </div>
            </motion.a>

            {/* Tagline */}
            <p className="font-display text-xl font-semibold mb-4">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(174 60% 40%) 0%, hsl(174 70% 55%) 50%, hsl(174 60% 40%) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 4s ease infinite",
                }}
              >
                Automatize. Escale. Venda mais.
              </span>
            </p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Transformamos seu negócio com automação inteligente e design que
              converte.
            </p>
          </motion.div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:justify-self-center"
          >
            <h4 className="font-display font-semibold text-lg text-foreground mb-6">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  viewport={{ once: true }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  {link.label}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:justify-self-end"
          >
            <h4 className="font-display font-semibold text-lg text-foreground mb-6">
              Contato
            </h4>
            <div className="flex flex-col gap-4">
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.text}
                  href={contact.href}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 group-hover:bg-primary/20 transition-colors"
                    style={{
                      clipPath:
                        "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
                    }}
                  >
                    <contact.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{contact.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(174 60% 28% / 0.5), transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Norte Digital. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                whileHover={{ y: -2 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 3D Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(174 60% 28%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(174 60% 28%) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
    </footer>
  );
};

export default Footer;
