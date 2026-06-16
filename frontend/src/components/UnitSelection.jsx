import React from 'react';

export default function UnitSelection({ selectedUnit, setSelectedUnit, onContinue }) {
  return (
    <main className="flex-grow flex flex-col md:flex-row h-screen max-h-screen overflow-hidden">
      {/* lado esquerdo: mapa de recife */}
      <div className="hidden md:block w-2/3 h-full bg-surface-variant relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaKpPHGatfoRVVAqgNIPnTI5qyrlQefjx6I9IVOLOoePd7-o3pHwBzb59CJi8Bxa7IE-ukde5QcYHWBCmsb80iFyRnli-dsOI7JnVyFVREYSIapIiKMjeu5ggktwtvCA1x0IwpQrZHuzHflpMJshZn7YeH3wHVaSiIwbsaCYOpbFi2PADBQwk_a8pcuEVq04NBiaplsNU-qSCghxqhpKn7GR9pp3cMdOrWOBXgtLdjiVEKied_gxMbu-_chFdkVG7sv1PaW67GiZU5=s2048')" }}
        ></div>
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        
        <div className="absolute top-[48%] left-[32%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div 
            onClick={() => setSelectedUnit('Recife Centro')}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-tertiary-container/30 cursor-pointer hover:scale-110 transition-transform ${selectedUnit === 'Recife Centro' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface text-primary border border-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <span className={`mt-2 font-headline-md text-headline-md drop-shadow-md text-sm px-2 py-0.5 rounded bg-surface/80 text-primary border border-surface-container-high`}>
            Recife Centro
          </span>
        </div>
        
        <div className="absolute top-[18%] left-[44%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div 
            onClick={() => setSelectedUnit('Olinda Histórica')}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-tertiary-container/30 cursor-pointer hover:scale-110 transition-transform ${selectedUnit === 'Olinda Histórica' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface text-primary border border-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <span className={`mt-2 font-headline-md text-headline-md drop-shadow-md text-sm px-2 py-0.5 rounded bg-surface/80 text-primary border border-surface-container-high`}>
            Olinda Histórica
          </span>
        </div>
      </div>

      {/* lado direito: lista das unidades */}
      <div className="w-full md:w-1/3 h-full bg-surface-container-lowest flex flex-col shadow-[-4px_0_20px_-5px_rgba(166,53,0,0.1)] z-10 relative">
        <div className="bg-surface w-full top-0 sticky shadow-[0_4px_20px_-5px_rgba(166,53,0,0.1)] z-20">
          <div className="flex items-center justify-between px-md py-sm w-full">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">map</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-primary">Raízes do Nordeste</h1>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-md flex flex-col gap-lg">
          <div>
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-background mb-xs">Escolha sua Unidade</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Para começarmos, precisamos saber onde você está.</p>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 transform -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-xl pr-md py-sm bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-lg text-on-surface placeholder:text-outline h-touch-target" 
              placeholder="Buscar por CEP, rua ou bairro" 
              type="text"
            />
          </div>

          <div className="flex flex-col gap-sm">
            <div 
              onClick={() => setSelectedUnit('Recife Centro')}
              className={`rounded-xl p-sm flex items-center justify-between cursor-pointer transition-colors active:scale-95 ${selectedUnit === 'Recife Centro' ? 'bg-primary-container/10 border-2 border-primary' : 'bg-surface shadow-sm border border-surface-container-high hover:bg-surface-container-highest'}`}
            >
              <div className="flex items-center gap-md">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${selectedUnit === 'Recife Centro' ? 'bg-primary text-on-primary shadow-[0_4px_10px_rgba(166,53,0,0.2)]' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[32px]">storefront</span>
                </div>
                <div>
                  <h3 className={`font-headline-md text-headline-md ${selectedUnit === 'Recife Centro' ? 'text-primary' : 'text-on-surface'}`}>Recife Centro</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> 1.2 km • Aberto até 22h
                  </p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[24px] ${selectedUnit === 'Recife Centro' ? 'text-primary' : 'text-outline-variant'}`}>
                {selectedUnit === 'Recife Centro' ? 'check_circle' : 'chevron_right'}
              </span>
            </div>

            <div 
              onClick={() => setSelectedUnit('Olinda Histórica')}
              className={`rounded-xl p-sm flex items-center justify-between cursor-pointer transition-colors active:scale-95 ${selectedUnit === 'Olinda Histórica' ? 'bg-primary-container/10 border-2 border-primary' : 'bg-surface shadow-sm border border-surface-container-high hover:bg-surface-container-highest'}`}
            >
              <div className="flex items-center gap-md">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${selectedUnit === 'Olinda Histórica' ? 'bg-primary text-on-primary shadow-[0_4px_10px_rgba(166,53,0,0.2)]' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[32px]">festival</span>
                </div>
                <div>
                  <h3 className={`font-headline-md text-headline-md ${selectedUnit === 'Olinda Histórica' ? 'text-primary' : 'text-on-surface'}`}>Olinda Histórica</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> 5.4 km • Aberto até 23h
                  </p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[24px] ${selectedUnit === 'Olinda Histórica' ? 'text-primary' : 'text-outline-variant'}`}>
                {selectedUnit === 'Olinda Histórica' ? 'check_circle' : 'chevron_right'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-md bg-surface-container-lowest border-t border-surface-container-high sticky bottom-0">
          <button 
            onClick={onContinue}
            className="w-full bg-primary text-on-primary font-headline-md text-headline-md h-touch-target rounded-lg flex items-center justify-center gap-sm shadow-[0_4px_15px_rgba(166,53,0,0.3)] hover:opacity-90 active:scale-95 transition-all"
          >
            Continuar <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
}
