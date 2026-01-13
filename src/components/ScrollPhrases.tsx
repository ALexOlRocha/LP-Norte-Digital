import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phrases = [
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

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="space-y-24">
          {phrases.map((phrase, index) => {
            const isEven = index % 2 === 0;
            return (
              <PhraseItem
                key={index}
                phrase={phrase}
                index={index}
                isEven={isEven}
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
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const PhraseItem = ({ phrase, index, isEven }: PhraseItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-100, 0, 100] : [100, 0, -100]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={`flex ${isEven ? "justify-start" : "justify-end"}`}
    >
      <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl">
        <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
          {phrase.split(" ")[0]}
        </span>{" "}
        {phrase.split(" ").slice(1).join(" ")}
      </h3>
    </motion.div>
  );
};

export default ScrollPhrases;
