import { motion } from 'motion/react';
import { ArrowUpRight, Scale } from 'lucide-react';
import { ACTUATION_AREAS } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function ActuationGrids() {
  const navigate = useNavigate();

  return (
    <div id="areas" className="bg-[#050505] py-32 px-8 md:px-20 relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.03] z-0" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-white/[0.03] z-0" />

      {/* Main Grid: All Services */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/5">
          {ACTUATION_AREAS.map((area, idx) => (
            <motion.div 
              key={area}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#050505] p-10 flex flex-col justify-between group hover:bg-[#080808] transition-all duration-500 min-h-[320px]"
            >
              <div>
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:border-white transition-all duration-700">
                  <Scale className="w-4 h-4 text-white/40 group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-white mb-6 leading-snug group-hover:text-white transition-colors">
                  {area}
                </h3>
              </div>
              <button 
                onClick={() => navigate('/contato')}
                className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-all font-bold"
              >
                Análise Especializada
                <ArrowUpRight className="w-3 h-3 translate-y-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
