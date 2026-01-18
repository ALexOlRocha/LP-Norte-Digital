"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Zap,
  ShoppingBag,
  Globe,
  Brain,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentMessage {
  id: number;
  text: string;
  options?: { text: string; action: () => void }[];
}

interface SectionConfig {
  id: string;
  title: string;
  messages: string[];
  options: { text: string; icon: React.ReactNode; action: string }[];
  position: "bottom-right" | "bottom-left" | "top-right";
  delay: number;
}

const DigitalAgent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [agentName] = useState("Nori");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Configurações por seção
  const sectionConfigs: SectionConfig[] = [
    {
      id: "hero",
      title: "Início",
      messages: [
        "Olá! 👋 Seja bem-vindo à Norte Digital!",
        "Somos especialistas em criar soluções digitais que fazem sentido para o seu negócio.",
        "Posso te ajudar a entender como transformamos ideias em realidade digital.",
      ],
      options: [
        {
          text: "Site institucional (LP)",
          icon: <Globe className="w-4 h-4" />,
          action: "explain_lp",
        },
        {
          text: "Sistemas web",
          icon: <Zap className="w-4 h-4" />,
          action: "explain_systems",
        },
        {
          text: "E-commerce",
          icon: <ShoppingBag className="w-4 h-4" />,
          action: "explain_ecommerce",
        },
      ],
      position: "bottom-right",
      delay: 2000,
    },
    {
      id: "services",
      title: "Serviços",
      messages: [
        "Aqui é onde a mágica acontece! ✨",
        "Criamos soluções sob medida, pensando em cada detalhe do seu negócio.",
        "Quer saber mais sobre alguma solução específica?",
      ],
      options: [
        {
          text: "Ver casos reais",
          icon: <Sparkles className="w-4 h-4" />,
          action: "show_cases",
        },
        {
          text: "Processo criativo",
          icon: <Brain className="w-4 h-4" />,
          action: "explain_process",
        },
        {
          text: "Conversar agora",
          icon: <MessageCircle className="w-4 h-4" />,
          action: "open_chat",
        },
      ],
      position: "bottom-left",
      delay: 1000,
    },
    {
      id: "portfolio",
      title: "Portfólio",
      messages: [
        "Cada projeto é único! 🎨",
        "Aqui você vê como transformamos desafios em soluções criativas.",
        "Tem alguma ideia em mente? Posso te ajudar a visualizá-la.",
      ],
      options: [
        {
          text: "Ver projetos similares",
          icon: <Lightbulb className="w-4 h-4" />,
          action: "similar_projects",
        },
        {
          text: "Quanto custa?",
          icon: <Heart className="w-4 h-4" />,
          action: "explain_pricing",
        },
        {
          text: "Tirar dúvidas",
          icon: <MessageCircle className="w-4 h-4" />,
          action: "open_chat",
        },
      ],
      position: "top-right",
      delay: 1500,
    },
  ];

  // Observador de seções
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setCurrentSection(sectionId);

            // Mostra o agente após delay específico da seção
            const config = sectionConfigs.find((s) => s.id === sectionId);
            if (config) {
              setTimeout(() => {
                setIsVisible(true);
                initializeSectionMessages(config);
              }, config.delay);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-50px" }
    );

    // Observa todas as seções definidas
    sectionConfigs.forEach((config) => {
      const element = document.getElementById(config.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Inicializa mensagens da seção
  const initializeSectionMessages = useCallback((config: SectionConfig) => {
    const newMessages: AgentMessage[] = config.messages.map((msg, index) => ({
      id: index,
      text: msg,
    }));

    // Adiciona opções como última mensagem
    newMessages.push({
      id: config.messages.length,
      text: "Como posso te ajudar hoje?",
      options: config.options.map((option) => ({
        text: option.text,
        action: () => handleOptionAction(option.action),
      })),
    });

    setMessages(newMessages);
  }, []);

  // Rola para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ações das opções
  const handleOptionAction = (action: string) => {
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      switch (action) {
        case "explain_lp":
          addMessage({
            text: "Landing Pages e sites institucionais são sua vitrine digital! 🏢 Criamos experiências que convertem visitantes em clientes, com design estratégico e performance otimizada.",
            options: [
              { text: "Ver exemplos", action: "show_lp_examples" },
              { text: "Falar sobre meu projeto", action: "open_chat" },
            ],
          });
          break;

        case "explain_systems":
          addMessage({
            text: "Sistemas web sob medida automatizam seus processos! ⚙️ Desenvolvemos soluções escaláveis que resolvem problemas reais, desde CRMs internos até plataformas complexas.",
            options: [
              {
                text: "Preciso automatizar algo",
                action: "discuss_automation",
              },
              { text: "Ver cases de sistemas", action: "show_system_cases" },
            ],
          });
          break;

        case "explain_ecommerce":
          addMessage({
            text: "E-commerce que vende mesmo! 🛍️ Criamos lojas virtuais com experiência de compra otimizada, integrações inteligentes e estratégias de conversão que aumentam suas vendas.",
            options: [
              { text: "Quero vender online", action: "discuss_ecommerce" },
              { text: "Ver lojas criadas", action: "show_ecommerce_examples" },
            ],
          });
          break;

        case "open_chat":
          setIsChatOpen(true);
          break;

        case "show_cases":
          addMessage({
            text: "Que bom que quer ver cases reais! ✨ Vou te mostrar alguns projetos que transformaram negócios...",
            options: [
              { text: "Continuar explorando", action: "continue_exploring" },
              { text: "Já tenho uma ideia", action: "open_chat" },
            ],
          });
          break;

        default:
          addMessage({
            text: "Vou te ajudar com isso! 😊 Me conta um pouco mais sobre o que você precisa...",
            options: [
              { text: "Continuar conversa", action: "open_chat" },
              { text: "Ver mais soluções", action: "show_more" },
            ],
          });
      }
    }, 800);
  };

  // Adiciona nova mensagem
  const addMessage = (message: Omit<AgentMessage, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: prev.length }]);
  };

  // Inicia conversa
  const startConversation = () => {
    setIsChatOpen(true);
    setMessages([
      {
        id: 0,
        text: "Olá! 😊 Eu sou o Nori, assistente da Norte Digital.",
        options: [
          { text: "Já tenho uma ideia", action: "open_chat" },
          { text: "Quero automatizar algo", action: "discuss_automation" },
          { text: "Só explorando", action: "continue_exploring" },
        ],
      },
    ]);
  };

  // Fecha chat e mostra botão flutuante
  const handleCloseChat = () => {
    setIsChatOpen(false);
    // Mantém visível se ainda estiver na seção
    if (currentSection) {
      setIsVisible(true);
    }
  };

  // Botão flutuante do agente
  if (!isChatOpen && isVisible) {
    const config = sectionConfigs.find((s) => s.id === currentSection);
    const positionClass =
      config?.position === "bottom-left"
        ? "bottom-6 left-6"
        : config?.position === "top-right"
        ? "top-6 right-6"
        : "bottom-6 right-6";

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className={`fixed ${positionClass} z-50`}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3,
            duration: 2,
          }}
          className="relative"
        >
          <Button
            onClick={startConversation}
            className="rounded-full px-6 py-6 shadow-lg bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Precisa de ajuda?</p>
                <p className="text-xs opacity-90">Converse comigo! 😊</p>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          {/* Balão de fala */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg max-w-[200px]"
          >
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Olá! Posso te ajudar? 👋
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Modal do chat
  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseChat}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Chat Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[600px] max-h-[70vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-primary/10 to-primary-glow/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {agentName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Assistente Norte Digital
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleCloseChat}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Mensagem inicial */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block max-w-[85%]"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4">
                    <p className="text-gray-800 dark:text-gray-200">
                      Olá! 👋 Seja bem-vindo à <strong>Norte Digital</strong>!
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block max-w-[85%]"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4">
                    <p className="text-gray-800 dark:text-gray-200">
                      Somos especialistas em criar soluções digitais{" "}
                      <strong>pensadas exatamente para</strong>:
                    </p>
                  </div>
                </motion.div>

                {/* Cards das soluções */}
                <div className="space-y-2 ml-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Site institucional (LP)
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sua vitrine digital que converte
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Sistemas web
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Soluções sob medida que automatizam
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-800 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        E-commerce
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lojas virtuais que realmente vendem
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Mensagens do agente */}
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.options ? "ml-0" : "ml-auto"
                    } max-w-[85%]`}
                  >
                    <div
                      className={`${
                        message.options
                          ? "bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none"
                          : "bg-gradient-to-r from-primary to-primary-glow text-white rounded-2xl rounded-tr-none"
                      } p-4`}
                    >
                      <p
                        className={
                          message.options
                            ? "text-gray-800 dark:text-gray-200"
                            : ""
                        }
                      >
                        {message.text}
                      </p>

                      {/* Opções */}
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, idx) => (
                            <Button
                              key={idx}
                              onClick={option.action}
                              variant="outline"
                              className="w-full justify-start text-left h-auto py-2.5 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                            >
                              <span className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4" />
                                {option.text}
                              </span>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Thinking indicator */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block max-w-[85%]"
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {agentName} está pensando...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleOptionAction("explain_lp")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Sites
                </Button>
                <Button
                  onClick={() => handleOptionAction("explain_systems")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Sistemas
                </Button>
                <Button
                  onClick={() => handleOptionAction("explain_ecommerce")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  E-commerce
                </Button>
                <Button
                  onClick={() =>
                    window.open("https://wa.me/5511999825835", "_blank")
                  }
                  variant="default"
                  size="sm"
                  className="text-xs h-auto py-2 bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DigitalAgent;
