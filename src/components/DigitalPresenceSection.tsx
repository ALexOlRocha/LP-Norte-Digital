import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const sites = [
  {
    title: "Sites Institucionais",
    image: "/sites.jpg",
  },
  {
    title: "Landing Pages",
    image: "/landigpage.jpg",
  },
  {
    title: "E-commerce",
    image: "/ecommerce.jpg",
  },
];

const DigitalPresenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Seu site é uma{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              máquina de vendas
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Criamos experiências que transformam visitantes em clientes.
          </p>
        </motion.div>

        {/* Sites Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {sites.map((site, index) => (
            <motion.div
              key={site.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-md aspect-[4/3]">
                {/* Browser Frame */}
                <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm z-10 p-3">
                  {/* Browser Bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex-1 h-5 bg-background/50 rounded-full mx-2" />
                  </div>

                  {/* Site Preview */}
                  <div className="relative rounded-lg overflow-hidden h-[calc(100%-2rem)]">
                    <motion.img
                      src={site.image}
                      alt={site.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <motion.h3
                className="font-display text-xl font-semibold mt-6 text-center text-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {site.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary transition-all duration-300 group rounded-xl"
          >
            Criar meu site
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalPresenceSection;
