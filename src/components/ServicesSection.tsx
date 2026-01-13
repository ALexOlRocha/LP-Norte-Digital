import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Service {
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  videoUrl?: string;
  videoTitle?: string;
}

const services: Service[] = [
  {
    title: "Envio em Massa",
    description: "Envio automático de mensagens via WhatsApp",
    image: "/envio-massa.jpg",
    hoverImage: "/envio-massa-hover.jpg", // Adicione esta imagem
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    videoTitle: "Demonstração: Envio em Massa",
  },
  {
    title: "Tiny ERP",
    description: "Integração completa",
    image: "/Olist.png",
    hoverImage: "/tiny-erp-hover.jpg", // Adicione esta imagem
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    videoTitle: "Demonstração: Tiny ERP",
  },
  {
    title: "Mercado Livre",
    description: "Vendas automatizadas",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    videoTitle: "Demonstração: Mercado Livre",
  },
  {
    title: "Shopee",
    description: "Operações otimizadas",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    videoTitle: "Demonstração: Shopee",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  const handleImageClick = (videoUrl: string, title: string) => {
    setSelectedVideo(videoUrl);
    setVideoTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section id="servicos" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Nossas{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              Automações
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Simplifique processos e escale resultados. Passe o mouse nas imagens
            para ver mais.
          </p>
        </motion.div>

        {/* Interactive Slider */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer"
            onClick={() => {
              const service = services[activeIndex];
              if (service.videoUrl) {
                handleImageClick(
                  service.videoUrl,
                  service.videoTitle || service.title
                );
              }
            }}
            onMouseEnter={() => setHoveredIndex(activeIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {services.map(
                (service, index) =>
                  activeIndex === index && (
                    <motion.div
                      key={`${service.title}-${
                        hoveredIndex === index ? "hover" : "normal"
                      }`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Imagem normal ou hover */}
                      <img
                        src={
                          hoveredIndex === index && service.hoverImage
                            ? service.hoverImage
                            : service.image
                        }
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                      {/* Overlay de play para vídeo */}
                      {service.videoUrl && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        >
                          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-10 h-10 text-white ml-1" />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Floating label */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 z-10"
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-primary text-sm font-medium mb-2 block">
                    0{activeIndex + 1}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-foreground">
                    {services[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {services[activeIndex].description}
                  </p>
                </div>
                {services[activeIndex].videoUrl && (
                  <motion.div
                    animate={{ scale: hoveredIndex === activeIndex ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-500 border ${
                  activeIndex === index
                    ? "bg-primary/10 border-primary/30"
                    : "bg-transparent border-border/20 hover:border-border/40"
                }`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  if (hoveredIndex === index) {
                    setHoveredIndex(null);
                  }
                }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary/60 text-sm">
                      0{index + 1}
                    </span>
                    <h4
                      className={`font-display text-xl font-semibold mt-1 transition-colors ${
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      Automação {service.title}
                    </h4>
                  </div>
                  <motion.div
                    animate={{
                      x: activeIndex === index ? 0 : -10,
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </motion.button>
            ))}

            <Button
              size="lg"
              className="w-lg flex relative mt-8 bg-primary hover:bg-primary-glow text-primary-foreground font-semibold py-8 max-md:mx-auto  text-lg glow-primary transition-all duration-300 group rounded-full"
            >
              Automatizar agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Modal de Vídeo */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl bg-background border-border p-0 overflow-hidden">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-50 bg-black/50 hover:bg-black/70 text-white"
              onClick={closeModal}
            >
              <X className="w-4 h-4" />
            </Button>

            {selectedVideo && (
              <div className="aspect-video w-full">
                <iframe
                  src={selectedVideo}
                  title={videoTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="p-6">
              <DialogTitle className="font-display text-2xl font-bold mb-2">
                {videoTitle}
              </DialogTitle>
              <p className="text-muted-foreground">
                Demonstração completa da automação. Veja como podemos
                transformar seus processos.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
