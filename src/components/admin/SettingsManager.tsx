import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';
import { SiteSettings } from '../../types';
import { Save, RefreshCcw, Smartphone, Globe, FileText, ImageIcon, ListTree, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(settingsService.getSettings());
  const [activeSubTab, setActiveSubTab] = useState<'contact' | 'institutional' | 'images' | 'social' | 'subjects'>('contact');
  const [saved, setSaved] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  const handleChange = (section: keyof SiteSettings, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    setSettings(prev => ({
      ...prev,
      formSubjects: [...prev.formSubjects, newSubject.trim()]
    }));
    setNewSubject('');
    setSaved(false);
  };

  const handleRemoveSubject = (index: number) => {
    setSettings(prev => ({
      ...prev,
      formSubjects: prev.formSubjects.filter((_, i) => i !== index)
    }));
    setSaved(false);
  };

  const handleUpdateSubject = (index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      formSubjects: prev.formSubjects.map((s, i) => i === index ? value : s)
    }));
    setSaved(false);
  };

  const handleSave = () => {
    settingsService.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Deseja realmente resetar todas as configurações para o padrão?')) {
      settingsService.resetSettings();
      setSettings(settingsService.getSettings());
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8">
        {[
          { id: 'contact', name: 'Contatos', icon: Smartphone },
          { id: 'social', name: 'Redes Sociais', icon: Globe },
          { id: 'institutional', name: 'Textos', icon: FileText },
          { id: 'images', name: 'Imagens', icon: ImageIcon },
          { id: 'subjects', name: 'Assuntos', icon: ListTree },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={cn(
              "px-6 py-3 text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all",
              activeSubTab === tab.id ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12 shadow-2xl relative">
        {activeSubTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Telefone</label>
              <input 
                value={settings.contact.phone}
                onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">WhatsApp</label>
              <input 
                value={settings.contact.whatsapp}
                onChange={(e) => handleChange('contact', 'whatsapp', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">E-mail Corporativo</label>
              <input 
                value={settings.contact.email}
                onChange={(e) => handleChange('contact', 'email', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Endereço</label>
              <input 
                value={settings.contact.address}
                onChange={(e) => handleChange('contact', 'address', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Cidade</label>
              <input 
                value={settings.contact.city}
                onChange={(e) => handleChange('contact', 'city', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Estado (UF)</label>
              <input 
                value={settings.contact.state}
                onChange={(e) => handleChange('contact', 'state', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">CEP</label>
              <input 
                value={settings.contact.zipCode}
                onChange={(e) => handleChange('contact', 'zipCode', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Horário de Atendimento</label>
              <input 
                value={settings.contact.officeHours}
                onChange={(e) => handleChange('contact', 'officeHours', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
          </div>
        )}

        {activeSubTab === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Instagram URL</label>
              <input 
                value={settings.social.instagram}
                onChange={(e) => handleChange('social', 'instagram', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">LinkedIn URL</label>
              <input 
                value={settings.social.linkedin}
                onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Facebook URL</label>
              <input 
                value={settings.social.facebook}
                onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">YouTube URL</label>
              <input 
                value={settings.social.youtube}
                onChange={(e) => handleChange('social', 'youtube', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
          </div>
        )}

        {activeSubTab === 'institutional' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Nome do Escritório</label>
              <input 
                value={settings.institutional.name}
                onChange={(e) => handleChange('institutional', 'name', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Descrição Hero</label>
              <textarea 
                value={settings.institutional.description}
                onChange={(e) => handleChange('institutional', 'description', e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light resize-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">História Institutional</label>
              <textarea 
                value={settings.institutional.history}
                onChange={(e) => handleChange('institutional', 'history', e.target.value)}
                rows={5}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light resize-none" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Texto do Footer</label>
                <input 
                  value={settings.institutional.footerText}
                  onChange={(e) => handleChange('institutional', 'footerText', e.target.value)}
                  className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Copyright</label>
                <input 
                  value={settings.institutional.copyright}
                  onChange={(e) => handleChange('institutional', 'copyright', e.target.value)}
                  className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'images' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Logo URL</label>
              <input 
                value={settings.images.logo}
                onChange={(e) => handleChange('images', 'logo', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Hero Video Background URL</label>
              <input 
                value={settings.images.heroVideo}
                onChange={(e) => handleChange('images', 'heroVideo', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Hero Fallback Image URL</label>
              <input 
                value={settings.images.heroFallback}
                onChange={(e) => handleChange('images', 'heroFallback', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Imagem Nossa História URL</label>
              <input 
                value={settings.images.historyImage}
                onChange={(e) => handleChange('images', 'historyImage', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Imagem Escritório 1 URL</label>
              <input 
                value={settings.images.officeImage1}
                onChange={(e) => handleChange('images', 'officeImage1', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-[#444] tracking-widest font-bold">Imagem Escritório 2 URL</label>
              <input 
                value={settings.images.officeImage2}
                onChange={(e) => handleChange('images', 'officeImage2', e.target.value)}
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light" 
              />
            </div>
          </div>
        )}

        {activeSubTab === 'subjects' && (
          <div className="space-y-8">
            <div className="flex gap-4">
              <input 
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Novo assunto (Ex: Recuperação Tributária)"
                className="flex-1 bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
              />
              <button 
                onClick={handleAddSubject}
                className="px-6 bg-white text-black text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#D1D5DB] transition-all"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {settings.formSubjects.map((subject, idx) => (
                <div key={idx} className="flex gap-4 items-center group/item">
                  <input 
                    value={subject}
                    onChange={(e) => handleUpdateSubject(idx, e.target.value)}
                    className="flex-1 bg-black/20 border border-white/5 px-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light"
                  />
                  <button 
                    onClick={() => handleRemoveSubject(idx)}
                    className="p-3 text-[#333] hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {settings.formSubjects.length === 0 && (
                <p className="text-center py-8 text-[#444] italic border border-dashed border-white/5 uppercase text-[9px] tracking-[0.2em]">Nenhum assunto configurado.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 flex gap-4 pt-8 border-t border-white/5">
          <button 
            onClick={handleSave}
            className={cn(
              "flex-1 py-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all flex items-center justify-center gap-4",
              saved ? "bg-green-600 text-white" : "bg-white text-black hover:bg-[#D1D5DB]"
            )}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Alterações Gravadas' : 'Salvar Alterações'}
          </button>
          <button 
            onClick={handleReset}
            className="px-8 py-4 border border-white/10 text-[#666] hover:text-white hover:bg-white/5 transition-all"
            title="Resetar Padrão"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
