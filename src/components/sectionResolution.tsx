import React, { useEffect, useRef } from "react";

interface FeatureItem {
  id: number;
  text: string;
}

const SectionResolution: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLLIElement | null)[]>([]);

  const features: FeatureItem[] = [
    { id: 1, text: "Atende clientes" },
    { id: 2, text: "Tira dúvidas" },
    { id: 3, text: "Monta orçamentos" },
    { id: 4, text: "Agenda atendimentos" },
    { id: 5, text: "Fecha pagamentos automaticamente" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      const elements =
        sectionRef.current.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }

    // Animar features com delay
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        setTimeout(() => {
          feature.classList.add("animate-fadeInLeft");
        }, index * 100);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white py-20 flex md:-top-10 -top-2 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Headline Principal */}
        <div className="mb-20 md:mb-32 text-center animate-on-scroll opacity-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            A maioria das empresas compra um site achando que ele vai vender
            sozinho.
            <span className="block text-red-600 mt-4">Não vende.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Coluna Esquerda */}
          <div className="space-y-8">
            {/* Subheadline */}
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug mb-8">
                Porque não é sobre ter um site.
                <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  É sobre ter um vendedor digital com Inteligência Artificial.
                </span>
              </h2>
            </div>

            {/* Texto Explicativo */}
            <div className="animate-on-scroll opacity-0">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                Criamos uma solução completa onde cada função trabalha para
                converter visitantes em clientes.
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                O{" "}
                <span className="font-semibold text-emerald-700">PageBot</span>{" "}
                é mais do que uma página — é um sistema inteligente que opera
                24/7, entendendo necessidades e fechando negócios
                automaticamente.
              </p>
            </div>
          </div>

          {/* Coluna Direita - Lista de Funcionalidades */}
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              Funcionalidades que vendem por você:
            </h3>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <li
                  key={feature.id}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="flex items-start opacity-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Destaque Final */}
            <div className="mt-12 p-6 border-l-4 border-emerald-500 bg-emerald-50/50">
              <p className="text-xl md:text-2xl text-gray-800 italic">
                "Em vez de um site parado, você tem um ecossistema de vendas
                ativo 24 horas por dia."
              </p>
            </div>
          </div>
        </div>

        {/* CTA Minimalista */}
        <div className="mt-20 md:mt-32 text-center animate-on-scroll opacity-0">
          <div className="inline-block">
            <button className="px-10 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 transform hover:-translate-y-0.5">
              Transforme seu site em um vendedor →
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              Agende uma demonstração gratuita do{" "}
              <span className="font-semibold text-emerald-600">PageBot</span>
            </p>
          </div>
        </div>
      </div>

      {/* Estilos de animação inline */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SectionResolution;
