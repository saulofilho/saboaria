import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  CreditCard, 
  Gift, 
  Sparkles, 
  Check, 
  ArrowRight,
  Truck,
  Package,
  History,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, SimulatedOrder } from '../types';
import { INITIAL_SIMULATED_ORDERS } from '../data/mockData';
import { MyOrdersView } from './MyOrdersView';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onBatchAddToCart?: (items: SimulatedOrder['items']) => void;
  onNavigateToCatalog?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBatchAddToCart,
  onNavigateToCatalog
}) => {
  const [activeDrawerTab, setActiveDrawerTab] = useState<'cart' | 'orders'>('cart');
  const [orders, setOrders] = useState<SimulatedOrder[]>(INITIAL_SIMULATED_ORDERS);
  
  // Checkout & customization states
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<SimulatedOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  
  // Address form fields
  const [recipientName, setRecipientName] = useState('Mariana S. Silva');
  const [recipientPhone, setRecipientPhone] = useState('(11) 98765-4321');
  const [cep, setCep] = useState('01419-001');
  const [streetAddress, setStreetAddress] = useState('Alameda Santos, 1200 - Apto 41');

  if (!isOpen) return null;

  const totalCartCount = (cartItems || []).reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const subtotal = (cartItems || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrapFee = includeGiftWrap ? 8.00 : 0;
  const freeShippingThreshold = 150.00;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + giftWrapFee;

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumberCode = `SAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingCodeGenerated = `ECO-${Math.floor(10000000 + Math.random() * 90000000)}BR`;
    
    const now = new Date();
    const formattedDate = `${now.getDate()} de Agosto de 2026`;
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: SimulatedOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNumberCode,
      date: formattedDate,
      status: 'confirmado',
      statusLabel: 'Pagamento Aprovado',
      estimatedDelivery: '24 de Agosto de 2026',
      trackingCode: trackingCodeGenerated,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        specsSummary: item.specsSummary,
        isCustom: item.isCustom
      })),
      subtotal,
      shipping: 0.00,
      total: paymentMethod === 'pix' ? total * 0.95 : total,
      paymentMethod: paymentMethod === 'pix' ? 'PIX Instantâneo (5% OFF)' : 'Cartão de Crédito (3x sem juros)',
      shippingAddress: `${streetAddress} - CEP ${cep} (${recipientName})`,
      giftWrap: includeGiftWrap,
      giftNote: includeGiftWrap ? giftNote : undefined,
      trackingSteps: [
        { title: 'Pedido & Pagamento Confirmado', date: `Hoje às ${formattedTime}`, completed: true, current: true },
        { title: 'Saponificação & Embalagem Botânica', date: 'Previsão em 24h', completed: false },
        { title: 'Coleta pela Transportadora Ecológica', date: 'Previsão em 48h', completed: false },
        { title: 'Entrega Prevista no Endereço', date: '24 de Agosto até 18:00', completed: false }
      ]
    };

    setOrders([newOrder, ...orders]);
    setLastPlacedOrder(newOrder);
    setCheckoutComplete(true);

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#5C6B47', '#D4A373', '#C2593F']
      });
    } catch {
      // ignore
    }
  };

  const handleReorder = (items: SimulatedOrder['items']) => {
    if (onBatchAddToCart) {
      onBatchAddToCart(items);
    }
    setActiveDrawerTab('cart');
  };

  const generateWhatsAppOrderText = () => {
    let text = `*🌿 PEDIDO DE SABOARIA — ATELIÊ BOTÂNICO 🌿*\n\n`;
    cartItems.forEach((item, idx) => {
      text += `*${idx + 1}. ${item.name}* (x${item.quantity})\n`;
      if (item.specsSummary) {
        text += `   _${item.specsSummary}_\n`;
      }
      text += `   Valor: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    if (includeGiftWrap) {
      text += `🎁 *Embalagem para Presente:* Sim (+ R$ 8,00)\n`;
      if (giftNote) text += `   *Mensagem do Cartão:* "${giftNote}"\n\n`;
    }

    text += `*TOTAL DO PEDIDO:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    if (subtotal >= freeShippingThreshold) {
      text += `✨ *Frete Grátis Aplicado!*\n`;
    }
    text += `\n_Gostaria de fechar meu pedido e informar meu endereço de entrega!_`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        id="cart-slide-drawer"
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E1D5] animate-slide-left"
      >
        
        {/* Drawer Header with Dual Navigation Tabs */}
        <div className="border-b border-[#E8E1D5] bg-white">
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#5C6B47]/10 text-[#5C6B47]">
                {activeDrawerTab === 'cart' ? <ShoppingBag className="w-5 h-5" /> : <Package className="w-5 h-5" />}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2C2723]">
                {activeDrawerTab === 'cart' ? 'Sua Cesta Botânica' : 'Meus Pedidos'}
              </h3>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector Buttons */}
          <div className="grid grid-cols-2 px-4 pb-2 gap-2">
            <button
              id="drawer-tab-cart-btn"
              onClick={() => setActiveDrawerTab('cart')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeDrawerTab === 'cart'
                  ? 'bg-[#5C6B47] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5C4533] hover:bg-[#F0EAE1] border border-[#E8E1D5]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cesta Atual</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeDrawerTab === 'cart' ? 'bg-white/20 text-white' : 'bg-[#EADCC9] text-[#5C4533]'
              }`}>
                {totalCartCount}
              </span>
            </button>

            <button
              id="drawer-tab-orders-btn"
              onClick={() => setActiveDrawerTab('orders')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeDrawerTab === 'orders'
                  ? 'bg-[#5C6B47] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5C4533] hover:bg-[#F0EAE1] border border-[#E8E1D5]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Meus Pedidos</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeDrawerTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#EADCC9] text-[#5C4533]'
              }`}>
                {orders.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Cesta Atual */}
        {activeDrawerTab === 'cart' ? (
          <>
            {/* Free Shipping Progress Bar */}
            <div className="bg-[#EFE9DF] px-5 py-2.5 border-b border-[#E8E1D5] space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5 text-[#5C4533]">
                  <Truck className="w-3.5 h-3.5 text-[#8C6D53]" />
                  {freeShippingLeft === 0
                    ? '🎉 Parabéns! Você ganhou Frete Grátis!'
                    : `Faltam R$ ${freeShippingLeft.toFixed(2).replace('.', ',')} para Frete Grátis`}
                </span>
                <span className="text-[#8C6D53] font-bold">R$ 150</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2D5C3] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#5C6B47] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Item List */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-3.5">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#EAE2D5] flex items-center justify-center mx-auto text-[#8C6D53]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#2C2723]">Sua cesta está vazia</h4>
                  <p className="text-xs text-[#786A60] max-w-xs mx-auto">
                    Explore nossas barras aromaterápicas na galeria ou monte uma receita sob medida no ateliê.
                  </p>
                  {orders.length > 0 && (
                    <button
                      onClick={() => setActiveDrawerTab('orders')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#5C6B47] hover:bg-[#EAE0D2] rounded-xl transition-colors border border-[#D4C8B5]"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Ver histórico de pedidos ({orders.length})</span>
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white p-3 rounded-2xl border border-[#E8E1D5] shadow-2xs flex gap-3 items-center justify-between"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E8E1D5] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#2C2723] truncate leading-tight">
                          {item.name}
                        </h4>
                        {item.specsSummary && (
                          <p className="text-[10px] text-[#8C6D53] truncate mt-0.5">
                            {item.specsSummary}
                          </p>
                        )}
                        <span className="text-xs font-bold text-[#5C6B47] block mt-0.5">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-[#E8E1D5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs text-[#5C4533] hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs text-[#5C4533] hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Gift Wrapping Add-on */}
                  <div className="bg-[#F7F2E8] p-3.5 rounded-2xl border border-[#D4A373]/40 space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#5C4533]">
                      <input
                        type="checkbox"
                        checked={includeGiftWrap}
                        onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                        className="rounded text-[#5C6B47] focus:ring-[#5C6B47]"
                      />
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-[#8C6D53]" />
                        Embrulho Artesanal para Presente (+ R$ 8,00)
                      </span>
                    </label>

                    {includeGiftWrap && (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Mensagem para o cartão manuscrito (opcional)"
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723] focus:outline-none"
                        />
                        <p className="text-[10px] text-[#786A60]">
                          Inclui caixa rígida em kraft, ramos secos de alfazema e cartão caligrafado à mão.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer & Checkout Options */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#E8E1D5] bg-white space-y-3">
                
                {/* Totals */}
                <div className="space-y-1 text-xs text-[#786A60]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#2C2723]">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {includeGiftWrap && (
                    <div className="flex justify-between text-[#8C6D53]">
                      <span>Embrulho de Presente:</span>
                      <span>R$ 8,00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#2C2723] pt-1 border-t border-gray-100">
                    <span>Total Estimado:</span>
                    <span className="text-base text-[#5C6B47]">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/5511999999999?text=${generateWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Pedido pelo WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-2.5 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Fechar Pedido no Site (PIX / Cartão)</span>
                  </button>
                </div>

              </div>
            )}
          </>
        ) : (
          /* Tab 2: Meus Pedidos */
          <MyOrdersView
            orders={orders}
            onReorder={handleReorder}
            onNavigateToCatalog={() => {
              if (onNavigateToCatalog) onNavigateToCatalog();
              onClose();
            }}
          />
        )}

      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                  Checkout Seguro do Ateliê
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2723]">
                  Finalizar Pedido
                </h3>
              </div>

              <button
                onClick={() => {
                  setIsCheckingOut(false);
                  setCheckoutComplete(false);
                }}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutComplete && lastPlacedOrder ? (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2C2723]">
                    Pedido Confirmado com Sucesso!
                  </h4>
                  <p className="text-xs text-[#5C6B47] font-semibold mt-0.5">
                    Nº do Pedido: #{lastPlacedOrder.orderNumber}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#5C4533] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#8C6D53]" />
                      Código de Rastreio:
                    </span>
                    <span className="font-mono text-[#2C2723] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E1D5]">
                      {lastPlacedOrder.trackingCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786A60] leading-relaxed">
                    Suas barras já entraram na fila de empacotamento ecológico. Você pode acompanhar todas as etapas em tempo real no painel <strong>Meus Pedidos</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsCheckingOut(false);
                      setCheckoutComplete(false);
                      onClearCart();
                      setActiveDrawerTab('orders');
                    }}
                    className="flex-1 px-5 py-3 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Package className="w-4 h-4" />
                    <span>Acompanhar em Meus Pedidos</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckingOut(false);
                      setCheckoutComplete(false);
                      onClearCart();
                      onClose();
                    }}
                    className="px-4 py-3 rounded-xl bg-[#EFE9DF] hover:bg-[#E2D5C3] text-[#5C4533] font-semibold text-xs transition-colors"
                  >
                    Voltar à Galeria
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimulateCheckout} className="space-y-4 text-xs">
                
                {/* Method selector */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[#5C4533] block">Forma de Pagamento:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-center font-bold transition-all ${
                        paymentMethod === 'pix' ? 'border-[#5C6B47] bg-[#E2EAD8] text-[#5C6B47] shadow-2xs' : 'bg-white border-[#E8E1D5] text-[#786A60]'
                      }`}
                    >
                      ⚡ PIX (5% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-3 rounded-xl border text-center font-bold transition-all ${
                        paymentMethod === 'cartao' ? 'border-[#5C6B47] bg-[#E2EAD8] text-[#5C6B47] shadow-2xs' : 'bg-white border-[#E8E1D5] text-[#786A60]'
                      }`}
                    >
                      💳 Cartão de Crédito (3x)
                    </button>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-2">
                  <span className="font-bold text-[#5C4533] block">Dados do Comprador:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Nome Completo"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Telefone / WhatsApp"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723]"
                    />
                  </div>
                </div>

                {/* Delivery Address fields */}
                <div className="space-y-2">
                  <span className="font-bold text-[#5C4533] block">Endereço de Entrega:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="CEP"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className="col-span-1 px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Endereço Completo com Bairro / Apto"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="col-span-2 px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723]"
                    />
                  </div>
                </div>

                {/* Total summary */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E1D5] flex items-center justify-between font-bold text-sm text-[#2C2723]">
                  <span>Total com Frete Grátis:</span>
                  <span className="text-base text-[#5C6B47]">
                    R$ {(paymentMethod === 'pix' ? total * 0.95 : total).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirmar e Gerar Rastreio</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
