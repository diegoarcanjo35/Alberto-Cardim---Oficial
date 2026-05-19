import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, BookOpen, Clock, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

export default function QuemSomos() {
  const navigate = useNavigate();
  const settings = useSettings();

  const differentials = [
    { title: 'Atendimento Estratégico', icon: Target, desc: 'Foco nos objetivos de negócio do cliente com visão holística.' },
    { title: 'Excelência Técnica', icon: Shield, desc: 'Rigor acadêmico e prática jurídica de alto nível em cada detalhe.' },
    { title: 'Atuação Personalizada', icon: Users, desc: 'Atendimento direto pelos sócios em demandas de alta complexidade.' },
    { title: 'Confidencialidade', icon: Clock, desc: 'Sigilo absoluto e segurança institucional em todas as etapas.' },
    { title: 'Defesa Empresarial', icon: BookOpen, desc: 'Proteção robusta contra riscos criminais e tributários.' },
    { title: 'Soluções Tributárias', icon: Heart, desc: 'Otimização inteligente da carga fiscal dentro da legalidade.' },
  ];

  return (
    <div className="bg-[#050505] text-[#D1D5DB]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 brightness-50" 
            alt="Office" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 border border-white/20 text-[10px] tracking-[0.5em] uppercase mb-8 text-white/50"
          >
            Institucional
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white mb-10 leading-tight"
          >
            Excelência Jurídica com <br/> <span className="italic text-white/30">Atuação Estratégica.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto font-light leading-relaxed"
          >
            Atuação especializada em demandas tributárias, aduaneiras e empresariais de alta complexidade, oferecendo soluções jurídicas seguras, técnicas e personalizadas.
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-32 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block">Nossa Trajetória</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10 leading-tight">Um compromisso sólido com a <br/><span className="italic text-white/30 tracking-tight">justiça empresarial.</span></h2>
            <div className="space-y-6 text-[#9CA3AF] font-light leading-relaxed text-lg">
              <p>
                {settings.institutional.history}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] overflow-hidden border border-white/10 glass shadow-2xl">
              <img src={settings.images.historyImage} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" alt="Nossa História" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 backdrop-blur-xl border border-white/10 -z-10" />
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-32 px-8 md:px-20 bg-[#080808]">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Nossos Diferenciais</h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#666]">Por que o protocolo ACN é superior</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {differentials.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border border-white/5 bg-[#050505] hover:border-white/20 transition-all duration-500 group"
            >
              <item.icon className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-8 stroke-[1px]" />
              <h3 className="text-xl font-serif text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#9CA3AF] transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-32 px-8 md:px-20 bg-[#050505]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/5">
          <div className="p-16 border-r border-white/5 hover:bg-white/[0.02] transition-all">
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 font-bold">Missão</h4>
            <p className="text-xl font-serif text-white leading-relaxed">Prover segurança jurídica institucional através de uma advocacia técnica, ética e implacável na defesa dos interesses de nossos clientes.</p>
          </div>
          <div className="p-16 border-r border-white/5 hover:bg-white/[0.02] transition-all">
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 font-bold">Visão</h4>
            <p className="text-xl font-serif text-white leading-relaxed">Ser a referência absoluta em boutique jurídica de alta complexidade para o mercado corporativo nacional.</p>
          </div>
          <div className="p-16 hover:bg-white/[0.02] transition-all">
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 font-bold">Valores</h4>
            <ul className="space-y-4 text-white/60 text-sm uppercase tracking-widest">
              <li>• Excelência Técnica</li>
              <li>• Integridade Uncompromising</li>
              <li>• Atendimento Exclusivo</li>
              <li>• Visão Estratégica</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 md:px-20 bg-[#080808] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[150px] -z-0" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Fale com um Especialista</h2>
          <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light">Entre em contato para uma análise estratégica e confidencial do seu caso.</p>
          <button 
            onClick={() => navigate('/', { state: { scrollTo: 'contato' } })}
            className="px-12 py-6 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#D1D5DB] transition-all flex items-center gap-6 mx-auto"
          >
            AGENDAR CONSULTA
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
