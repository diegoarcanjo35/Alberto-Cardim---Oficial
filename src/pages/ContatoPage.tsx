import React from 'react';
import { motion } from 'motion/react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function ContatoPage() {
  const settings = useSettings();

  const contactInfo = [
    { icon: Phone, label: 'Atendimento', value: settings.contact.phone },
    { icon: Mail, label: 'E-mail Corporativo', value: settings.contact.email },
    { icon: MapPin, label: 'Unidade Brasília', value: `${settings.contact.address}, ${settings.contact.city} - ${settings.contact.state}` },
    { icon: Clock, label: 'Horário de Brasília', value: settings.contact.officeHours },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] pt-32"
    >
      <section className="px-8 md:px-20 mb-32">
        <div className="max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Inicie um Diálogo</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Análise <br/> <span className="italic text-white/30">Estratégica.</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] font-light leading-relaxed max-w-2xl">
            Entre em contato para uma avaliação confidencial e técnica da sua demanda. Nossa equipe retornará o contato com a brevidade e sobriedade exigidas.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Info */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {contactInfo.map((info) => (
                <div key={info.label} className="space-y-4">
                  <info.icon className="w-6 h-6 text-white/20 stroke-[1px]" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#666] block">{info.label}</span>
                  <p className="text-white font-light">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full grayscale border border-white/5 relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-20 text-center">
              <div className="space-y-4">
                <MapPin className="w-12 h-12 text-white/10 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Google Maps Integration Placeholder</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#050505] border border-white/5 p-10 md:p-16 shadow-2xl relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] blur-3xl -z-0" />
             <ContactForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
