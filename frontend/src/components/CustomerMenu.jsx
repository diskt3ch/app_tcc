import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function CustomerMenu({ selectedUnit, onBack, cart, addToCart, onCheckout }) {
  const totalCart = cart.reduce((acc, item) => acc + item.preco_base, 0);

  // estados do modal de preferencias
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState('local'); // 'local', 'retirada', 'entrega'
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [agendarHorario, setAgendarHorario] = useState(false);
  const [horario, setHorario] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    setFormError('');
    if (!navigator.geolocation) {
      setFormError('Geolocalização não suportada pelo seu navegador.');
      setEndereco('Av. Boa Viagem, 1200 - Recife (GPS Indisponível)');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setEndereco(`Rua da Aurora, 456, Apto 101, Recife - PE (GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        // se der erro no gps usa um endereco fake pra testar
        setEndereco('Av. Boa Viagem, 1200 - Recife (Localização Simulado por GPS)');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!nomeCliente.trim()) {
      setFormError('Por favor, informe seu nome.');
      return;
    }

    if (modalOption === 'entrega') {
      if (!telefone.trim()) {
        setFormError('Por favor, informe um número para contato.');
        return;
      }
      if (!endereco.trim()) {
        setFormError('Por favor, informe seu endereço ou use a localização.');
        return;
      }
    } else {
      if (agendarHorario && !horario) {
        setFormError('Por favor, informe o horário agendado.');
        return;
      }
    }

    // manda os dados pro checkout
    onCheckout({
      tipo: modalOption,
      nome: nomeCliente,
      telefone: modalOption === 'entrega' ? telefone : '',
      endereco: modalOption === 'entrega' ? endereco : '',
      agendado: (modalOption !== 'entrega' && agendarHorario) ? horario : ''
    });

    setIsModalOpen(false);
  };

  return (
    <main className="flex-grow flex flex-col h-screen overflow-hidden bg-background"> {/* tela principal do cardapio */}
      <div className="bg-surface w-full top-0 sticky shadow-sm z-20 flex-shrink-0">
        <div className="flex items-center px-md py-sm gap-sm justify-between">
          <div className="flex items-center gap-sm">
            <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-on-surface">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline-md text-headline-md text-primary">Cardápio</h1>
              <p className="font-body-md text-on-surface-variant text-sm">{selectedUnit}</p>
            </div>
          </div>
          <div className="relative">
             <span className="material-symbols-outlined text-[32px] text-primary">shopping_cart</span>
             {cart.length > 0 && (
               <div className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                 {cart.length}
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md max-w-4xl mx-auto">
          {MOCK_PRODUCTS.map(product => (
            <div key={product.id} className="bg-surface rounded-xl shadow-sm border border-surface-container-high overflow-hidden flex flex-row">
              <div className="w-1/3 bg-surface-container-highest">
                <img src={product.img} alt={product.nome} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{product.categoria}</span>
                  <h3 className="font-headline-md text-lg text-on-background leading-tight mt-1">{product.nome}</h3>
                  <p className="font-body-md text-primary font-bold mt-2">R$ {product.preco_base.toFixed(2).replace('.', ',')}</p>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-4 border border-primary text-primary px-4 py-2 rounded-lg font-headline-md text-sm flex items-center justify-center gap-xs hover:bg-primary/10 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span> Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="p-md bg-surface-container-lowest border-t border-surface-container-high sticky bottom-0 flex-shrink-0 z-10">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-md">
            <div>
              <p className="text-on-surface-variant text-sm">Total do Pedido</p>
              <p className="font-headline-md text-primary text-xl">R$ {totalCart.toFixed(2).replace('.', ',')}</p>
            </div>
            <button 
              onClick={handleCheckoutClick}
              className="bg-primary text-on-primary font-headline-md text-headline-md px-6 py-3 rounded-lg flex items-center justify-center gap-sm shadow-[0_4px_15px_rgba(166,53,0,0.3)] hover:opacity-90 active:scale-95 transition-all"
            >
              Ir para Pagamento <span className="material-symbols-outlined">payments</span>
            </button>
          </div>
        </div>
      )}

      {/* modal que pergunta se é entrega, retirada ou local */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-md">
          <div className="bg-surface border border-surface-container-high rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* titulo do modal */}
            <div className="px-md py-sm bg-surface-container-low border-b border-surface-container-high flex justify-between items-center">
              <h3 className="font-headline-md text-primary text-lg flex items-center gap-xs">
                <span className="material-symbols-outlined">restaurant_menu</span> Preferências do Pedido
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* formulario */}
            <form onSubmit={handleModalSubmit} className="p-md flex flex-col gap-md overflow-y-auto max-h-[80vh]">
              {formError && (
                <div className="bg-error/10 border border-error/20 text-error p-sm rounded-lg text-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{formError}</span>
                </div>
              )}

              {/* tabs pra escolher o tipo */}
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-sm">Como deseja receber?</label>
                <div className="grid grid-cols-3 gap-xs bg-surface-container-low p-xs rounded-xl border border-surface-container-high mb-sm">
                  <button
                    type="button"
                    onClick={() => { setModalOption('local'); setFormError(''); }}
                    className={`py-2 text-sm rounded-lg font-headline-md flex flex-col items-center gap-xs transition-colors ${modalOption === 'local' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">restaurant</span>
                    <span className="text-xs">No Local</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">~15-20 min</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setModalOption('retirada'); setFormError(''); }}
                    className={`py-2 text-sm rounded-lg font-headline-md flex flex-col items-center gap-xs transition-colors ${modalOption === 'retirada' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">local_mall</span>
                    <span className="text-xs">Retirada</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">~20-25 min</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setModalOption('entrega'); setFormError(''); }}
                    className={`py-2 text-sm rounded-lg font-headline-md flex flex-col items-center gap-xs transition-colors ${modalOption === 'entrega' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    <span className="text-xs">Entrega</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">~40-50 min</span>
                  </button>
                </div>

                {/* mostra o tempo estimado pro cliente */}
                <div className="bg-primary/5 text-primary border border-primary/10 rounded-lg px-sm py-2 text-xs flex items-center gap-xs animate-in duration-200">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>
                    {modalOption === 'local' && 'Tempo estimado de preparo na mesa: 15 a 20 minutos.'}
                    {modalOption === 'retirada' && 'Seu pedido estará pronto na unidade em 20 a 25 minutos.'}
                    {modalOption === 'entrega' && 'Previsão de entrega média no seu endereço: 40 a 50 minutos.'}
                  </span>
                </div>
              </div>

              {/* campo do nome */}
              <div>
                <label htmlFor="nomeCliente" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-xs">Nome do Cliente</label>
                <input
                  id="nomeCliente"
                  type="text"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface"
                />
              </div>

              {/* campos extras se for entrega */}
              {modalOption === 'entrega' && (
                <>
                  <div>
                    <label htmlFor="telefone" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-xs">Telefone para Contato</label>
                    <input
                      id="telefone"
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(81) 99999-9999"
                      className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-xs">
                      <label htmlFor="endereco" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Endereço de Entrega</label>
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="text-xs text-primary font-headline-md hover:underline flex items-center gap-xs disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[14px]">my_location</span>
                        {isLocating ? 'Obtendo GPS...' : 'Usar minha localização'}
                      </button>
                    </div>
                    <textarea
                      id="endereco"
                      rows="3"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Rua, número, complemento e bairro"
                      className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface resize-none animate-in"
                    />
                  </div>
                </>
              )}

              {/* opcao de agendar se nao for entrega */}
              {modalOption !== 'entrega' && (
                <div className="bg-surface-container-low p-sm rounded-xl border border-surface-container-high">
                  <label className="flex items-center gap-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agendarHorario}
                      onChange={(e) => setAgendarHorario(e.target.checked)}
                      className="w-5 h-5 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0"
                    />
                    <div className="text-sm">
                      <p className="font-headline-md text-on-surface">Agendar horário?</p>
                      <p className="text-xs text-on-surface-variant">Selecione para retirar ou consumir depois.</p>
                    </div>
                  </label>

                  {agendarHorario && (
                    <div className="mt-sm animate-in fade-in duration-200">
                      <label htmlFor="horario" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-xs">Horário Agendado</label>
                      <input
                        id="horario"
                        type="time"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* botoes cancelar/confirmar */}
              <div className="border-t border-surface-container-high pt-md mt-sm flex gap-sm justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-md py-2 border border-outline-variant text-on-surface-variant rounded-lg font-headline-md hover:bg-surface-container-low transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-lg py-2 bg-primary text-on-primary rounded-lg font-headline-md hover:opacity-90 active:scale-95 shadow-[0_4px_10px_rgba(166,53,0,0.2)] transition-all flex items-center gap-xs"
                >
                  Confirmar Dados <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
