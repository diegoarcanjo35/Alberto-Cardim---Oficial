import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { settingsService } from '../../services/settingsService';
import { TeamMember } from '../../types';
import { Plus, Trash2, Edit2, CheckCircle, X, Mail, Linkedin, Instagram, Globe, User, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TeamManager() {
  const settings = useSettings();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialMember: Omit<TeamMember, 'id'> = {
    name: '',
    role: '',
    specialty: '',
    bio: '',
    image: '',
    email: '',
    linkedin: '',
    instagram: '',
    active: true
  };

  const [formData, setFormData] = useState(initialMember);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) {
      const newMember: TeamMember = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      const updatedTeam = [...settings.team, newMember];
      settingsService.updateSettings({ ...settings, team: updatedTeam });
      setIsAdding(false);
    } else if (isEditing) {
      const updatedTeam = settings.team.map(m => m.id === isEditing ? { ...formData, id: isEditing } : m);
      settingsService.updateSettings({ ...settings, team: updatedTeam });
      setIsEditing(null);
    }
    setFormData(initialMember);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      specialty: member.specialty,
      bio: member.bio,
      image: member.image,
      email: member.email,
      linkedin: member.linkedin,
      instagram: member.instagram || '',
      active: member.active
    });
    setIsEditing(member.id);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Excluir este membro da equipe?')) {
      const updatedTeam = settings.team.filter(m => m.id !== id);
      settingsService.updateSettings({ ...settings, team: updatedTeam });
    }
  };

  const toggleStatus = (id: string) => {
    const updatedTeam = settings.team.map(m => m.id === id ? { ...m, active: !m.active } : m);
    settingsService.updateSettings({ ...settings, team: updatedTeam });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif text-white mb-1">Cuerpo Jurídico</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#666]">Gerencie os advogados e sócios do escritório</p>
        </div>
        {!isAdding && !isEditing && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-white text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#D1D5DB] transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar Membro
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-[#0F0F0F] border border-white/10 p-12 relative overflow-hidden transition-all animate-in fade-in slide-in-from-top-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[80px] pointer-events-none" />
          
          <h3 className="text-lg font-serif text-white mb-8 border-b border-white/5 pb-6">
            {isAdding ? 'Novo Membro da Equipe' : 'Editar Membro'}
          </h3>

          <form onSubmit={handleSave} className="space-y-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">Foto do Perfil (URL)</label>
                  <input 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://unsplash.com/..."
                    className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                  />
                  {formData.image && (
                    <div className="mt-4 w-32 h-32 border border-white/5 overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">Cargo</label>
                    <input 
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="Ex: Sócio Fundador"
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">Especialidade</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                      <input 
                        required
                        value={formData.specialty}
                        onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                        placeholder="Ex: Tributário"
                        className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">Biografia Resumida</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">E-mail Profissional</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#444] font-bold">LinkedIn (URL)</label>
                    <div className="relative">
                      <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                      <input 
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-white/30 outline-none text-white font-light"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex gap-4">
              <button 
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(null);
                  setFormData(initialMember);
                }}
                className="flex-1 py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all text-[#666] font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D1D5DB] transition-all"
              >
                {isAdding ? 'Salvar Novo Membro' : 'Atualizar Informações'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!isAdding && !isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.team.map((member) => (
            <div key={member.id} className={cn(
              "bg-[#0F0F0F] border border-white/5 p-8 group relative overflow-hidden transition-all duration-500",
              !member.active && "opacity-40 grayscale"
            )}>
              <div className="flex gap-6 mb-6">
                <div className="w-20 h-20 border border-white/10 overflow-hidden shrink-0">
                  <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-serif text-lg leading-tight truncate">{member.name}</h4>
                  <p className="text-[9px] uppercase tracking-[0.1em] text-[#666] mb-2">{member.role}</p>
                  <div className="flex gap-2">
                    {member.linkedin && <Linkedin className="w-3 h-3 text-[#444]" />}
                    {member.email && <Mail className="w-3 h-3 text-[#444]" />}
                  </div>
                </div>
              </div>
              
              <p className="text-[#666] text-xs line-clamp-2 italic mb-6 font-light">"{member.bio}"</p>

              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <button 
                  onClick={() => toggleStatus(member.id)}
                  className={cn(
                    "text-[8px] uppercase tracking-widest font-bold",
                    member.active ? "text-green-500" : "text-white/20"
                  )}
                >
                  {member.active ? 'Ativo' : 'Inativo'}
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="p-2 border border-white/5 hover:border-white/20 hover:bg-white/5 text-[#444] hover:text-white transition-all"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-2 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-[#444] hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {settings.team.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-white/5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#333]">Nenhum membro cadastrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
