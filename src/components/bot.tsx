"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  RiSendPlaneFill,
  RiWhatsappFill,
  RiRefreshLine,
  RiCloseLine,
} from "react-icons/ri";
import { FiMinus, FiSquare } from "react-icons/fi";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type BudgetData = {
  name: string;
  projectName: string;
  painPoint: string;
};

const quickReplies = [
  "👋 Sobre a Norte Digital",
  "🌐 Landing Pages",
  "🚀 Sites Institucionais",
  "🤖 Automações",
  "💬 PageBot (Chatbot)",
  "💰 Valores e orçamentos",
  "📞 Falar com especialista",
  "⏱️ Tempo de entrega",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 **Olá! Seja bem-vindo(a) à Norte Digital!**\n\nSomos especialistas em soluções digitais que transformam negócios.\n\n**Como posso te ajudar hoje?**",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [budgetFlow, setBudgetFlow] = useState(false);
  const [budgetData, setBudgetData] = useState<BudgetData>({
    name: "",
    projectName: "",
    painPoint: "",
  });
  const [budgetStep, setBudgetStep] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(messages.length);

  // Função simplificada para scroll
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && shouldScroll) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [shouldScroll]);

  // Monitora quando o usuário está scrollando
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldScroll(isAtBottom);
    }
  }, []);

  // Configura o scroll inicial
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);

      // Scroll inicial apenas uma vez
      if (isInitialLoad) {
        setTimeout(() => {
          scrollToBottom();
          setIsInitialLoad(false);
        }, 500);
      }

      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, scrollToBottom, isInitialLoad]);

  // Scroll quando novas mensagens são adicionadas
  useEffect(() => {
    const newMessageAdded = messages.length > lastMessageCountRef.current;

    if (newMessageAdded) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }

    lastMessageCountRef.current = messages.length;
  }, [messages, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const getCustomResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      /^(olá|ola|oi|bom\s*dia|boa\s*tarde|boa\s*noite|hello|hey)/i.test(
        lowerMessage,
      )
    ) {
      return `👋 **Seja muito bem-vindo(a)!**\n\nNa **Norte Digital**, criamos soluções digitais que trabalham 24h para transformar visitantes em clientes.\n\n**Automatize. Escale. Venda mais.**\n\nNo que posso ajudar você hoje?`;
    }

    if (/(sobre|quem\s*são|norte\s*digital|empresa)/i.test(lowerMessage)) {
      return `🏢 **SOBRE A NORTE DIGITAL**\n\nSomos especialistas em **soluções digitais completas** para negócios que querem crescer rápido.\n\n🔹 **Automações inteligentes**\n🔹 **Sites que convertem**\n🔹 **Chatbots 24/7**\n🔹 **Landing pages otimizadas**\n\n🚀 *Transformamos visitantes em clientes, todos os dias.*`;
    }

    if (/(orçamento|valor|preço|proposta|custo|quanto)/i.test(lowerMessage)) {
      startBudgetFlow();
      return "💰 **VAMOS CRIAR SEU ORÇAMENTO PERSONALIZADO!**\n\nPara começarmos, me diga seu nome 😊";
    }

    if (/(landing\s*page|landingpage|lp)/i.test(lowerMessage)) {
      return `🌐 **LANDING PAGES QUE CONVERTEM**\n\nCriamos páginas de alta conversão para:\n• Capturar leads\n• Vender produtos\n• Promover lançamentos\n• Gerar agendamentos\n\n💰 **Investimento:** A partir de R$ 1.500\n⏱️ **Prazo:** 5-7 dias úteis\n\n✨ *Cada pixel pensado para converter!*`;
    }

    if (/(site|sites|institucional|empresa|presença)/i.test(lowerMessage)) {
      return `🚀 **SITES INSTITUCIONAIS PROFISSIONAIS**\n\nSites completos que apresentam sua empresa com credibilidade:\n• Até 10 páginas\n• Sistema administrativo\n• Design responsivo\n• SEO otimizado\n\n💰 **Investimento:** A partir de R$ 3.000\n⏱️ **Prazo:** 10-15 dias úteis\n\n💼 *Sua presença digital de alta qualidade!*`;
    }

    if (/(automaç[aã]o|automatizar|bot|robô|automa)/i.test(lowerMessage)) {
      return `🤖 **AUTOMAÇÕES INTELIGENTES**\n\nAutomatize processos e ganhe tempo:\n• Chatbots personalizados\n• Fluxos de e-mail\n• Processos internos\n• Integrações API\n\n💰 **Investimento:** Sob consulta\n⏱️ **Prazo:** 7-14 dias úteis\n\n⚡ *Faça mais em menos tempo!*`;
    }

    if (/(pagebot|chatbot|whatsapp\s*bot|atendimento)/i.test(lowerMessage)) {
      return `💬 **CHATBOTS 24/7 - PAGEGOT**\n\nAtenda clientes automaticamente:\n• WhatsApp Business\n• Site e redes sociais\n• Qualificação de leads\n• Agendamentos automáticos\n\n💰 **Investimento:** A partir de R$ 300/mês\n⏱️ **Prazo:** 3-7 dias úteis\n\n🤖 *Atendimento humano quando você não pode!*`;
    }

    if (/(tempo|prazo|entrega|quando|quanto\s*tempo)/i.test(lowerMessage)) {
      return `⏱️ **PRAZOS DE ENTREGA**\n\n🌐 **Landing Pages:** 5-7 dias úteis\n🚀 **Sites Institucionais:** 10-15 dias úteis\n🤖 **Automações:** 7-14 dias úteis\n💬 **Chatbots:** 3-7 dias úteis\n\n⚡ *Metodologia ágil para entregas rápidas!*`;
    }

    if (
      /(falar|especialista|humano|consultor|whatsapp|contato)/i.test(
        lowerMessage,
      )
    ) {
      return `📞 **FALE COM NOSSO ESPECIALISTA**\n\n💬 **WhatsApp:** (11) 99982-5835\n\n🕒 **Horário:**\nSeg-Sex: 8h às 18h\nSáb: 9h às 12h\n\n✨ *Vamos encontrar a solução perfeita para você!*`;
    }

    if (/(obrigad[ao]|valeu|grato|agradeço)/i.test(lowerMessage)) {
      return "🤝 **Obrigado pelo contato!**\n\nFico feliz em ajudar!\n\nQualquer dúvida, estou aqui! 🚀";
    }

    const fallbackResponses = [
      "🤔 **Pergunta interessante!**\n\nPosso te ajudar com:\n• Informações sobre serviços\n• Orçamentos personalizados\n• Prazos de entrega\n• Falar com especialista",
      "💡 **Vamos focar no que importa!**\n\nConte-me sobre seu projeto ou dúvida específica.",
      "🚀 **Pronto para transformar seu negócio?**\n\nMe pergunte sobre landing pages, sites, automações ou chatbots!",
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  const startBudgetFlow = () => {
    setBudgetFlow(true);
    setBudgetStep(1);
  };

  const handleBudgetStep = () => {
    if (budgetStep === 1 && budgetData.name) {
      setBudgetStep(2);
      addBotMessage(
        `**Perfeito, ${budgetData.name}!**\n\nAgora me diga o nome do seu projeto ou empresa 😊`,
      );
    } else if (budgetStep === 2 && budgetData.projectName) {
      setBudgetStep(3);
      addBotMessage(
        `**Excelente!**\n\nAgora descreva rapidamente o que você precisa 📝`,
      );
    } else if (budgetStep === 3 && budgetData.painPoint) {
      setBudgetStep(4);
      addBotMessage(
        `🎉 **TUDO PRONTO!**\n\nVou te conectar com nosso especialista para um orçamento personalizado!`,
      );
      setTimeout(() => {
        contactWhatsAppWithBudget();
      }, 1000);
    }
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: Date.now() + Math.random(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now() + Math.random(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (budgetFlow) {
      switch (budgetStep) {
        case 1:
          setBudgetData({ ...budgetData, name: inputValue });
          break;
        case 2:
          setBudgetData({ ...budgetData, projectName: inputValue });
          break;
        case 3:
          setBudgetData({ ...budgetData, painPoint: inputValue });
          break;
      }
      setInputValue("");
      setTimeout(() => handleBudgetStep(), 300);
      return;
    }

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getCustomResponse(inputValue);

      const botMessage: Message = {
        id: Date.now() + Math.random(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const contactWhatsApp = () => {
    const message =
      "Olá! Gostaria de saber mais sobre os serviços da Norte Digital.";
    window.open(
      `https://wa.me/5511999825835?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const contactWhatsAppWithBudget = () => {
    const message = `Olá! Vim pelo site da Norte Digital.

Nome: ${budgetData.name}
Projeto/Empresa: ${budgetData.projectName}
Necessidade: ${budgetData.painPoint}

Gostaria de receber um orçamento.`;

    window.open(
      `https://wa.me/5511999825835?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setBudgetFlow(false);
    setBudgetStep(0);
    setBudgetData({ name: "", projectName: "", painPoint: "" });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 **Olá! Seja bem-vindo(a) à Norte Digital!**\n\nSomos especialistas em soluções digitais que transformam negócios.\n\n**Como posso te ajudar hoje?**",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setBudgetFlow(false);
    setBudgetStep(0);
    setBudgetData({ name: "", projectName: "", painPoint: "" });
    setShouldScroll(true);
  };

  return (
    <div
      className={`max-w-4xl lg:max-w-5xl mx-auto relative  z-10 transition-all duration-300 ${isFullscreen ? "fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur-sm" : ""}`}
    >
      <div
        className={`bg-[#1a1a1a]/65 backdrop-blur-xl rounded-3xl border border-[#333333]/60 shadow-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? "h-[calc(100vh-2rem)]" : ""}`}
      >
        {/* macOS-style Window Controls */}
        <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-b border-[#333333]/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 ml-3">
              <button
                onClick={() => {}}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors cursor-not-allowed"
              />
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"
              />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-3 h-3 rounded-full bg-[#28ca42] hover:bg-[#28ca42]/80 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleClearChat}
                className="text-gray-500 hover:text-gray-300 transition-all cursor-pointer p-1.5 hover:bg-gray-800/30 rounded-lg"
                title="Nova conversa"
              >
                <RiRefreshLine className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Header */}
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900/80 flex items-center justify-center">
              <img
                src={"/NORTE.svg"}
                alt="logo"
                width={24}
                height={24}
                className="w-5 h-5"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white text-sm">
                Norte Digital Assistant
              </h3>
              <p className="text-gray-400 text-xs">Online • v2.0</p>
            </div>
          </div>
        </div>

        {/* Quick Replies - Minimalist */}
        <div className="bg-gray-900/20 border-b border-[#333333]/20 p-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700/30 scrollbar-track-transparent">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="flex-shrink-0 bg-gray-900/40 hover:bg-gray-800/60 text-gray-400 hover:text-gray-300 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all duration-200 border border-[#333333]/50 hover:border-[#333333]/80 backdrop-blur-sm whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container - Glass Effect */}
        <div
          ref={chatContainerRef}
          className={`overflow-y-auto bg-gradient-to-b from-transparent to-transparent scrollbar-thin scrollbar-thumb-gray-700/30 scrollbar-track-transparent ${isFullscreen ? "h-[calc(100%-180px)]" : "h-[50vh] md:h-[55vh] lg:h-[60vh]"}`}
        >
          <div className="p-4 md:p-5 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-sm border ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-br-sm border-gray-700/30"
                      : "bg-gray-900/50 text-gray-200 rounded-bl-sm border-gray-700/20"
                  }`}
                >
                  <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                    {message.text.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-white font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 opacity-60 ${
                      message.sender === "user"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-900/50 text-gray-200 p-4 rounded-2xl rounded-bl-sm border border-gray-700/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400">Digitando...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-px" />
          </div>
        </div>

        {/* Input Area - Minimalist */}
        <div className="bg-gradient-to-t from-[#1a1a1a] to-transparent border-t border-[#333333]/20 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                budgetFlow
                  ? budgetStep === 1
                    ? "Digite seu nome completo..."
                    : budgetStep === 2
                      ? "Qual o nome do seu projeto ou empresa?"
                      : budgetStep === 3
                        ? "Descreva o que você precisa..."
                        : "Digite sua mensagem..."
                  : "Mensagem para Norte Digital..."
              }
              className="flex-1 bg-gray-900/40 border border-[#333333]/50 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 text-sm shadow-inner backdrop-blur-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-400 hover:text-white p-3 rounded-xl focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 border border-[#333333]/50 hover:border-gray-600 backdrop-blur-sm min-w-[50px] flex items-center justify-center"
            >
              <RiSendPlaneFill className="w-5 h-5" />
            </button>
          </form>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-3 pt-3 border-t border-[#333333]/20 gap-2">
            <div className="text-xs text-gray-600 text-center sm:text-left">
              Respostas automáticas • 24/7 disponível
            </div>
            <button
              onClick={contactWhatsApp}
              className="inline-flex items-center text-xs bg-gray-900/40 hover:bg-gray-800/60 text-gray-400 hover:text-gray-300 transition-all duration-200 cursor-pointer px-3 py-2 rounded-lg border border-[#333333]/50 hover:border-gray-600 backdrop-blur-sm whitespace-nowrap"
            >
              <RiWhatsappFill className="w-4 h-4 mr-2 text-gray-500" />
              Falar com especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
