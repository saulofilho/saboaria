import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  Droplets, 
  Sparkles, 
  ShieldAlert, 
  Info, 
  RotateCcw,
  Check
} from 'lucide-react';

interface SoapCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoapCalculatorModal: React.FC<SoapCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  // Common soapmaking oils with their SAP (NaOH) factors
  const [oils, setOils] = useState([
    { name: 'Azeite de Oliva Extra Virgem', sap: 0.134, grams: 500 },
    { name: 'Óleo de Coco Palmiste', sap: 0.183, grams: 250 },
    { name: 'Manteiga de Karité Não Refinada', sap: 0.128, grams: 150 },
    { name: 'Óleo de Rícino (Mamona)', sap: 0.128, grams: 100 },
    { name: 'Óleo de Girassol / Amêndoas', sap: 0.136, grams: 0 },
    { name: 'Manteiga de Cacau Pura', sap: 0.137, grams: 0 },
  ]);

  const [superfatPercent, setSuperfatPercent] = useState<number>(7); // 7% superfat
  const [waterConcentration, setWaterConcentration] = useState<number>(33); // 33% lye concentration

  if (!isOpen) return null;

  const totalOilsGrams = oils.reduce((sum, o) => sum + o.grams, 0);

  // Raw NaOH needed before superfat discount
  const rawLyeNeeded = oils.reduce((sum, o) => sum + (o.grams * o.sap), 0);

  // Lye with Superfat reduction: Lye = RawLye * (1 - Superfat/100)
  const finalLyeGrams = totalOilsGrams > 0 ? rawLyeNeeded * (1 - (superfatPercent / 100)) : 0;

  // Water calculation based on lye concentration: Water = (FinalLye / (Concentration/100)) - FinalLye
  const waterGrams = finalLyeGrams > 0 ? (finalLyeGrams / (waterConcentration / 100)) - finalLyeGrams : 0;

  const totalBatchWeight = totalOilsGrams + finalLyeGrams + waterGrams;
  const estimatedBarsCount = totalBatchWeight > 0 ? Math.floor(totalBatchWeight / 120) : 0;

  const handleWeightChange = (index: number, val: number) => {
    const updated = [...oils];
    updated[index].grams = Math.max(0, val);
    setOils(updated);
  };

  const handleReset = () => {
    setOils([
      { name: 'Azeite de Oliva Extra Virgem', sap: 0.134, grams: 500 },
      { name: 'Óleo de Coco Palmiste', sap: 0.183, grams: 250 },
      { name: 'Manteiga de Karité Não Refinada', sap: 0.128, grams: 150 },
      { name: 'Óleo de Rícino (Mamona)', sap: 0.128, grams: 100 },
      { name: 'Óleo de Girassol / Amêndoas', sap: 0.136, grams: 0 },
      { name: 'Manteiga de Cacau Pura', sap: 0.137, grams: 0 },
    ]);
    setSuperfatPercent(7);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        id="soap-calculator-modal"
        className="bg-[#FAF7F2] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[92vh] flex flex-col my-auto"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E2EAD8] text-[#5C6B47] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2723]">
                Calculadora de Saponificação (SAP & Lixívia)
              </h3>
              <p className="text-[11px] text-[#786A60]">
                Ferramenta precisa para formulações do método Cold Process (NaOH)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              title="Restaurar receita padrão"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          
          {/* Controls: Superfat & Water Concentration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-[#E8E1D5] text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-bold text-[#5C4533]">Superfat (Sobreengorduramento):</span>
                <span className="font-bold text-[#5C6B47]">{superfatPercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={superfatPercent}
                onChange={(e) => setSuperfatPercent(Number(e.target.value))}
                className="w-full accent-[#5C6B47]"
              />
              <span className="text-[10px] text-gray-500 block">
                Recomendado para banho: 5% a 8% de óleos livres hidratantes.
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-bold text-[#5C4533]">Concentração da Lixívia:</span>
                <span className="font-bold text-[#5C6B47]">{waterConcentration}%</span>
              </div>
              <input
                type="range"
                min={28}
                max={40}
                value={waterConcentration}
                onChange={(e) => setWaterConcentration(Number(e.target.value))}
                className="w-full accent-[#5C6B47]"
              />
              <span className="text-[10px] text-gray-500 block">
                33% equivale a aprox. 2:1 de água destilada para soda cáustica.
              </span>
            </div>
          </div>

          {/* Oils Weight Inputs Table */}
          <div className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden">
            <div className="p-3.5 bg-[#F4EFE6] border-b border-[#E8E1D5] flex items-center justify-between text-xs font-bold text-[#5C4533]">
              <span>Gorduras & Óleos Vegetais da Receita</span>
              <span>Peso em Gramas (g)</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {oils.map((oil, idx) => (
                <div key={oil.name} className="p-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-semibold text-[#2C2723] block">{oil.name}</span>
                    <span className="text-[10px] text-[#8C6D53]">SAP NaOH: {oil.sap.toFixed(3)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={oil.grams || ''}
                      placeholder="0"
                      onChange={(e) => handleWeightChange(idx, Number(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-xl border border-[#E8E1D5] text-right font-mono font-bold text-xs focus:outline-none focus:ring-1 focus:ring-[#5C6B47] bg-[#FAF7F2]"
                    />
                    <span className="text-gray-400 font-semibold text-xs">g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saponification Result Calculation Box */}
          <div className="bg-gradient-to-r from-[#EAE2D5] via-[#F4EDE2] to-[#EAE2D5] p-5 rounded-3xl border border-[#D4A373]/40 space-y-4">
            <h4 className="font-serif text-base font-bold text-[#2C2723] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6D53]" />
              <span>Resultado do Cálculo da Lixívia:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              
              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
                <span className="text-[11px] text-gray-500 font-medium block">Total de Óleos</span>
                <span className="font-serif text-xl font-bold text-[#2C2723] block mt-1">
                  {totalOilsGrams.toFixed(0)}g
                </span>
                <span className="text-[10px] text-gray-400">100% das gorduras</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
                <span className="text-[11px] text-gray-500 font-medium block">Soda Cáustica (NaOH 99%)</span>
                <span className="font-serif text-xl font-bold text-emerald-800 block mt-1">
                  {finalLyeGrams.toFixed(1)}g
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">{superfatPercent}% Superfat</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-2xs">
                <span className="text-[11px] text-gray-500 font-medium block">Água Destilada</span>
                <span className="font-serif text-xl font-bold text-[#5C6B47] block mt-1">
                  {waterGrams.toFixed(1)}g
                </span>
                <span className="text-[10px] text-gray-400">{waterConcentration}% concentração</span>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-[#5C4533] pt-1">
              <span>
                <strong>Peso Total do Lote Líquido:</strong> {totalBatchWeight.toFixed(0)}g
              </span>
              <span>
                <strong>Rendimento Estimado:</strong> ~{estimatedBarsCount} barras de 120g
              </span>
            </div>
          </div>

          {/* Safety Reminder */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Regra de Ouro da Saboaria:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Sempre despeje as {finalLyeGrams.toFixed(1)}g de soda LENTAMENTE sobre as {waterGrams.toFixed(1)}g de água destilada gelada, NUNCA o contrário. Use óculos de proteção e luvas de nitrila.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8E1D5] bg-white text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#5C6B47] text-white text-xs font-semibold"
          >
            Fechar Calculadora
          </button>
        </div>

      </div>
    </div>
  );
};
