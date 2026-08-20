import React from 'react';
import { Leaf, Sparkles, HeartHandshake, ShieldCheck, Clock, ArrowRight, Layers, PlayCircle } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog?: () => void;
  onExploreProducts?: () => void;
  onOpenCustomBuilder?: () => void;
  onStartCustomSoap?: () => void;
  onOpenClasses?: () => void;
  onExploreClasses?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onExploreProducts,
  onOpenCustomBuilder,
  onStartCustomSoap,
  onOpenClasses,
  onExploreClasses
}) => {
  const handleCatalog = () => {
    if (onExploreCatalog) onExploreCatalog();
    else if (onExploreProducts) onExploreProducts();
  };

  const handleCustom = () => {
    if (onOpenCustomBuilder) onOpenCustomBuilder();
    else if (onStartCustomSoap) onStartCustomSoap();
  };

  const handleClasses = () => {
    if (onOpenClasses) onOpenClasses();
    else if (onExploreClasses) onExploreClasses();
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8E1D5] pt-8 pb-14 sm:pt-12 sm:pb-20">
      {/* Subtle organic botanical accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#5C6B47]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Handcrafted Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DFD1] border border-[#D4A373]/50 text-xs font-semibold text-[#5C4533] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C2593F]" />
              <span>Saponificação Ancestral a Frio (Cold Process)</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2C2723] tracking-tight leading-[1.12]">
              A pureza botânica da natureza em <span className="italic font-normal text-[#8C6D53]">barras vivas</span> de bem-estar.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A4E46] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Sabonetes 100% vegetais, curados pacientemente por 45 dias, livres de químicos sintéticos e enriquecidos com manteigas nobres, argilas medicinais e óleos essenciais puros. Encomende barras sob medida ou aprenda a formular em nossas aulas para iniciantes.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-explore-catalog-btn"
                onClick={handleCatalog}
                className="px-6 py-3.5 rounded-xl bg-[#5C6B47] hover:bg-[#4B5839] text-[#FAF7F2] font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Ver Sabonetes & Galeria</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-custom-builder-btn"
                onClick={handleCustom}
                className="px-6 py-3.5 rounded-xl bg-[#EADCC9] hover:bg-[#DFCDB7] text-[#3B2F2F] font-semibold text-sm sm:text-base border border-[#D4A373]/60 shadow-xs transition-all duration-200 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#8C6D53]" />
                <span>Criar Sabão Sob Medida</span>
              </button>

              <button
                id="hero-classes-btn"
                onClick={handleClasses}
                className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-[#EFE9DF] text-[#5C6B47] font-semibold text-sm transition-all duration-200 flex items-center gap-2 border border-[#B7CCA6]/70"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Aulas Online Gratuitas</span>
              </button>
            </div>

            {/* Four Key Artisanal Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#EAE3D6] flex items-center justify-center text-[#5C6B47] shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C2723]">100% Vegetal</h4>
                  <p className="text-[11px] text-[#786A60]">Sem gordura animal</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#EAE3D6] flex items-center justify-center text-[#8C6D53] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C2723]">45 Dias Cura</h4>
                  <p className="text-[11px] text-[#786A60]">Suavidade máxima</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#EAE3D6] flex items-center justify-center text-[#5C6B47] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C2723]">Zero Sintéticos</h4>
                  <p className="text-[11px] text-[#786A60]">Sem sulfatos/lauril</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#EAE3D6] flex items-center justify-center text-[#C2593F] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2C2723]">Feito à Mão</h4>
                  <p className="text-[11px] text-[#786A60]">Lotes pequenos</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Floating Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Artisan Showcase Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=1000&q=80"
                  alt="Sabonete artesanal de lavanda e flores secas feito à mão"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#5C6B47] text-[11px] font-semibold tracking-wide uppercase mb-1">
                    Lote da Estação • Cura Concluída
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Lavanda Provençal & Manteiga de Karité
                  </h3>
                  <p className="text-xs text-white/85">
                    Infusão de 40 dias em azeite de oliva e flores de lavanda francesa
                  </p>
                </div>
              </div>

              {/* Floating Custom Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#FAF7F2] p-3.5 rounded-2xl shadow-lg border border-[#D4A373]/40 max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#5C6B47] text-white flex items-center justify-center font-serif text-lg font-bold">
                    CP
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2C2723]">Cold Process</h5>
                    <p className="text-[10px] text-[#786A60]">Glicerina 100% preservada</p>
                  </div>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-md border border-[#E8E1D5] hidden sm:flex items-center gap-2">
                <div className="flex text-amber-500 text-xs">
                  {'★'.repeat(5)}
                </div>
                <span className="text-xs font-bold text-[#2C2723]">4.9 / 5.0</span>
                <span className="text-[10px] text-gray-500">(350+ avaliações)</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
