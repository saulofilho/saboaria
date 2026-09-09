import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf, 
  Layers, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  DollarSign, 
  TrendingUp, 
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  ArrowUpDown,
  X
} from 'lucide-react';
import { SoapProduct } from '../types';
import { AdminUser } from '../utils/authStorage';

interface AdminCmsDashboardProps {
  products: SoapProduct[];
  adminUser: AdminUser | null;
  onAddProduct: () => void;
  onEditProduct: (product: SoapProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onDuplicateProduct: (product: SoapProduct) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onResetToDefaults: () => void;
  onImportProducts: (imported: SoapProduct[]) => void;
  onViewStore: () => void;
  onLogout: () => void;
  onPreviewInStore: (product: SoapProduct) => void;
}

export const AdminCmsDashboard: React.FC<AdminCmsDashboardProps> = ({
  products,
  adminUser,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onUpdateStock,
  onResetToDefaults,
  onImportProducts,
  onViewStore,
  onLogout,
  onPreviewInStore
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [stockFilter, setStockFilter] = useState<'todos' | 'em_estoque' | 'baixo' | 'esgotado'>('todos');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc'>('name');

  // Delete confirmation state
  const [deletingProduct, setDeletingProduct] = useState<SoapProduct | null>(null);
  // Reset confirmation state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Categories list derived from current products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    return ['Todas', ...Array.from(set)];
  }, [products]);

  // KPIs
  const stats = useMemo(() => {
    const total = products.length;
    const totalStock = products.reduce((acc, p) => acc + (p.stock ?? 0), 0);
    const avgPrice = total > 0 ? products.reduce((acc, p) => acc + p.price, 0) / total : 0;
    const lowStockCount = products.filter(p => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 10).length;
    const outOfStockCount = products.filter(p => (p.stock ?? 0) === 0).length;
    const bestsellersCount = products.filter(p => p.isBestseller).length;

    return {
      total,
      totalStock,
      avgPrice,
      lowStockCount,
      outOfStockCount,
      bestsellersCount
    };
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTag = p.tagline?.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchIng = p.ingredients?.some(i => i.toLowerCase().includes(q));
          if (!matchName && !matchTag && !matchCat && !matchIng) return false;
        }

        // Category
        if (selectedCategory !== 'Todas' && p.category !== selectedCategory) {
          return false;
        }

        // Stock status
        const stk = p.stock ?? 0;
        if (stockFilter === 'em_estoque' && stk <= 10) return false;
        if (stockFilter === 'baixo' && (stk === 0 || stk > 10)) return false;
        if (stockFilter === 'esgotado' && stk > 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'stock-asc') return (a.stock ?? 0) - (b.stock ?? 0);
        if (sortBy === 'stock-desc') return (b.stock ?? 0) - (a.stock ?? 0);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy]);

  // Handle Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `atelie_botanico_catalogo_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Handle Import JSON
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name && parsed[0].price) {
          onImportProducts(parsed);
          alert(`Catálogo importado com sucesso! ${parsed.length} produtos carregados.`);
        } else {
          alert('Arquivo JSON inválido para catálogo de produtos.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON. Verifique o formato.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section id="admin-cms-dashboard" className="bg-[#FAF7F2] min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top CMS Header Banner */}
        <div className="bg-[#2C2723] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#3B342F] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#5C6B47]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#5C6B47] text-[#FAF7F2] flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Painel CMS Ateliê</span>
                </span>
                <span className="text-xs text-[#D4A373] hidden sm:inline">•</span>
                <span className="text-xs text-[#A89A8F] hidden sm:inline">
                  Logado como: <strong>{adminUser?.username || 'admin'}</strong> ({adminUser?.role || 'Mestre Saboeiro'})
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">
                Gestão de Produtos & Catálogo
              </h1>
              <p className="text-xs sm:text-sm text-[#A89A8F] max-w-2xl leading-relaxed">
                Adicione novas fórmulas artesanais, ajuste preços, controle estoque em tempo real e edite histórias botânicas que alimentam todo o site.
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                id="cms-add-product-btn"
                onClick={onAddProduct}
                className="px-4 py-2.5 rounded-2xl bg-[#5C6B47] hover:bg-[#4A5738] text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 text-[#D4A373]" />
                <span>Cadastrar Novo Produto</span>
              </button>

              <button
                onClick={onViewStore}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-colors"
                title="Ir para a loja pública"
              >
                <Eye className="w-4 h-4 text-[#D4A373]" />
                <span>Ver Loja</span>
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-2.5 rounded-2xl bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs font-semibold border border-red-800/40 flex items-center gap-1.5 transition-colors"
                title="Sair do painel administrativo"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Produtos Ativos</span>
              <p className="text-xl font-serif font-bold text-white">{stats.total}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Estoque Total</span>
              <p className="text-xl font-serif font-bold text-white">{stats.totalStock} un.</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Preço Médio</span>
              <p className="text-xl font-serif font-bold text-[#D4A373]">R$ {stats.avgPrice.toFixed(2)}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Baixo Estoque</span>
              <p className={`text-xl font-serif font-bold ${stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`}>
                {stats.lowStockCount} itens
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Esgotados</span>
              <p className={`text-xl font-serif font-bold ${stats.outOfStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {stats.outOfStockCount}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#A89A8F] uppercase tracking-wider">Bestsellers</span>
              <p className="text-xl font-serif font-bold text-[#D4A373]">{stats.bestsellersCount}</p>
            </div>
          </div>
        </div>

        {/* Action Toolbar & Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#D4A373]/30 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C6D53] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, categoria ou ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D4A373]/40 text-xs sm:text-sm text-[#2C2723] focus:outline-none focus:border-[#5C6B47] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Utility buttons: Export / Import / Reset */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportJson}
                className="px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#D4A373]/40 text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5 transition-colors"
                title="Baixar backup dos produtos em JSON"
              >
                <Download className="w-3.5 h-3.5 text-[#5C6B47]" />
                <span className="hidden sm:inline">Exportar JSON</span>
              </button>

              <label className="px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#D4A373]/40 text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#5C6B47]" />
                <span className="hidden sm:inline">Importar JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-red-50 border border-[#D4A373]/40 hover:border-red-200 text-xs font-semibold text-[#8C6D53] hover:text-red-700 flex items-center gap-1.5 transition-colors"
                title="Restaurar os produtos originais de fábrica"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restaurar Padrão</span>
              </button>

              <div className="h-6 w-[1px] bg-[#D4A373]/30 mx-1 hidden sm:block" />

              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#D4A373]/40">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-[#5C6B47] text-white shadow-2xs' : 'text-[#6B5E54] hover:text-[#2C2723]'
                  }`}
                  title="Visualização em Tabela"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#5C6B47] text-white shadow-2xs' : 'text-[#6B5E54] hover:text-[#2C2723]'
                  }`}
                  title="Visualização em Grade"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Sub-filters row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#D4A373]/20 text-xs">
            {/* Category */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8C6D53] font-semibold">Categoria:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8C6D53] font-semibold">Estoque:</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
              >
                <option value="todos">Todos</option>
                <option value="em_estoque">Em estoque (&gt;10 un)</option>
                <option value="baixo">Baixo estoque (1 a 10 un)</option>
                <option value="esgotado">Esgotados (0 un)</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-[#8C6D53] font-semibold">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4A373]/40 text-xs text-[#2C2723] focus:outline-none focus:border-[#5C6B47]"
              >
                <option value="name">Nome (A - Z)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="stock-asc">Menor Estoque</option>
                <option value="stock-desc">Maior Estoque</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-[#6B5E54] px-1">
          <span>
            Exibindo <strong>{filteredProducts.length}</strong> de {products.length} produtos
          </span>
          {(selectedCategory !== 'Todas' || stockFilter !== 'todos' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setStockFilter('todos');
                setSearchQuery('');
              }}
              className="text-[#C2593F] font-bold hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl shadow-xs border border-[#D4A373]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE9DF] border-b border-[#D4A373]/30 text-[#4A3E39] uppercase font-bold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Produto</th>
                    <th className="py-3.5 px-3">Categoria</th>
                    <th className="py-3.5 px-3">Preço</th>
                    <th className="py-3.5 px-3">Estoque</th>
                    <th className="py-3.5 px-3">Método / Cura</th>
                    <th className="py-3.5 px-3">Badges</th>
                    <th className="py-3.5 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4A373]/15">
                  {filteredProducts.map((product) => {
                    const stk = product.stock ?? 0;
                    return (
                      <tr key={product.id} className="hover:bg-[#FAF7F2] transition-colors group">
                        
                        {/* Product info with image */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=200&q=80'}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-xl object-cover border border-[#D4A373]/30 shrink-0"
                            />
                            <div>
                              <h4 className="font-serif font-bold text-sm text-[#2C2723] group-hover:text-[#5C6B47] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-[#8C7E74] line-clamp-1 max-w-xs">
                                {product.tagline}
                              </p>
                              <span className="text-[10px] text-[#A89A8F]">
                                {product.weightGrams}g • {product.scentProfile?.family}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EADCC9]/60 text-[#5C6B47] border border-[#D4A373]/30 whitespace-nowrap">
                            {product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className="font-bold text-sm text-[#2C2723]">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="block text-[10px] line-through text-gray-400">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* Stock with quick inline stepper */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onUpdateStock(product.id, Math.max(0, stk - 1))}
                              className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#D4A373]/40 text-[#4A3E39] font-bold hover:bg-[#EFE9DF] flex items-center justify-center transition-colors"
                              title="Reduzir 1 unidade"
                            >
                              -
                            </button>
                            <span className={`w-8 text-center font-bold text-xs ${
                              stk > 10 ? 'text-emerald-700' : stk > 0 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {stk}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateStock(product.id, stk + 1)}
                              className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#D4A373]/40 text-[#4A3E39] font-bold hover:bg-[#EFE9DF] flex items-center justify-center transition-colors"
                              title="Adicionar 1 unidade"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Saponification / Cure */}
                        <td className="py-3.5 px-3 text-[11px] text-[#6B5E54] whitespace-nowrap">
                          <p className="font-medium text-[#2C2723]">{product.saponificationProcess?.split('(')[0]}</p>
                          <p className="text-[10px] text-[#8C7E74]">{product.curingTimeWeeks} sem. cura</p>
                        </td>

                        {/* Badges */}
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {product.isBestseller && (
                              <span className="px-2 py-0.5 rounded-md bg-[#D4A373]/20 text-[#8C6D53] border border-[#D4A373]/50 text-[10px] font-bold">
                                Bestseller
                              </span>
                            )}
                            {product.isNew && (
                              <span className="px-2 py-0.5 rounded-md bg-[#5C6B47]/20 text-[#5C6B47] border border-[#5C6B47]/40 text-[10px] font-bold">
                                Novo
                              </span>
                            )}
                            {product.isSeasonal && (
                              <span className="px-2 py-0.5 rounded-md bg-[#C2593F]/15 text-[#C2593F] border border-[#C2593F]/40 text-[10px] font-bold">
                                Sazonal
                              </span>
                            )}
                            {product.releaseBadge && (
                              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                                {product.releaseBadge}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewInStore(product)}
                              className="p-1.5 rounded-lg text-[#6B5E54] hover:text-[#5C6B47] hover:bg-[#EADCC9]/50 transition-colors"
                              title="Ver na loja pública"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onDuplicateProduct(product)}
                              className="p-1.5 rounded-lg text-[#6B5E54] hover:text-[#5C6B47] hover:bg-[#EADCC9]/50 transition-colors"
                              title="Duplicar barra como rascunho"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onEditProduct(product)}
                              className="p-1.5 rounded-lg text-[#5C6B47] hover:bg-[#EADCC9]/70 transition-colors font-semibold flex items-center gap-1"
                              title="Editar dados completos"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeletingProduct(product)}
                              className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Excluir produto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-[#D4A373] mx-auto opacity-50" />
                <h4 className="font-serif text-base font-bold text-[#3B2F2F]">
                  Nenhum produto encontrado com os filtros atuais.
                </h4>
                <p className="text-xs text-[#8C7E74]">
                  Tente alterar os termos de busca ou remover os filtros de categoria/estoque.
                </p>
              </div>
            )}
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stk = product.stock ?? 0;
              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#D4A373]/30 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=400&q=80'}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2C2723]/80 text-white backdrop-blur-xs">
                        {product.category}
                      </span>
                      <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        stk > 10 ? 'bg-emerald-700 text-white' : stk > 0 ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {stk > 10 ? `${stk} un.` : stk > 0 ? `Restam ${stk}` : 'Esgotado'}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#8C6D53]">
                        <span>{product.weightGrams}g</span>
                        <span>{product.curingTimeWeeks} sem. cura</span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-[#2C2723] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#8C7E74] line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#2C2723]">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs line-through text-gray-400 ml-2">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Inline Stock Stepper */}
                        <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#D4A373]/30">
                          <button
                            onClick={() => onUpdateStock(product.id, Math.max(0, stk - 1))}
                            className="w-5 h-5 rounded bg-white text-xs font-bold text-gray-700 hover:bg-[#EFE9DF] flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1.5">{stk}</span>
                          <button
                            onClick={() => onUpdateStock(product.id, stk + 1)}
                            className="w-5 h-5 rounded bg-white text-xs font-bold text-gray-700 hover:bg-[#EFE9DF] flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-[#FAF7F2] border-t border-[#D4A373]/20 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onPreviewInStore(product)}
                      className="text-xs text-[#5C6B47] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver na Loja</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onDuplicateProduct(product)}
                        className="p-2 rounded-lg text-gray-500 hover:text-black hover:bg-white transition-colors"
                        title="Duplicar barra"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onEditProduct(product)}
                        className="p-2 rounded-lg bg-[#5C6B47] text-white hover:bg-[#4A5738] transition-colors"
                        title="Editar barra"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeletingProduct(product)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Excluir barra"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* MODAL: DELETE PRODUCT CONFIRMATION */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-red-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#2C2723]">
                Excluir barra do catálogo?
              </h4>
              <p className="text-xs text-[#6B5E54]">
                Você está prestes a remover <strong>"{deletingProduct.name}"</strong>. Esta barra deixará de ser exibida no site.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setDeletingProduct(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(deletingProduct.id);
                  setDeletingProduct(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RESET FACTORY CONFIRMATION */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#2C2723]">
                Restaurar produtos padrão de fábrica?
              </h4>
              <p className="text-xs text-[#6B5E54]">
                Isso recarregará os produtos originais do Ateliê Botânico, substituindo qualquer barra adicionada ou alterada manualmente.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetToDefaults();
                  setIsResetConfirmOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
              >
                Restaurar Padrão
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
