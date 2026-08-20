import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  RotateCcw, 
  MessageCircle, 
  ExternalLink, 
  Gift, 
  Sparkles,
  MapPin,
  CreditCard,
  Search,
  Layers
} from 'lucide-react';
import { SimulatedOrder, CartItem } from '../types';

interface MyOrdersViewProps {
  orders: SimulatedOrder[];
  onReorder: (items: SimulatedOrder['items']) => void;
  onNavigateToCatalog: () => void;
}

export const MyOrdersView: React.FC<MyOrdersViewProps> = ({
  orders,
  onReorder,
  onNavigateToCatalog
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopyTracking = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (status: SimulatedOrder['status'], label: string) => {
    switch (status) {
      case 'em_transporte':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Truck className="w-3 h-3 text-amber-600 animate-pulse" />
            {label}
          </span>
        );
      case 'entregue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {label}
          </span>
        );
      case 'em_cura':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <Sparkles className="w-3 h-3 text-purple-600" />
            {label}
          </span>
        );
      case 'confirmado':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            {label}
          </span>
        );
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = 
      filterStatus === 'todos' || 
      (filterStatus === 'transporte' && order.status === 'em_transporte') ||
      (filterStatus === 'entregue' && order.status === 'entregue') ||
      (filterStatus === 'processando' && (order.status === 'confirmado' || order.status === 'em_cura'));

    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.trackingCode && order.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EAE2D5] flex items-center justify-center mx-auto text-[#8C6D53]">
          <Package className="w-8 h-8" />
        </div>
        <h4 className="font-serif text-lg font-bold text-[#2C2723]">Você ainda não possui pedidos</h4>
        <p className="text-xs text-[#786A60] max-w-xs mx-auto">
          Assim que você concluir uma compra na cesta, o rastreamento e detalhes de produção aparecerão aqui em tempo real.
        </p>
        <button
          onClick={onNavigateToCatalog}
          className="px-5 py-2.5 rounded-xl bg-[#5C6B47] text-white font-semibold text-xs shadow-xs hover:bg-[#4A5738] transition-all"
        >
          Explorar Galeria de Sabões
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
      
      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8C7E73] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nº do pedido ou sabonete..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E8E1D5] bg-white text-xs text-[#2C2723] focus:outline-none focus:ring-1 focus:ring-[#5C6B47]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {[
            { id: 'todos', label: `Todos (${orders.length})` },
            { id: 'transporte', label: 'Em Transporte' },
            { id: 'entregue', label: 'Entregues' },
            { id: 'processando', label: 'Em Preparo' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterStatus === tab.id
                  ? 'bg-[#5C6B47] text-white shadow-2xs'
                  : 'bg-white border border-[#E8E1D5] text-[#5C4533] hover:bg-[#F4EDE2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] text-center text-xs text-[#786A60]">
            Nenhum pedido encontrado com os filtros selecionados.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div 
                key={order.id}
                id={`order-card-${order.id}`}
                className="bg-white rounded-2xl border border-[#E8E1D5] shadow-2xs overflow-hidden transition-all duration-200"
              >
                {/* Header Summary */}
                <div 
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="p-3.5 cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors flex items-center justify-between gap-2"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-[#2C2723]">
                        #{order.orderNumber}
                      </span>
                      {getStatusBadge(order.status, order.statusLabel)}
                    </div>
                    <p className="text-[11px] text-[#786A60]">
                      {order.date} • {order.items.reduce((s, i) => s + i.quantity, 0)} {order.items.length === 1 ? 'item' : 'itens'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-[#5C6B47]">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </span>
                    <button className="text-[#8C7E73] p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tracking Preview Banner */}
                {order.trackingCode && (
                  <div className="bg-[#F8F4EC] px-3.5 py-2 border-t border-b border-[#EAE2D5] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#5C4533] min-w-0 truncate">
                      <Truck className="w-3.5 h-3.5 text-[#8C6D53] shrink-0" />
                      <span className="truncate">
                        Rastreio: <strong className="font-mono text-[#3B2F2F]">{order.trackingCode}</strong>
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTracking(order.trackingCode!);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5C6B47] hover:text-[#3B462C] bg-white px-2 py-0.5 rounded-md border border-[#E0D4C3] shrink-0"
                    >
                      {copiedCode === order.trackingCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-3.5 space-y-4 bg-white border-t border-[#E8E1D5] animate-fade-in text-xs">
                    
                    {/* Visual Tracking Progress Timeline */}
                    <div className="space-y-2.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E1D5]">
                      <span className="font-bold text-[#5C4533] text-[11px] block uppercase tracking-wider">
                        Linha do Tempo de Produção & Entrega
                      </span>
                      <div className="space-y-2.5">
                        {order.trackingSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="relative mt-0.5">
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                step.completed 
                                  ? 'bg-[#5C6B47] text-white' 
                                  : step.current 
                                  ? 'bg-amber-500 text-white animate-pulse'
                                  : 'bg-gray-200'
                              }`}>
                                {step.completed ? (
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              {idx < order.trackingSteps.length - 1 && (
                                <div className={`w-0.5 h-4 mx-auto my-0.5 ${
                                  step.completed ? 'bg-[#5C6B47]' : 'bg-gray-200'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-xs ${
                                step.completed ? 'text-[#2C2723]' : 'text-gray-400'
                              }`}>
                                {step.title}
                              </p>
                              <span className="text-[10px] text-[#8C7E73]">{step.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="space-y-2">
                      <span className="font-bold text-[#5C4533] text-[11px] block uppercase tracking-wider">
                        Produtos no Pacote
                      </span>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF7F2] border border-[#EFE8DC]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover border border-[#E8E1D5] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs text-[#2C2723] truncate">
                                {item.name}
                              </h5>
                              {item.specsSummary && (
                                <p className="text-[10px] text-[#8C6D53] truncate">
                                  {item.specsSummary}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-[11px] mt-0.5">
                                <span className="text-gray-500">Qtd: {item.quantity}</span>
                                <span className="font-bold text-[#5C6B47]">
                                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gift wrap details if applied */}
                    {order.giftWrap && (
                      <div className="p-2.5 rounded-xl bg-[#F7F2E8] border border-[#D4A373]/50 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#5C4533]">
                          <Gift className="w-3.5 h-3.5 text-[#8C6D53]" />
                          <span>Embalagem Artesanal para Presente</span>
                        </div>
                        {order.giftNote && (
                          <p className="text-[11px] text-[#786A60] italic bg-white/70 p-2 rounded-lg border border-[#EAE2D5]">
                            "{order.giftNote}"
                          </p>
                        )}
                      </div>
                    )}

                    {/* Shipping Address & Payment */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#6C5E53] pt-1">
                      <div className="p-2 rounded-lg bg-[#F5EFE6] border border-[#E8E1D5]">
                        <div className="flex items-center gap-1 font-bold text-[#3B2F2F] mb-0.5">
                          <MapPin className="w-3 h-3 text-[#5C6B47]" />
                          <span>Endereço:</span>
                        </div>
                        <p className="truncate">{order.shippingAddress}</p>
                      </div>

                      <div className="p-2 rounded-lg bg-[#F5EFE6] border border-[#E8E1D5]">
                        <div className="flex items-center gap-1 font-bold text-[#3B2F2F] mb-0.5">
                          <CreditCard className="w-3 h-3 text-[#5C6B47]" />
                          <span>Pagamento:</span>
                        </div>
                        <p>{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Action buttons on this order */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#EAE2D5]">
                      <button
                        id={`reorder-btn-${order.id}`}
                        onClick={() => onReorder(order.items)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#5C6B47] hover:bg-[#4A5738] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Repetir este Pedido</span>
                      </button>

                      <a
                        href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                          `Olá, gostaria de informações sobre meu pedido #${order.orderNumber} (Rastreio: ${order.trackingCode || 'N/A'}).`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-[#E8E1D5] text-[#25D366] font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                        title="Atendimento no WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
