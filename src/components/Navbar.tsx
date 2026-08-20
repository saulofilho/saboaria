import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Video, 
  MessageSquareHeart, 
  Leaf, 
  Layers, 
  Calculator,
  PhoneCall
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartItems?: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenCalculator: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartItems = [],
  setIsCartOpen,
  onOpenCalculator,
  searchQuery,
  setSearchQuery
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = (cartItems || []).reduce((acc, item) => acc + (item?.quantity || 0), 0);

  const navLinks = [
    { id: 'catalogo', label: 'Catálogo & Galeria', icon: Leaf },
    { id: 'personalizado', label: 'Sob Medida (Ateliê)', icon: Layers, highlight: true },
    { id: 'ingredientes', label: 'Guia de Ingredientes', icon: Sparkles },
    { id: 'aulas', label: 'Aulas para Iniciantes', icon: BookOpen },
    { id: 'tutoriais', label: 'Tutoriais em Vídeo', icon: Video },
    { id: 'depoimentos', label: 'Depoimentos', icon: MessageSquareHeart },
  ];

  return (
    <>
      {/* Top Notification Banner */}
      <aside aria-label="Aviso de promoção" className="bg-[#5C6B47] text-[#FAF7F2] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3 border-b border-[#4d5a3b]">
        <span className="flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Saboaria Botânica 100% Artesanal • Cura Natural de 45 dias pelo Método Cold Process</span>
        </span>
        <span className="hidden md:inline text-white/50">•</span>
        <span className="hidden md:inline text-[#FAF7F2]/90">Frete Grátis para todo Brasil em compras acima de R$ 150</span>
      </aside>

      {/* Main Header */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E8E1D5]' 
            : 'bg-[#FAF7F2] py-4 border-b border-[#EDE6DA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveTab('catalogo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#EADCC9] border border-[#D4A373]/40 flex items-center justify-center text-[#5C6B47] group-hover:bg-[#5C6B47] group-hover:text-[#FAF7F2] transition-colors duration-300 shadow-sm">
                <Leaf className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3B2F2F] leading-none">
                  Ateliê Botânico
                </span>
                <span className="block text-[11px] tracking-widest uppercase text-[#8C6D53] font-medium mt-0.5">
                  Saboaria Artesanal & Escola
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative ${
                      isActive
                        ? 'bg-[#5C6B47] text-white shadow-sm'
                        : link.highlight
                        ? 'text-[#8C6D53] bg-[#EADCC9]/50 hover:bg-[#EADCC9] border border-[#D4A373]/40'
                        : 'text-[#4A3E39] hover:text-[#2C2723] hover:bg-[#EFE9DF]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAF7F2]' : 'text-[#8C6D53]'}`} />
                    <span>{link.label}</span>
                    {link.highlight && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#C2593F] animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Toggle / Input */}
              <div className="relative">
                {showSearchInput ? (
                  <div className="flex items-center bg-white border border-[#D4A373]/60 rounded-full px-3 py-1.5 shadow-inner">
                    <Search className="w-4 h-4 text-[#8C6D53] mr-2 shrink-0" />
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Buscar sabão, argila, tutorial..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-xs sm:text-sm text-[#3B2F2F] bg-transparent focus:outline-none w-36 sm:w-56"
                      autoFocus
                    />
                    <button 
                      onClick={() => {
                        setShowSearchInput(false);
                        setSearchQuery('');
                      }}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-toggle-btn"
                    onClick={() => setShowSearchInput(true)}
                    className="p-2.5 rounded-full text-[#4A3E39] hover:bg-[#EFE9DF] transition-colors"
                    title="Buscar na saboaria"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Soapmaker SAP Calculator Quick Tool */}
              <button
                id="sap-calc-btn"
                onClick={onOpenCalculator}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5C6B47] bg-[#E2EAD8] hover:bg-[#D4E2C7] border border-[#B7CCA6] rounded-full transition-colors"
                title="Calculadora de Saponificação (SAP/Soda)"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calc SAP</span>
              </button>

              {/* Cart Button */}
              <button
                id="cart-drawer-trigger"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#3B2F2F] text-[#FAF7F2] hover:bg-[#5C6B47] transition-colors duration-200 shadow-sm flex items-center justify-center"
                aria-label="Abrir carrinho de compras"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C2593F] text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#FAF7F2] animate-scale-in">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#3B2F2F] hover:bg-[#EFE9DF] focus:outline-none"
                aria-label="Menu de navegação"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div id="mobile-navigation-menu" className="lg:hidden bg-[#FAF7F2] border-t border-[#E8E1D5] px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fade-in">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#5C6B47] text-white shadow-sm'
                      : link.highlight
                      ? 'bg-[#EADCC9]/70 text-[#3B2F2F] font-semibold border border-[#D4A373]/50'
                      : 'text-[#4A3E39] hover:bg-[#EFE9DF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8C6D53]'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && !isActive && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#C2593F] text-white rounded-full">
                      Personalize
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onOpenCalculator();
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 bg-[#E2EAD8] text-[#5C6B47] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#B7CCA6]"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculadora SAP / Soda</span>
              </button>
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20sabonetes%20artesanais!"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#25D366] text-white rounded-xl flex items-center justify-center hover:bg-[#1EBE5B]"
                title="Atendimento no WhatsApp"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
