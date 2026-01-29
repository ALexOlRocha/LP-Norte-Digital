import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phrases = [
  "Você já percebeu isso?",
  "Messagens que demoram",
  "Orçamentos feitos manualmente",
  "Leads curiosos",
  "Sistemas quebrados",
  "Pessoas fazendo o trabalho de um robô",
  "Oportunidades que escapam",
  "Automatize seu atendimento agora mesmo",
  "Economize tempo e dinheiro",
  "Converta clientes qualificados automaticamente",
  "Receba orçamentos todos os dias",
  "Foque no seu negócio. A automação cuida do resto.",
];

const ScrollPhrases = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Define até qual índice são frases negativas (vermelhas)
  const negativePhraseEndIndex = 6; // "Oportunidades que escapam" é o índice 6

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="space-y-24">
          {phrases.map((phrase, index) => {
            const isEven = index % 2 === 0;
            const isNegative = index <= negativePhraseEndIndex;

            return (
              <PhraseItem
                key={index}
                phrase={phrase}
                index={index}
                isEven={isEven}
                isNegative={isNegative}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface PhraseItemProps {
  phrase: string;
  index: number;
  isEven: boolean;
  isNegative: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const PhraseItem = ({ phrase, index, isEven, isNegative }: PhraseItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-100, 0, 100] : [100, 0, -100],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Divide a frase em primeira palavra e o restante
  const words = phrase.split(" ");
  const firstWord = words[0];
  const restOfPhrase = words.slice(1).join(" ");

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={`flex ${isEven ? "justify-start" : "justify-end"}`}
    >
      <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl">
        <span
          className={
            isNegative
              ? "text-red-500"
              : "gradient-text bg-gradient-to-r from-primary to-primary-glow"
          }
        >
          {firstWord}
        </span>{" "}
        {restOfPhrase && (
          <span className={isNegative ? "text-white" : ""}>{restOfPhrase}</span>
        )}
      </h3>
    </motion.div>
  );
};

export default ScrollPhrases;
