import React from 'react';

export default function AdminDashboard({ orders, onBack }) {
  return (
    <main className="min-h-screen bg-background text-on-background font-body-md flex flex-col">
      {/* barra de cima do admin */}
      <header className="bg-surface border-b border-surface-container-high px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-primary text-[24px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">monitoring</span>
            <h1 className="text-xl font-headline-md text-primary font-bold">Painel Clean e Moderno • Admin</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-body-md text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-700 font-medium">SISTEMA ONLINE</span>
          </div>
          <span className="text-outline-variant">|</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* conteudo principal */}
      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
        {/* cards com os numeros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-surface-container-high p-5 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center justify-between">
             <div>
               <p className="text-on-surface-variant text-xs font-bold mb-1 uppercase tracking-wider">Pedidos Totais (Hoje)</p>
               <p className="text-3xl text-primary font-headline-md font-bold">{orders.length}</p>
             </div>
             <span className="material-symbols-outlined text-primary/20 text-[48px]">receipt_long</span>
          </div>
          <div className="bg-surface border border-surface-container-high p-5 rounded-xl shadow-sm border-l-4 border-l-secondary flex items-center justify-between">
             <div>
               <p className="text-on-surface-variant text-xs font-bold mb-1 uppercase tracking-wider">Aguardando Pagamento</p>
               <p className="text-3xl text-secondary font-headline-md font-bold">
                 {orders.filter(o => o.pagamento_status === 'PROCESSANDO').length}
               </p>
             </div>
             <span className="material-symbols-outlined text-secondary/20 text-[48px]">pending_actions</span>
          </div>
          <div className="bg-surface border border-surface-container-high p-5 rounded-xl shadow-sm border-l-4 border-l-emerald-600 flex items-center justify-between">
             <div>
               <p className="text-on-surface-variant text-xs font-bold mb-1 uppercase tracking-wider">Em Preparo (Cozinha)</p>
               <p className="text-3xl text-emerald-700 font-headline-md font-bold">
                 {orders.filter(o => o.status_preparo === 'PREPARANDO').length}
               </p>
             </div>
             <span className="material-symbols-outlined text-emerald-600/20 text-[48px]">soup_kitchen</span>
          </div>
        </div>

        {/* lista dos pedidos */}
        <div>
          <h2 className="text-lg font-headline-md mb-4 text-on-surface border-b border-surface-container-high pb-2">Fila de Pedidos (Atualização em Tempo Real)</h2>
          
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant bg-surface border border-surface-container-high rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">search_off</span>
              <p className="font-headline-md text-lg">Nenhum pedido encontrado na fila atual</p>
            </div>
          ) : (
            <div className="bg-surface border border-surface-container-high rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider font-semibold border-b border-surface-container-high">
                      <th className="py-4 px-6">ID Pedido</th>
                      <th className="py-4 px-6">Unidade</th>
                      <th className="py-4 px-6">Cliente / Tipo</th>
                      <th className="py-4 px-6">Detalhes</th>
                      <th className="py-4 px-6">Qtd Itens</th>
                      <th className="py-4 px-6">Total</th>
                      <th className="py-4 px-6">Status Pagamento</th>
                      <th className="py-4 px-6 text-right">Ação Cozinha</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-on-surface">
                    {orders.map((order, idx) => (
                      <tr key={order.id} className={`border-b border-surface-container-high ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'} hover:bg-surface-container-low transition-colors`}>
                        <td className="py-4 px-6 font-data-mono font-bold text-primary">#{order.id}</td>
                        <td className="py-4 px-6 font-medium">{order.unidade}</td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-on-surface">
                            {order.deliveryDetails?.nome || 'Cliente Anônimo'}
                          </div>
                          <div className="text-xs text-primary font-headline-md capitalize flex items-center gap-xs mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">
                              {order.deliveryDetails?.tipo === 'entrega' ? 'local_shipping' : order.deliveryDetails?.tipo === 'retirada' ? 'local_mall' : 'restaurant'}
                            </span>
                            {order.deliveryDetails?.tipo === 'local' ? 'Consumir no Local' : order.deliveryDetails?.tipo || 'Balcão'}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs text-on-surface-variant max-w-[220px] truncate">
                          {order.deliveryDetails?.tipo === 'entrega' ? (
                            <div>
                              <p className="font-medium text-on-surface" title={order.deliveryDetails.endereco}>{order.deliveryDetails.endereco}</p>
                              <p className="text-[10px] text-outline mt-0.5">{order.deliveryDetails.telefone}</p>
                            </div>
                          ) : order.deliveryDetails?.agendado ? (
                            <span className="bg-secondary-container/20 text-secondary border border-secondary-container/30 px-2.5 py-0.5 rounded-md text-[10px] font-semibold">
                              Agendado para {order.deliveryDetails.agendado}
                            </span>
                          ) : (
                            <span className="text-outline-variant italic">Imediato</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-on-surface-variant">{order.itens.length} {order.itens.length === 1 ? 'item' : 'itens'}</td>
                        <td className="py-4 px-6 font-semibold">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                        <td className="py-4 px-6">
                          {order.pagamento_status === 'PROCESSANDO' ? (
                            <span className="inline-flex items-center gap-1.5 text-secondary bg-secondary-container/20 px-3 py-1 rounded-full text-xs font-semibold border border-secondary-container/20">
                              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> Aguardando Webhook
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Aprovado
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {order.status_preparo === 'PENDENTE' ? (
                            <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md border border-surface-container-high">Aguardando Pagamento</span>
                          ) : (
                            <button className="bg-primary text-on-primary font-headline-md text-xs px-4 py-2 rounded-lg hover:bg-primary/90 shadow-sm active:scale-95 transition-all">
                              Finalizar Preparo
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
