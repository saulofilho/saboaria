import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Star, 
  Clock, 
  SlidersHorizontal, 
  Layers, 
  ShieldCheck, 
  Flame,
  Check
} from 'lucide-react';
import { SoapProduct } from '../types';

interface ProductCatalogProps {
  products?: SoapProduct[];
  onSelectProduct?: (product: SoapProduct) => void;
  onAddToCart: (product: SoapProduct) => void;
  onCustomizePreset?: (product: SoapProduct) => void;
  onViewProduct?: (product: SoapProduct) => void;
  onNavigateCustom?: () => void;
  searchQuery?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = [],
  onSelectProduct,
  onAddToCart,
  onCustomizePreset,
  onViewProduct,
  onNavigateCustom,
  searchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('Todos os Tipos');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleSelectProduct = (prod: SoapProduct) => {
    if (onSelectProduct) onSelectProduct(prod);
    if (onViewProduct) onViewProduct(prod);
  };

  const handleCustomNavigate = (prod?: SoapProduct) => {
    if (onCustomizePreset && prod) onCustomizePreset(prod);
    if (onNavigateCustom) onNavigateCustom();
  };

  const categories = [
    'Todos',
    'Aromaterapia',
    'Fitoterápico',
    'Argilas & Minerais',
    'Esfoliante',
    'Cabelos',
    'Hidratação Profunda'
  ];

  const skinTypes = [
    'Todos os Tipos',
    'Pele Sensível',
    'Pele Seca',
    'Pele Mista',
    'Pele Oleosa',
    'Pele Acneica'
  ];

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return list.filter((p) => {
      // Category filter
      const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      
      // Skin type filter
      const matchesSkin = 
        selectedSkinType === 'Todos os Tipos' || 
        p.skinType.includes(selectedSkinType as any) ||
        p.skinType.includes('Todos os Tipos');

      // Search query filter
      const matchesSearch = 
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.botanicalBenefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSkin && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popularity / bestsellers first
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSkinType, searchQuery, sortBy]);

  const handleQuickAdd = (product: SoapProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <section id="catalogo-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#8C6D53] text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colheita & Saponificação Artesanal</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2723]">
            Galeria de Sabonetes Botânicos
          </h2>
          <p className="text-sm text-[#6B5E55] mt-1 max-w-xl">
            Barras formuladas com infusões de flores orgânicas, óleos vegetais extravirgens e cura lenta de 4 a 12 semanas.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3 py-1.5 rounded-xl border border-[#E8E1D5] shadow-2xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6D53]" />
          <span className="text-xs text-[#786A60] font-medium">Ordenar:</span>
          <select
            id="product-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold text-[#2C2723] bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="popular">Mais Populares</option>
            <option value="rating">Melhor Avaliados</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
          </select>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`category-filter-${cat}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#5C6B47] text-white shadow-xs'
                : 'bg-white text-[#5A4E46] border border-[#E8E1D5] hover:bg-[#EFE9DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skin Type Pills Filter */}
      <div className="bg-[#F3EDE2] p-3 rounded-2xl border border-[#E8DFC8] flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-[#5C4533] px-2 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D53]" />
          Tipo de Pele:
        </span>
        {skinTypes.map((skin) => (
          <button
            key={skin}
            id={`skin-filter-${skin}`}
            onClick={() => setSelectedSkinType(skin)}
            className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              selectedSkinType === skin
                ? 'bg-[#3B2F2F] text-[#FAF7F2] font-semibold'
                : 'bg-white/80 text-[#5A4E46] hover:bg-white border border-[#E2D5BE]'
            }`}
          >
            {skin}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E1D5] p-8">
          <Sparkles className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#2C2723]">Nenhum sabonete encontrado</h3>
          <p className="text-xs text-[#786A60] mt-1 max-w-md mx-auto">
            Não encontramos nenhum produto com os filtros selecionados. Experimente buscar por outro ingrediente ou tipo de pele.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSelectedSkinType('Todos os Tipos');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#5C6B47] text-white text-xs font-semibold"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => handleSelectProduct(product)}
                className="group bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#EFE9DF]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.isBestseller && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C2593F] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        <Flame className="w-3 h-3" />
                        Mais Vendido
                      </span>
                    )}
                    {product.isSeasonal && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4A373] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        Lote da Estação
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF7F2]/90 backdrop-blur-xs text-[#5C4533] text-[10px] font-semibold border border-[#E8DFC8]">
                      {product.weightGrams}g
                    </span>
                  </div>

                  {/* Saponification Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2C2723]/80 backdrop-blur-xs text-white text-[10px] font-medium">
                      <Clock className="w-3 h-3 text-[#D4A373]" />
                      <span>{product.curingTimeWeeks} sem. cura</span>
                    </span>
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#2C2723] text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <Eye className="w-3.5 h-3.5" />
                      Espiar Detalhes
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D53]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C2723] group-hover:text-[#5C6B47] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Scent notes summary */}
                    <p className="text-xs text-[#786A60] line-clamp-2 mt-1 font-normal leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Key botanical benefits tags */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {product.skinType.slice(0, 2).map((st) => (
                        <span key={st} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F2EDE4] text-[#5C4533] font-medium">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-bold text-[#2C2723]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">Em estoque</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onCustomizePreset && (
                        <button
                          id={`customize-preset-btn-${product.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onCustomizePreset(product);
                          }}
                          className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#8C6D53] border border-[#D4A373]/40 transition-colors"
                          title="Personalizar esta fórmula no Ateliê"
                        >
                          <Layers className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        id={`add-to-cart-btn-${product.id}`}
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-2xs ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#5C6B47] hover:bg-[#4A5738] text-[#FAF7F2]'
                        }`}
                        title="Adicionar ao carrinho"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
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
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Custom Order Banner Callout */}
      <div className="mt-14 bg-gradient-to-r from-[#EAE2D5] via-[#F4EDE2] to-[#EAE2D5] rounded-3xl p-6 sm:p-8 border border-[#D4A373]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B2F2F] text-white text-[11px] font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#D4A373]" />
            Ateliê de Saboaria Sob Medida
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2723]">
            Deseja uma fórmula exclusiva para o seu tipo de pele ou evento?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B5E55] max-w-xl">
            Escolha as manteigas nobres, o aroma dos óleos essenciais, a cor botânica de argila, o carimbo artesanal com seu nome e a embalagem em papel kraft.
          </p>
        </div>

        {(onCustomizePreset || onNavigateCustom) && (
          <button
            onClick={() => handleCustomNavigate(products[0])}
            className="px-6 py-3.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-sm shadow-sm transition-all whitespace-nowrap"
          >
            Abrir Personalizador de Sabonetes
          </button>
        )}
      </div>

    </section>
  );
};
