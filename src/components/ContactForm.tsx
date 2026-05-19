import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLeads } from '../services/leadService';
import { useSettings } from '../hooks/useSettings';
import { cn } from '../lib/utils';

import { Link } from 'react-router-dom';

export default function ContactForm({ className }: { className?: string }) {
  const { addLead } = useLeads();
  const settings = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedPrivacy) return;
    
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    addLead(data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success state after 5 seconds to allow new messages
    setTimeout(() => {
      setIsSuccess(false);
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  return (
    <div className={cn("bg-[#0F0F0F] border border-white/5 p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-700 hover:border-white/10", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[100px] pointer-events-none group-hover:bg-white/10 transition-colors" />
      
      <h2 className="text-2xl font-serif text-white mb-2">Consulta Estratégica</h2>
      <p className="text-[10px] text-[#9CA3AF] mb-10 uppercase tracking-[0.4em] font-medium border-b border-white/10 pb-4">
        Agende uma reunião confidencial
      </p>

      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 flex flex-col items-center justify-center text-center space-y-4"
        >
          <CheckCircle2 className="w-16 h-16 text-white stroke-[1px]" />
          <h3 className="text-xl font-serif text-white">Mensagem Enviada</h3>
          <p className="text-xs text-[#666] tracking-widest uppercase">Entraremos em contato em breve.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Nome Completo</label>
              <input 
                name="name"
                required
                type="text" 
                placeholder="Ex: João Silva" 
                className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-[#333] text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Empresa / Cargo</label>
              <input 
                name="company"
                required
                type="text" 
                placeholder="Diretor Executivo" 
                className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-[#333] text-white" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">E-mail Corporativo</label>
              <input 
                name="email"
                required
                type="email" 
                placeholder="contato@empresa.com" 
                className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-[#333] text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Telefone Directo</label>
              <input 
                name="phone"
                required
                type="text" 
                placeholder="(00) 00000-0000" 
                className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-[#333] text-white" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Assunto da Consulta</label>
            <select 
              name="subject"
              required
              className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 text-[#9CA3AF] transition-all appearance-none cursor-pointer"
            >
              <option value="">Selecione um assunto</option>
              {settings.formSubjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Mensagem Breve</label>
            <textarea 
              name="message"
              required
              rows={4} 
              className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none transition-all placeholder:text-[#333] text-white"
            ></textarea>
          </div>

          <div className="flex items-start gap-4 py-2 group/check cursor-pointer" onClick={() => setAcceptedPrivacy(!acceptedPrivacy)}>
            <div className={cn(
              "w-5 h-5 border border-white/10 flex items-center justify-center transition-all duration-500",
              acceptedPrivacy ? "bg-white border-white" : "bg-[#151515] group-hover/check:border-white/30"
            )}>
              {acceptedPrivacy && <CheckCircle2 className="w-3 h-3 text-black" />}
            </div>
            <label className="text-[10px] text-[#666] leading-relaxed cursor-pointer select-none">
              Declaro estar de acordo com a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all" onClick={(e) => e.stopPropagation()}>Política de Privacidade</Link>.
            </label>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !acceptedPrivacy}
            className="w-full py-4 bg-[#1A1A1A] hover:bg-white hover:text-black text-white text-[10px] uppercase tracking-[0.4em] transition-all border border-white/10 font-bold group flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-pulse">PROCESSANDO...</span>
            ) : (
              <>
                ENVIAR MENSAGEM
                <Send className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
