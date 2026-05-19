import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] pt-32 pb-24"
    >
      <section className="px-8 md:px-20 mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block font-bold">Segurança Institucional</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
            Política de <span className="italic text-white/30">Privacidade.</span>
          </h1>
          <p className="text-[#9CA3AF] font-light leading-relaxed">
            Compromisso com a transparência, conformidade com a LGPD e a máxima proteção dos dados de nossos clientes.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 max-w-5xl mx-auto">
        <div className="bg-[#080808] border border-white/5 p-10 md:p-20 space-y-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/50 mb-4">
              <ShieldCheck className="w-6 h-6 stroke-[1px]" />
              <h2 className="text-2xl font-serif text-white italic">1. Compromisso com a LGPD</h2>
            </div>
            <p className="text-[#9CA3AF] font-light leading-relaxed">
              O escritório Alberto C. Cardim Neto Advogados Associados reafirma seu compromisso inabalável com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Toda coleta e tratamento de dados realizados em nossas plataformas seguem rigorosos protocolos de segurança e finalidades específicas, garantindo que a confidencialidade inerente à relação advogado-cliente seja transposta também para o ambiente digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
            <div className="space-y-6">
               <div className="flex items-center gap-4 text-white/50 mb-4">
                <Eye className="w-5 h-5 stroke-[1px]" />
                <h3 className="text-xl font-serif text-white italic">Coleta de Dados</h3>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Coletamos apenas as informações estritamente necessárias para o primeiro contato e análise preliminar de demandas judiciais ou consultivas. Isso inclui nome, e-mail corporativo, telefone e a descrição suscinta da demanda.
              </p>
            </div>
            <div className="space-y-6">
               <div className="flex items-center gap-4 text-white/50 mb-4">
                <Lock className="w-5 h-5 stroke-[1px]" />
                <h3 className="text-xl font-serif text-white italic">Uso das Informações</h3>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Os dados fornecidos são utilizados exclusivamente para: (i) identificação do interessado; (ii) resposta a solicitações de reunião; (iii) envio de informativos jurídicos relevantes (newsletter), caso expressamente autorizado.
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-10 border-t border-white/5">
            <div className="flex items-center gap-4 text-white/50 mb-4">
              <FileText className="w-6 h-6 stroke-[1px]" />
              <h2 className="text-2xl font-serif text-white italic">2. Confidencialidade e Segurança</h2>
            </div>
            <p className="text-[#9CA3AF] font-light leading-relaxed">
              Adotamos medidas técnicas e administrativas avançadas para proteger seus dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração ou comunicação. Suas informações não são comercializadas ou compartilhadas com terceiros sem consentimento prévio, exceto por determinação judicial.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs tracking-widest text-white/40 uppercase font-bold pt-4">
               <li>• Criptografia de ponta a ponta</li>
               <li>• Backups seguros e redundantes</li>
               <li>• Acesso restrito por biometria</li>
               <li>• Auditorias periódicas de sistema</li>
            </ul>
          </div>

          <div className="space-y-6 pt-10 border-t border-white/5">
            <h2 className="text-2xl font-serif text-white italic">3. Seus Direitos</h2>
            <p className="text-[#9CA3AF] font-light leading-relaxed">
              Como titular dos dados, você possui o direito de: solicitar a confirmação da existência de tratamento; acessar seus dados; corrigir dados incompletos ou inexatos; e solicitar a eliminação definitiva de suas informações de nossa base de dados a qualquer momento, enviando um e-mail para <span className="text-white">dpo@acn.adv.br</span>.
            </p>
          </div>

          <div className="pt-20 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
              Última atualização: Maio de 2024. <br/> Alberto C. Cardim Neto Advogados Associados.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
