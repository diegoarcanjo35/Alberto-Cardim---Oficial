import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { Shield, Scale, Gavel, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

export default function Home() {
  const navigate = useNavigate();
  const settings = useSettings();

  const highlightAreas = [
    { title: 'Direito Tributário', icon: Shield, desc: 'Consultoria e contencioso estratégico para otimização fiscal.' },
    { title: 'Defesa Empresarial', icon: Scale, desc: 'Proteção patrimonial e defesa em crimes corporativos.' },
    { title: 'Contencioso de Elite', icon: Gavel, desc: 'Atuação em tribunais superiores e demandas complexas.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505]"
    >
      <Hero />
      
      {/* Quick Highlights */}
      <section className="py-24 px-8 md:px-20 border-t border-white/5 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {highlightAreas.map((area, idx) => (
            <div key={area.title} className="space-y-6">
              <area.icon className="w-10 h-10 text-white/20 stroke-[1px]" />
              <h3 className="text-2xl font-serif text-white">{area.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed font-light">{area.desc}</p>
              <button 
                onClick={() => navigate('/areas-de-atuacao')}
                className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center gap-3 group"
              >
                Explorar Área
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Teaser */}
      <section className="py-32 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6 block font-bold">Tradição Jurídica</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">Autoridade técnica em <br/> <span className="italic text-white/30">cenários complexos.</span></h2>
            <p className="text-[#9CA3AF] font-light leading-relaxed mb-6 text-lg">
              {settings.institutional.history.substring(0, 250)}...
            </p>
            <button 
              onClick={() => navigate('/quem-somos')}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:border-b border-white transition-all pb-1"
            >
              Nossa História
            </button>
          </div>
          <div className="lg:w-1/2 relative group">
             <div className="aspect-[4/3] overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={settings.images.officeImage1} 
                  className="w-full h-full object-cover" 
                  alt="Premium Law Office" 
                />
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
