import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Plus, 
  Sparkles, 
  X, 
  Check, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CUSTOMER_REVIEWS } from '../data/mockData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newSkinType, setNewSkinType] = useState('Pele Sensível');
  const [newSoapName, setNewSoapName] = useState('Lavanda Provençal & Manteiga de Karité');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filterOptions = ['Todos', '5 Estrelas', 'Pele Sensível', 'Pele Oleosa', 'Personalizado'];

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'Todos') return true;
    if (selectedFilter === '5 Estrelas') return r.rating === 5;
    if (selectedFilter === 'Personalizado') return r.soapPurchased.includes('Personalizado');
    return r.skinType.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(likedReviews.filter(l => l !== id));
      setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes - 1 } : r));
    } else {
      setLikedReviews([...likedReviews, id]);
      setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
    }
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      location: newLocation.trim() || 'Brasil',
      rating: newRating,
      date: 'Hoje',
      verifiedPurchase: true,
      skinType: newSkinType,
      soapPurchased: newSoapName,
      title: newTitle.trim() || 'Experiência maravilhosa com o sabonete',
      comment: newComment.trim(),
      likes: 1,
      tags: ['Compra Verificada', '100% Natural']
    };

    setReviews([created, ...reviews]);
    setReviewSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      setNewAuthor('');
      setNewLocation('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section id="depoimentos-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] text-[#5C4533] text-xs font-bold uppercase tracking-wider">
          <MessageSquareHeart className="w-3.5 h-3.5 text-[#C2593F]" />
          Voz dos Nossos Clientes
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2723]">
          Histórias Reais & Depoimentos Botânicos
        </h2>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Veja a transformação na saúde da pele de quem abandonou os sabonetes industriais com lauril sulfato e abraçou o cuidado ancestral da saboaria a frio.
        </p>
      </div>

      {/* Review Metrics Banner & "Deixar Depoimento" Button */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Rating Breakdown */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2723]">
              4.9
            </div>
            <div className="flex text-amber-500 text-sm">
              {'★'.repeat(5)}
            </div>
            <span className="text-[11px] text-[#786A60] font-medium block">
              Baseado em 350+ avaliações reais
            </span>
          </div>

          <div className="h-12 w-[1px] bg-[#E8E1D5] hidden sm:block" />

          <div className="grid grid-cols-2 gap-4 text-xs text-[#5C4533]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5C6B47]" />
              <div>
                <span className="font-bold block text-[#2C2723]">99% Recomendação</span>
                <span className="text-[10px] text-gray-500">Peles sensíveis e atópicas</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#8C6D53]" />
              <div>
                <span className="font-bold block text-[#2C2723]">Compradores Reais</span>
                <span className="text-[10px] text-gray-500">Avaliações 100% autênticas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Create Review CTA */}
        <button
          id="open-create-review-btn"
          onClick={() => setShowReviewModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-all whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Escrever Meu Depoimento</span>
        </button>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <span className="text-xs font-bold text-[#5C4533] shrink-0 mr-1">Filtrar:</span>
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedFilter(opt)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === opt
                ? 'bg-[#3B2F2F] text-[#FAF7F2] shadow-2xs'
                : 'bg-white text-[#5A4E46] border border-[#E8E1D5] hover:bg-[#FAF7F2]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => {
          const isLiked = likedReviews.includes(rev.id);
          return (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#E8E1D5]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2C2723] flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        {rev.verifiedPurchase && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Compra Verificada" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#786A60]">{rev.location} • {rev.date}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-500 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>

                {/* Soap Tag & Skin Type */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-[#EADCC9] text-[#5C4533] font-semibold">
                    {rev.soapPurchased}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#786A60] border border-[#E8E1D5]">
                    {rev.skinType}
                  </span>
                </div>

                {/* Review Text */}
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#2C2723] leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#5A4E46] mt-1.5 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Review Footer / Upvote */}
              <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {rev.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] text-[#5C6B47] font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                    isLiked
                      ? 'bg-[#E2EAD8] border-[#5C6B47] text-[#5C6B47]'
                      : 'border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Útil ({rev.likes})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                  Compartilhe sua Experiência
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2723] mt-0.5">
                  Deixar um Depoimento
                </h3>
              </div>

              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2C2723]">Muito obrigado pelo seu carinho!</h4>
                <p className="text-xs text-[#786A60]">Seu depoimento foi publicado e ajudará outros amantes da saboaria botânica.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateReview} className="space-y-4">
                
                {/* Rating selection */}
                <div>
                  <label className="text-xs font-bold text-[#5C4533] block mb-1">
                    Sua Avaliação:
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-2xl focus:outline-none"
                      >
                        <span className={star <= newRating ? 'text-amber-500' : 'text-gray-300'}>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5C4533] block mb-1">Seu Nome:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Beatriz Lima"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5C4533] block mb-1">Cidade / Estado:</label>
                    <input
                      type="text"
                      placeholder="Ex: Curitiba, PR"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5C4533] block mb-1">Sabonete que você usou:</label>
                    <select
                      value={newSoapName}
                      onChange={(e) => setNewSoapName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none bg-white"
                    >
                      <option>Lavanda Provençal & Manteiga de Karité</option>
                      <option>Argila Rosa & Gerânio Egípcio</option>
                      <option>Carvão Ativado, Melaleuca & Alecrim</option>
                      <option>Calêndula Solar, Mel Silvestre & Aveia</option>
                      <option>Café Torrado, Canela & Laranja Doce</option>
                      <option>Shampoo & Sabonete Sólido de Alecrim</option>
                      <option>Cúrcuma Dourada, Gengibre & Capim-Limão</option>
                      <option>Sabão de Castela 100% Azeite de Oliva</option>
                      <option>Pedido Personalizado Sob Medida</option>
                      <option>Curso Online de Saboaria para Iniciantes</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5C4533] block mb-1">Seu Tipo de Pele:</label>
                    <input
                      type="text"
                      placeholder="Ex: Pele Sensível / Rosácea"
                      value={newSkinType}
                      onChange={(e) => setNewSkinType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C4533] block mb-1">Título do Depoimento:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Minha pele nunca esteve tão hidratada!"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C4533] block mb-1">Seu Relato Completo:</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Conte como foi o banho, a espuma, o aroma dos óleos essenciais e o resultado na sua pele..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-semibold shadow-xs"
                  >
                    Publicar Depoimento
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
