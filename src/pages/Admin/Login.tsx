import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { LOGO_URL } from '../../constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === 'admin123') {
      localStorage.setItem('acn_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#666] hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Voltar para o site
        </button>

        <div className="bg-[#0F0F0F] border border-white/5 p-12 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
          
          <img src={LOGO_URL} alt="ACN Logo" className="h-12 mx-auto mb-12 brightness-110" />
          
          <h1 className="text-xl font-serif text-white text-center mb-10">Acesso Restrito</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center mb-6">{error}</p>}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">E-mail</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@admin.com" 
                  className="w-full bg-[#151515] border border-white/10 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 text-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#151515] border border-white/10 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/30 text-white transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#D1D5DB] transition-all mt-8"
            >
              ENTRAR NO PAINEL
            </button>
          </form>

          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#333] mt-12">
            Protocolo de Segurança ACN-X100
          </p>
        </div>
      </motion.div>
    </div>
  );
}
