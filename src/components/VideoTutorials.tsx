import React, { useState, useMemo, useEffect } from 'react';
import { 
  Video, 
  Search, 
  PlayCircle, 
  Clock, 
  Star, 
  CheckSquare, 
  Square, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Timer, 
  Lightbulb, 
  Check, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { VIDEO_TUTORIALS } from '../data/mockData';
import { VideoTutorial } from '../types';

interface VideoTutorialsProps {
  searchQuery: string;
}

export const VideoTutorials: React.FC<VideoTutorialsProps> = ({
  searchQuery: globalSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todos');
  const [localSearch, setLocalSearch] = useState<string>(globalSearchQuery || '');
  const [activeTutorialModal, setActiveTutorialModal] = useState<VideoTutorial | null>(null);
  
  // Follow-along interactive step checklist
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Interactive Step Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const categories = [
    'Todos',
    'Iniciante',
    'Cold Process',
    'Sabonetes Medicinais',
    'Shampoo & Condicionador Sólido',
    'Lembrancinhas & Embalagens'
  ];

  const filteredTutorials = useMemo(() => {
    return VIDEO_TUTORIALS.filter((tut) => {
      const matchesCat = selectedCategory === 'Todos' || tut.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'Todos' || tut.difficulty === selectedDifficulty;
      
      const query = localSearch.toLowerCase().trim();
      const matchesSearch = !query ||
        tut.title.toLowerCase().includes(query) ||
        tut.description.toLowerCase().includes(query) ||
        tut.tags.some(t => t.toLowerCase().includes(query)) ||
        tut.ingredientsNeeded.some(i => i.item.toLowerCase().includes(query));

      return matchesCat && matchesDiff && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, localSearch]);

  const openTutorial = (tut: VideoTutorial) => {
    setActiveTutorialModal(tut);
    setCompletedSteps([]);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const toggleStepDone = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(s => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  const startQuickTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="tutoriais-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] text-[#5C4533] text-xs font-bold uppercase tracking-wider">
          <Video className="w-3.5 h-3.5 text-[#5C6B47]" />
          Acervo de Tutoriais Práticos
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2723]">
          Tutoriais Passo a Passo em Vídeo
        </h2>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Busque receitas completas organizadas por categoria: sabonetes faciais medicinais, shampoos sólidos em barra, técnicas de marmorizado swirl e embalagens rústicas.
        </p>
      </div>

      {/* Category Search & Filter Toolbar */}
      <div className="space-y-4 mb-8">
        
        {/* Search Bar & Difficulty filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tutorial por receita, óleo vegetal ou ingrediente (ex: Argila Rosa, Shampoo, Castela...)"
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

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-2 rounded-2xl border border-[#E8E1D5] shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6D53]" />
            <span className="text-xs text-[#786A60] font-medium">Nível:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs font-semibold text-[#2C2723] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos os Níveis</option>
              <option value="Fácil">Fácil (Iniciante)</option>
              <option value="Médio">Médio (Intermediário)</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>

        {/* Category Pills Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tutorial-cat-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5C6B47] text-white shadow-xs'
                  : 'bg-white text-[#5A4E46] border border-[#E8E1D5] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E1D5] p-8">
          <Video className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#2C2723]">Nenhum tutorial encontrado</h3>
          <p className="text-xs text-[#786A60] mt-1 max-w-md mx-auto">
            Experimente buscar por outros termos como "Cold Process", "Argila" ou "Embalagem".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSelectedDifficulty('Todos');
              setLocalSearch('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#5C6B47] text-white text-xs font-semibold"
          >
            Limpar Busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => (
            <div
              key={tut.id}
              onClick={() => openTutorial(tut)}
              className="group bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Video Thumbnail Frame */}
                <div className="relative aspect-16/9 bg-[#2C2723] overflow-hidden">
                  <img
                    src={tut.thumbnail}
                    alt={tut.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#5C6B47]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-7 h-7 ml-0.5" />
                    </div>
                  </div>

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2C2723]/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      {tut.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                      {tut.difficulty}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4A373]" />
                    <span>{tut.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#786A60]">
                    <span>{tut.views}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>{tut.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C2723] group-hover:text-[#5C6B47] transition-colors leading-snug">
                    {tut.title}
                  </h3>

                  <p className="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed">
                    {tut.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tut.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#5C4533] border border-[#E8E1D5] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#5C6B47] font-semibold">
                  <span>Ver Receita & Passo a Passo</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Video Tutorial Modal */}
      {activeTutorialModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[92vh] flex flex-col my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EADCC9] text-[#5C4533] text-[10px] font-bold uppercase tracking-wider">
                  {activeTutorialModal.category} • Nível {activeTutorialModal.difficulty}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2723] mt-0.5">
                  {activeTutorialModal.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveTutorialModal(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
              
              {/* Simulated Video Player */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black shadow-md">
                <img
                  src={activeTutorialModal.thumbnail}
                  alt={activeTutorialModal.title}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6 text-white">
                  <span className="text-xs bg-black/60 px-2.5 py-1 rounded-lg self-end backdrop-blur-xs">
                    {activeTutorialModal.duration}
                  </span>
                  
                  <div className="text-center space-y-2">
                    <button className="w-16 h-16 rounded-full bg-[#5C6B47] text-white flex items-center justify-center mx-auto shadow-lg hover:scale-105 transition-transform">
                      <PlayCircle className="w-9 h-9 ml-0.5" />
                    </button>
                    <p className="text-xs text-gray-200">
                      Tutorial prático guiado com proporções exatas e ponto de traço
                    </p>
                  </div>

                  <div className="text-[11px] text-gray-400 text-center">
                    Duração: {activeTutorialModal.duration} • {activeTutorialModal.views}
                  </div>
                </div>
              </div>

              {/* Recipe Ingredients & Equipment List */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Ingredients needed (7 Cols) */}
                <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#2C2723] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C6D53]" />
                    <span>Ingredientes & Quantidades Exatas</span>
                  </h4>

                  <div className="divide-y divide-gray-100 text-xs">
                    {activeTutorialModal.ingredientsNeeded.map((ing, i) => (
                      <div key={i} className="py-2 flex items-start justify-between gap-3">
                        <div>
                          <span className="font-bold text-[#2C2723]">{ing.item}</span>
                          <p className="text-[11px] text-gray-500">{ing.purpose}</p>
                        </div>
                        <span className="font-mono font-bold text-[#5C6B47] shrink-0 bg-[#E2EAD8] px-2 py-0.5 rounded-md">
                          {ing.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipments & Step Timer (5 Cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-2.5 text-xs">
                    <h4 className="font-serif text-base font-bold text-[#2C2723]">
                      Utensílios Necessários
                    </h4>
                    <ul className="space-y-1.5 text-[#5C4533]">
                      {activeTutorialModal.equipmentsNeeded.map((eq, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#5C6B47] shrink-0" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Timer Widget for Saponification */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4A373]/40 space-y-2 text-center">
                    <div className="flex items-center justify-between text-xs font-bold text-[#5C4533]">
                      <span className="flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5 text-[#8C6D53]" />
                        Timer da Bancada
                      </span>
                      {timerSeconds > 0 && (
                        <span className="text-emerald-700 font-mono text-sm animate-pulse">
                          {formatTime(timerSeconds)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={() => startQuickTimer(30)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E1D5] text-[11px] font-semibold text-[#5A4E46] hover:bg-[#EFE9DF]"
                      >
                        30s Pulso Mixer
                      </button>
                      <button
                        onClick={() => startQuickTimer(300)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E1D5] text-[11px] font-semibold text-[#5A4E46] hover:bg-[#EFE9DF]"
                      >
                        5 min Traço
                      </button>
                      <button
                        onClick={() => startQuickTimer(900)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E1D5] text-[11px] font-semibold text-[#5A4E46] hover:bg-[#EFE9DF]"
                      >
                        15 min Textura
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Step-by-Step Follow-Along Mode */}
              <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#2C2723]">
                      Passo a Passo Interativo (Checklist)
                    </h4>
                    <p className="text-xs text-[#786A60]">
                      Marque cada etapa concluída conforme você produz em sua bancada:
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#5C6B47] px-3 py-1 bg-[#E2EAD8] rounded-full">
                    {completedSteps.length} de {activeTutorialModal.steps.length} concluídos
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeTutorialModal.steps.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleStepDone(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                          isDone
                            ? 'bg-[#F2F6ED] border-[#5C6B47] text-[#2C2723]'
                            : 'bg-[#FAF7F2] border-[#E8E1D5] text-[#5A4E46] hover:bg-white'
                        }`}
                      >
                        <div className="mt-0.5 text-[#5C6B47]">
                          {isDone ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="text-xs leading-relaxed">
                          <strong className="text-[#2C2723] mr-1.5">Passo {idx + 1}:</strong>
                          <span className={isDone ? 'line-through text-gray-500' : ''}>{step}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pro tip */}
                <div className="bg-[#EBF1E6] p-4 rounded-2xl border border-[#D1E0C9] space-y-1 text-xs text-[#4B5E39]">
                  <div className="font-bold flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Dica Profissional da Receita:</span>
                  </div>
                  <p className="text-[11px] text-[#556943] leading-relaxed">
                    {activeTutorialModal.proTip}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E8E1D5] bg-white flex items-center justify-between">
              <span className="text-xs text-[#786A60]">
                {completedSteps.length === activeTutorialModal.steps.length
                  ? '🎉 Parabéns! Você concluiu todos os passos desta receita!'
                  : 'Siga a ordem dos passos para garantir saponificação estável.'}
              </span>

              <button
                onClick={() => setActiveTutorialModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#5C6B47] text-white text-xs font-semibold"
              >
                Concluir Tutorial
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
