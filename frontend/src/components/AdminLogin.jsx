import React, { useState } from 'react';

export default function AdminLogin({ onLoginSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      setError('Usuário ou senha incorretos. Dica: use admin/admin.');
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-md">
      <div className="bg-surface border border-surface-container-high rounded-2xl shadow-xl w-full max-w-md p-lg flex flex-col gap-md animate-in fade-in zoom-in-95 duration-200">
        
        {/* topo do login */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto mb-sm">
            <span className="material-symbols-outlined text-[36px]">lock</span>
          </div>
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary">Acesso Restrito</h2>
          <p className="font-body-md text-on-surface-variant text-sm mt-xs">Identifique-se para acessar o painel de operações</p>
        </div>

        {/* formulario de login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-sm rounded-lg text-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="username" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-xs">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-xs">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-sm py-2 bg-surface border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-body-md text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-headline-md text-headline-md h-touch-target rounded-lg flex items-center justify-center gap-sm shadow-[0_4px_15px_rgba(166,53,0,0.3)] hover:opacity-90 active:scale-95 transition-all mt-xs"
          >
            Acessar Painel <span className="material-symbols-outlined">login</span>
          </button>
        </form>

        {/* link de voltar */}
        <button
          onClick={onBack}
          className="text-xs font-headline-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs justify-center mt-sm"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Voltar para a Loja
        </button>
      </div>
    </main>
  );
}
