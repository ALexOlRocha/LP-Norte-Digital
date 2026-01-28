import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  CreditCard,
  ExternalLink,
  Check,
  Sparkles,
  Globe,
  Bot,
  Zap,
  FileText,
  ShoppingCart,
  Calendar,
  Users,
} from "lucide-react";

type MessageType =
  | "text"
  | "image"
  | "options"
  | "quote"
  | "qrcode"
  | "cta"
  | "service";

interface Message {
  id: number;
  type: MessageType;
  content: string;
  isBot: boolean;
  options?: string[];
  image?: string;
  price?: number;
  service?: ServiceType;
}

interface ConversationStep {
  type: MessageType;
  content: string;
  isBot: boolean;
  options?: string[];
  image?: string;
  price?: number;
  delay?: number;
  service?: ServiceType;
}

type ServiceType =
  | "chatbot"
  | "landing-page"
  | "automation"
  | "budget"
  | "whatsapp"
  | "all";

interface ServiceInfo {
  id: ServiceType;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

const SIZE = 21;

const services: ServiceInfo[] = [
  {
    id: "chatbot",
    name: "Chatbot com IA",
    description: "Atendimento automático 24/7 com inteligência artificial",
    price: 897,
    features: [
      "Responde perguntas automaticamente",
      "Aprende com conversas anteriores",
      "Integração com múltiplos canais",
      "Análise de sentimentos",
    ],
    icon: <Bot className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
  },
  {
    id: "landing-page",
    name: "Página de Vendas",
    description: "Landing pages que convertem visitantes em clientes",
    price: 1297,
    features: [
      "Design otimizado para conversão",
      "Mobile-first responsivo",
      "Integração com analytics",
      "Testes A/B integrados",
    ],
    icon: <Globe className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
  },
  {
    id: "automation",
    name: "Automações",
    description: "Automatize processos e ganhe tempo",
    price: 997,
    features: [
      "Agendamento automático",
      "Fluxos de trabalho",
      "Integração com CRM",
      "Notificações inteligentes",
    ],
    icon: <Zap className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    id: "budget",
    name: "Sistema de Orçamento",
    description: "Gere orçamentos profissionais automaticamente",
    price: 697,
    features: [
      "Modelos personalizáveis",
      "Aprovação digital",
      "Pagamento integrado",
      "Relatórios detalhados",
    ],
    icon: <FileText className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  },
  {
    id: "whatsapp",
    name: "Automação WhatsApp",
    description: "Atendimento e vendas pelo WhatsApp",
    price: 797,
    features: [
      "Mensagens automáticas",
      "Respostas rápidas",
      "Catalogo integrado",
      "Multi-atendentes",
    ],
    icon: <MessageCircle className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=250&fit=crop",
  },
  {
    id: "all",
    name: "Pacote Completo",
    description: "Todas as soluções integradas",
    price: 3497,
    features: [
      "Todos os serviços acima",
      "Integração total",
      "Suporte prioritário",
      "Treinamento completo",
      "Desconto especial",
    ],
    icon: <ShoppingCart className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
];

const conversationFlow: ConversationStep[] = [
  // Apresentação
  {
    type: "text",
    content: "Olá! 👋 Sou o atendente da Norte Digital",
    isBot: true,
    delay: 800,
  },
  {
    type: "text",
    content:
      "Oferecemos soluções completas de automação para seu negócio. Como posso te ajudar hoje?",
    isBot: true,
    delay: 1200,
  },

  // Menu Principal de Serviços
  {
    type: "options",
    content: "Selecione um serviço para saber mais:",
    isBot: true,
    options: [
      "🤖 Chatbot com IA",
      "🌐 Página de Vendas",
      "⚡ Automações",
      "💰 Sistema de Orçamento",
      "💬 WhatsApp Automático",
      "🎯 Ver Pacote Completo",
      "👤 Falar com humano",
    ],
    delay: 1000,
  },
  { type: "text", content: "🤖 Chatbot com IA", isBot: false, delay: 1500 },

  // Detalhes do Chatbot
  {
    type: "service",
    content: "",
    isBot: true,
    service: "chatbot",
    delay: 800,
  },
  {
    type: "text",
    content: "Deseja ver mais detalhes sobre este serviço?",
    isBot: true,
    delay: 1000,
  },
  {
    type: "options",
    content: "",
    isBot: true,
    options: ["Ver orçamento", "Ver outro serviço", "Falar com humano"],
    delay: 500,
  },
  { type: "text", content: "Ver orçamento", isBot: false, delay: 1500 },

  // Orçamento do Chatbot
  {
    type: "quote",
    content: "Chatbot com IA - Setup Completo",
    price: 897,
    isBot: true,
    delay: 1500,
  },

  // Opção de ver outros serviços
  {
    type: "text",
    content: "Gostaria de ver outros serviços que oferecemos?",
    isBot: true,
    delay: 1000,
  },
  {
    type: "options",
    content: "",
    isBot: true,
    options: ["Sim, mostrar tudo", "Não, apenas este"],
    delay: 500,
  },
  { type: "text", content: "Sim, mostrar tudo", isBot: false, delay: 1500 },

  // Mostrar todos os serviços
  {
    type: "text",
    content: "Aqui estão todos os nossos serviços disponíveis:",
    isBot: true,
    delay: 800,
  },
  {
    type: "service",
    content: "",
    isBot: true,
    service: "landing-page",
    delay: 800,
  },
  {
    type: "service",
    content: "",
    isBot: true,
    service: "automation",
    delay: 800,
  },
  {
    type: "service",
    content: "",
    isBot: true,
    service: "budget",
    delay: 800,
  },
  {
    type: "service",
    content: "",
    isBot: true,
    service: "whatsapp",
    delay: 800,
  },
  {
    type: "service",
    content: "",
    isBot: true,
    service: "all",
    delay: 1000,
  },

  // Pergunta final
  {
    type: "text",
    content:
      "Qual serviço mais te interessou? Posso gerar um orçamento detalhado.",
    isBot: true,
    delay: 1200,
  },
  {
    type: "options",
    content: "",
    isBot: true,
    options: [
      "Pacote Completo",
      "Chatbot com IA",
      "Landing Page",
      "Ver todos os preços",
    ],
    delay: 800,
  },
  { type: "text", content: "Pacote Completo", isBot: false, delay: 1500 },

  // Orçamento do Pacote Completo
  {
    type: "quote",
    content: "Pacote Completo Norte Digital",
    price: 3497,
    isBot: true,
    delay: 1500,
  },

  // Pagamento
  {
    type: "text",
    content:
      "Para garantir as condições especiais, gerei um QR Code para pagamento:",
    isBot: true,
    delay: 1200,
  },
  {
    type: "qrcode",
    content: "Pagamento PIX",
    isBot: true,
    delay: 1500,
  },

  // CTA Final
  {
    type: "text",
    content: "Prefere falar diretamente com nossa equipe? 💬",
    isBot: true,
    delay: 1000,
  },
  {
    type: "cta",
    content: "Continuar no WhatsApp",
    isBot: true,
    delay: 800,
  },
];

const PageBotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentStep >= conversationFlow.length) {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentStep(0);
        setShowQRCode(false);
      }, 6000);
      return () => clearTimeout(resetTimer);
    }

    const step = conversationFlow[currentStep];
    const delay = step.delay || 1000;

    if (step.isBot) {
      setIsTyping(true);

      if (step.type === "image" || step.type === "service") {
        setIsImageLoading(true);
      }

      const timer = setTimeout(() => {
        setIsTyping(false);
        setIsImageLoading(false);

        if (step.type === "qrcode") {
          setShowQRCode(true);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: currentStep,
            type: step.type,
            content: step.content,
            isBot: true,
            options: step.options,
            image: step.image,
            price: step.price,
            service: step.service,
          },
        ]);
        setCurrentStep((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: currentStep,
            type: step.type,
            content: step.content,
            isBot: false,
          },
        ]);
        setCurrentStep((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const renderServiceCard = (service: ServiceInfo) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="bg-secondary/50 border border-border/30 rounded-xl p-4 space-y-3 cursor-pointer transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              {service.icon}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{service.name}</h4>
              <p className="text-xs text-muted-foreground">
                {service.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold gradient-text">
              R$ {service.price}
            </div>
            <div className="text-xs text-muted-foreground">à vista</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {service.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {service.id === "all" && (
          <div className="pt-2 border-t border-border/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Check className="w-4 h-4" />
              <span>Economize 30% com o pacote completo</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "image":
        return (
          <div className="space-y-2">
            <p className="text-sm">{message.content}</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl overflow-hidden border border-border/30"
            >
              <img
                src={message.image}
                alt="PageBot Demo"
                className="w-full h-32 object-cover"
              />
            </motion.div>
          </div>
        );

      case "service":
        const serviceInfo = services.find((s) => s.id === message.service);
        if (!serviceInfo) return null;

        return (
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl overflow-hidden border border-border/30"
            >
              <img
                src={serviceInfo.image}
                alt={serviceInfo.name}
                className="w-full h-32 object-cover"
              />
            </motion.div>
            {renderServiceCard(serviceInfo)}
          </div>
        );

      case "options":
        return (
          <div className="space-y-2">
            {message.content && <p className="text-sm">{message.content}</p>}
            <div className="flex flex-wrap gap-2">
              {message.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="px-3 py-1.5 text-xs bg-primary/20 border border-primary/40 rounded-full text-primary hover:bg-primary/30 transition-all"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case "quote":
        return (
          <motion.div
            initial={{ opacity: 0, rotateX: -20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-4 space-y-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Orçamento Especial
              </span>
            </div>
            <p className="font-semibold text-foreground">{message.content}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-muted-foreground">12x de</span>
              <span className="text-lg font-bold gradient-text">
                R$ {((message.price || 0) / 12).toFixed(0)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              ou R$ {message.price?.toLocaleString("pt-BR")} à vista
            </div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <Check className="w-3 h-3" />
              <span>Incluso: Setup + Treinamento + Suporte</span>
            </div>
          </motion.div>
        );

      case "qrcode":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 text-center space-y-2 shadow-sm"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-semibold text-gray-700">PIX</span>
            </div>

            {/* QR Code */}
            <div className="mx-auto w-28 h-28 bg-white p-2 rounded-md">
              <div
                className="grid gap-[1px]"
                style={{
                  gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: SIZE * SIZE }).map((_, i) => {
                  const row = Math.floor(i / SIZE);
                  const col = i % SIZE;

                  const isFinder =
                    (row < 7 && col < 7) ||
                    (row < 7 && col >= SIZE - 7) ||
                    (row >= SIZE - 7 && col < 7);

                  const isFinderBorder =
                    isFinder &&
                    (row === 0 ||
                      row === 6 ||
                      col === 0 ||
                      col === 6 ||
                      row === SIZE - 1 ||
                      col === SIZE - 1);

                  const isFinderCenter =
                    isFinder && row > 1 && row < 5 && col > 1 && col < 5;

                  const isDark =
                    isFinderBorder ||
                    isFinderCenter ||
                    (!isFinder && Math.random() > 0.55);

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.002 }}
                      className={`
                        aspect-square
                        ${isDark ? "bg-black" : "bg-white"}
                      `}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-gray-600">Escaneie para pagar</p>
          </motion.div>
        );

      case "cta":
        return (
          <motion.a
            href="https://wa.me/5511999999999?text=Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Norte Digital"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(13, 79, 79, 0.3)",
            }}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl text-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {message.content}
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        );

      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <motion.div
      className="relative"
      style={{ perspective: "1000px" }}
      initial={{ rotateY: 5, rotateX: 5 }}
      animate={{
        rotateY: [5, -3, 5],
        rotateX: [5, 2, 5],
        y: [0, -8, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Device Frame with 3D effect */}
      <div className="relative mx-auto max-w-lg h-full w-full rounded-3xl shadow-2xl">
        {/* Multiple Glow Layers for depth */}
        <motion.div
          className="absolute -inset-8 bg-primary/10 rounded-[40px] blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Chat Container - Glass Effect */}
        <div
          className="relative backdrop-blur-xl border border-border/30 p-5 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, hsl(200 15% 12% / 0.95) 0%, hsl(200 10% 8% / 0.9) 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-border/20 mb-4">
            <motion.div
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="/logo.png"
                alt="Norte Digital"
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm">
                Norte Digital
              </h4>
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="h-80 overflow-y-auto overflow-x-hidden custom-scrollbar"
            style={{ overscrollBehavior: "contain" }}
          >
            <div className="space-y-3 pr-1">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`flex ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                        message.isBot
                          ? "bg-secondary/80 text-secondary-foreground rounded-bl-md"
                          : "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-br-md shadow-lg"
                      }`}
                      style={
                        message.isBot
                          ? {}
                          : { boxShadow: "0 4px 15px rgba(13, 79, 79, 0.3)" }
                      }
                    >
                      {renderMessage(message)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary/80 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                      {isImageLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                          />
                          <span className="text-xs text-muted-foreground">
                            Carregando serviço...
                          </span>
                        </>
                      ) : (
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-2 h-2 bg-primary/60 rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/20 mt-4">
            <motion.div
              className="flex-1 bg-secondary/50 rounded-full px-4 py-2.5 border border-border/20"
              whileHover={{ borderColor: "rgba(13, 79, 79, 0.5)" }}
            >
              <span className="text-muted-foreground text-sm">
                Digite sua mensagem...
              </span>
            </motion.div>
            <motion.button
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 8px 25px rgba(13, 79, 79, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 4px 15px rgba(13, 79, 79, 0.3)" }}
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageBotDemo;
