import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Printer, 
  Download, 
  X,
  HelpCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { COURSE_MODULES } from '../data/mockData';
import { CourseLesson, CourseModule } from '../types';

export const OnlineClasses: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<CourseModule>(COURSE_MODULES[0]);
  const [activeLesson, setActiveLesson] = useState<CourseLesson>(COURSE_MODULES[0].lessons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['les-1-1']);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showSafetyQuizModal, setShowSafetyQuizModal] = useState(false);

  // Safety Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const safetyQuizQuestions = [
    {
      question: '1. Ao preparar a lixívia cáustica, qual é a ordem correta e segura de mistura?',
      options: [
        'A. Jogar a água destilada sobre as escamas de soda na jarra.',
        'B. Adicionar as escamas de soda LENTAMENTE sobre a água destilada fria, mexendo sempre.',
        'C. Misturar a soda diretamente nos óleos aquecidos sem dissolver em água.',
        'D. Tanto faz a ordem, a reação é a mesma.'
      ],
      correctIndex: 1,
      explanation: 'Correto! A regra de ouro é: Soda sobre a água SEMPRE. Adicionar água sobre a soda causa erupção violenta e respingos corrosivos.'
    },
    {
      question: '2. Qual dos materiais abaixo é TOTALMENTE PROIBIDO na saboaria por reagir com a soda cáustica gerando gás tóxico?',
      options: [
        'A. Aço Inox 304/316',
        'B. Silicone culinário resistente',
        'C. Alumínio e Teflon',
        'D. Plástico Polipropileno (PP número 5)'
      ],
      correctIndex: 2,
      explanation: 'Correto! O alumínio reage instantaneamente com hidróxido de sódio liberando gás hidrogênio altamente inflamável e tóxico. Use sempre Inox, Silicone ou Plástico PP5.'
    },
    {
      question: '3. O que você deve fazer se uma gota de lixívia cáustica espirrar acidentalmente na pele?',
      options: [
        'A. Lavar imediatamente com água corrente abundante por 15 minutos.',
        'B. Cobrir com óleo de cozinha e esperar secar.',
        'C. Colocar gelo direto sem lavar.',
        'D. Não precisa fazer nada, o sabão limpa a pele.'
      ],
      correctIndex: 0,
      explanation: 'Correto! Água corrente contínua e abundante é o protocolo internacional padrão para diluir e remover o agente alcalino imediatamente.'
    }
  ];

  const handleLessonSelect = (lesson: CourseLesson) => {
    setActiveLesson(lesson);
    setIsPlaying(false);
  };

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    safetyQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  return (
    <section id="aulas-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] text-[#5C4533] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#5C6B47]" />
          Escola de Saboaria para Iniciantes
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2723]">
          Curso de Saboaria Artesanal Ancestral
        </h2>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Aprenda o método Cold Process (saponificação a frio) do zero ao avançado com aulas em vídeo, protocolos de segurança de lixívia, fichas de formulação e cálculo de SAP.
        </p>
      </div>

      {/* Course Action Bar / Safety Alert */}
      <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#E8E1D5] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E2EAD8] text-[#5C6B47] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#2C2723]">
              Protocolo de Segurança com Hidróxido de Sódio (NaOH)
            </h4>
            <p className="text-[11px] sm:text-xs text-[#786A60]">
              Antes de mexer com a lixívia, teste seus conhecimentos sobre EPIs e ventilação.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => {
              setQuizAnswers({});
              setQuizScore(null);
              setShowSafetyQuizModal(true);
            }}
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Fazer Teste de Segurança</span>
          </button>

          {activeLesson.recipeSheetContent && (
            <button
              onClick={() => setShowRecipeModal(true)}
              className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-white text-[#5C4533] border border-[#D4A373]/50 hover:bg-[#F4EFE6] text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#8C6D53]" />
              <span>Ver Ficha Técnica PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Course Layout: Video Player + Modules List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Active Video Player & Lesson Notes (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Simulated Interactive Video Screen */}
          <div className="bg-[#2C2723] rounded-3xl overflow-hidden shadow-xl border border-black/20 text-white">
            <div className="relative aspect-16/9 bg-black flex items-center justify-center">
              
              {!isPlaying ? (
                <div className="relative w-full h-full">
                  <img
                    src={activeLesson.thumbnail || selectedModule.coverImage}
                    alt={activeLesson.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#5C6B47] text-white text-xs font-bold uppercase tracking-wider">
                        {activeLesson.isFreePreview ? 'Aula Aberta Gratuita' : 'Aula do Curso'}
                      </span>
                      <span className="text-xs bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        {activeLesson.duration}
                      </span>
                    </div>

                    <div className="text-center space-y-3">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#5C6B47] hover:bg-[#6E7F55] text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 mx-auto"
                      >
                        <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 ml-1" />
                      </button>
                      <h3 className="font-serif text-lg sm:text-xl font-bold max-w-lg mx-auto">
                        {activeLesson.title}
                      </h3>
                    </div>

                    <div className="text-xs text-gray-300 text-center">
                      Clique para iniciar a reprodução da videoaula em alta definição
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-black/60 via-transparent to-black/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      Reproduzindo Aula em Vídeo
                    </span>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-md bg-white/10"
                    >
                      Pausar
                    </button>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto animate-pulse">
                      <Sparkles className="w-6 h-6 text-[#D4A373]" />
                    </div>
                    <p className="text-xs text-gray-300 max-w-md mx-auto">
                      Demonstração da bancada de saboaria, pesagem da lixívia, termometria e teste de traço a frio.
                    </p>
                  </div>

                  {/* Video Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5C6B47] w-2/3 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>08:15</span>
                      <span>{activeLesson.duration}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Video Controls Bar */}
            <div className="p-4 bg-[#1F1B18] flex items-center justify-between gap-4 text-xs border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-[#5C6B47] text-white font-semibold flex items-center gap-1"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{isPlaying ? 'Pausar' : 'Play'}</span>
                </button>
                <span className="text-gray-400 hidden sm:inline">{activeLesson.duration}</span>
              </div>

              <button
                onClick={() => markLessonComplete(activeLesson.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  completedLessons.includes(activeLesson.id)
                    ? 'bg-emerald-800/80 text-emerald-200'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{completedLessons.includes(activeLesson.id) ? 'Concluída ✓' : 'Marcar como Concluída'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Syllabus & Detailed Notes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#8C6D53]">
                {selectedModule.title}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2723] mt-1">
                {activeLesson.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4E46] mt-2 leading-relaxed">
                {activeLesson.summary}
              </p>
            </div>

            {/* Step-by-Step Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#5C4533] uppercase tracking-wider">
                Etapas abordadas nesta aula:
              </h4>
              <ol className="space-y-2 text-xs text-[#2C2723]">
                {activeLesson.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8E1D5]">
                    <span className="w-5 h-5 rounded-full bg-[#5C6B47] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Safety Warnings if present */}
            {activeLesson.safetyRules && (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Avisos Importantes de Segurança Química:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-amber-900 text-[11px]">
                  {activeLesson.safetyRules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials and Pro Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D5] space-y-1 text-xs">
                <span className="font-bold text-[#5C4533] block">Materiais e Utensílios:</span>
                <p className="text-[11px] text-[#786A60]">{activeLesson.materials.join(', ')}</p>
              </div>

              <div className="bg-[#EBF1E6] p-4 rounded-2xl border border-[#D1E0C9] space-y-1 text-xs">
                <span className="font-bold text-[#4B5E39] block">Dica de Bancada da Mestre:</span>
                <p className="text-[11px] text-[#556943]">{activeLesson.tips}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Course Curriculum & Modules (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4A373]" />
                <span className="text-xs font-bold text-[#2C2723]">Seu Progresso no Curso</span>
              </div>
              <span className="text-xs font-bold text-[#5C6B47]">
                {completedLessons.length} de {COURSE_MODULES.reduce((a, m) => a + m.lessons.length, 0)} aulas
              </span>
            </div>

            <div className="w-full h-2 bg-[#EAE2D5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5C6B47] rounded-full transition-all duration-500"
                style={{ 
                  width: `${(completedLessons.length / COURSE_MODULES.reduce((a, m) => a + m.lessons.length, 0)) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Module Selector Tabs */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8C6D53]">
              Módulos do Curso:
            </span>

            <div className="space-y-2">
              {COURSE_MODULES.map((module) => {
                const isSelected = selectedModule.id === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setSelectedModule(module);
                      setActiveLesson(module.lessons[0]);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white border-[#5C6B47] shadow-sm ring-1 ring-[#5C6B47]/20'
                        : 'bg-white/80 border-[#E8E1D5] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                          Módulo {module.number} • {module.totalDuration}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#2C2723] mt-0.5 leading-snug">
                          {module.title}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EAE2D5] text-[#5C4533] font-semibold shrink-0">
                        {module.lessons.length} aulas
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Module Lesson List */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E1D5] space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-[#5C4533] uppercase tracking-wider">
              Aulas de {selectedModule.title}:
            </h4>

            <div className="space-y-2">
              {selectedModule.lessons.map((lesson, idx) => {
                const isActive = activeLesson.id === lesson.id;
                const isDone = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#F2F6ED] border-[#5C6B47] text-[#2C2723] shadow-2xs'
                        : 'bg-[#FAF7F2] border-[#E8E1D5] hover:bg-[#F4EFE6] text-[#5A4E46]'
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : isActive ? 'bg-[#5C6B47] text-white' : 'bg-[#EAE2D5] text-[#786A60]'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug line-clamp-1">{lesson.title}</div>
                        <div className="text-[10px] text-[#786A60] flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                          {lesson.isFreePreview && (
                            <span className="text-emerald-700 font-semibold">• Grátis</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#5C6B47]' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Safety Quiz Modal */}
      {showSafetyQuizModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2C2723]">
                    Teste de Segurança da Soda Cáustica
                  </h3>
                  <p className="text-xs text-[#786A60]">
                    Responda às 3 perguntas fundamentais para saboeiros
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSafetyQuizModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {safetyQuizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-white p-4 rounded-2xl border border-[#E8E1D5] space-y-2.5">
                  <h4 className="text-xs font-bold text-[#2C2723]">{q.question}</h4>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-[#E2EAD8] border-[#5C6B47] text-[#2C2723] font-semibold'
                              : 'bg-[#FAF7F2] border-[#E8E1D5] hover:bg-white text-[#5A4E46]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {quizScore !== null ? (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                quizScore === 3
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  {quizScore === 3 ? '🎉 Parabéns! 3 de 3 acertos!' : `Resultado: ${quizScore} de 3 acertos.`}
                </div>
                <p>
                  {quizScore === 3
                    ? 'Você domina os protocolos essenciais de lixívia e EPIs. Está pronto(a) para a bancada com segurança!'
                    : 'Revise as aulas do Módulo 1 sobre manuseio da lixívia antes de iniciar sua primeira produção.'}
                </p>
                <button
                  onClick={() => setShowSafetyQuizModal(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-[#5C6B47] text-white font-semibold text-xs"
                >
                  Concluir Teste
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowSafetyQuizModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < 3}
                  className="px-5 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] disabled:opacity-40 text-white font-semibold text-xs shadow-xs"
                >
                  Verificar Respostas
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Printable Recipe Sheet Modal */}
      {showRecipeModal && activeLesson.recipeSheetContent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                  Ficha Técnica de Formulação Oficial • 1kg
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2723] mt-1">
                  {activeLesson.recipeSheetTitle || 'Receita da Aula'}
                </h3>
              </div>

              <button
                onClick={() => setShowRecipeModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipe Content */}
            <div className="space-y-4 text-xs text-[#2C2723]">
              
              {/* Fats Table */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] space-y-2">
                <span className="font-bold text-[#5C4533] block">1. Proporção de Gorduras & Óleos (Total: 1000g):</span>
                <div className="divide-y divide-gray-100">
                  {activeLesson.recipeSheetContent.fatsRatio.map((fat, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <span className="font-medium">{fat.name}</span>
                      <span className="font-mono font-bold text-[#5C6B47]">{fat.weight} ({fat.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lye and Water */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] space-y-1">
                  <span className="font-bold text-[#5C4533]">Lixívia Calculada:</span>
                  <p className="font-mono font-bold text-[#2C2723]">{activeLesson.recipeSheetContent.lyeWater.lye}</p>
                  <p className="text-[11px] text-gray-500">{activeLesson.recipeSheetContent.lyeWater.water}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                    {activeLesson.recipeSheetContent.lyeWater.superfat}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] space-y-1">
                  <span className="font-bold text-[#5C4533]">Tempo de Cura & Aditivos:</span>
                  <p className="text-[11px] text-[#5C4533] font-medium">{activeLesson.recipeSheetContent.additives.join(' • ')}</p>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">
                    Cura: {activeLesson.recipeSheetContent.cureTime}
                  </p>
                </div>
              </div>

            </div>

            {/* Print Action Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setShowRecipeModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100"
              >
                Fechar
              </button>

              <button
                onClick={handlePrintRecipe}
                className="px-5 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar Ficha em PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
