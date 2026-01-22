import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Bot, Send, User } from "lucide-react";

import abstractShapes from "@/assets/abstract-shapes.png";

gsap.registerPlugin(ScrollTrigger);

const PageBotSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation with 3D effect
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -80, rotateY: 15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Chat 3D entrance
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, scale: 0.8, rotateY: -20, rotateX: 10 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Phone mockup parallax
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, y: 100, rotateZ: -10 },
        {
          opacity: 1,
          y: 0,
          rotateZ: 5,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Background shapes parallax - mais suave
      gsap.to(bgShapesRef.current, {
        y: -50,
        rotateZ: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Floating animation for phone
      gsap.to(phoneRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    // Simulate chat response
    const timer = setTimeout(() => setShowResponse(true), 2000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background Gradient Overlay - Mais sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Background Pattern Overlay - Para textura suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Background Image with Parallax - Mais integrada */}
      <div
        ref={bgShapesRef}
        className="absolute -right-1/4 -top-1/4 w-[1000px] h-[1000px] opacity-[0.15] pointer-events-none"
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

      {/* Additional Gradient Overlays for better blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent opacity-30" />

      <div className="section-container relative z-10 max-w-7xl justify-center mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} style={{ transformStyle: "preserve-3d" }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              PageBot
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold mt-4 mb-6">
              Seu atendente
              <br />
              <span className="text-gradient">24 horas por dia</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Automatize seu atendimento, qualifique leads e gere orçamentos
              automáticos enquanto você foca no que importa.
            </p>
            <div className="w-50">
              <a
                href="https://wa.me/5511999825835?text=Olá!%20Vim%20pelo%20site%20da%20Norte%20Digital%20e%20gostaria%20de%20criar%20um%20PageBot%20para%20meu%20negócio."
                target="_blank"
                rel="noopener noreferrer"
                className="
      group relative inline-flex items-center gap-3
      rounded-full
      bg-primary hover:bg-primary-glow
      px-6 py-2
      text-lg font-semibold
      text-primary-foreground
      transition-all duration-300
      shadow-lg hover:shadow-primary/40
      hover:scale-[1.03]
      active:scale-[0.97]
    "
              >
                {/* Glow interno */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

                {/* Texto */}
                <span className="relative z-10 whitespace-nowrap">
                  Quero um PageBot
                </span>

                {/* Ícone */}
                <span
                  className="
        relative z-10
        w-9 h-9
        flex items-center justify-center
        rounded-full
        bg-black/80
        text-white
        transition-all duration-300
        group-hover:translate-x-1
        group-hover:bg-black
      "
                >
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>

          {/* Chat Demo with 3D effect */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {/* Phone Mockup - positioned behind */}
            <div
              ref={phoneRef}
              className="absolute -right-20 -top-10 w-48 opacity-60 hidden lg:block"
              style={{ transform: "translateZ(-50px)" }}
            ></div>

            <div
              ref={chatRef}
              className="card-premium p-4 max-w-md mx-auto lg:mx-0 relative z-10"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 25px 50px -12px hsl(174 62% 35% / 0.25), 0 0 0 1px hsl(174 62% 35% / 0.1)",
              }}
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Norte Digital</p>
                  <p className="text-xs text-primary">Online</p>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-6 space-y-4 min-h-[300px]">
                {/* Bot Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-foreground text-sm">
                      Olá! 👋 Sou o atendente da Norte Digital
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Transformamos negócios com automação inteligente. Como
                      posso te ajudar hoje?
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pl-11">
                  <button className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary hover:bg-primary/20 hover:scale-105 transition-all duration-300">
                    Quero automatizar
                  </button>
                  <button className="px-4 py-2 bg-secondary border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300">
                    Ver soluções
                  </button>
                  <button className="px-4 py-2 bg-secondary border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300">
                    Falar com humano
                  </button>
                </div>

                {/* User Response */}
                {showResponse && (
                  <>
                    <div className="flex gap-3 justify-end animate-fade-in">
                      <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-primary-foreground text-sm">
                          Quero automatizar
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex gap-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-foreground text-sm">
                          Perfeito! Nossa PageBot atende 24h, qualifica leads e
                          gera orçamentos automáticos. 🚀
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-secondary border-none rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBotSection;
