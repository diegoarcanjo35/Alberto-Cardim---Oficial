import React from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function EquipePage() {
  const settings = useSettings();
  const activeTeam = settings.team.filter(m => m.active);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] pt-32"
    >
      <section className="px-8 md:px-20 mb-32">
        <div className="max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Mentes Estratégicas</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Nossa <br/> <span className="italic text-white/30">Liderança.</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] font-light leading-relaxed max-w-2xl">
            Unimos experiência acadêmica e vivência prática em tribunais superiores. Nossa equipe é composta por especialistas dedicados à resolução de demandas críticas.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-8 md:px-20 py-24 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-32">
          {activeTeam.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-b border-white/5 pb-32 last:border-0"
            >
              <div className="relative group overflow-hidden border border-white/10 aspect-[4/5] lg:aspect-[3/4]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="space-y-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4 block font-bold">{member.role}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">{member.name}</h2>
                </div>
                <div className="space-y-6 text-lg text-[#9CA3AF] font-light leading-relaxed italic border-l border-white/10 pl-8">
                  {member.bio}
                </div>
                
                <div className="pt-8">
                  <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 mb-6 underline underline-offset-8">Expertise Principal</h4>
                  <p className="text-sm text-white/60 tracking-widest font-light">{member.specialty}</p>
                </div>

                <div className="flex gap-6 pt-4">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-[#444] hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-white transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {activeTeam.length === 0 && (
            <div className="text-center py-32">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#333]">Em breve, conheceremos nossa liderança renovada.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
