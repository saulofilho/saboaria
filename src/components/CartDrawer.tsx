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
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'whatsapp'>('pix');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrapFee = includeGiftWrap ? 8.00 : 0;
  const freeShippingThreshold = 150.00;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + giftWrapFee;

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#5C6B47', '#D4A373', '#C2593F']
      });
    } catch {
      // ignore
    }
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
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5C6B47]" />
            <h3 className="font-serif text-xl font-bold text-[#2C2723]">
              Sua Cesta Botânica
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EADCC9] text-[#5C4533]">
              {cartItems.reduce((a, i) => a + i.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#EFE9DF] px-5 py-3 border-b border-[#E8E1D5] space-y-1.5 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-[#5C4533]">
              <Truck className="w-3.5 h-3.5 text-[#8C6D53]" />
              {freeShippingLeft === 0
                ? '🎉 Parabéns! Você ganhou Frete Grátis!'
                : `Faltam R$ ${freeShippingLeft.toFixed(2).replace('.', ',')} para Frete Grátis`}
            </span>
            <span className="text-[#8C6D53] font-bold">R$ 150</span>
          </div>
          <div className="w-full h-2 bg-[#E2D5C3] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#5C6B47] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EAE2D5] flex items-center justify-center mx-auto text-[#8C6D53]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2C2723]">Sua cesta está vazia</h4>
              <p className="text-xs text-[#786A60] max-w-xs mx-auto">
                Explore nossas barras aromaterápicas na galeria ou monte uma receita sob medida no ateliê.
              </p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] shadow-2xs flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#E8E1D5] shrink-0"
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
                    <span className="text-xs font-bold text-[#5C6B47] block mt-1">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
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
                      Inclui caixa rígida em kraft, ramos secos de alfazema e cartão artesanal caligrafado.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout Options */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D5] bg-white space-y-3">
            
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
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Pedido pelo WhatsApp</span>
              </a>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Fechar Pedido no Site (PIX / Cartão)</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D53]">
                  Finalização do Pedido
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2723]">
                  Pagamento Seguro
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

            {checkoutComplete ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#2C2723]">
                  Pedido Recebido com Sucesso!
                </h4>
                <p className="text-xs text-[#5A4E46] max-w-sm mx-auto leading-relaxed">
                  Obrigado por apoiar a saboaria botânica artesanal! Enviamos a confirmação e o código de rastreio para seu e-mail e WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setIsCheckingOut(false);
                    setCheckoutComplete(false);
                    onClearCart();
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#5C6B47] text-white font-semibold text-xs"
                >
                  Concluir & Voltar à Loja
                </button>
              </div>
            ) : (
              <form onSubmit={handleSimulateCheckout} className="space-y-4 text-xs">
                
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-center font-bold ${
                      paymentMethod === 'pix' ? 'border-[#5C6B47] bg-[#E2EAD8] text-[#5C6B47]' : 'bg-white border-[#E8E1D5]'
                    }`}
                  >
                    ⚡ PIX (5% OFF Instantâneo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-3 rounded-xl border text-center font-bold ${
                      paymentMethod === 'cartao' ? 'border-[#5C6B47] bg-[#E2EAD8] text-[#5C6B47]' : 'bg-white border-[#E8E1D5]'
                    }`}
                  >
                    💳 Cartão de Crédito
                  </button>
                </div>

                {/* Delivery Address fields */}
                <div className="space-y-2">
                  <span className="font-bold text-[#5C4533] block">Endereço de Entrega:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="CEP (Ex: 01310-100)"
                      className="px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Número / Complemento"
                      className="px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Rua / Avenida e Bairro"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E1D5] bg-white text-xs"
                  />
                </div>

                {/* Total summary */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E1D5] flex items-center justify-between font-bold text-sm text-[#2C2723]">
                  <span>Total a Pagar:</span>
                  <span className="text-[#5C6B47]">
                    R$ {(paymentMethod === 'pix' ? total * 0.95 : total).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs rounded-xl shadow-xs"
                  >
                    Confirmar Pedido
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
