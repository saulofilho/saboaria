/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomSoapBuilder } from './components/CustomSoapBuilder';
import { IngredientsGuide } from './components/IngredientsGuide';
import { OnlineClasses } from './components/OnlineClasses';
import { VideoTutorials } from './components/VideoTutorials';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SoapCalculatorModal } from './components/SoapCalculatorModal';
import { Footer } from './components/Footer';
import { CartItem, Product, SoapProduct, CustomSoapOrder } from './types';
import { INITIAL_PRODUCTS } from './data/mockData';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalogo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod-1',
      name: 'Lavanda Francesa & Manteiga de Karité',
      price: 34.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=600&q=80',
      specsSummary: '125g • Cold Process • Karité & Lavanda',
      isCustom: false
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Modals
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cartItems.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += item.quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, item]);
    }
    showToast(`Adicionado à cesta: ${item.name}`);
  };

  const handleAddProductToCart = (product: SoapProduct, quantity: number = 1) => {
    handleAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1607006310492-97214953932e?auto=format&fit=crop&w=600&q=80',
      specsSummary: `${product.weightGrams}g • ${product.category}`,
      isCustom: false,
      product
    });
  };

  const handleAddCustomOrderToCart = (order: CustomSoapOrder) => {
    handleAddToCart({
      id: order.id,
      name: `Sabão Sob Medida (${order.quantity}x)`,
      price: order.totalPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80',
      specsSummary: `${order.quantity} barras • ${order.packagingStyle}`,
      isCustom: true,
      customOrder: order
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCatalogTab = activeTab === 'catalogo' || activeTab === 'loja' || activeTab === 'todos';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2723] font-sans antialiased selection:bg-[#5C6B47] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onExploreCatalog={() => scrollToSection('catalogo')}
          onOpenCustomBuilder={() => scrollToSection('personalizado')}
          onOpenClasses={() => scrollToSection('aulas')}
        />

        {/* View Switcher based on Active Tab */}
        <div className="space-y-4">
          
          {/* Section: Loja / Catálogo */}
          {isCatalogTab && (
            <ProductCatalog
              products={INITIAL_PRODUCTS}
              onSelectProduct={(product) => setSelectedProductDetail(product)}
              onAddToCart={(product) => handleAddProductToCart(product, 1)}
              onCustomizePreset={() => scrollToSection('personalizado')}
              searchQuery={searchQuery}
            />
          )}

          {/* Section: Custom Soap Builder */}
          {(activeTab === 'personalizado' || activeTab === 'todos') && (
            <CustomSoapBuilder
              onAddCustomOrderToCart={handleAddCustomOrderToCart}
            />
          )}

          {/* Section: Ingredients & Botanical Guide */}
          {(activeTab === 'ingredientes' || activeTab === 'todos') && (
            <IngredientsGuide
              searchQuery={searchQuery}
              onOpenCalculator={() => setIsCalculatorOpen(true)}
            />
          )}

          {/* Section: Online Classes / School for Beginners */}
          {(activeTab === 'aulas' || activeTab === 'todos') && (
            <OnlineClasses />
          )}

          {/* Section: Video Step-by-Step Tutorials with Category Search */}
          {(activeTab === 'tutoriais' || activeTab === 'todos') && (
            <VideoTutorials
              searchQuery={searchQuery}
            />
          )}

          {/* Section: Customer Testimonials & Reviews */}
          {(activeTab === 'depoimentos' || activeTab === 'todos') && (
            <ReviewsSection />
          )}

        </div>

      </main>

      {/* Floating Bottom Quick Tab Switcher for Quick Access */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#231F1C]/90 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-2xl flex items-center gap-1.5 sm:gap-2 max-w-[95vw] overflow-x-auto scrollbar-none">
        {[
          { id: 'catalogo', label: 'Galeria' },
          { id: 'personalizado', label: 'Sob Medida' },
          { id: 'ingredientes', label: 'Ingredientes' },
          { id: 'aulas', label: 'Aulas' },
          { id: 'tutoriais', label: 'Tutoriais' },
          { id: 'depoimentos', label: 'Depoimentos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id || (tab.id === 'catalogo' && isCatalogTab)
                ? 'bg-[#5C6B47] text-white shadow-xs'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="h-4 w-[1px] bg-white/20 mx-0.5 hidden sm:block" />

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-3 py-1.5 rounded-full bg-[#D4A373] text-black font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-xs hover:bg-[#E0B488] transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>({(cartItems || []).reduce((a, b) => a + (b?.quantity || 0), 0)})</span>
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <ProductDetailModal
          product={selectedProductDetail}
          onClose={() => setSelectedProductDetail(null)}
          onAddToCart={(prod, qty) => handleAddProductToCart(prod, qty)}
          onCustomizeThis={() => {
            setSelectedProductDetail(null);
            scrollToSection('personalizado');
          }}
        />
      )}

      {/* Saponification SAP Calculator Modal */}
      <SoapCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#2C2723] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#5C6B47]/40 flex items-center gap-2.5 text-xs animate-slide-left">
          <div className="w-6 h-6 rounded-full bg-[#5C6B47] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

    </div>
  );
}
