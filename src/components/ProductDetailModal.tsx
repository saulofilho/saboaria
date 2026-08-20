import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  MessageCircle, 
  Check, 
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SoapProduct } from '../types';

interface ProductDetailModalProps {
  product: SoapProduct | null;
  onClose: () => void;
  onAddToCart: (product: SoapProduct, quantity: number) => void;
  onCustomizeThis: (product: SoapProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onCustomizeThis
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'beneficios' | 'ingredientes' | 'aromaterapia' | 'cura'>('beneficios');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá Ateliê Botânico! Gostaria de encomendar ${quantity}x "${product.name}" (R$ ${(product.price * quantity).toFixed(2)}). Poderia me confirmar a disponibilidade?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        id="product-detail-modal"
        className="bg-[#FAF7F2] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[92vh] flex flex-col my-auto"
      >
        
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-[#E8E1D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EADCC9] text-[#5C4533] text-[11px] font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs text-[#786A60] hidden sm:inline">•</span>
            <span className="text-xs text-[#786A60] font-medium hidden sm:inline">
              {product.weightGrams}g • {product.saponificationProcess}
            </span>
          </div>

          <button
            id="close-product-detail-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Photo Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EFE9DF] border border-[#E8E1D5] shadow-inner">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-xs text-[#2C2723] hover:bg-white shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-xs text-[#2C2723] hover:bg-white shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px]">
                  Foto {selectedImageIdx + 1} de {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIdx === idx ? 'border-[#5C6B47] ring-2 ring-[#5C6B47]/30' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Fact Sheet */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] space-y-2 text-xs text-[#5C4533]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#786A60]">Tempo de Cura Lenta:</span>
                  <span className="font-bold flex items-center gap-1 text-[#2C2723]">
                    <Clock className="w-3.5 h-3.5 text-[#8C6D53]" />
                    {product.curingTimeWeeks} semanas ({product.curingTimeWeeks * 7} dias)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#786A60]">Método de Saponificação:</span>
                  <span className="font-bold text-[#2C2723]">{product.saponificationProcess}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#786A60]">Família Olfativa:</span>
                  <span className="font-bold text-[#5C6B47]">{product.scentProfile.family}</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Tabs & Actions */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(Math.round(product.rating))}
                  </div>
                  <span className="text-xs font-bold text-[#2C2723]">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({product.reviewsCount} avaliações de clientes)</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2723] leading-tight">
                  {product.name}
                </h2>
                
                <p className="text-xs sm:text-sm text-[#8C6D53] font-medium mt-1">
                  {product.tagline}
                </p>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2C2723]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Pronta Entrega ({product.stock} unidades)
                  </span>
                </div>
              </div>

              {/* Skin Suitability Badges */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#786A60]">Indicado para:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.skinType.map((st) => (
                    <span key={st} className="px-2.5 py-1 rounded-lg bg-[#EAE2D5] text-[#5C4533] text-xs font-medium border border-[#D4A373]/30">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details Tabs */}
              <div className="space-y-3">
                <div className="flex border-b border-[#E8E1D5] gap-2">
                  <button
                    onClick={() => setActiveTab('beneficios')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'beneficios' ? 'border-[#5C6B47] text-[#5C6B47]' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Propriedades
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredientes')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'ingredientes' ? 'border-[#5C6B47] text-[#5C6B47]' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Ingredientes ({product.ingredients.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('aromaterapia')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'aromaterapia' ? 'border-[#5C6B47] text-[#5C6B47]' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Aromaterapia
                  </button>
                  <button
                    onClick={() => setActiveTab('cura')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'cura' ? 'border-[#5C6B47] text-[#5C6B47]' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sobre a Barra
                  </button>
                </div>

                <div className="min-h-[140px] text-xs text-[#5A4E46] leading-relaxed bg-white p-4 rounded-2xl border border-[#E8E1D5]">
                  {activeTab === 'beneficios' && (
                    <ul className="space-y-2">
                      {product.botanicalBenefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Leaf className="w-3.5 h-3.5 text-[#5C6B47] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredientes' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-[#786A60] italic mb-1">
                        Fórmula 100% biodegradável, livre de lauril sulfato, parabenos, silicones e fragrâncias artificiais:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.map((ing, i) => (
                          <span key={i} className="px-2 py-1 rounded-md bg-[#FAF7F2] border border-[#E8E1D5] text-[#3B2F2F] text-[11px]">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'aromaterapia' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#786A60]">Intensidade do Aroma:</span>
                        <span className="font-bold text-[#8C6D53] px-2 py-0.5 rounded-full bg-[#EADCC9]">
                          {product.scentProfile.intensity}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C4533]">
                        <strong>Notas aromáticas principais:</strong> {product.scentProfile.notes.join(' • ')}
                      </p>
                      <p className="text-[11px] text-[#786A60]">
                        Utilizamos somente óleos essenciais destilados a vapor, sem fragrâncias sintéticas derivadas de petróleo.
                      </p>
                    </div>
                  )}

                  {activeTab === 'cura' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="pt-3 border-t border-[#E8E1D5] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E8E1D5] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-bold text-[#5C4533] hover:bg-[#FAF7F2]"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-[#2C2723]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-3 py-2 text-sm font-bold text-[#5C4533] hover:bg-[#FAF7F2]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#5C6B47] hover:bg-[#4A5738] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado ao Carrinho ({quantity}x)</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Adicionar ao Carrinho • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onCustomizeThis(product);
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#EADCC9] hover:bg-[#DFCDB7] text-[#3B2F2F] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#D4A373]/50 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#8C6D53]" />
                    <span>Personalizar esta Fórmula no Ateliê</span>
                  </button>

                  <a
                    href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5B] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
