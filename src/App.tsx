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
import { BotanicalTipOfDay } from './components/BotanicalTipOfDay';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ProductFormModal } from './components/ProductFormModal';
import { AdminCmsDashboard } from './components/AdminCmsDashboard';
import { CartItem, Product, SoapProduct, CustomSoapOrder } from './types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  resetStoredProducts 
} from './utils/productStorage';
import { 
  getAdminSession, 
  clearAdminSession, 
  AdminUser 
} from './utils/authStorage';
import { Sparkles, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalogo');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products State (Dynamically loaded and persisted from localStorage / CMS)
  const [products, setProducts] = useState<SoapProduct[]>(() => getStoredProducts());

  // Admin CMS Auth & Modal State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getAdminSession());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<SoapProduct | null>(null);
  
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

  const handleBatchAddToCart = (items: { name: string; quantity: number; price: number; image: string; specsSummary?: string; isCustom?: boolean }[]) => {
    const updatedCart = [...cartItems];
    items.forEach(item => {
      const idx = updatedCart.findIndex(i => i.name === item.name);
      if (idx > -1) {
        updatedCart[idx].quantity += item.quantity;
      } else {
        updatedCart.push({
          id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          specsSummary: item.specsSummary,
          isCustom: !!item.isCustom
        });
      }
    });
    setCartItems(updatedCart);
    showToast(`${items.length} produto(s) adicionado(s) à sua cesta!`);
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

  // CMS Handlers
  const handleOpenAdminCms = () => {
    if (adminUser) {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Bem-vindo ao Painel CMS, ${user.name}!`);
  };

  const handleLogout = () => {
    clearAdminSession();
    setAdminUser(null);
    setActiveTab('catalogo');
    showToast('Sessão administrativa encerrada.');
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (product: SoapProduct) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (product: SoapProduct) => {
    const exists = products.some(p => p.id === product.id);
    let updated: SoapProduct[];
    if (exists) {
      updated = products.map(p => p.id === product.id ? product : p);
      showToast(`Produto "${product.name}" atualizado com sucesso!`);
    } else {
      updated = [product, ...products];
      showToast(`Nova barra "${product.name}" cadastrada no catálogo!`);
    }
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const target = products.find(p => p.id === productId);
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    saveStoredProducts(updated);
    showToast(`Produto "${target?.name || ''}" removido com sucesso.`);
  };

  const handleDuplicateProduct = (product: SoapProduct) => {
    const duplicate: SoapProduct = {
      ...product,
      id: `soap-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: `${product.name} (Cópia)`,
      stock: 15,
      isNew: true
    };
    const updated = [duplicate, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    showToast(`Cópia de "${product.name}" criada.`);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    const updated = products.map(p => p.id === productId ? { ...p, stock: newStock } : p);
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleResetToDefaults = () => {
    const reset = resetStoredProducts();
    setProducts(reset);
    showToast('Catálogo restaurado aos padrões originais do ateliê.');
  };

  const handleImportProducts = (imported: SoapProduct[]) => {
    setProducts(imported);
    saveStoredProducts(imported);
    showToast(`${imported.length} produtos importados com sucesso!`);
  };

  const handlePreviewInStore = (product: SoapProduct) => {
    setSelectedProductDetail(product);
    setActiveTab('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (tabId: string) => {
    if (tabId === 'admin' && !adminUser) {
      setIsLoginModalOpen(true);
      return;
    }
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
        isAdminLoggedIn={!!adminUser}
        onOpenAdminCms={handleOpenAdminCms}
      />

      {/* Dynamic Botanical Tip of the Day Header (only shown when not in admin) */}
      {activeTab !== 'admin' && (
        <BotanicalTipOfDay
          onNavigateToIngredients={() => scrollToSection('ingredientes')}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* If Active Tab is Admin CMS */}
        {activeTab === 'admin' ? (
          adminUser ? (
            <AdminCmsDashboard
              products={products}
              adminUser={adminUser}
              onAddProduct={handleOpenAddProduct}
              onEditProduct={handleOpenEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onUpdateStock={handleUpdateStock}
              onResetToDefaults={handleResetToDefaults}
              onImportProducts={handleImportProducts}
              onViewStore={() => scrollToSection('catalogo')}
              onLogout={handleLogout}
              onPreviewInStore={handlePreviewInStore}
            />
          ) : (
            <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#5C6B47] text-white flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-8 h-8 text-[#D4A373]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2C2723]">
                Painel CMS Restrito
              </h2>
              <p className="text-xs text-[#6B5E54]">
                Para gerenciar o catálogo, criar ou editar barras botânicas e controlar estoque, faça login como administrador.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-[#5C6B47] text-white font-bold text-xs shadow-md hover:bg-[#4A5738] transition-colors"
              >
                Fazer Login no CMS
              </button>
            </div>
          )
        ) : (
          <>
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
                  products={products}
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
                  onNavigateToCustomBuilder={() => scrollToSection('personalizado')}
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
          </>
        )}

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
          { id: 'admin', label: 'CMS', isCms: true }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              activeTab === tab.id || (tab.id === 'catalogo' && isCatalogTab && activeTab !== 'admin')
                ? 'bg-[#5C6B47] text-white shadow-xs'
                : tab.isCms && adminUser
                ? 'text-[#D4A373] hover:text-white hover:bg-white/10 font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.isCms && <ShieldCheck className="w-3 h-3 text-[#D4A373]" />}
            <span>{tab.label}</span>
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

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Product Form Modal (Create / Edit in CMS) */}
      <ProductFormModal
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

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
        onBatchAddToCart={handleBatchAddToCart}
        onNavigateToCatalog={() => scrollToSection('catalogo')}
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
