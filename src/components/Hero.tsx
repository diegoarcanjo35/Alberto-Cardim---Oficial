import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

export default function Hero() {
  const navigate = useNavigate();
  const settings = useSettings();

  const servicesList = [
    'Direito Tributário e Aduaneiro',
    'Defesa Criminal Empresarial',
    'Compliance e Riscos',
  ];

  const VIDEO_URL = settings.images.heroVideo || "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-a-city-at-night-11910-large.mp4";
  const FALLBACK_IMAGE = settings.images.heroFallback;

  return (
    <section id="home" className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 scale-105 saturate-[0.8]"
          poster={FALLBACK_IMAGE}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-7xl px-8 md:px-20 py-20 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 border border-white/20 text-[10px] tracking-[0.5em] uppercase mb-12 text-white/60 bg-white/5 backdrop-blur-md rounded-full"
          >
            Advocacia Empresarial Estratégica
          </motion.span>
          
          <h1 className="text-6xl md:text-9xl font-serif text-white leading-[1] mb-12 tracking-tight">
            Defesa Especializada em <br/>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 2 }}
              className="italic text-white/30 font-light block mt-4"
            >
              Direito Corporativo.
            </motion.span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto mb-16 font-light">
            {settings.institutional.description}
          </p>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-20">
            {servicesList.map((service, idx) => (
              <motion.div 
                key={service}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + idx * 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="h-1 w-1 bg-white/20 rounded-full" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/quem-somos')}
            className="group px-16 py-8 bg-white text-black text-[11px] font-bold uppercase tracking-[0.5em] flex items-center gap-10 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            Conheça Nossa História
            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
