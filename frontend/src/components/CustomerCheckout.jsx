import React, { useState } from 'react';

export default function CustomerCheckout({ cart, deliveryDetails, onBack, onPlaceOrder }) {
  const [checkoutStep, setCheckoutStep] = useState('summary'); // tela atual
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalCart = cart.reduce((acc, item) => acc + item.preco_base, 0);

  const handlePayment = () => {
    setIsProcessing(true);
    // espera um pouco pra simular que ta processando
    setTimeout(() => {
      onPlaceOrder('PIX');
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("00020101021226850014br.gov.bcb.pix2563pix-qr.merchant.com/v2/mock-raizes-nordeste-tcc");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBackClick = () => {
    if (checkoutStep === 'pix_screen') {
      setCheckoutStep('summary');
    } else {
      onBack();
    }
  };

  return (
    <main className="flex-grow flex flex-col h-screen overflow-hidden bg-surface-container-lowest">
      <div className="bg-surface w-full top-0 sticky shadow-sm z-20 flex-shrink-0"> {/* header */}
        <div className="flex items-center px-md py-sm gap-sm">
          <button 
            onClick={handleBackClick} 
            disabled={isProcessing} 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary">
            {checkoutStep === 'pix_screen' ? 'Pagamento' : 'Checkout'}
          </h1>
        </div>
      </div>

      {checkoutStep === 'summary' ? (
        <div className="flex-grow overflow-y-auto p-md max-w-4xl mx-auto w-full">
          {/* info de entrega se tiver */}
          {deliveryDetails && (
            <>
              <h2 className="font-headline-md text-lg text-on-background mb-4">Opção de Entrega / Consumo</h2>
              <div className="bg-surface border border-surface-container-high rounded-xl p-md mb-lg shadow-sm">
                <div className="flex items-center gap-sm mb-sm border-b border-surface-container-high pb-2">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    {deliveryDetails.tipo === 'entrega' ? 'local_shipping' : deliveryDetails.tipo === 'retirada' ? 'local_mall' : 'restaurant'}
                  </span>
                  <div>
                    <h4 className="font-headline-md text-on-background capitalize">
                      {deliveryDetails.tipo === 'local' ? 'Consumir no Local' : deliveryDetails.tipo}
                    </h4>
                    <p className="text-xs text-on-surface-variant">Modalidade de atendimento</p>
                  </div>
                </div>

                <div className="flex flex-col gap-xs text-body-md text-on-surface">
                  <div>
                    <span className="font-bold text-on-surface-variant">Cliente:</span> {deliveryDetails.nome}
                  </div>
                  {deliveryDetails.tipo === 'entrega' ? (
                    <>
                      <div className="mt-1">
                        <span className="font-bold text-on-surface-variant">Contato:</span> {deliveryDetails.telefone}
                      </div>
                      <div className="mt-1">
                        <span className="font-bold text-on-surface-variant">Endereço:</span> {deliveryDetails.endereco}
                      </div>
                    </>
                  ) : (
                    deliveryDetails.agendado && (
                      <div className="mt-1">
                        <span className="font-bold text-on-surface-variant">Horário Agendado:</span> {deliveryDetails.agendado}
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          <h2 className="font-headline-md text-lg text-on-background mb-4">Resumo do Pedido</h2>
          <div className="bg-surface border border-surface-container-high rounded-xl p-md mb-lg shadow-sm">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-surface-container-high last:border-0">
                <span className="font-body-md text-on-surface">{item.nome}</span>
                <span className="font-data-mono text-on-surface-variant text-sm">R$ {item.preco_base.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-surface-container-highest">
              <span className="font-headline-md text-lg text-on-background">Total a Pagar</span>
              <span className="font-headline-md text-xl text-primary">R$ {totalCart.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <h2 className="font-headline-md text-lg text-on-background mb-4">Forma de Pagamento</h2>
          <div className="bg-primary-container/10 border-2 border-primary rounded-xl p-md flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">qr_code_2</span>
              <div>
                <p className="font-headline-md text-primary">PIX (QR Code e Copia/Cola)</p>
                <p className="text-sm text-on-surface-variant">Aprovação imediata</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary">check_circle</span>
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-md max-w-lg mx-auto w-full flex flex-col justify-center gap-md">
          <div className="bg-surface border border-surface-container-high rounded-2xl p-md shadow-sm text-center flex flex-col gap-md">
            <div>
              <h3 className="font-headline-md text-primary text-xl">Pagamento via PIX</h3>
              <p className="text-sm text-on-surface-variant mt-1">Escaneie o QR Code abaixo com o app do seu banco</p>
            </div>

            {/* qr code feito em svg na mao */}
            <div className="py-2">
              <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto bg-white p-3 rounded-xl border border-surface-container-high shadow-sm">
                <rect x="5" y="5" width="25" height="25" fill="#a63500" rx="3" />
                <rect x="10" y="10" width="15" height="15" fill="white" rx="2" />
                <rect x="13" y="13" width="9" height="9" fill="#a63500" rx="1.5" />

                <rect x="70" y="5" width="25" height="25" fill="#a63500" rx="3" />
                <rect x="75" y="10" width="15" height="15" fill="white" rx="2" />
                <rect x="78" y="13" width="9" height="9" fill="#a63500" rx="1.5" />

                <rect x="5" y="70" width="25" height="25" fill="#a63500" rx="3" />
                <rect x="10" y="75" width="15" height="15" fill="white" rx="2" />
                <rect x="13" y="78" width="9" height="9" fill="#a63500" rx="1.5" />

                <path d="M40 5h5v5h-5z M45 10h5v5h-5z M35 15h5v5h-5z M50 20h5v5h-5z M40 25h10v5H40z M60 5h5v5h-5z M65 15h5v5h-5z M55 25h15v5h-15z" fill="#1c1b1b" />
                <path d="M5 40h5v5H5z M15 40h10v5h-10z M5 45h15v5H5z M25 50h5v5h-5z M10 55h10v5H10z M35 40h10v5h-10z M50 45h5v5h-5z M40 50h15v5H40z M35 60h10v5h-10z" fill="#1c1b1b" />
                <path d="M70 40h10v5h-10z M85 40h10v5h-10z M75 50h15v5h-15z M70 60h10v5h-10z M85 60h5v5h-5z M90 65h5v5h-5z" fill="#1c1b1b" />
                <path d="M40 70h5v5h-5z M50 75h15v5h-15z M45 80h10v5h-10z M60 85h5v5h-5z M35 90h15v5h-15z" fill="#1c1b1b" />
              </svg>
            </div>

            <div className="flex flex-col gap-xs">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Ou use o Copia e Cola</span>
              <div className="flex border border-outline-variant rounded-lg overflow-hidden bg-surface-container-low">
                <input 
                  type="text" 
                  readOnly 
                  value="00020101021226850014br.gov.bcb.pix2563pix-qr.merchant.com/v2/mock-raizes-nordeste-tcc" 
                  className="flex-grow px-sm py-2 bg-transparent text-xs text-on-surface-variant font-data-mono overflow-ellipsis border-0 focus:ring-0"
                />
                <button 
                  type="button"
                  onClick={handleCopyCode}
                  className="bg-primary text-on-primary px-sm font-headline-md text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isCopied ? 'done' : 'content_copy'}
                  </span>
                  {isCopied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="border-t border-surface-container-high pt-md mt-xs flex flex-col items-center gap-sm">
              <div className="flex items-center gap-xs text-xs text-secondary font-semibold animate-pulse">
                <span className="material-symbols-outlined text-[18px]">sync</span>
                Aguardando confirmação do banco...
              </div>
              <p className="text-xs text-on-surface-variant max-w-xs leading-normal">
                A confirmação é feita de forma assíncrona. O painel da cozinha liberará o preparo automaticamente assim que o pagamento for aprovado.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-md bg-surface-container-lowest border-t border-surface-container-high sticky bottom-0 flex-shrink-0">
        {checkoutStep === 'summary' ? (
          <button 
            onClick={() => setCheckoutStep('pix_screen')}
            className="w-full max-w-4xl mx-auto bg-primary text-on-primary font-headline-md text-headline-md h-touch-target rounded-lg flex items-center justify-center gap-sm shadow-[0_4px_15px_rgba(166,53,0,0.3)] hover:opacity-90 active:scale-95 transition-all"
          >
            Gerar Código PIX <span className="material-symbols-outlined">qr_code</span>
          </button>
        ) : (
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full max-w-4xl mx-auto bg-primary text-on-primary font-headline-md text-headline-md h-touch-target rounded-lg flex items-center justify-center gap-sm shadow-[0_4px_15px_rgba(166,53,0,0.3)] hover:opacity-90 active:scale-95 transition-all disabled:opacity-70"
          >
            {isProcessing ? (
               <>Processando <span className="material-symbols-outlined animate-spin">refresh</span></>
            ) : (
               <>Confirmar Pagamento <span className="material-symbols-outlined">check_circle</span></>
            )}
          </button>
        )}
      </div>
    </main>
  );
}
