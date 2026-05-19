import React from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

export default function EscritorioPage() {
  const settings = useSettings();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] pt-32"
    >
      <section className="px-8 md:px-20 mb-32">
        <div className="max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Ambiente Corporativo</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Nossa <br/> <span className="italic text-white/30">Infraestrutura.</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] font-light leading-relaxed max-w-2xl">
            Projetado para oferecer o máximo de discrição, segurança e conforto aos nossos clientes corporativos. Localizado estrategicamente para atender demandas em todo o território nacional.
          </p>
        </div>
      </section>

      {/* Gallery/Main Info */}
      <section className="px-8 md:px-20 py-24 border-t border-white/5 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <img 
               src={settings.images.officeImage1} 
               className="w-full border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
               alt="Recepção" 
             />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-3xl font-serif text-white italic">Atendimento Presencial e Digital</h2>
            <p className="text-[#9CA3AF] font-light leading-relaxed">
              Mantemos uma estrutura moderna que integra o melhor do atendimento premium tradicional com as ferramentas de segurança digital mais avançadas. Nossas salas de reunião são equipadas para videoconferências de alta definição e sigilo absoluto.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-2">Sigilo</span>
                <p className="text-sm text-white/60">Controle rigoroso de acesso e criptografia de dados em todas as comunicações.</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-2">Localização</span>
                <p className="text-sm text-white/60">{settings.contact.address}, {settings.contact.city} - {settings.contact.state}.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-white italic">Excelência em Cada Detalhe</h2>
            <p className="text-[#9CA3AF] font-light leading-relaxed">
              Acreditamos que o ambiente de trabalho reflete o rigor que aplicamos às nossas causas. Cada detalhe do nosso escritório foi pensado para propiciar um clima de sobriedade e foco nos resultados de alta complexidade.
            </p>
            <ul className="space-y-4 text-sm text-white/40 uppercase tracking-widest font-bold">
              <li>• Bibliotecas Jurídicas Especializadas</li>
              <li>• Salas de Crise e Auditoria</li>
              <li>• Espaço Lounge para Clientes</li>
              <li>• Estacionamento Privativo com Manobrista</li>
            </ul>
          </div>
          <div>
             <img 
               src={settings.images.officeImage2} 
               className="w-full border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
               alt="Meeting Room" 
             />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
