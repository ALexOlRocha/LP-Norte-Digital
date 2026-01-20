import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Fluxo from "./Fluxo";

interface Service {
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoType?: "youtube" | "mp4" | "png"; // Adicionando tipo de vídeo
}

const services: Service[] = [
  {
    title: "Envio em Massa",
    description: "Envio automático de mensagens via WhatsApp",
    image: "/envio-massa.jpg",
    hoverImage: "/envio-massa-hover.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // YouTube embed URL
    videoTitle: "Demonstração: Envio em Massa",
    videoType: "youtube",
  },
  {
    title: "Tiny ERP",
    description: "Integração completa",
    image: "/Olist.png",
    hoverImage: "/tiny-erp-hover.jpg",
    videoUrl: "/extensao-auto-cliker.png",
    videoTitle: "Demonstração: Tiny ERP",
    videoType: "png", // Esta é uma imagem, não vídeo
  },
  {
    title: "Mercado Livre",
    description: "Vendas automatizadas",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Demonstração: Mercado Livre",
    videoType: "youtube",
  },
  {
    title: "Shopee",
    description: "Operações otimizadas",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    videoUrl: "/videos/shopee.mp4", // Caminho correto para vídeo MP4
    videoTitle: "Demonstração: Shopee",
    videoType: "mp4",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleImageClick = (index: number) => {
    const service = services[index];
    if (service.videoUrl || service.image) {
      setSelectedService(service);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  // Função para renderizar o conteúdo do vídeo baseado no tipo
  const renderVideoContent = (service: Service) => {
    if (!service.videoUrl) return null;

    switch (service.videoType) {
      case "youtube":
        return (
          <div className="aspect-video w-full">
            <iframe
              src={service.videoUrl}
              title={service.videoTitle || service.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        );

      case "mp4":
        return (
          <div className="aspect-video w-full">
            <video
              controls
              autoPlay
              muted
              className="w-full h-full rounded-lg object-cover"
            >
              <source src={service.videoUrl} type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>
        );

      case "png":
      default:
        // Se for uma imagem, mostra a imagem em alta resolução
        return (
          <div className="w-full">
            <img
              src={service.videoUrl || service.image}
              alt={service.videoTitle || service.title}
              className="w-full h-auto rounded-lg max-h-[70vh] object-contain"
            />
          </div>
        );
    }
  };

  return (
    <section id="servicos" className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="container mx-auto px-4 sm:px-6 relative z-10 space-y-12"
        ref={ref}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Nossas{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Automações
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Simplifique processos e escale resultados. Passe o mouse nas imagens
            para ver mais detalhes.
          </p>
        </motion.div>

        {/* Interactive Slider */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Image Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] lg:aspect-[16/9] rounded-3xl lg:rounded-[2rem] overflow-hidden group cursor-pointer bg-secondary/20"
            onClick={() => handleImageClick(activeIndex)}
            onMouseEnter={() => setHoveredIndex(activeIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {services.map(
                (service, index) =>
                  activeIndex === index && (
                    <motion.div
                      key={`${service.title}-${index}-${
                        hoveredIndex === index ? "hover" : "normal"
                      }`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
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
                        loading="lazy"
                        onError={(e) => {
                          // Fallback para imagem quebrada
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Imagem+Indisponível";
                        }}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                      {/* Botão de play overlay */}
                      {(service.videoUrl || service.videoType) && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
                              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                            </div>
                            <span className="text-white font-medium text-sm md:text-base bg-black/50 px-3 py-1 rounded-full">
                              Ver demonstração
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Floating label */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 z-10"
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 md:p-5">
                  <span className="text-primary text-sm font-medium mb-1 block">
                    0{activeIndex + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {services[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {services[activeIndex].description}
                  </p>
                </div>
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
                className={`w-full text-left p-4 md:p-6 rounded-xl lg:rounded-2xl transition-all duration-300 border group ${
                  activeIndex === index
                    ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-secondary/10 border-border/30 hover:border-primary/30 hover:bg-secondary/20"
                }`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  if (hoveredIndex === index) {
                    setHoveredIndex(null);
                  }
                }}
                whileHover={{ x: 6 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        activeIndex === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <span className="font-bold">0{index + 1}</span>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold text-base md:text-lg transition-colors ${
                          activeIndex === index
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      x: activeIndex === index ? 0 : -5,
                      opacity: activeIndex === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-primary"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            ))}

            <Button
              size="lg"
              className="w-full mt-6 md:mt-8 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground font-semibold py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
            >
              <span className="flex items-center justify-center">
                Automatizar meu negócio
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>

        <Fluxo />
      </div>

      {/* Modal de Vídeo/Imagem */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl bg-background border-border/50 p-0 overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full w-10 h-10"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            {selectedService && (
              <>
                <div className="p-2">{renderVideoContent(selectedService)}</div>

                <div className="p-6 border-t border-border/50">
                  <DialogTitle className="font-display text-2xl md:text-3xl font-bold mb-2">
                    {selectedService.videoTitle || selectedService.title}
                  </DialogTitle>
                  <p className="text-muted-foreground mb-4">
                    {selectedService.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Demonstração interativa
                    </div>
                    <Button
                      onClick={closeModal}
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
