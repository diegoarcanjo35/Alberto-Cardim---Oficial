import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const settings = useSettings();

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-24 pb-12 px-8 md:px-20 text-[#666]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand */}
        <div className="space-y-12 col-span-1 md:col-span-2 lg:col-span-1">
          <img src={settings.images.logo} alt="ACN Logo" className="h-16 lg:h-20 object-contain brightness-110" />
          <p className="text-sm leading-relaxed font-light max-w-xs">
            {settings.institutional.footerText}
          </p>
          <div className="flex gap-6">
            <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5 stroke-[1px]" /></a>
            <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5 stroke-[1px]" /></a>
            <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook className="w-5 h-5 stroke-[1px]" /></a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Navegação</h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/areas-de-atuacao" className="hover:text-white transition-colors">Áreas de Atuação</Link></li>
            <li><Link to="/escritorio" className="hover:text-white transition-colors">Escritório</Link></li>
            <li><Link to="/equipe" className="hover:text-white transition-colors">Equipe</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Contato</h4>
          <ul className="space-y-6 text-xs font-light">
            <li className="flex items-start gap-4">
              <Mail className="w-4 h-4 stroke-[1px] mt-1" />
              <span>{settings.contact.email}</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-4 h-4 stroke-[1px] mt-1" />
              <span>{settings.contact.phone}</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-4 h-4 stroke-[1px] mt-1" />
              <span>{settings.contact.address}<br/>{settings.contact.city}, {settings.contact.state} - Brasil</span>
            </li>
          </ul>
        </div>

        {/* Units */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Unidade</h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              <span>Brasília — Distrito Federal</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-white/20 rounded-full opacity-30" />
              <span className="opacity-30">Consultoria Global</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] tracking-[0.4em] uppercase">
        <div>{settings.institutional.copyright}</div>
        <div className="flex gap-12">
          <span>OAB/DF 123.456</span>
          <Link to="/politica-de-privacidade" className="hover:text-white transition-all">Privacidade</Link>
          <span className="text-white/10 italic">Premium Experience</span>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[8px] uppercase tracking-[0.5em] text-[#333] font-light">
          Desenvolvido e mantido por{' '}
          <a 
            href="https://diegoarcanjo.site/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#444] hover:text-white transition-all duration-700 hover:tracking-[0.6em]"
          >
            Diego Arcanjo Web Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
