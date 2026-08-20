import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Leaf, 
  Droplets, 
  Palette, 
  Package, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  Clock, 
  RefreshCw,
  Heart,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomSoapOrder } from '../types';

interface CustomSoapBuilderProps {
  onAddCustomOrderToCart: (order: CustomSoapOrder) => void;
}

export const CustomSoapBuilder: React.FC<CustomSoapBuilderProps> = ({
  onAddCustomOrderToCart
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Base Oils & Butters
  const [selectedBaseOils, setSelectedBaseOils] = useState<string[]>([
    'Azeite de Oliva Extra Virgem',
    'Óleo de Coco Palmiste',
    'Manteiga de Karité Orgânica'
  ]);

  // Step 2: Aromatherapy & Essential Oils
  const [selectedScent, setSelectedScent] = useState<string>('Lavanda Francesa & Camomila (Relaxamento Profundo)');
  const [scentIntensity, setScentIntensity] = useState<'Suave' | 'Médio' | 'Marcante'>('Médio');

  // Step 3: Botanical Clays & Colors
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string; desc: string }>({
    name: 'Argila Rosa Francesa (Rosa Suave)',
    hex: '#D99B9B',
    desc: 'Nutrição para peles sensíveis e desvitalizadas'
  });

  // Step 4: Dried Botanicals & Exfoliants
  const [selectedAddins, setSelectedAddins] = useState<string[]>([
    'Flores de Lavanda Desidratadas no Topo',
    'Aveia Coloidal Aveludada'
  ]);

  // Step 5: Shape, Stamping & Packaging
  const [selectedShape, setSelectedShape] = useState<'Barra Retangular Rústica' | 'Barra Chanfrada Provençal' | 'Formato Oval Orgânico' | 'Mini Barras para Lembrancinhas'>('Barra Retangular Rústica');
  const [stampingText, setStampingText] = useState<string>('BOTÂNICO');
  const [selectedPackaging, setSelectedPackaging] = useState<'Papel Kraft Rústico com Ráfia' | 'Caixa Ecológica com Selo de Cera' | 'Tecido de Algodão Cru & Ramos' | 'Fita de Juta & Canela em Pau'>('Papel Kraft Rústico com Ráfia');
  const [quantity, setQuantity] = useState<number>(3);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  const [orderCreatedSuccess, setOrderCreatedSuccess] = useState(false);

  // Options catalog for custom atelier
  const baseOilOptions = [
    { id: 'azeite', name: 'Azeite de Oliva Extra Virgem', role: 'Nutrição & Suavidade', icon: Leaf },
    { id: 'coco', name: 'Óleo de Coco Palmiste', role: 'Espuma & Dureza', icon: Droplets },
    { id: 'karite', name: 'Manteiga de Karité Orgânica', role: 'Superfat Hidratante', icon: Sparkles },
    { id: 'cacau', name: 'Manteiga de Cacau Pura', role: 'Firmeza & Toque Sedoso', icon: Layers },
    { id: 'ricino', name: 'Óleo de Rícino (Mamona)', role: 'Cremosidade da Espuma', icon: Droplets },
    { id: 'amendoas', name: 'Óleo de Amêndoas Doces', role: 'Hipoalergênico', icon: Leaf },
    { id: 'cupuacu', name: 'Manteiga de Cupuaçu Amazônica', role: 'Regeneração Celular', icon: Sparkles }
  ];

  const scentOptions = [
    { name: 'Lavanda Francesa & Camomila (Relaxamento Profundo)', vibe: 'Floral & Calmante' },
    { name: 'Alecrim do Campo, Eucalipto & Hortelã (Refrescância Mental)', vibe: 'Herbal Revigorante' },
    { name: 'Capim-Limão (Lemongrass) & Laranja Doce (Energia Solar)', vibe: 'Cítrico Estimulante' },
    { name: 'Gerânio Bourbon & Palmarosa (Autoestima & Pele Rosa)', vibe: 'Floral Terapêutico' },
    { name: 'Canela em Folha, Cravo & Laranja Bahia (Aconchego Quente)', vibe: 'Especiarias' },
    { name: 'Cedro Atlas & Patchouli Selvagem (Equilíbrio Amadeirado)', vibe: 'Amadeirado Nobre' },
    { name: 'Neutro Puro — Sem Fragrância (Peles Hiper Reativas & Bebês)', vibe: '100% Neutro' }
  ];

  const colorOptions = [
    { name: 'Argila Rosa Francesa (Rosa Suave)', hex: '#D99B9B', desc: 'Desintoxica suavemente e acalma rosácea' },
    { name: 'Argila Verde Montmorilonita (Oliva Botânico)', hex: '#879A73', desc: 'Controle de oleosidade e poros' },
    { name: 'Cúrcuma Dourada Orgânica (Amarelo Solar)', hex: '#E5A93C', desc: 'Antioxidante e iluminador de tom' },
    { name: 'Carvão Ativado de Babaçu (Preto Grafite)', hex: '#2C2B2A', desc: 'Detox profundo e anti-poluição' },
    { name: 'Argila Branca Caulinita (Marfim Natural)', hex: '#F0ECE1', desc: 'Ultra sedosa e pH neutro' },
    { name: 'Mármore Bicolor Swirl (Rosa + Oliva)', hex: '#B88E8D', desc: 'Efeito artesanal em espiral' }
  ];

  const addinOptions = [
    'Flores de Lavanda Desidratadas no Topo',
    'Pétalas de Calêndula Solar',
    'Aveia Coloidal Aveludada',
    'Café Arábica Moído (Esfoliante)',
    'Sementes de Papoula Pretas',
    'Mel Silvestre Cru das Abelhas',
    'Sal Rosa do Himalaia no Topo',
    'Nibs de Cacau Orgânico'
  ];

  const packagingOptions: { name: 'Papel Kraft Rústico com Ráfia' | 'Caixa Ecológica com Selo de Cera' | 'Tecido de Algodão Cru & Ramos' | 'Fita de Juta & Canela em Pau'; priceAdd: number; desc: string }[] = [
    { name: 'Papel Kraft Rústico com Ráfia', priceAdd: 0, desc: 'Cinta em kraft reciclado 120g e laço de rami natural' },
    { name: 'Caixa Ecológica com Selo de Cera', priceAdd: 4.0, desc: 'Caixinha de presente com sinete de cera vegetal' },
    { name: 'Tecido de Algodão Cru & Ramos', priceAdd: 5.0, desc: 'Trouxinha botânica com raminho seco de lavanda' },
    { name: 'Fita de Juta & Canela em Pau', priceAdd: 3.5, desc: 'Amarração rústica com especiaria aromática' }
  ];

  const shapeWeightMap: Record<string, number> = {
    'Barra Retangular Rústica': 120,
    'Barra Chanfrada Provençal': 125,
    'Formato Oval Orgânico': 115,
    'Mini Barras para Lembrancinhas': 50
  };

  // Pricing calculation
  const baseUnitPrice = selectedShape === 'Mini Barras para Lembrancinhas' ? 16.00 : 34.00;
  const packagingAdd = packagingOptions.find(p => p.name === selectedPackaging)?.priceAdd || 0;
  const unitPrice = baseUnitPrice + packagingAdd + (selectedBaseOils.length > 4 ? 3 : 0);

  // Progressive discount for bulk custom orders (wedding favors, corporate gifts)
  let discountRate = 0;
  if (quantity >= 20) discountRate = 0.15; // 15% off
  if (quantity >= 50) discountRate = 0.25; // 25% off
  if (quantity >= 100) discountRate = 0.35; // 35% off

  const subtotal = unitPrice * quantity;
  const totalPrice = subtotal * (1 - discountRate);
  const estimatedWeightPerUnit = shapeWeightMap[selectedShape] || 120;

  const toggleBaseOil = (name: string) => {
    if (selectedBaseOils.includes(name)) {
      if (selectedBaseOils.length > 2) {
        setSelectedBaseOils(selectedBaseOils.filter(o => o !== name));
      }
    } else {
      setSelectedBaseOils([...selectedBaseOils, name]);
    }
  };

  const toggleAddin = (name: string) => {
    if (selectedAddins.includes(name)) {
      setSelectedAddins(selectedAddins.filter(a => a !== name));
    } else {
      if (selectedAddins.length < 3) {
        setSelectedAddins([...selectedAddins, name]);
      }
    }
  };

  const handleFinishCustomOrder = () => {
    const newOrder: CustomSoapOrder = {
      id: `custom-${Date.now()}`,
      baseOils: selectedBaseOils,
      scent: selectedScent,
      scentIntensity,
      colorant: selectedColor.name,
      botanicalAddins: selectedAddins,
      shape: selectedShape,
      customStampingText: stampingText.trim() || 'ATELIÊ',
      packagingStyle: selectedPackaging,
      quantity,
      customerName: customerName || 'Cliente Ateliê',
      customerPhone: customerPhone || '',
      customerEmail: customerEmail || '',
      notes: customNotes,
      totalPrice,
      unitPrice,
      weightPerUnitGrams: estimatedWeightPerUnit,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    onAddCustomOrderToCart(newOrder);
    setOrderCreatedSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5C6B47', '#D4A373', '#C2593F', '#FAF7F2']
      });
    } catch {
      // ignore
    }
  };

  const generateWhatsAppCustomMessage = () => {
    const msg = `*✨ PEDIDO PERSONALIZADO — ATELIÊ BOTÂNICO ✨*\n\n` +
      `*Cliente:* ${customerName || 'Cliente'}\n` +
      `*Telefone:* ${customerPhone || 'A combinar'}\n` +
      `*Formato:* ${selectedShape} (${estimatedWeightPerUnit}g)\n` +
      `*Texto do Carimbo:* "${stampingText.toUpperCase() || 'ATELIÊ'}"\n` +
      `*Aroma:* ${selectedScent} (Intensidade: ${scentIntensity})\n` +
      `*Cor Botânica:* ${selectedColor.name}\n` +
      `*Óleos da Base:* ${selectedBaseOils.join(', ')}\n` +
      `*Aditivos/Ervas:* ${selectedAddins.join(', ') || 'Nenhum'}\n` +
      `*Embalagem:* ${selectedPackaging}\n` +
      `*Quantidade:* ${quantity} unidade(s)\n` +
      `*Valor Total Estimado:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n` +
      (customNotes ? `*Observações:* ${customNotes}\n` : '') +
      `\n_Gostaria de confirmar a data de produção e prazo de cura!_`;
    return encodeURIComponent(msg);
  };

  return (
    <section id="personalizado-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] text-[#5C4533] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#8C6D53]" />
          Ateliê Sob Medida
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2723]">
          Crie sua Barra de Sabão Personalizada
        </h2>
        <p className="text-sm text-[#6B5E55] leading-relaxed">
          Formule uma receita botânica única para o seu autocuidado diário ou crie lotes especiais para lembrancinhas de casamento, maternidade e datas comemorativas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Step-by-Step Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-8">
          
          {/* Steps Progress Navigation */}
          <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4 overflow-x-auto scrollbar-none gap-2">
            {[
              { num: 1, label: '1. Óleos' },
              { num: 2, label: '2. Aroma' },
              { num: 3, label: '3. Argila' },
              { num: 4, label: '4. Ervas' },
              { num: 5, label: '5. Carimbo & Caixa' },
            ].map((step) => (
              <button
                key={step.num}
                id={`builder-step-tab-${step.num}`}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  currentStep === step.num
                    ? 'bg-[#5C6B47] text-white shadow-xs'
                    : currentStep > step.num
                    ? 'bg-[#EAE2D5] text-[#5C4533]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{step.label}</span>
                {currentStep > step.num && <Check className="w-3 h-3 text-[#5C6B47]" />}
              </button>
            ))}
          </div>

          {/* STEP 1: Base Oils */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C2723]">
                  1. Escolha as Manteigas & Óleos Vegetais da Base
                </h3>
                <p className="text-xs text-[#786A60]">
                  Selecione pelo menos 3 gorduras nobres para balancear a dureza da barra, hidratação e espuma cremosa:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {baseOilOptions.map((oil) => {
                  const isSelected = selectedBaseOils.includes(oil.name);
                  return (
                    <button
                      key={oil.id}
                      onClick={() => toggleBaseOil(oil.name)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#5C6B47] bg-[#F2F6ED] text-[#2C2723] shadow-xs'
                          : 'border-[#E8E1D5] bg-white text-[#5A4E46] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#5C6B47] text-white' : 'bg-[#EAE2D5] text-[#786A60]'}`}>
                          <oil.icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-snug">{oil.name}</div>
                          <div className="text-[10px] text-[#786A60]">{oil.role}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#5C6B47] bg-[#5C6B47] text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Formulation balance visual indicators */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D5] space-y-2 text-xs">
                <span className="font-bold text-[#5C4533] block">Equilíbrio da Fórmula Calculada:</span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-2 rounded-xl border border-[#E8E1D5]">
                    <span className="text-[10px] text-gray-500 block">Hidratação</span>
                    <span className="text-xs font-bold text-emerald-700">Alta (Superfat 7%)</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E8E1D5]">
                    <span className="text-[10px] text-gray-500 block">Espuma</span>
                    <span className="text-xs font-bold text-[#8C6D53]">Densa & Aveludada</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E8E1D5]">
                    <span className="text-[10px] text-gray-500 block">Dureza da Barra</span>
                    <span className="text-xs font-bold text-[#2C2723]">Longa Duração</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Scent & Intensity */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C2723]">
                  2. Buquê de Aromaterapia & Óleos Essenciais
                </h3>
                <p className="text-xs text-[#786A60]">
                  Óleos essenciais puros destilados a vapor, sem fixadores ou fragrâncias petroquímicas sintéticas:
                </p>
              </div>

              <div className="space-y-2">
                {scentOptions.map((scent) => {
                  const isSelected = selectedScent === scent.name;
                  return (
                    <button
                      key={scent.name}
                      onClick={() => setSelectedScent(scent.name)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#5C6B47] bg-[#F2F6ED] shadow-xs'
                          : 'border-[#E8E1D5] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#2C2723]">{scent.name}</div>
                        <div className="text-[10px] text-[#8C6D53] font-medium">{scent.vibe}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#5C6B47] bg-[#5C6B47] text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scent Intensity selector */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#5C4533] block mb-2">Intensidade Aromática no Banho:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Suave', 'Médio', 'Marcante'] as const).map((intensity) => (
                    <button
                      key={intensity}
                      onClick={() => setScentIntensity(intensity)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        scentIntensity === intensity
                          ? 'bg-[#3B2F2F] text-white border-[#3B2F2F]'
                          : 'bg-[#FAF7F2] text-[#5A4E46] border-[#E8E1D5] hover:bg-white'
                      }`}
                    >
                      {intensity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Botanical Clays & Colors */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C2723]">
                  3. Argilas Medicinais & Coloração da Terra
                </h3>
                <p className="text-xs text-[#786A60]">
                  Cores 100% naturais obtidas exclusivamente de minerais, raízes e plantas brasileiras:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {colorOptions.map((col) => {
                  const isSelected = selectedColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'border-[#5C6B47] bg-[#F2F6ED] shadow-xs'
                          : 'border-[#E8E1D5] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-xl border border-black/10 shrink-0 shadow-xs mt-0.5"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#2C2723]">{col.name}</div>
                        <div className="text-[10px] text-[#786A60] leading-snug mt-0.5">{col.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Add-ins & Botanicals */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C2723]">
                  4. Ervas Desidratadas, Sementes & Esfoliantes
                </h3>
                <p className="text-xs text-[#786A60]">
                  Escolha até 3 elementos sensoriais para enriquecer a textura e decoração da sua barra (opcional):
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addinOptions.map((addin) => {
                  const isSelected = selectedAddins.includes(addin);
                  return (
                    <button
                      key={addin}
                      onClick={() => toggleAddin(addin)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#5C6B47] bg-[#F2F6ED] text-[#2C2723] shadow-xs'
                          : 'border-[#E8E1D5] bg-white text-[#5A4E46] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="text-xs font-bold">{addin}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'border-[#5C6B47] bg-[#5C6B47] text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Shape, Stamping, Packaging & Contact */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C2723]">
                  5. Formato, Carimbo Artesanal & Embalagem
                </h3>
                <p className="text-xs text-[#786A60]">
                  Dê o toque final de sofisticação artesanal à sua criação:
                </p>
              </div>

              {/* Shape selection */}
              <div>
                <span className="text-xs font-bold text-[#5C4533] block mb-2">Formato do Molde:</span>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {(['Barra Retangular Rústica', 'Barra Chanfrada Provençal', 'Formato Oval Orgânico', 'Mini Barras para Lembrancinhas'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                        selectedShape === shape
                          ? 'border-[#5C6B47] bg-[#F2F6ED] text-[#5C6B47]'
                          : 'border-[#E8E1D5] bg-white text-[#5A4E46]'
                      }`}
                    >
                      <div>{shape}</div>
                      <div className="text-[10px] text-gray-500 font-normal mt-0.5">
                        {shapeWeightMap[shape]}g aprox.
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Embossed Text Stamp */}
              <div>
                <label className="text-xs font-bold text-[#5C4533] block mb-1">
                  Gravação do Carimbo na Barra (Máx. 14 caracteres):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={14}
                    value={stampingText}
                    onChange={(e) => setStampingText(e.target.value.toUpperCase())}
                    placeholder="Ex: AMOR, BOTÂNICO, M&C..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#D4A373]/60 text-xs font-bold tracking-widest text-[#2C2723] uppercase bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#5C6B47]"
                  />
                  <button
                    onClick={() => setStampingText('BOTÂNICO')}
                    className="px-3 py-2 text-[11px] font-semibold text-[#8C6D53] hover:bg-[#FAF7F2] rounded-xl border border-[#E8E1D5]"
                  >
                    Padrão
                  </button>
                </div>
              </div>

              {/* Packaging options */}
              <div>
                <span className="text-xs font-bold text-[#5C4533] block mb-2">Estilo de Embalagem Rústica:</span>
                <div className="space-y-2">
                  {packagingOptions.map((pkg) => (
                    <button
                      key={pkg.name}
                      onClick={() => setSelectedPackaging(pkg.name)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedPackaging === pkg.name
                          ? 'border-[#5C6B47] bg-[#F2F6ED] shadow-xs'
                          : 'border-[#E8E1D5] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#2C2723] flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#8C6D53]" />
                          <span>{pkg.name}</span>
                          {pkg.priceAdd > 0 && (
                            <span className="text-[10px] text-[#5C6B47] font-semibold">
                              (+ R$ {pkg.priceAdd.toFixed(2)})
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#786A60] mt-0.5">{pkg.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selectedPackaging === pkg.name ? 'border-[#5C6B47] bg-[#5C6B47] text-white' : 'border-gray-300'}`}>
                        {selectedPackaging === pkg.name && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Bulk Discounts */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#2C2723] block">Quantidade de Barras:</span>
                    <span className="text-[10px] text-[#786A60]">
                      {quantity >= 20 ? '🎉 Desconto especial por volume aplicado!' : 'Lotes a partir de 20 barras ganham até 35% OFF'}
                    </span>
                  </div>
                  <div className="flex items-center border border-[#D4A373]/50 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-xs font-bold text-[#5C4533] hover:bg-[#FAF7F2]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-[#2C2723]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-1.5 text-xs font-bold text-[#5C4533] hover:bg-[#FAF7F2]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick preset buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[1, 3, 5, 20, 50, 100].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                        quantity === num
                          ? 'bg-[#5C6B47] text-white border-[#5C6B47]'
                          : 'bg-white text-[#5A4E46] border-[#E8E1D5]'
                      }`}
                    >
                      {num} {num === 1 ? 'barra' : 'barras'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact Inputs */}
              <div className="space-y-2.5 pt-2 border-t border-[#E8E1D5]">
                <span className="text-xs font-bold text-[#5C4533] block">Dados para Envio / Contato:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47]"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp com DDD (Ex: 11 99999-9999)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47]"
                  />
                </div>
                <textarea
                  placeholder="Observações especiais sobre a fórmula, prazo do evento ou fragrâncias..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47]"
                />
              </div>

            </div>
          )}

          {/* Stepper Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8E1D5]">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                currentStep === 1 ? 'opacity-40 cursor-not-allowed text-gray-400' : 'text-[#5C4533] hover:bg-[#FAF7F2]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(s => Math.min(5, s + 1))}
                className="px-5 py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <span>Próximo Passo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="finish-custom-order-btn"
                onClick={handleFinishCustomOrder}
                className="px-6 py-3 rounded-xl bg-[#C2593F] hover:bg-[#A8472E] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all animate-pulse"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Carrinho • R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </button>
            )}
          </div>

        </div>

        {/* Right: Live Interactive Soap Bar Preview & Batch Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Visual 3D-Like Artisan Soap Bar Simulator */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#D4A373]/40 shadow-sm space-y-5 text-center">
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D53] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Simulador Visual do Sabão
              </span>
              <span className="text-[10px] text-gray-500 font-medium">Cold Process Artesanal</span>
            </div>

            {/* Soap Graphic Canvas */}
            <div className="relative mx-auto w-48 h-44 sm:w-56 sm:h-52 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg border-2 border-black/10 transition-all duration-500 transform hover:rotate-1"
                 style={{ backgroundColor: selectedColor.hex }}>
              
              {/* Botanical dry sprinkles texture */}
              {selectedAddins.length > 0 && (
                <div className="absolute top-2 left-3 right-3 flex justify-around opacity-75">
                  <span className="text-[10px]">🌿</span>
                  <span className="text-[10px]">🌸</span>
                  <span className="text-[10px]">✨</span>
                  <span className="text-[10px]">🌿</span>
                </div>
              )}

              {/* Embossed Carved Stamp in the Soap */}
              <div className="px-4 py-2 rounded-xl border border-black/20 bg-black/10 backdrop-blur-2xs shadow-inner">
                <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-black/70 drop-shadow-xs uppercase">
                  {stampingText || 'BOTÂNICO'}
                </span>
                <div className="text-[8px] tracking-widest uppercase text-black/50 font-semibold mt-0.5">
                  ATELIÊ NATURAL
                </div>
              </div>

              {/* Soap bottom weight badge */}
              <div className="absolute bottom-2 text-[9px] text-black/60 font-semibold">
                {estimatedWeightPerUnit}g • Cura Natural
              </div>
            </div>

            {/* Formulation Summary Pill Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] text-left space-y-2.5 text-xs text-[#5C4533]">
              
              <div className="flex items-start justify-between">
                <span className="text-[#786A60]">Formato:</span>
                <span className="font-bold text-[#2C2723] text-right">{selectedShape}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-[#786A60]">Aroma Escolhido:</span>
                <span className="font-bold text-[#5C6B47] text-right max-w-[200px] leading-tight">
                  {selectedScent} ({scentIntensity})
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-[#786A60]">Argila / Cor:</span>
                <span className="font-bold text-[#2C2723] text-right">{selectedColor.name}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-[#786A60]">Embalagem:</span>
                <span className="font-bold text-[#8C6D53] text-right">{selectedPackaging}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-[#786A60]">Tempo de Cura:</span>
                <span className="font-bold text-[#2C2723] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D53]" />
                  4 a 6 semanas
                </span>
              </div>

              <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-[#2C2723] block">
                    {quantity}x {quantity === 1 ? 'Barra' : 'Barras'}
                  </span>
                  {discountRate > 0 && (
                    <span className="text-[10px] text-emerald-700 font-bold">
                      Desconto de {(discountRate * 100).toFixed(0)}% aplicado!
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-[#2C2723]">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    (R$ {(totalPrice / quantity).toFixed(2).replace('.', ',')} / un)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleFinishCustomOrder}
                className="w-full py-3 px-4 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Carrinho ({quantity}x)</span>
              </button>

              <a
                href={`https://wa.me/5511999999999?text=${generateWhatsAppCustomMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Orçamento Direto no WhatsApp</span>
              </a>
            </div>

            {orderCreatedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Pedido sob medida adicionado com sucesso ao seu carrinho!</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};
