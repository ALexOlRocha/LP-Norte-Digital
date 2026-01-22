"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RiSendPlaneFill, RiWhatsappFill, RiRefreshLine } from "react-icons/ri";

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
  "💰 Valores e orçamento",
  "🌐 Landing Pages",
  "🚀 Sites Institucionais",
  "🤖 Automações",
  "📞 Falar com especialista",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 **Olá! Seja bem-vindo(a) à Norte Digital!**\n\nComo posso te ajudar hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // orçamento
  const [budgetFlow, setBudgetFlow] = useState(false);
  const [budgetStep, setBudgetStep] = useState(0);
  const [budgetData, setBudgetData] = useState<BudgetData>({
    name: "",
    projectName: "",
    painPoint: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const startBudgetFlow = () => {
    setBudgetFlow(true);
    setBudgetStep(1);
    addBotMessage("Perfeito! 😊\n\nPara começarmos, qual é o seu nome?");
  };

  const handleSendMessage = () => {
    const value = inputValue.trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text: value,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    setInputValue("");

    // 🔥 FLUXO DE ORÇAMENTO (CORRIGIDO)
    if (budgetFlow) {
      if (budgetStep === 1) {
        setBudgetData((prev) => ({ ...prev, name: value }));
        addBotMessage(
          `Prazer, ${value}! 😄\n\nQual o nome do seu projeto ou empresa?`,
        );
        setBudgetStep(2);
        return;
      }

      if (budgetStep === 2) {
        setBudgetData((prev) => ({ ...prev, projectName: value }));
        addBotMessage(
          "Show! 🚀\n\nAgora descreva rapidamente o que você precisa.",
        );
        setBudgetStep(3);
        return;
      }

      if (budgetStep === 3) {
        setBudgetData((prev) => ({ ...prev, painPoint: value }));
        addBotMessage(
          "🎉 Tudo certo!\n\nVou te conectar com nosso especialista para um orçamento personalizado.",
        );

        setTimeout(contactWhatsAppWithBudget, 800);
        setBudgetFlow(false);
        setBudgetStep(0);
        return;
      }
    }

    // respostas normais
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      if (/orçamento|valor|preço/i.test(value)) {
        startBudgetFlow();
        return;
      }

      addBotMessage(
        "🤖 Posso te ajudar com orçamento, sites, landing pages ou automações.\n\nO que você gostaria de saber?",
      );
    }, 600);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(handleSendMessage, 100);
  };

  const contactWhatsApp = () => {
    window.open(
      "https://wa.me/5511999825835?text=Olá! Vim pelo site da Norte Digital.",
      "_blank",
    );
  };

  const contactWhatsAppWithBudget = () => {
    const message = `Olá! Vim pelo site da Norte Digital.

Nome: ${budgetData.name}
Projeto: ${budgetData.projectName}
Necessidade: ${budgetData.painPoint}`;

    window.open(
      `https://wa.me/5511999825835?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setBudgetData({ name: "", projectName: "", painPoint: "" });
  };

  const shouldShowQuickReplies = messages.length <= 1 && !budgetFlow;

  return (
    <div className="max-w-4xl mx-auto bg-[#1a1a1a]/70 rounded-3xl border border-gray-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 text-center">
        <h3 className="text-white font-semibold">Norte Digital Assistant</h3>
        <p className="text-xs text-gray-400">
          {budgetFlow ? `Orçamento • Etapa ${budgetStep}/3` : "Online • 24/7"}
        </p>
      </div>

      {/* Quick Replies */}
      {shouldShowQuickReplies && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1.5 rounded-full text-xs bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="h-[55vh] overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-900 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && <div className="text-gray-500 text-sm">Digitando...</div>}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            budgetFlow
              ? budgetStep === 1
                ? "Digite seu nome..."
                : budgetStep === 2
                  ? "Nome do projeto ou empresa..."
                  : "Descreva sua necessidade..."
              : "Digite sua mensagem..."
          }
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white"
        >
          <RiSendPlaneFill />
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
        <span>Atendimento automático</span>
        <button
          onClick={contactWhatsApp}
          className="flex items-center gap-1 hover:text-white"
        >
          <RiWhatsappFill /> WhatsApp
        </button>
      </div>
    </div>
  );
}
