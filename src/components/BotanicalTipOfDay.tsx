import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Lightbulb, 
  RefreshCw, 
  ChevronRight, 
  BookOpen, 
  X,
  Droplets,
  Share2,
  Check
} from 'lucide-react';
import { INGREDIENTS_DATABASE } from '../data/mockData';
import { IngredientInfo } from '../types';

interface BotanicalTipOfDayProps {
  onNavigateToIngredients?: () => void;
  onSelectIngredient?: (ingredient: IngredientInfo) => void;
}

export const BotanicalTipOfDay: React.FC<BotanicalTipOfDayProps> = ({
  onNavigateToIngredients,
  onSelectIngredient
}) => {
  // Deterministic daily tip index based on current date
  const getTodayIndex = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    return dayOfYear % INGREDIENTS_DATABASE.length;
  };

  const [currentIndex, setCurrentIndex] = useState<number>(getTodayIndex);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const currentIngredient = INGREDIENTS_DATABASE[currentIndex] || INGREDIENTS_DATABASE[0];

  const handleNextTip = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % INGREDIENTS_DATABASE.length);
      setIsChanging(false);
    }, 150);
  };

  const handleCopyTip = () => {
    const textToCopy = `🌿 Dica Botânica do Dia (${currentIngredient.name}): "${currentIngredient.artisanTip}" — Ateliê Botânico`;
    navigator.clipboard?.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenIngredient = () => {
    if (onSelectIngredient) {
      onSelectIngredient(currentIngredient);
    }
    if (onNavigateToIngredients) {
      onNavigateToIngredients();
    }
  };

  if (isDismissed) {
    return (
      <div className="bg-[#F0EAE1] border-b border-[#E2D8C9] py-1 px-4 text-center">
        <button
          id="reopen-botanical-tip-btn"
          onClick={() => setIsDismissed(false)}
          className="inline-flex items-center gap-1.5 text-xs text-[#5C6B47] hover:text-[#3B462C] font-medium transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Ver Dica Botânica do Dia</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      id="botanical-tip-of-the-day-banner"
      className="relative bg-gradient-to-r from-[#FAF6EF] via-[#F4EDE2] to-[#FAF6EF] border-b border-[#E4D9C8] text-[#2C2723] transition-all duration-300 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left section: Badge + Content */}
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            {/* Icon / Thumbnail */}
            <div className="relative shrink-0 mt-0.5 sm:mt-0">
              <div className="w-9 h-9 rounded-xl bg-[#5C6B47]/10 border border-[#5C6B47]/20 flex items-center justify-center text-[#5C6B47] overflow-hidden shadow-2xs">
                {currentIngredient.image ? (
                  <img 
                    src={currentIngredient.image} 
                    alt={currentIngredient.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Leaf className="w-4 h-4" />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#D4A373] text-[9px] text-white font-bold">
                ★
              </span>
            </div>

            {/* Tip text and details */}
            <div className={`flex-1 min-w-0 transition-opacity duration-150 ${isChanging ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#5C6B47] text-white tracking-wide uppercase">
                  <Sparkles className="w-3 h-3" />
                  Dica Botânica do Dia
                </span>
                <span className="text-xs font-bold text-[#3B2F2F] truncate">
                  {currentIngredient.name}
                </span>
                <span className="text-[11px] text-[#7A6E65] italic hidden sm:inline">
                  ({currentIngredient.scientificName})
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E8DEC8] text-[#5C6B47] font-medium hidden md:inline">
                  {currentIngredient.category}
                </span>
              </div>

              {/* Artisan Tip Quote */}
              <p className="text-xs sm:text-sm text-[#4A3E38] line-clamp-2 sm:line-clamp-1 leading-snug">
                <span className="font-semibold text-[#5C6B47]">Conselho de Saboaria: </span>
                "{currentIngredient.artisanTip}"
              </p>

              {/* Extra details when expanded */}
              {isExpanded && (
                <div className="mt-2.5 pt-2 border-t border-[#E2D8C9] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#554942]">
                  <div>
                    <span className="font-semibold text-[#3B2F2F]">Como Usamos na Prática:</span> {currentIngredient.howWeUse}
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2F2F]">Benefícios-Chave:</span> {currentIngredient.benefits.slice(0, 3).join(', ')}.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
            <button
              id="tip-toggle-expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg text-[#5C6B47] hover:bg-[#EAE0D2] transition-colors"
              title={isExpanded ? "Mostrar menos" : "Ver mais detalhes"}
            >
              {isExpanded ? "Menos" : "Detalhes"}
            </button>

            {onNavigateToIngredients && (
              <button
                id="tip-view-guide-btn"
                onClick={handleOpenIngredient}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#5C6B47] hover:bg-[#4A5738] text-white flex items-center gap-1 shadow-2xs transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver no Guia</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}

            <button
              id="tip-copy-btn"
              onClick={handleCopyTip}
              className="p-1.5 text-xs rounded-lg text-[#6C5E53] hover:bg-[#EAE0D2] hover:text-[#2C2723] transition-colors"
              title="Copiar conselho botânico"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#5C6B47]" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              id="tip-next-btn"
              onClick={handleNextTip}
              className="p-1.5 text-xs rounded-lg text-[#6C5E53] hover:bg-[#EAE0D2] hover:text-[#2C2723] transition-colors"
              title="Próxima dica botânica"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChanging ? 'animate-spin' : ''}`} />
            </button>

            <button
              id="tip-close-btn"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 text-xs rounded-lg text-[#8C7E73] hover:bg-[#EAE0D2] hover:text-[#2C2723] transition-colors"
              title="Fechar banner de dica"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
