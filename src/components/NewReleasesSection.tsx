import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Clock, 
  Flame, 
  Check, 
  Star, 
  ArrowRight,
  Leaf,
  Layers
} from 'lucide-react';
import { SoapProduct } from '../types';

interface NewReleasesSectionProps {
  products: SoapProduct[];
  onSelectProduct?: (product: SoapProduct) => void;
  onAddToCart: (product: SoapProduct) => void;
}

export const NewReleasesSection: React.FC<NewReleasesSectionProps> = ({
  products = [],
  onSelectProduct,
  onAddToCart
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  // Get the 3 newest products: either tagged with isNew, or fallback to the latest in list
  const newProducts = React.useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const flagged = list.filter((p) => p.isNew);
    if (flagged.length >= 3) {
      return flagged.slice(0, 3);
    }
    // Fallback: take flagged first, then pad with latest items from end
    const remaining = list.filter((p) => !p.isNew);
    return [...flagged, ...remaining].slice(0, 3);
  }, [products]);

  if (newProducts.length === 0) return null;

  const handleQuickAdd = (product: SoapProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div 
      id="new-releases-spotlight"
      className="mb-12 bg-gradient-to-b from-[#F3ECE1] to-[#FBF8F3] p-6 sm:p-8 rounded-3xl border border-[#E5DAC8] shadow-xs relative overflow-hidden"
    >
      {/* Subtle decorative background watermark */}
      <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 pointer-events-none opacity-5 text-[#5C6B47]">
        <Leaf className="w-64 h-64" />
      </div>

      {/* Header of Releases */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C6B47] text-white text-[11px] font-bold uppercase tracking-wider shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recém Saponificados</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2723]">
            Lançamentos do Ateliê
          </h3>
          <p className="text-xs sm:text-sm text-[#786A60] mt-1 max-w-xl">
            Conheça as últimas 3 fórmulas botânicas recém-saídas da estufa de cura, com óleos essenciais nobres e extração sustentável.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C6B47] shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>3 Novos Lotes Disponíveis</span>
        </div>
      </div>

      {/* 3 Highlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {newProducts.map((product, idx) => {
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              id={`release-card-${product.id}`}
              onClick={() => onSelectProduct && onSelectProduct(product)}
              className="group bg-white rounded-2xl border border-[#E2D5C3] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#5C6B47]/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EFE9DF]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Prominent "NOVO" & Batch Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#C2593F] to-[#D47E6A] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    NOVO
                  </span>

                  {product.releaseBadge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2C2723]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold border border-white/20">
                      {product.releaseBadge}
                    </span>
                  )}
                </div>

                {/* Weight & Curing Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF7F2]/90 backdrop-blur-xs text-[#5C4533] text-[10px] font-bold border border-[#E8DFC8]">
                    {product.weightGrams}g • {product.category}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2C2723]/80 backdrop-blur-xs text-white text-[10px] font-medium">
                    <Clock className="w-3 h-3 text-[#D4A373]" />
                    <span>{product.curingTimeWeeks} sem. cura</span>
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#2C2723] text-xs font-bold shadow-md flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    Ver Detalhes
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="font-bold text-[#2C2723]">{product.rating.toFixed(1)}</span>
                      <span className="text-[#8C7E73]">({product.reviewsCount})</span>
                    </div>

                    <span className="text-[10px] font-semibold text-[#5C6B47] uppercase tracking-wider">
                      Lote #{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#2C2723] group-hover:text-[#5C6B47] transition-colors leading-snug line-clamp-1">
                    {product.name}
                  </h4>

                  <p className="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed">
                    {product.tagline || product.description}
                  </p>
                </div>

                {/* Scent notes tag */}
                {product.scentProfile && (
                  <div className="text-[11px] bg-[#FAF7F2] p-2 rounded-xl border border-[#EAE2D5] text-[#5C4533] truncate">
                    <span className="font-bold">Aroma: </span>
                    <span className="text-[#786A60]">{product.scentProfile.notes.slice(0, 2).join(', ')}</span>
                  </div>
                )}

                {/* Price & Action Button */}
                <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between gap-2">
                  <div>
                    {product.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through block">
                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="text-base font-bold text-[#2C2723]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    id={`new-release-add-btn-${product.id}`}
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#5C6B47] hover:bg-[#4A5738] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Adicionado</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Comprar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
