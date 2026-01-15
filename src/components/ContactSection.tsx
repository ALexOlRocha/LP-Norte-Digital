import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Instagram, Linkedin, Send, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/5511999825835",
      color: "hover:bg-green-500/20 hover:text-green-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/nortedigital.oficial/",
      color: "hover:bg-pink-500/20 hover:text-pink-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nortedigitalofc/?viewAsMember=true",
      color: "hover:bg-blue-500/20 hover:text-blue-500",
    },
  ];

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Vamos{" "}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary-glow">
              conversar?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Entre em contato e transforme seu negócio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Map/Location */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl overflow-hidden h-full min-h-[400px]">
              {/* Map placeholder with styled overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-glow/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Nossa Localização
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    São Paulo, SP - Brasil
                    <br />
                    Atendemos todo o Brasil
                  </p>
                </div>
              </div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(13,79,79,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(13,79,79,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>
          </motion.div>

          {/* Right - Form & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-secondary/50 border-border/30 h-12 rounded-xl placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="bg-secondary/50 border-border/30 h-12 rounded-xl placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Sua mensagem"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-secondary/50 border-border/30 min-h-[120px] rounded-xl placeholder:text-muted-foreground/50 focus:border-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-semibold h-12 rounded-xl glow-primary transition-all duration-300 group"
                >
                  Enviar mensagem
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-sm text-muted-foreground">
                  ou conecte-se
                </span>
                <div className="flex-1 h-px bg-border/30" />
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
