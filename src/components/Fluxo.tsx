import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const Fluxo = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Entendemos sua necessidade",
      description:
        "Conversamos para entender seu desafio, objetivos e o que você precisa resolver.",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Planejamos a solução",
      description:
        "Desenhamos a melhor estratégia técnica para atingir seus resultados.",
    },
    {
      number: "03",
      icon: Code2,
      title: "Desenvolvemos o sistema",
      description:
        "Construímos sua solução com qualidade, focando em performance e usabilidade.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Entregamos e acompanhamos",
      description:
        "Entregamos funcionando e damos suporte para você aproveitar ao máximo.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 md:py-32 relative bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Um processo simples e transparente para transformar sua ideia em
            realidade.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <div className="text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-card border border-border mb-6 relative group hover:border-primary/50 transition-colors">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fluxo;
