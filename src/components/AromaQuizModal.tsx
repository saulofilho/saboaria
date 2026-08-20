import React, { useState } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Droplets, 
  Wind, 
  Sun, 
  Moon, 
  Heart, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  BookOpen, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { INGREDIENTS_DATABASE } from '../data/mockData';
import { IngredientInfo } from '../types';

interface AromaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIngredient?: (ingredient: IngredientInfo) => void;
  onNavigateToIngredients?: () => void;
  onNavigateToCustomBuilder?: () => void;
}

interface QuizOption {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[]; // Match keywords for ingredient benefits / categories
}

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export const AromaQuizModal: React.FC<AromaQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectIngredient,
  onNavigateToIngredients,
  onNavigateToCustomBuilder
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      title: 'Qual é o seu tipo de pele ou necessidade predominante?',
      subtitle: 'Isso define a base emoliente e as propriedades medicinais ideais',
      options: [
        {
          id: 'seca_sensivel',
          label: 'Seca ou Sensível',
          desc: 'Precisa de nutrição profunda, sensação calmante e barreira protetora.',
          icon: Droplets,
          tags: ['Pele Seca', 'Pele Sensível', 'Nutrição Intensa', 'Hidratante', 'Calmante']
        },
        {
          id: 'oleosa_mista',
          label: 'Oleosa ou com Tendência a Acne',
          desc: 'Busca controle suave de oleosidade, ação purificante e desintoxicante.',
          icon: Wind,
          tags: ['Pele Oleosa', 'Pele Acneica', 'Desintoxicante', 'Antisséptico', 'Adstringente']
        },
        {
          id: 'madura_ressecada',
          label: 'Madura ou Desvitalizada',
          desc: 'Deseja ação antioxidante, elasticidade e regeneração celular diária.',
          icon: Sparkles,
          tags: ['Pele Madura', 'Antioxidante', 'Regenerador', 'Cicatrizante']
        },
        {
          id: 'normal_equilibrio',
          label: 'Normal a Equilibrada',
          desc: 'Quer manutenção do viço natural, toque sedoso e aroma sensorial envolvente.',
          icon: Leaf,
          tags: ['Todos os Tipos', 'Equilibrante', 'Suavizante']
        }
      ]
    },
    {
      id: 2,
      title: 'Qual atmosfera aromaterápica mais combina com seu momento?',
      subtitle: 'Os óleos essenciais atuam tanto no bem-estar físico quanto emocional',
      options: [
        {
          id: 'relaxante_calmo',
          label: 'Relaxamento & Noite Serena',
          desc: 'Florais aveludados e notas de ervas campestres para acalmar a mente.',
          icon: Moon,
          tags: ['Lavanda', 'Floral', 'Relaxamento', 'Camomila', 'Alfazema']
        },
        {
          id: 'energizante_fresco',
          label: 'Energia, Clareza & Foco Matinal',
          desc: 'Cítricos vibrantes e notas herbais frescas para despertar os sentidos.',
          icon: Sun,
          tags: ['Alecrim', 'Capim-Limão', 'Cítrico', 'Néroli', 'Revigorante', 'Clareza Mental']
        },
        {
          id: 'terroso_amadeirado',
          label: 'Aconchego, Terra & Raízes',
          desc: 'Resinas nobres, especiarias suaves e notas amadeiradas profundas.',
          icon: Leaf,
          tags: ['Cedro', 'Especiarias', 'Canela', 'Bálsamo', 'Ancestral']
        },
        {
          id: 'suave_neutro',
          label: 'Neutro & Hipoalergênico',
          desc: 'Aroma ultraleve ou puro aroma natural dos óleos e manteigas vegetais.',
          icon: Heart,
          tags: ['Karité', 'Oliva', 'Aveia', 'Sensível']
        }
      ]
    },
    {
      id: 3,
      title: 'Qual textura ou acabamento você mais valoriza no banho?',
      subtitle: 'O equilíbrio perfeito entre espuma, cremosidade e esfoliação',
      options: [
        {
          id: 'cremoso_manteiga',
          label: 'Espuma Densa & Ultramanteigada',
          desc: 'Sensação aveludada de spa que deixa a pele macia logo ao enxaguar.',
          icon: Droplets,
          tags: ['Manteiga de Karité', 'Manteiga de Cacau', 'Murumuru', 'Óleo de Oliva']
        },
        {
          id: 'esfoliante_renovador',
          label: 'Esfoliação Natural Suave',
          desc: 'Textura com grãos botânicos finos ou sementes para renovação celular.',
          icon: Sparkles,
          tags: ['Aveia Coloidal', 'Café', 'Argila', 'Sementes de Papoula']
        },
        {
          id: 'argila_mineral',
          label: 'Purificação com Argilas Medicinais',
          desc: 'Toque sedoso mineral que remove impurezas e fecha os poros.',
          icon: Wind,
          tags: ['Argila Rosa', 'Argila Verde', 'Argila Amarela', 'Desintoxicante']
        },
        {
          id: 'espuma_abundante',
          label: 'Muita Espuma Aerada & Leve',
          desc: 'Limpeza refrescante com bolhas volumosas e enxágue rápido.',
          icon: Leaf,
          tags: ['Óleo de Coco', 'Óleo de Babaçu', 'Óleo de Rícino']
        }
      ]
    }
  ];

  if (!isOpen) return null;

  const currentQ = questions[currentStep];

  const handleSelectOption = (optionId: string) => {
    const nextAnswers = { ...selectedAnswers, [currentQ.id]: optionId };
    setSelectedAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Calculate top ingredient recommendations based on chosen tags
  const recommendedIngredients = React.useMemo(() => {
    if (!showResults) return [];

    // Collect all chosen option tags
    const activeTags: string[] = [];
    questions.forEach((q) => {
      const chosenOptionId = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === chosenOptionId);
      if (opt) {
        activeTags.push(...opt.tags);
      }
    });

    // Score ingredients based on tag occurrences
    const scored = INGREDIENTS_DATABASE.map((ing) => {
      let score = 0;
      activeTags.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (ing.name.toLowerCase().includes(lowerTag)) score += 4;
        if (ing.category.toLowerCase().includes(lowerTag)) score += 3;
        if (ing.suitableSkin.some((s) => s.toLowerCase().includes(lowerTag))) score += 3;
        if (ing.benefits.some((b) => b.toLowerCase().includes(lowerTag))) score += 2;
        if (ing.description.toLowerCase().includes(lowerTag)) score += 1;
      });

      return { ingredient: ing, score };
    });

    // Sort descending by score and pick the top 4
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.ingredient);
  }, [showResults, selectedAnswers]);

  return (
    <div 
      id="aroma-quiz-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5C6B47]/10 text-[#5C6B47] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                Diagnóstico de Saboaria & Alquimia
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2723]">
                Encontre seu Aroma & Ingredientes Ideais
              </h3>
            </div>
          </div>

          <button
            id="close-quiz-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar (if in quiz) */}
        {!showResults && (
          <div className="bg-[#EFE9DF] px-6 py-2 border-b border-[#E8E1D5] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#5C4533]">
              Pergunta {currentStep + 1} de {questions.length}
            </span>
            <div className="w-32 sm:w-48 h-2 bg-[#E2D5C3] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5C6B47] rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {!showResults ? (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#2C2723]">
                  {currentQ.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#786A60]">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQ.options.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedAnswers[currentQ.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      id={`quiz-opt-${option.id}`}
                      onClick={() => handleSelectOption(option.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#5C6B47] bg-[#EBF1E6] shadow-2xs ring-1 ring-[#5C6B47]'
                          : 'border-[#E8E1D5] bg-white hover:border-[#5C6B47]/50 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl transition-colors ${
                          isSelected ? 'bg-[#5C6B47] text-white' : 'bg-[#F4EDE2] text-[#8C6D53] group-hover:bg-[#5C6B47] group-hover:text-white'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <h5 className="font-bold text-xs sm:text-sm text-[#2C2723]">
                            {option.label}
                          </h5>
                          <p className="text-[11px] sm:text-xs text-[#786A60] leading-snug">
                            {option.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#EFE8DC] flex items-center justify-end text-[11px] font-semibold text-[#5C6B47]">
                        <span>Selecionar</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back / Next buttons */}
              <div className="flex items-center justify-between pt-2">
                {currentStep > 0 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-4 py-2 text-xs font-semibold text-[#786A60] hover:text-[#2C2723]"
                  >
                    ← Pergunta Anterior
                  </button>
                ) : <div />}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2 bg-[#EBF1E6] p-5 rounded-3xl border border-[#D1E0C9]">
                <div className="w-10 h-10 rounded-full bg-[#5C6B47] text-white flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2723]">
                  Seu Perfil Botânico Personalizado
                </h4>
                <p className="text-xs sm:text-sm text-[#5C6B47] font-medium max-w-md mx-auto">
                  Com base nas suas respostas, selecionamos os 4 ingredientes botânicos de maior afinidade com a sua pele e momento sensorial:
                </p>
              </div>

              {/* Recommended Ingredients Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedIngredients.map((ing) => (
                  <div
                    key={ing.id}
                    id={`quiz-rec-ing-${ing.id}`}
                    onClick={() => {
                      if (onSelectIngredient) {
                        onSelectIngredient(ing);
                        onClose();
                      }
                    }}
                    className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] hover:border-[#5C6B47] shadow-2xs hover:shadow-md transition-all cursor-pointer flex gap-3 items-center group"
                  >
                    <img
                      src={ing.image}
                      alt={ing.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E1D5] shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#8C6D53] uppercase tracking-wider block">
                        {ing.category}
                      </span>
                      <h5 className="font-serif text-xs sm:text-sm font-bold text-[#2C2723] group-hover:text-[#5C6B47] transition-colors truncate">
                        {ing.name}
                      </h5>
                      <p className="text-[11px] text-[#786A60] italic truncate">
                        {ing.scientificName}
                      </p>
                      <p className="text-[11px] text-[#5C4533] line-clamp-1 mt-0.5">
                        {ing.benefits.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advice Box */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-[#5C4533] space-y-1">
                <span className="font-bold flex items-center gap-1 text-[#5C6B47]">
                  <Leaf className="w-3.5 h-3.5" />
                  Dica de Formulação para Você:
                </span>
                <p className="text-[11px] text-[#786A60] leading-relaxed">
                  Esses botânicos podem ser combinados na ferramenta de <strong>Sabão Sob Medida</strong> para criar um lote exclusivo com sua sinergia aromaterápica perfeita!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  id="quiz-restart-btn"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#786A60] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Quiz</span>
                </button>

                {onNavigateToCustomBuilder && (
                  <button
                    id="quiz-to-custom-btn"
                    onClick={() => {
                      onNavigateToCustomBuilder();
                      onClose();
                    }}
                    className="w-full sm:flex-1 px-5 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Criar Sabão com esses Ingredientes</span>
                  </button>
                )}

                {onNavigateToIngredients && (
                  <button
                    id="quiz-to-guide-btn"
                    onClick={() => {
                      onNavigateToIngredients();
                      onClose();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#EFE9DF] hover:bg-[#E2D5C3] text-xs font-semibold text-[#5C4533] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver no Guia</span>
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
