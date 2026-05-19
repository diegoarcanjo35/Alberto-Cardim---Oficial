import { motion } from 'motion/react';
import { TEAM } from '../constants';

export default function Institutional() {
  return (
    <>
      {/* Office Section */}
      <section id="escritorio" className="bg-[#080808] py-32 px-8 md:px-20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative z-10"
             >
               <img 
                 src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2671&auto=format&fit=crop" 
                 alt="Premium Legal Executive Environment" 
                 className="w-full transition-all duration-1000 shadow-2xl border border-white/5"
               />
               <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-white/10 -z-10 hidden md:block" />
             </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block">Autoridade e Tradição</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10 leading-tight">Atuação estratégica e excelência jurídica <br/> <span className="italic text-white/30 tracking-tight">voltadas à proteção empresarial.</span></h2>
            <div className="space-y-6 text-[#9CA3AF] font-light leading-relaxed">
              <p>
                O escritório Alberto C. Cardim Neto Advogados nasceu com a vocação de atender demandas de alta complexidade no cenário empresarial brasileiro, oferecendo um atendimento personalizado e estratégico.
              </p>
              <p>
                Nossa filosofia de trabalho combina o rigor acadêmico com a agilidade exigida pelo mercado corporativo, garantindo que nossos clientes tenham não apenas defesa técnica, mas segurança institucional em suas decisões.
              </p>
              <p className="text-sm border-l border-white/20 pl-6 italic">
                "A excelência jurídica não é um destino, mas um padrão inabalável que aplicamos em cada caso, em cada detalhe."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="bg-[#050505] py-32 px-8 md:px-20">
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-4 block">Corpo Jurídico</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Equipe de <span className="italic text-white/30">Mestres.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {TEAM.map((member, idx) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative"
            >
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5 mb-8">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{member.role}</span>
                <h3 className="text-2xl font-serif text-white">{member.name}</h3>
                <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#9CA3AF] transition-colors">{member.bio}</p>
                
                <div className="pt-6 flex gap-6 grayscale group-hover:grayscale-0 transition-all">
                  <button className="text-[10px] uppercase tracking-widest text-[#9CA3AF] hover:text-white transition-colors">LinkedIn</button>
                  <button className="text-[10px] uppercase tracking-widest text-[#9CA3AF] hover:text-white transition-colors">V-Card</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
