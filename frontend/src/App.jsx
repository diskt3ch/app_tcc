import React, { useState } from 'react';
import CustomerMenu from './components/CustomerMenu';
import CustomerCheckout from './components/CustomerCheckout';
import AdminDashboard from './components/AdminDashboard';
import UnitSelection from './components/UnitSelection';
import AdminLogin from './components/AdminLogin';

function App() {
  const [currentScreen, setCurrentScreen] = useState('selection');
  const [selectedUnit, setSelectedUnit] = useState('Recife Centro');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  // add no carrinho
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // monta o pedido e faz o mock do pagamento
  const placeOrder = (paymentMethod) => {
    const newOrder = {
      id: Math.floor(Math.random() * 10000),
      unidade: selectedUnit,
      itens: [...cart],
      total: cart.reduce((acc, item) => acc + item.preco_base, 0),
      status_preparo: 'PENDENTE',
      pagamento_status: 'PROCESSANDO',
      canal: 'App',
      deliveryDetails: deliveryDetails,
      timestamp: new Date()
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setCurrentScreen('checkout_success');

    // depois de 5s finge que o banco aprovou o pix
    setTimeout(() => {
      setOrders(currentOrders => 
        currentOrders.map(o => 
          o.id === newOrder.id 
            ? { ...o, pagamento_status: 'APPROVED', status_preparo: 'PREPARANDO' }
            : o
        )
      );
    }, 5000);
  };

  if (currentScreen === 'admin_login') {
    return (
      <AdminLogin 
        onLoginSuccess={() => setCurrentScreen('admin')} 
        onBack={() => setCurrentScreen('selection')} 
      />
    );
  }

  if (currentScreen === 'admin') {
    return <AdminDashboard orders={orders} onBack={() => setCurrentScreen('selection')} />;
  }

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen flex flex-col relative">
      {/* botao pra ir pro admin */}
      {currentScreen !== 'admin' && (
        <button 
          onClick={() => setCurrentScreen('admin_login')}
          className="fixed top-4 right-4 z-[100] bg-surface text-primary border-2 border-primary px-4 py-2 rounded-lg font-headline-md text-xs shadow-md hover:bg-primary/5 transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">monitoring</span>
          Painel Clean e Moderno
        </button>
      )}

      {currentScreen === 'selection' && (
        <UnitSelection 
          selectedUnit={selectedUnit} 
          setSelectedUnit={setSelectedUnit} 
          onContinue={() => setCurrentScreen('menu')} 
        />
      )}
      
      {currentScreen === 'menu' && (
        <CustomerMenu 
          selectedUnit={selectedUnit} 
          onBack={() => setCurrentScreen('selection')}
          cart={cart}
          addToCart={addToCart}
          onCheckout={(details) => {
            setDeliveryDetails(details);
            setCurrentScreen('checkout');
          }}
        />
      )}

      {currentScreen === 'checkout' && (
        <CustomerCheckout 
          cart={cart}
          deliveryDetails={deliveryDetails}
          onBack={() => setCurrentScreen('menu')}
          onPlaceOrder={placeOrder}
        />
      )}

      {currentScreen === 'checkout_success' && (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-md">
          <span className="material-symbols-outlined text-[80px] text-primary mb-sm">check_circle</span>
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">Pedido Recebido!</h2>
          <p className="font-body-md text-on-surface-variant max-w-md mb-8">
            Seu pedido foi enviado para a cozinha. Estamos processando o seu pagamento via PIX.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setCurrentScreen('admin_login')}
              className="bg-surface text-primary border-2 border-primary px-8 py-4 rounded-lg font-headline-md shadow-sm hover:bg-primary/5 transition-colors"
            >
              Ver na Tela da Cozinha (Admin)
            </button>
            <button 
              onClick={() => setCurrentScreen('selection')}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline-md shadow-md hover:opacity-90 transition-opacity"
            >
              Fazer Novo Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
