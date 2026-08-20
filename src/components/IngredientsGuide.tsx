import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Droplets, 
  Layers, 
  X, 
  Lightbulb, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { INGREDIENTS_DATABASE } from '../data/mockData';
import { IngredientInfo } from '../types';

interface IngredientsGuideProps {
  searchQuery: string;
  onOpenCalculator: () => void;
}

export const IngredientsGuide: React.FC<IngredientsGuideProps> = ({
  searchQuery: initialSearchQuery,
  onOpenCalculator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedSkinBenefit, setSelectedSkinBenefit] = useState<string>('Todos');
  const [localSearch, setLocalSearch] = useState<string>(initialSearchQuery || '');
  const [activeIngredientModal, setActiveIngredientModal] = useState<IngredientInfo | null>(null);

  const categories = [
    'Todos',
    'Óleos & Manteigas Vegetais',
    'Óleos Essenciais Puros',
    'Argilas Medicinais',
    'Extratos & Ervas Botânicas',
    'Esfoliantes & Aditivos Naturais'
  ];

  const skinBenefits = [
    'Todos',
    'Pele Sensível',
    'Pele Seca',
    'Pele Oleosa',
    'Pele Acneica',
    'Pele Madura',
    'Cicatrizante'
  ];

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS_DATABASE.filter((ing) => {
      const matchesCat = selectedCategory === 'Todos' || ing.category === selectedCategory;
      const matchesSkin = selectedSkinBenefit === 'Todos' || 
        ing.suitableSkin.includes(selectedSkinBenefit) || 
        ing.benefits.some(b => b.toLowerCase().includes(selectedSkinBenefit.toLowerCase()));
      
      const query = localSearch.toLowerCase().trim();
      const matchesSearch = !query || 
        ing.name.toLowerCase().includes(query) ||
        ing.scientificName.toLowerCase().includes(query) ||
        ing.description.toLowerCase().includes(query) ||
        ing.benefits.some(b => b.toLowerCase().includes(query)) ||
        ing.artisanTip.toLowerCase().includes(query);

      return matchesCat && matchesSkin && matchesSearch;
    });
  }, [selectedCategory, selectedSkinBenefit, localSearch]);

  const soapmakingTips = [
    {
      title: 'O Segredo do Superfat (Sobreengorduramento)',
      desc: 'Deixar entre 5% e 8% dos óleos livres e não saponificados na barra garante que o sabonete limpe suavemente e crie um filme hidratante protetor na pele.',
      icon: Droplets
    },
    {
      title: 'Como Fixar Óleos Essenciais no Sabão',
      desc: 'Óleos cítricos evaporam fácil. Misture-os previamente com 1 colher de argila branca ou farinha de aveia finíssima antes de incorporar no traço para ancorar o aroma por meses.',
      icon: Sparkles
    },
    {
      title: 'Evitando a Cinza de Soda (Soda Ash)',
      desc: 'A névoa branca que se forma no topo é carbonato de sódio pelo contato com o ar. Borrife álcool de cereais 70% no topo assim que verter na forma e cubra.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="ingredientes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] text-[#5C4533] text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5 text-[#5C6B47]" />
          Botânica & Fitoterapia
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2723]">
          Guia de Ingredientes & Dicas do Saboeiro
        </h2>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Conheça as propriedades terapêuticas, nome científico, modo de uso na saponificação e dicas de alquimia de cada planta e óleo nobre do nosso ateliê.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="space-y-4 mb-8">
        
        {/* Search input and Calc Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por planta, benefício, nome botânico (ex: Karité, Lavanda, Rosácea...)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-white text-xs sm:text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#5C6B47] shadow-2xs"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#E2EAD8] hover:bg-[#D4E2C7] border border-[#B7CCA6] text-[#5C6B47] font-semibold text-xs flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Abrir Tabela SAP & Calculadora</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5C6B47] text-white shadow-xs'
                  : 'bg-white text-[#5A4E46] border border-[#E8E1D5] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Benefit Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#786A60] font-semibold text-xs shrink-0">Filtrar por benefício:</span>
          {skinBenefits.map((benefit) => (
            <button
              key={benefit}
              onClick={() => setSelectedSkinBenefit(benefit)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-colors ${
                selectedSkinBenefit === benefit
                  ? 'bg-[#3B2F2F] text-white'
                  : 'bg-[#F0ECE1] text-[#5C4533] hover:bg-[#E5DEC9]'
              }`}
            >
              {benefit}
            </button>
          ))}
        </div>

      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredIngredients.map((ing) => (
          <div
            key={ing.id}
            onClick={() => setActiveIngredientModal(ing)}
            className="group bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#EFE9DF]">
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#FAF7F2]/90 backdrop-blur-xs text-[#5C4533] text-[10px] font-bold uppercase tracking-wider border border-[#E8DFC8]">
                  {ing.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h3 className="font-serif text-base font-bold text-[#2C2723] group-hover:text-[#5C6B47] transition-colors leading-tight">
                  {ing.name}
                </h3>
                <p className="text-[11px] italic text-[#8C6D53]">
                  {ing.scientificName}
                </p>
                <p className="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed">
                  {ing.description}
                </p>

                {/* Key Benefit Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {ing.benefits.slice(0, 2).map((b, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#5C4533] font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer / Tip */}
            <div className="p-4 pt-0">
              <div className="pt-2.5 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#5C6B47] font-semibold">
                <span className="flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Ver Dica do Saboeiro
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips Cards for Soapmakers */}
      <div className="bg-gradient-to-r from-[#EAE2D5] via-[#F4EDE2] to-[#EAE2D5] rounded-3xl p-6 sm:p-8 border border-[#D4A373]/40 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#5C6B47] text-white flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2C2723]">
              Dicas de Ouro da Saboaria Artesanal Natural
            </h3>
            <p className="text-xs text-[#786A60]">
              Princípios essenciais para formular sabões botânicos perfeitos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {soapmakingTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[#5C6B47] font-bold text-xs">
                  <Icon className="w-4 h-4 text-[#8C6D53]" />
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs text-[#5A4E46] leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      {activeIngredientModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EADCC9] text-[#5C4533] text-[11px] font-bold uppercase tracking-wider">
                  {activeIngredientModal.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2723] mt-1">
                  {activeIngredientModal.name}
                </h3>
                <p className="text-xs italic text-[#8C6D53]">
                  {activeIngredientModal.scientificName} • Origem: {activeIngredientModal.origin}
                </p>
              </div>

              <button
                onClick={() => setActiveIngredientModal(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/8 rounded-2xl overflow-hidden bg-[#EFE9DF]">
              <img
                src={activeIngredientModal.image}
                alt={activeIngredientModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#5A4E46] leading-relaxed">
              {activeIngredientModal.description}
            </p>

            {/* Medicinal properties list */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#5C4533] block">Propriedades & Benefícios na Pele:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2C2723]">
                {activeIngredientModal.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#E8E1D5]">
                    <Leaf className="w-3.5 h-3.5 text-[#5C6B47] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How we formulate and Artisan tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#EFE9DF] p-3.5 rounded-2xl border border-[#E0D5C3] space-y-1 text-xs">
                <span className="font-bold text-[#5C4533] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#8C6D53]" />
                  Como usamos na fórmula:
                </span>
                <p className="text-[11px] text-[#6B5E55]">{activeIngredientModal.howWeUse}</p>
                {activeIngredientModal.sapValue && (
                  <span className="inline-block mt-1 text-[10px] font-mono font-semibold text-[#5C6B47]">
                    {activeIngredientModal.sapValue}
                  </span>
                )}
              </div>

              <div className="bg-[#EBF1E6] p-3.5 rounded-2xl border border-[#D1E0C9] space-y-1 text-xs">
                <span className="font-bold text-[#4B5E39] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Dica de Alquimia Artesanal:
                </span>
                <p className="text-[11px] text-[#556943]">{activeIngredientModal.artisanTip}</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveIngredientModal(null)}
                className="px-5 py-2 rounded-xl bg-[#5C6B47] text-white text-xs font-semibold"
              >
                Fechar Guia
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
