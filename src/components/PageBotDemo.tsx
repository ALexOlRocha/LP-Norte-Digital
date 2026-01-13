import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  CreditCard,
  ExternalLink,
  Check,
  Sparkles,
} from "lucide-react";

type MessageType = "text" | "image" | "options" | "quote" | "qrcode" | "cta";

interface Message {
  id: number;
  type: MessageType;
  content: string;
  isBot: boolean;
  options?: string[];
  image?: string;
  price?: number;
}

interface ConversationStep {
  type: MessageType;
  content: string;
  isBot: boolean;
  options?: string[];
  image?: string;
  price?: number;
  delay?: number;
}
const SIZE = 21;

const conversationFlow: ConversationStep[] = [
  // Apresentação
  {
    type: "text",
    content: "Olá! 👋 Sou o atendende da Norte Digital",
    isBot: true,
    delay: 800,
  },
  {
    type: "text",
    content:
      "Transformamos negócios com automação inteligente. Como posso te ajudar hoje?",
    isBot: true,
    delay: 1200,
  },

  // Descoberta
  {
    type: "options",
    content: "Escolha uma opção:",
    isBot: true,
    options: ["Quero automatizar", "Ver soluções", "Falar com humano"],
    delay: 1000,
  },
  { type: "text", content: "Quero automatizar", isBot: false, delay: 1500 },

  // Apresentação do Produto
  { type: "text", content: "Excelente escolha! 🚀", isBot: true, delay: 800 },
  {
    type: "image",
    content:
      "Nossa PageBot atende 24h, qualifica leads e gera orçamentos automáticos:",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
    isBot: true,
    delay: 1500,
  },

  // Benefícios
  {
    type: "text",
    content: "✅ Atendimento 24/7 sem pausas",
    isBot: true,
    delay: 600,
  },
  {
    type: "text",
    content: "✅ Qualificação automática de leads",
    isBot: true,
    delay: 600,
  },
  {
    type: "text",
    content: "✅ Orçamentos gerados instantaneamente",
    isBot: true,
    delay: 600,
  },
  {
    type: "text",
    content: "✅ Integração com WhatsApp",
    isBot: true,
    delay: 800,
  },

  // Orçamento
  {
    type: "text",
    content: "Posso preparar um orçamento personalizado para você?",
    isBot: true,
    delay: 1000,
  },
  {
    type: "options",
    content: "",
    isBot: true,
    options: ["Sim, quero ver!", "Mais informações"],
    delay: 500,
  },
  { type: "text", content: "Sim, quero ver!", isBot: false, delay: 1500 },

  // Mostra orçamento
  {
    type: "text",
    content: "Preparando seu orçamento personalizado... ✨",
    isBot: true,
    delay: 1200,
  },
  {
    type: "quote",
    content: "PageBot Completo",
    price: 1497,
    isBot: true,
    delay: 2000,
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
    content: "Prefere falar com nossa equipe? 💬",
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
      // Reset after complete flow
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

      if (step.type === "image") {
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
            href="https://wa.me/5511999999999?text=Olá! Vim pelo site e gostaria de saber mais sobre o PageBot"
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
                            Enviando imagem...
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
