import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Leaf, 
  Check, 
  Clock, 
  Eye, 
  Star, 
  AlertCircle,
  HelpCircle,
  Layers,
  Flame,
  Droplets
} from 'lucide-react';
import { SoapProduct } from '../types';
import { BOTANICAL_PHOTO_PRESETS } from '../utils/productStorage';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: SoapProduct) => void;
  initialProduct?: SoapProduct | null;
}

const CATEGORIES: SoapProduct['category'][] = [
  'Aromaterapia',
  'Fitoterápico',
  'Argilas & Minerais',
  'Esfoliante',
  'Cabelos',
  'Hidratação Profunda'
];

const SAPONIFICATION_PROCESSES: SoapProduct['saponificationProcess'][] = [
  'Cold Process (Saponificação a Frio)',
  'Hot Process (Cozimento Lento)',
  'Glicerina 100% Vegetal'
];

const SKIN_TYPES: SoapProduct['skinType'][number][] = [
  'Pele Sensível',
  'Pele Seca',
  'Pele Mista',
  'Pele Oleosa',
  'Pele Acneica',
  'Todos os Tipos'
];

const SCENT_INTENSITIES: SoapProduct['scentProfile']['intensity'][] = [
  'Suave',
  'Médio',
  'Marcante'
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct
}) => {
  const isEditing = !!initialProduct;

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<SoapProduct['category']>('Aromaterapia');
  const [price, setPrice] = useState<number>(34.00);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [weightGrams, setWeightGrams] = useState<number>(120);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState('');
  
  const [saponificationProcess, setSaponificationProcess] = useState<SoapProduct['saponificationProcess']>('Cold Process (Saponificação a Frio)');
  const [curingTimeWeeks, setCuringTimeWeeks] = useState<number>(6);
  const [skinType, setSkinType] = useState<SoapProduct['skinType']>(['Todos os Tipos']);

  // Scent Profile
  const [scentFamily, setScentFamily] = useState('Floral Herbal Relaxante');
  const [scentIntensity, setScentIntensity] = useState<SoapProduct['scentProfile']['intensity']>('Marcante');
  const [scentNotes, setScentNotes] = useState<string[]>(['Lavanda Francesa', 'Camomila']);
  const [newScentNote, setNewScentNote] = useState('');

  // Ingredients & Benefits
  const [ingredients, setIngredients] = useState<string[]>([
    'Azeite de Oliva Extra Virgem',
    'Manteiga de Karité Orgânica',
    'Óleo de Coco Palmiste'
  ]);
  const [newIngredient, setNewIngredient] = useState('');

  const [botanicalBenefits, setBotanicalBenefits] = useState<string[]>([
    'Hidratação profunda sem agredir',
    'Espuma cremosa aveludada'
  ]);
  const [newBenefit, setNewBenefit] = useState('');

  // Images
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [iconUrl, setIconUrl] = useState<string>('');

  // Badges
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isSeasonal, setIsSeasonal] = useState(false);
  const [releaseBadge, setReleaseBadge] = useState('');

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'geral' | 'formulacao' | 'aroma' | 'fotos' | 'destaques'>('geral');
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Populate data when editing
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setTagline(initialProduct.tagline || '');
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice);
      setWeightGrams(initialProduct.weightGrams || 120);
      setStock(initialProduct.stock ?? 15);
      setDescription(initialProduct.description || '');
      setSaponificationProcess(initialProduct.saponificationProcess || 'Cold Process (Saponificação a Frio)');
      setCuringTimeWeeks(initialProduct.curingTimeWeeks || 5);
      setSkinType(initialProduct.skinType || ['Todos os Tipos']);
      
      setScentFamily(initialProduct.scentProfile?.family || 'Herbal Puro');
      setScentIntensity(initialProduct.scentProfile?.intensity || 'Médio');
      setScentNotes(initialProduct.scentProfile?.notes || []);

      setIngredients(initialProduct.ingredients || []);
      setBotanicalBenefits(initialProduct.botanicalBenefits || []);
      setImages(initialProduct.images && initialProduct.images.length > 0 ? initialProduct.images : [BOTANICAL_PHOTO_PRESETS[0].url]);
      setIconUrl(initialProduct.iconUrl || '');
      
      setIsBestseller(!!initialProduct.isBestseller);
      setIsNew(!!initialProduct.isNew);
      setIsSeasonal(!!initialProduct.isSeasonal);
      setReleaseBadge(initialProduct.releaseBadge || '');
    } else {
      // Defaults for brand new product
      setName('');
      setTagline('');
      setCategory('Aromaterapia');
      setPrice(34.00);
      setOriginalPrice(undefined);
      setWeightGrams(125);
      setStock(20);
      setDescription('');
      setSaponificationProcess('Cold Process (Saponificação a Frio)');
      setCuringTimeWeeks(6);
      setSkinType(['Todos os Tipos']);
      setScentFamily('Floral Herbal Suave');
      setScentIntensity('Médio');
      setScentNotes(['Lavanda', 'Calêndula']);
      setIngredients(['Azeite de Oliva Extra Virgem', 'Manteiga de Karité Orgânica', 'Óleo de Coco Palmiste']);
      setBotanicalBenefits(['Acalma e nutre a pele sensível', 'Toque macio e espuma densa']);
      setImages([BOTANICAL_PHOTO_PRESETS[0].url]);
      setIconUrl('/icon.svg');
      setIsBestseller(false);
      setIsNew(true);
      setIsSeasonal(false);
      setReleaseBadge('');
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleAddScentNote = () => {
    if (!newScentNote.trim()) return;
    if (!scentNotes.includes(newScentNote.trim())) {
      setScentNotes([...scentNotes, newScentNote.trim()]);
    }
    setNewScentNote('');
  };

  const handleRemoveScentNote = (index: number) => {
    setScentNotes(scentNotes.filter((_, i) => i !== index));
  };

  const handleAddIngredient = () => {
    if (!newIngredient.trim()) return;
    if (!ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
    }
    setNewIngredient('');
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    if (!botanicalBenefits.includes(newBenefit.trim())) {
      setBotanicalBenefits([...botanicalBenefits, newBenefit.trim()]);
    }
    setNewBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setBotanicalBenefits(botanicalBenefits.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages([...images, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      alert('O produto precisa ter pelo menos 1 imagem principal.');
      return;
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleToggleSkinType = (type: SoapProduct['skinType'][number]) => {
    if (skinType.includes(type)) {
      if (skinType.length === 1) return; // Keep at least 1
      setSkinType(skinType.filter((t) => t !== type));
    } else {
      setSkinType([...skinType, type]);
    }
  };

  const handleSelectPhotoPreset = (url: string) => {
    if (!images.includes(url)) {
      setImages([url, ...images.filter(u => u !== url)]);
    } else {
      // Move to first
      setImages([url, ...images.filter(u => u !== url)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Por favor, informe o nome do produto.');
      setActiveTab('geral');
      return;
    }

    if (price <= 0) {
      setErrorMsg('O preço precisa ser maior que zero.');
      setActiveTab('geral');
      return;
    }

    if (images.length === 0) {
      setErrorMsg('Adicione pelo menos uma imagem para o produto.');
      setActiveTab('fotos');
      return;
    }

    const updatedProduct: SoapProduct = {
      id: initialProduct ? initialProduct.id : `soap-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Sabão botânico artesanal sob medida',
      category,
      price: Number(price),
      originalPrice: originalPrice && originalPrice > price ? Number(originalPrice) : undefined,
      weightGrams: Number(weightGrams) || 120,
      stock: Number(stock) >= 0 ? Number(stock) : 0,
      rating: initialProduct?.rating || 5.0,
      reviewsCount: initialProduct?.reviewsCount || 1,
      description: description.trim() || 'Barra artesanal botânica produzida manualmente no ateliê com óleos nobres prensados a frio.',
      scentProfile: {
        family: scentFamily.trim() || 'Botânico Refinado',
        intensity: scentIntensity,
        notes: scentNotes.length > 0 ? scentNotes : ['Notas Herbais', 'Óleos Essenciais']
      },
      skinType: skinType.length > 0 ? skinType : ['Todos os Tipos'],
      ingredients: ingredients.length > 0 ? ingredients : ['Óleos e Manteigas Vegetais'],
      botanicalBenefits: botanicalBenefits.length > 0 ? botanicalBenefits : ['Limpeza suave e hidratação'],
      saponificationProcess,
      curingTimeWeeks: Number(curingTimeWeeks) || 5,
      images,
      iconUrl: iconUrl.trim() || undefined,
      isBestseller,
      isNew,
      isSeasonal,
      releaseBadge: releaseBadge.trim() || undefined
    };

    onSave(updatedProduct);
    onClose();
  };

  return (
    <div 
      id="product-form-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4A373]/40 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2C2723] px-6 py-4.5 text-white flex items-center justify-between border-b border-[#3B342F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C6B47] text-[#FAF7F2] flex items-center justify-center shadow-inner">
              <Leaf className="w-5 h-5 text-[#EADCC9]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#FAF7F2]">
                {isEditing ? `Editar Produto: ${initialProduct?.name}` : 'Cadastrar Nova Barra Botânica'}
              </h3>
              <p className="text-[11px] text-[#D4A373] tracking-widest uppercase font-medium">
                Gestão de Catálogo CMS • Ateliê Botânico
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                showLivePreview 
                  ? 'bg-[#D4A373] text-black border-[#D4A373]' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLivePreview ? 'Ocultar Prévia' : 'Ver Prévia na Loja'}</span>
            </button>

            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Form Sections */}
        <div className="bg-[#EFE9DF] border-b border-[#D4A373]/30 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 py-2">
          {[
            { id: 'geral', label: '1. Geral & Comercial' },
            { id: 'formulacao', label: '2. Formulação & Pele' },
            { id: 'aroma', label: '3. Aromaterapia' },
            { id: 'fotos', label: '4. Fotos & Mídia' },
            { id: 'destaques', label: '5. Selos & Destaques' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#5C6B47] text-white shadow-xs'
                  : 'text-[#6B5E54] hover:text-[#2C2723] hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: GERAL & COMERCIAL */}
          {activeTab === 'geral' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Nome da Barra Botânica *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lavanda Provençal & Manteiga de Karité"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

                {/* Tagline */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Subtítulo / Frase de Efeito (Tagline)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Calmante aromaterápico com flores secas de lavanda francesa"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Categoria do Produto
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SoapProduct['category'])}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Peso da Barra (em gramas)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="500"
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Preço de Venda (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C6D53]">R$</span>
                    <input
                      type="number"
                      step="0.50"
                      min="1"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] font-bold focus:outline-none focus:border-[#5C6B47]"
                    />
                  </div>
                </div>

                {/* Original Price (Promotion) */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Preço Original / De (Opcional - Promoção)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C6D53]">R$</span>
                    <input
                      type="number"
                      step="0.50"
                      min="1"
                      placeholder="Ex: 39.00"
                      value={originalPrice || ''}
                      onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                      Estoque Disponível (Unidades Prontas)
                    </label>
                    <span className={`text-xs font-bold ${stock > 10 ? 'text-emerald-700' : stock > 0 ? 'text-amber-700' : 'text-red-600'}`}>
                      {stock > 10 ? 'Estoque Saudável' : stock > 0 ? 'Baixo Estoque' : 'Esgotado'}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    História Botânica & Descrição Completa
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descreva a experiência sensorial, sensação ao toque, propriedades da barra e método de produção..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: FORMULAÇÃO & PELE */}
          {activeTab === 'formulacao' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Saponification Process */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Método de Fabricação
                  </label>
                  <select
                    value={saponificationProcess}
                    onChange={(e) => setSaponificationProcess(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  >
                    {SAPONIFICATION_PROCESSES.map((proc) => (
                      <option key={proc} value={proc}>{proc}</option>
                    ))}
                  </select>
                </div>

                {/* Curing Time */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Tempo de Cura Natural (Semanas)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={curingTimeWeeks}
                      onChange={(e) => setCuringTimeWeeks(Number(e.target.value))}
                      className="flex-1 accent-[#5C6B47]"
                    />
                    <span className="text-xs font-bold text-[#5C6B47] bg-[#E2EAD8] px-3 py-1 rounded-full whitespace-nowrap">
                      {curingTimeWeeks} semanas ({curingTimeWeeks * 7} dias)
                    </span>
                  </div>
                </div>

                {/* Skin Types Multiple Selection */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Indicação de Tipo de Pele (Selecione 1 ou mais)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TYPES.map((type) => {
                      const isSelected = skinType.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleToggleSkinType(type)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#5C6B47] text-white border-[#5C6B47] shadow-2xs'
                              : 'bg-white text-[#6B5E54] border-[#D4A373]/40 hover:bg-[#FAF7F2]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Ingredientes da Fórmula (INCI / Nomenclatura Botânica)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Azeite de Oliva infuso em Calêndula..."
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddIngredient();
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="px-3.5 py-2 bg-[#5C6B47] hover:bg-[#4A5738] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EADCC9]/50 border border-[#D4A373]/40 text-xs text-[#3B2F2F]"
                      >
                        <span>{ing}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(idx)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botanical Benefits */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Benefícios Fitoterápicos
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Estimula a circulação periférica e renovação celular..."
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddBenefit();
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                    />
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="px-3.5 py-2 bg-[#5C6B47] hover:bg-[#4A5738] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {botanicalBenefits.map((ben, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E2EAD8] border border-[#B7CCA6] text-xs text-[#2F3F20]"
                      >
                        <Leaf className="w-3 h-3 text-[#5C6B47]" />
                        <span>{ben}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(idx)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: AROMATERAPIA */}
          {activeTab === 'aroma' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Scent Family */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Família Olfativa
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Floral Herbal Relaxante, Cítrico Revigorante..."
                    value={scentFamily}
                    onChange={(e) => setScentFamily(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                </div>

                {/* Scent Intensity */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Intensidade da Fragrância
                  </label>
                  <select
                    value={scentIntensity}
                    onChange={(e) => setScentIntensity(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  >
                    {SCENT_INTENSITIES.map((intensity) => (
                      <option key={intensity} value={intensity}>{intensity}</option>
                    ))}
                  </select>
                </div>

                {/* Scent Notes */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                    Notas Olfativas (Óleos Essenciais na Pirâmide)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Bergamota Italiana, Cedro Atlas, Lavandin..."
                      value={newScentNote}
                      onChange={(e) => setNewScentNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddScentNote();
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                    />
                    <button
                      type="button"
                      onClick={handleAddScentNote}
                      className="px-3.5 py-2 bg-[#5C6B47] hover:bg-[#4A5738] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {scentNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF0E6] border border-[#D4A373]/50 text-xs text-[#8C6D53]"
                      >
                        <Sparkles className="w-3 h-3 text-[#C2593F]" />
                        <span>{note}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveScentNote(idx)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: FOTOS & MÍDIA */}
          {activeTab === 'fotos' && (
            <div className="space-y-6 animate-fade-in">
              {/* Presets Gallery */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                  Galeria de Fotos Botânicas em Alta Definição (1 Clique para aplicar)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {BOTANICAL_PHOTO_PRESETS.map((preset, idx) => {
                    const isSelected = images[0] === preset.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPhotoPreset(preset.url)}
                        className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all aspect-square ${
                          isSelected ? 'border-[#5C6B47] ring-2 ring-[#5C6B47]/30' : 'border-transparent hover:opacity-90'
                        }`}
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.label} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-[#5C6B47] text-white p-1 rounded-full shadow-md">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[10px] text-white truncate text-center">
                          {preset.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Image URL Input */}
              <div className="space-y-2 pt-2 border-t border-[#D4A373]/20">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                  Ou cole um link de imagem próprio (URL HTTPS)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-3.5 py-2 bg-[#5C6B47] hover:bg-[#4A5738] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Foto</span>
                  </button>
                </div>
              </div>

              {/* Current Product Photos */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                  Fotos Atuais do Produto ({images.length}) • A 1ª foto é a capa
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden border border-[#D4A373]/40 aspect-4/3 bg-black/5 group">
                      <img 
                        src={imgUrl} 
                        alt={`Foto ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-[#2C2723]/90 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Capa Principal
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Icon URL Path Section */}
              <div className="space-y-3 pt-4 border-t border-[#D4A373]/30 bg-[#FAF7F2] p-4 rounded-2xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5C6B47]" />
                      <span>Caminho / URL do Ícone do Produto (Icon URL Path)</span>
                    </label>
                    <p className="text-[11px] text-[#8C7E74]">
                      Caminho do ícone vetorial SVG ou imagem miniatura para selos, navegação e identificador botânico.
                    </p>
                  </div>
                  {iconUrl && (
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-[#D4A373]/40 shadow-2xs">
                      <span className="text-[10px] text-[#8C7E74] font-medium">Prévia:</span>
                      <img 
                        src={iconUrl} 
                        alt="Prévia do Ícone" 
                        className="w-6 h-6 object-contain rounded-md border border-[#D4A373]/30 p-0.5 bg-[#FAF7F2]" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/icon.svg ou https://..."
                    value={iconUrl}
                    onChange={(e) => setIconUrl(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47] font-mono"
                  />
                  {iconUrl && (
                    <button
                      type="button"
                      onClick={() => setIconUrl('')}
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-medium transition-colors"
                      title="Limpar ícone"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Quick Icon Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-[#8C7E74] font-medium">Sugestões de caminhos:</span>
                  {[
                    { label: '🌿 /icon.svg (Padrão)', path: '/icon.svg' },
                    { label: '🧼 /favicon.svg', path: '/favicon.svg' },
                    { label: '🌸 Lavanda', path: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=120&q=80' },
                    { label: '🌹 Argila Rosa', path: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=120&q=80' },
                    { label: '🌱 Capim-Limão', path: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=120&q=80' }
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setIconUrl(preset.path)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        iconUrl === preset.path
                          ? 'bg-[#5C6B47] text-white border-[#5C6B47] font-bold'
                          : 'bg-white text-[#4A3E39] border-[#D4A373]/30 hover:border-[#5C6B47]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: SELOS & DESTAQUES */}
          {activeTab === 'destaques' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4A373]/30">
                
                {/* Bestseller checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5C6B47] focus:ring-[#5C6B47] accent-[#5C6B47]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#2C2723]">Destaque: Mais Vendido (Bestseller)</span>
                    <p className="text-[11px] text-[#8C7E74]">Exibe o selo dourado de destaque e prioriza a barra no topo</p>
                  </div>
                </label>

                {/* New release checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5C6B47] focus:ring-[#5C6B47] accent-[#5C6B47]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#2C2723]">Lançamento Recente (Novo Lote)</span>
                    <p className="text-[11px] text-[#8C7E74]">Adiciona a tag verde de "Lançamento" e inclui no carrossel de novidades</p>
                  </div>
                </label>

                {/* Seasonal checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isSeasonal}
                    onChange={(e) => setIsSeasonal(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5C6B47] focus:ring-[#5C6B47] accent-[#5C6B47]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#2C2723]">Edição Sazonal / Especial de Estação</span>
                    <p className="text-[11px] text-[#8C7E74]">Identifica como tiragem limitada de colheita ou data comemorativa</p>
                  </div>
                </label>

              </div>

              {/* Custom Badge Text */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3E39]">
                  Texto Personalizado do Selo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Cura de 60 dias, Lote Exclusivo, Selo Ouro..."
                  value={releaseBadge}
                  onChange={(e) => setReleaseBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A373]/40 text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
                />
              </div>

            </div>
          )}

          {/* LIVE CARD PREVIEW SECTION */}
          {showLivePreview && (
            <div className="pt-4 border-t border-[#D4A373]/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D53] flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Prévia do Card na Loja (Como o cliente verá)</span>
                </h4>
              </div>

              <div className="max-w-xs mx-auto bg-white rounded-2xl p-3 border border-[#D4A373]/30 shadow-md">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#FAF7F2] mb-3">
                  <img
                    src={images[0]}
                    alt={name || 'Prévia'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5C6B47] text-white">
                    {category}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C2593F] text-white">
                      -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#8C6D53]">
                    <span>{weightGrams}g • {curingTimeWeeks} sem. cura</span>
                    <span className="font-semibold text-emerald-700">{stock} em estoque</span>
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#2C2723] line-clamp-1">
                    {name || 'Nome do Sabonete'}
                  </h5>
                  <p className="text-[11px] text-[#8C7E74] line-clamp-1">
                    {tagline || 'Frase descritiva de efeito botânico...'}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-[#2C2723]">
                        R$ {price.toFixed(2)}
                      </span>
                      {originalPrice && originalPrice > price && (
                        <span className="text-xs line-through text-gray-400 ml-1.5">
                          R$ {originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-1 bg-[#5C6B47] text-white text-[11px] font-bold rounded-lg">
                      Adicionar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[#D4A373]/30 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#D4A373]/40 text-xs font-bold text-[#4A3E39] hover:bg-[#EFE9DF] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Salvar Alterações no Produto' : 'Publicar Produto no Catálogo'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
