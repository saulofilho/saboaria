import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  PieChart as PieIcon, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { SoapProduct } from '../types';

interface SalesOverviewSectionProps {
  products: SoapProduct[];
}

// Sophisticated botanical color palette for charts
const BOTANICAL_COLORS = [
  '#5C6B47', // Olive Green
  '#D4A373', // Warm Amber / Ochre
  '#8C6D53', // Terracotta Clay
  '#5E747F', // Eucalyptus Slate
  '#A07855', // Herbal Brown
  '#4A5738', // Deep Forest Moss
  '#9B7262', // Cacao Earth
  '#C89D7C', // Dried Chamomile
];

const PROCESS_COLORS: Record<string, string> = {
  'Cold Process (Saponificação a Frio)': '#5C6B47',
  'Hot Process (Cozimento Lento)': '#D4A373',
  'Glicerina 100% Vegetal': '#5E747F',
};

export const SalesOverviewSection: React.FC<SalesOverviewSectionProps> = ({ products }) => {
  const [activeMetricView, setActiveMetricView] = useState<'stock' | 'value'>('stock');
  const [distributionDimension, setDistributionDimension] = useState<'category' | 'process'>('category');
  const [stockSortOrder, setStockSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  // Computed Financial & Stock Summary Metrics
  const summaryMetrics = useMemo(() => {
    let totalStockUnits = 0;
    let totalInventoryValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let healthyStockCount = 0;

    products.forEach((p) => {
      const stock = p.stock ?? 0;
      totalStockUnits += stock;
      totalInventoryValue += stock * p.price;

      if (stock === 0) {
        outOfStockCount++;
      } else if (stock <= 10) {
        lowStockCount++;
      } else {
        healthyStockCount++;
      }
    });

    const averageProductPrice = products.length > 0 
      ? products.reduce((acc, p) => acc + p.price, 0) / products.length 
      : 0;

    const healthRate = products.length > 0 
      ? Math.round((healthyStockCount / products.length) * 100) 
      : 0;

    return {
      totalStockUnits,
      totalInventoryValue,
      lowStockCount,
      outOfStockCount,
      healthyStockCount,
      averageProductPrice,
      healthRate
    };
  }, [products]);

  // Data for Stock Levels & Inventory Value Bar Chart
  const stockLevelChartData = useMemo(() => {
    const list = products.map((p) => {
      const stock = p.stock ?? 0;
      const potentialValue = Math.round(stock * p.price);
      // Abbreviate long names for clean X-axis readability
      const shortName = p.name.length > 18 ? `${p.name.slice(0, 16)}...` : p.name;
      
      return {
        id: p.id,
        fullName: p.name,
        shortName,
        stock,
        potentialValue,
        price: p.price,
        category: p.category,
        isLowStock: stock > 0 && stock <= 10,
        isOutOfStock: stock === 0
      };
    });

    if (stockSortOrder === 'asc') {
      return [...list].sort((a, b) => a.stock - b.stock);
    }
    if (stockSortOrder === 'desc') {
      return [...list].sort((a, b) => b.stock - a.stock);
    }
    return list;
  }, [products, stockSortOrder]);

  // Data for Total Catalog Distribution (Categories)
  const categoryDistributionData = useMemo(() => {
    const categoryMap: Record<string, { count: number; totalStock: number; totalValue: number }> = {};

    products.forEach((p) => {
      const cat = p.category || 'Outros';
      const stock = p.stock ?? 0;
      const val = stock * p.price;

      if (!categoryMap[cat]) {
        categoryMap[cat] = { count: 0, totalStock: 0, totalValue: 0 };
      }
      categoryMap[cat].count += 1;
      categoryMap[cat].totalStock += stock;
      categoryMap[cat].totalValue += val;
    });

    const totalProducts = products.length || 1;

    return Object.entries(categoryMap).map(([name, data], index) => ({
      name,
      value: data.count,
      percentage: Math.round((data.count / totalProducts) * 100),
      totalStock: data.totalStock,
      totalValue: data.totalValue,
      color: BOTANICAL_COLORS[index % BOTANICAL_COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [products]);

  // Data for Total Catalog Distribution (Saponification Process)
  const processDistributionData = useMemo(() => {
    const processMap: Record<string, { count: number; totalStock: number; totalValue: number }> = {};

    products.forEach((p) => {
      const proc = p.saponificationProcess || 'Cold Process (Saponificação a Frio)';
      const stock = p.stock ?? 0;
      const val = stock * p.price;

      if (!processMap[proc]) {
        processMap[proc] = { count: 0, totalStock: 0, totalValue: 0 };
      }
      processMap[proc].count += 1;
      processMap[proc].totalStock += stock;
      processMap[proc].totalValue += val;
    });

    const totalProducts = products.length || 1;

    return Object.entries(processMap).map(([name, data]) => {
      // Shorten label for legend
      const displayName = name.split(' (')[0];
      return {
        name: displayName,
        fullName: name,
        value: data.count,
        percentage: Math.round((data.count / totalProducts) * 100),
        totalStock: data.totalStock,
        totalValue: data.totalValue,
        color: PROCESS_COLORS[name] || '#8C6D53'
      };
    }).sort((a, b) => b.value - a.value);
  }, [products]);

  // Active distribution dataset
  const currentDistributionData = distributionDimension === 'category' 
    ? categoryDistributionData 
    : processDistributionData;

  // Custom Tooltip for Stock & Value Bar Chart
  const CustomStockTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#2C2723] text-white p-3.5 rounded-2xl shadow-xl border border-[#5C6B47]/40 text-xs space-y-2 min-w-[210px]">
          <div className="border-b border-white/10 pb-1.5">
            <p className="font-serif font-bold text-sm text-[#FAF7F2]">{item.fullName}</p>
            <span className="text-[10px] text-[#D4A373] tracking-wide uppercase font-semibold">{item.category}</span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between items-center text-gray-300">
              <span>Preço Unitário:</span>
              <strong className="text-white">R$ {item.price.toFixed(2)}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Estoque Atual:</span>
              <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                item.stock === 0 
                  ? 'bg-red-500/20 text-red-300' 
                  : item.stock <= 10 
                  ? 'bg-amber-500/20 text-amber-300' 
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {item.stock} unidades
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-white/10 text-gray-300">
              <span>Valor Potencial:</span>
              <strong className="text-[#D4A373] font-mono text-xs">
                R$ {item.potentialValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Distribution Pie Chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#2C2723] text-white p-3 rounded-2xl shadow-xl border border-[#5C6B47]/40 text-xs space-y-1.5 min-w-[190px]">
          <p className="font-serif font-bold text-sm text-[#FAF7F2]">{item.fullName || item.name}</p>
          <div className="space-y-1 text-[11px] text-gray-300">
            <div className="flex justify-between">
              <span>Fórmulas no Catálogo:</span>
              <strong className="text-white">{item.value} ({item.percentage}%)</strong>
            </div>
            <div className="flex justify-between">
              <span>Estoque Acumulado:</span>
              <strong className="text-[#D4A373]">{item.totalStock} un.</strong>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-1">
              <span>Valor em Estoque:</span>
              <strong className="text-emerald-300">R$ {item.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="cms-sales-overview" className="space-y-6">
      
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4A373]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#5C6B47] text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-4 h-4 text-[#D4A373]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2723]">
                Visão Geral de Vendas & Estoque (Sales Overview)
              </h2>
              <p className="text-xs text-[#6B5E54]">
                Análise em tempo real de níveis de estoque, valor potencial de vendas e distribuição do catálogo botânico.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Legend Tags */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-[#5C6B47] font-semibold bg-[#5C6B47]/10 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {summaryMetrics.healthRate}% Estoque Regular
          </span>
          {summaryMetrics.lowStockCount > 0 && (
            <span className="flex items-center gap-1 text-amber-700 font-semibold bg-amber-100 px-2.5 py-1 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              {summaryMetrics.lowStockCount} Baixo
            </span>
          )}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Estimated Inventory Value */}
        <div className="bg-white rounded-2xl p-5 border border-[#D4A373]/30 shadow-xs hover:border-[#5C6B47]/50 transition-colors">
          <div className="flex items-center justify-between text-[#8C6D53]">
            <span className="text-xs font-semibold uppercase tracking-wider">Valor Potencial de Vendas</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#5C6B47] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-serif font-bold text-[#2C2723]">
              R$ {summaryMetrics.totalInventoryValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-[#6B5E54] mt-1 flex items-center gap-1">
              <span className="text-emerald-700 font-bold">100%</span> se todo o lote atual for vendido
            </p>
          </div>
        </div>

        {/* Total Physical Stock */}
        <div className="bg-white rounded-2xl p-5 border border-[#D4A373]/30 shadow-xs hover:border-[#5C6B47]/50 transition-colors">
          <div className="flex items-center justify-between text-[#8C6D53]">
            <span className="text-xs font-semibold uppercase tracking-wider">Estoque Físico Total</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#5C6B47] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-serif font-bold text-[#2C2723]">
              {summaryMetrics.totalStockUnits} <span className="text-sm font-normal text-[#6B5E54]">barras</span>
            </p>
            <p className="text-[11px] text-[#6B5E54] mt-1">
              Distribuídas em {products.length} formulações ativas
            </p>
          </div>
        </div>

        {/* Average Price per Soap */}
        <div className="bg-white rounded-2xl p-5 border border-[#D4A373]/30 shadow-xs hover:border-[#5C6B47]/50 transition-colors">
          <div className="flex items-center justify-between text-[#8C6D53]">
            <span className="text-xs font-semibold uppercase tracking-wider">Ticket Médio das Barras</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#D4A373] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-serif font-bold text-[#2C2723]">
              R$ {summaryMetrics.averageProductPrice.toFixed(2)}
            </p>
            <p className="text-[11px] text-[#6B5E54] mt-1">
              Média ponderada do catálogo botânico
            </p>
          </div>
        </div>

        {/* Catalog Health & Critical Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-[#D4A373]/30 shadow-xs hover:border-[#5C6B47]/50 transition-colors">
          <div className="flex items-center justify-between text-[#8C6D53]">
            <span className="text-xs font-semibold uppercase tracking-wider">Estado do Estoque</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              summaryMetrics.lowStockCount + summaryMetrics.outOfStockCount > 0 
                ? 'bg-amber-50 text-amber-600' 
                : 'bg-emerald-50 text-emerald-600'
            }`}>
              {summaryMetrics.lowStockCount + summaryMetrics.outOfStockCount > 0 ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-serif font-bold text-[#2C2723]">
              {summaryMetrics.healthyStockCount} <span className="text-sm font-normal text-[#6B5E54]">estáveis</span>
            </p>
            <p className="text-[11px] text-[#6B5E54] mt-1">
              {summaryMetrics.lowStockCount} em atenção • {summaryMetrics.outOfStockCount} zerados
            </p>
          </div>
        </div>

      </div>

      {/* Main Charts Grid: Stock Levels (BarChart) + Catalog Distribution (PieChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Chart 1: Product Stock Levels & Inventory Potential Value */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-[#D4A373]/30 shadow-xs space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FAF7F2] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#5C6B47]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C2723]">
                  Níveis de Estoque por Produto
                </h3>
              </div>
              <p className="text-xs text-[#8C6D53]">
                {activeMetricView === 'stock' 
                  ? 'Unidades físicas disponíveis para venda em cada barra'
                  : 'Valor bruto acumulado por lote (Preço × Estoque)'}
              </p>
            </div>

            {/* Chart View Controls */}
            <div className="flex items-center gap-2">
              
              {/* Metric Toggle */}
              <div className="flex rounded-xl bg-[#FAF7F2] p-1 border border-[#D4A373]/30 text-xs font-semibold">
                <button
                  onClick={() => setActiveMetricView('stock')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeMetricView === 'stock'
                      ? 'bg-[#5C6B47] text-white shadow-xs'
                      : 'text-[#4A3E39] hover:text-black'
                  }`}
                >
                  Unidades
                </button>
                <button
                  onClick={() => setActiveMetricView('value')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeMetricView === 'value'
                      ? 'bg-[#5C6B47] text-white shadow-xs'
                      : 'text-[#4A3E39] hover:text-black'
                  }`}
                >
                  Valor (R$)
                </button>
              </div>

              {/* Order Toggle */}
              <button
                onClick={() => {
                  if (stockSortOrder === 'default') setStockSortOrder('desc');
                  else if (stockSortOrder === 'desc') setStockSortOrder('asc');
                  else setStockSortOrder('default');
                }}
                className="px-2.5 py-1.5 rounded-xl border border-[#D4A373]/30 text-xs text-[#4A3E39] hover:bg-[#FAF7F2] flex items-center gap-1"
                title="Alternar ordenação"
              >
                <Filter className="w-3.5 h-3.5 text-[#5C6B47]" />
                <span className="hidden sm:inline">
                  {stockSortOrder === 'desc' ? 'Maior p/ Menor' : stockSortOrder === 'asc' ? 'Menor p/ Maior' : 'Ordem Padrão'}
                </span>
              </button>

            </div>
          </div>

          {/* Recharts Bar Chart Container */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stockLevelChartData}
                margin={{ top: 10, right: 15, left: -10, bottom: 45 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE9DF" />
                <XAxis 
                  dataKey="shortName" 
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 10, fill: '#4A3E39' }}
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#8C6D53' }}
                  tickFormatter={(val) => activeMetricView === 'stock' ? `${val} un` : `R$ ${val}`}
                />
                <Tooltip content={<CustomStockTooltip />} />
                
                {/* Reference line for minimum safety stock threshold */}
                {activeMetricView === 'stock' && (
                  <ReferenceLine 
                    y={10} 
                    stroke="#D97706" 
                    strokeDasharray="4 4" 
                    label={{ 
                      value: 'Mínimo de Segurança (10 un)', 
                      fill: '#D97706', 
                      fontSize: 10,
                      position: 'insideTopRight'
                    }} 
                  />
                )}

                <Bar
                  dataKey={activeMetricView === 'stock' ? 'stock' : 'potentialValue'}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                >
                  {stockLevelChartData.map((entry, index) => {
                    let barFill = '#5C6B47'; // Default healthy olive
                    if (activeMetricView === 'stock') {
                      if (entry.stock === 0) barFill = '#EF4444'; // Red out of stock
                      else if (entry.stock <= 10) barFill = '#F59E0B'; // Amber low stock
                    } else {
                      barFill = entry.stock <= 10 ? '#D4A373' : '#5C6B47';
                    }
                    return <Cell key={`cell-${entry.id}-${index}`} fill={barFill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Helper Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#FAF7F2] text-[11px] text-[#6B5E54]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5C6B47]" />
                <span>Estoque Saudável ({'>'}10 un)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Estoque Baixo (1 a 10 un)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span>Esgotado (0 un)</span>
              </div>
            </div>

            <span className="text-[10px] text-[#8C6D53]">
              Dica: Ajuste os números rapidamente na tabela abaixo.
            </span>
          </div>

        </div>

        {/* Chart 2: Total Catalog Distribution (Donut / Pie Chart) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#D4A373]/30 shadow-xs space-y-5 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-3">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#D4A373]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C2723]">
                  Distribuição do Catálogo
                </h3>
              </div>

              {/* Toggle Dimension */}
              <div className="flex rounded-xl bg-[#FAF7F2] p-0.5 border border-[#D4A373]/30 text-[11px] font-semibold">
                <button
                  onClick={() => setDistributionDimension('category')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    distributionDimension === 'category'
                      ? 'bg-[#5C6B47] text-white shadow-xs'
                      : 'text-[#4A3E39]'
                  }`}
                >
                  Categoria
                </button>
                <button
                  onClick={() => setDistributionDimension('process')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    distributionDimension === 'process'
                      ? 'bg-[#5C6B47] text-white shadow-xs'
                      : 'text-[#4A3E39]'
                  }`}
                >
                  Processo
                </button>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="h-56 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={currentDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {currentDistributionData.map((entry, index) => (
                      <Cell key={`donut-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-serif font-bold text-[#2C2723]">{products.length}</span>
                <span className="text-[10px] text-[#8C6D53] uppercase font-semibold">Barras</span>
              </div>
            </div>
          </div>

          {/* Clean Botanical Distribution Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-[#FAF7F2]">
            {currentDistributionData.map((item, index) => (
              <div key={`dist-item-${index}`} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-[#3B2F2F] truncate font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-right shrink-0">
                  <span className="text-[11px] text-[#8C6D53]">{item.totalStock} un.</span>
                  <span className="font-bold text-[#2C2723] w-9">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
