import { motion } from "framer-motion";
import { PageBotHeroSection } from "./PageBotHeroSection";

const SectionPageBot = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const decorativeElements = [
    {
      top: "20%",
      left: "10%",
      width: "4rem",
      height: "4rem",
      color: "primary/10",
      rotate: 12,
    },
    {
      top: "40%",
      right: "15%",
      width: "3rem",
      height: "3rem",
      color: "muted",
      rotate: -6,
    },
    {
      bottom: "30%",
      left: "15%",
      width: "5rem",
      height: "5rem",
      color: "primary/5",
      rotate: 45,
    },
    {
      top: "60%",
      right: "8%",
      width: "2rem",
      height: "2rem",
      color: "foreground/5",
      rotate: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {decorativeElements.map((element, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="absolute rounded-2xl blur-sm"
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom,
              width: element.width,
              height: element.height,
              backgroundColor: `var(--${element.color})`,
              transform: `rotate(${element.rotate}deg)`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [element.rotate, element.rotate + 5, element.rotate],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px),
                           linear-gradient(to bottom, #8882 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <main className="relative">
        <PageBotHeroSection />
      </main>
    </div>
  );
};

export default SectionPageBot;
