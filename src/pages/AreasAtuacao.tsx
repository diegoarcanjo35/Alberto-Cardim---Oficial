import React from 'react';
import { motion } from 'motion/react';
import ActuationGrids from '../components/ActuationGrids';

export default function AreasAtuacao() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] pt-32"
    >
      <section className="px-8 md:px-20 mb-20">
        <div className="max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Expertise Técnica</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Áreas de <br/> <span className="italic text-white/30">Atuação Estratégica.</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] font-light leading-relaxed max-w-2xl">
            Atuamos em demandas de alta complexidade, unindo rigor acadêmico e visão de mercado para entregar soluções jurídicas precisas e resilientes.
          </p>
        </div>
      </section>

      <ActuationGrids />

      <section className="py-32 px-8 md:px-20 bg-[#080808] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif text-white">Precisa de uma análise específica?</h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#666]">Nossa equipe está pronta para avaliar sua demanda tributária ou empresarial</p>
          <button 
            onClick={() => window.location.href = '/contato'}
            className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#D1D5DB] transition-all"
          >
            Fale com um Especialista
          </button>
        </div>
      </section>
    </motion.div>
  );
}
