import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MessageSquare, PieChart, Settings, LogOut, 
  Search, Trash2, CheckCircle, Clock, Eye, X, BookOpen, Plus, Image as ImageIcon,
  Briefcase
} from 'lucide-react';
import { useLeads } from '../../services/leadService';
import { useBlog } from '../../services/blogService';
import { settingsService } from '../../services/settingsService';
import { Lead, BlogPost } from '../../types';
import { LOGO_URL } from '../../constants';
import { cn } from '../../lib/utils';
import SettingsManager from '../../components/admin/SettingsManager';
import TeamManager from '../../components/admin/TeamManager';

export default function Dashboard() {
  const { leads, updateLeadStatus, deleteLead } = useLeads();
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'leads' | 'stats' | 'blog' | 'settings' | 'team'>('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const navigate = useNavigate();

  const filteredLeads = leads
    .filter(l => {
      const matchesSearch = 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  useEffect(() => {
    const auth = localStorage.getItem('acn_auth');
    if (auth !== 'true') navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('acn_auth');
    navigate('/admin');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const post = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      summary: formData.get('summary') as string,
      content: formData.get('content') as string,
      author: 'Admin',
      date: new Date().toISOString(),
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1450144637990-111e653c073c?q=80&w=1000&auto=format&fit=crop',
      status: 'published' as const
    };
    addPost(post);
    setIsAddingPost(false);
  };

  const stats = [
    { name: 'Total de Leads', value: leads.length, icon: Users, color: 'text-blue-500', tab: 'messages' as const },
    { name: 'Artigos no Blog', value: posts.length, icon: BookOpen, color: 'text-green-500', tab: 'blog' as const },
    { name: 'Arquivados', value: leads.filter(l => l.status === 'archived').length, icon: PieChart, color: 'text-purple-500', tab: 'messages' as const },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#D1D5DB] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#080808] flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/5">
          <img src={LOGO_URL} alt="ACN" className="h-8 brightness-125" />
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#444] mt-4 font-bold">Terminal Admin v2.0</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('stats')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all text-left",
              activeTab === 'stats' ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <PieChart className="w-4 h-4" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all text-left relative",
              activeTab === 'messages' ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Mensagens
            {leads.some(l => l.status === 'new') && (
              <span className="absolute right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all text-left",
              activeTab === 'blog' ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <BookOpen className="w-4 h-4" />
            Blog
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all text-left",
              activeTab === 'team' ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <Briefcase className="w-4 h-4" />
            Equipe
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all text-left",
              activeTab === 'settings' ? "bg-white text-black font-bold" : "text-[#666] hover:text-white"
            )}
          >
            <Settings className="w-4 h-4" />
            Configurações
          </button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all font-bold"
          >
            <LogOut className="w-4 h-4" />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">
              {activeTab === 'messages' ? 'Centro de Mensagens' : 
               activeTab === 'stats' ? 'Visão Geral' : 
               activeTab === 'blog' ? 'Gestão de Conteúdo' : 
               activeTab === 'settings' ? 'Configurações do Site' :
               activeTab === 'team' ? 'Gerenciamento de Equipe' :
               'Dashboard'}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#666]">Gestão Jurídica de Clientes</p>
          </div>
          <div className="flex gap-4">
            {activeTab === 'blog' && (
              <button 
                onClick={() => setIsAddingPost(true)}
                className="bg-white text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#D1D5DB] transition-all"
              >
                <Plus className="w-4 h-4" />
                Novo Post
              </button>
            )}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
              <input 
                type="text" 
                placeholder="PROCURAR..." 
                className="bg-[#0F0F0F] border border-white/10 pl-12 pr-6 py-2.5 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white/30 text-white w-64"
              />
            </div>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat) => (
              <button 
                key={stat.name} 
                onClick={() => setActiveTab(stat.tab)}
                className="bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group text-left hover:border-white/20 transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <stat.icon className="w-16 h-16" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#666] mb-4">{stat.name}</p>
                <p className="text-4xl font-serif text-white">{stat.value}</p>
                <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-widest text-[#444] group-hover:text-white transition-colors">
                  Gerenciar <X className="w-3 h-3 rotate-45" />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-end mb-4">
              <div className="flex-1 w-full max-w-md relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por nome, email ou assunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0F0F0F] border border-white/5 pl-12 pr-4 py-3 text-sm focus:border-white/20 outline-none text-white font-light"
                />
              </div>
              <div className="flex gap-4">
                {(['all', 'new', 'replied'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={cn(
                      "px-4 py-3 text-[8px] uppercase tracking-widest border transition-all min-w-[100px]",
                      statusFilter === status 
                        ? "bg-white text-black border-white font-bold" 
                        : "border-white/5 text-[#444] hover:text-[#666] hover:border-white/10"
                    )}
                  >
                    {status === 'all' ? 'Todos' : status === 'new' ? 'Não Lidas' : 'Respondidas'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#080808] border border-white/5 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-[#121212]">
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold">Status</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold">Solicitante</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold">Contato / Empresa</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold">Assunto</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold">Data</th>
                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-[#666] font-bold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-24 text-center text-[10px] uppercase tracking-[0.3em] text-[#333] font-light">
                        Nenhuma mensagem encontrada para os critérios selecionados.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={cn(
                        "hover:bg-white/[0.02] transition-colors cursor-pointer group",
                        lead.status === 'new' && "bg-white/[0.01]"
                      )}
                      onClick={() => {
                        setSelectedLead(lead);
                        if (lead.status === 'new') updateLeadStatus(lead.id, 'read');
                      }}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            lead.status === 'new' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-pulse" : 
                            lead.status === 'replied' ? "bg-green-500" : "bg-white/10"
                          )} />
                          <span className="text-[8px] uppercase tracking-widest text-[#444]">
                            {lead.status === 'new' ? 'Nova' : lead.status === 'replied' ? 'Respondida' : 'Lida'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn("text-xs font-serif", lead.status === 'new' ? "text-white" : "text-[#9CA3AF]")}>{lead.name}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#9CA3AF] tracking-tighter">{lead.email}</span>
                          <span className="text-[9px] text-[#444] uppercase tracking-widest">{lead.company}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] text-[#666] uppercase tracking-tight line-clamp-1">{lead.subject}</span>
                      </td>
                      <td className="px-8 py-6 text-[10px] text-[#444]">{formatDate(lead.createdAt)}</td>
                      <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-2 hover:bg-white/10 text-[#333] hover:text-white transition-all"
                            title="Vizualizar"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 hover:bg-red-500/10 text-[#333] hover:text-red-500 transition-all"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-[#0F0F0F] border border-white/5 p-6 flex flex-col md:flex-row gap-8 items-center group">
                <div className="w-40 aspect-video border border-white/5 overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-[#444]">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-lg font-serif text-white">{post.title}</h3>
                  <p className="text-xs text-[#666] line-clamp-1">{post.summary}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-3 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-[#333] hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && <SettingsManager />}
        {activeTab === 'team' && <TeamManager />}
      </main>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0F0F0F] border border-white/10 w-full max-w-2xl shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] pointer-events-none" />
              
              <div className="p-12">
                <header className="mb-12 border-b border-white/5 pb-8 relative">
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="absolute -top-4 -right-4 p-2 text-[#444] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-serif text-white mb-2">{selectedLead.name}</h2>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{selectedLead.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#666] mb-1">{formatDate(selectedLead.createdAt)}</p>
                      <span className={cn(
                        "text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border",
                        selectedLead.status === 'new' ? "border-red-500/50 text-red-400 bg-red-500/10" : "border-white/10 text-[#666]"
                      )}>
                        {selectedLead.status === 'new' ? 'Não Lida' : selectedLead.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 text-xs">
                    <div className="space-y-1">
                      <p className="text-[#444] uppercase tracking-tighter text-[9px]">E-mail</p>
                      <p className="text-[#9CA3AF]">{selectedLead.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#444] uppercase tracking-tighter text-[9px]">Telefone</p>
                      <p className="text-[#9CA3AF]">{selectedLead.phone}</p>
                    </div>
                  </div>
                </header>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-[#444] uppercase tracking-[0.2em] text-[10px] font-bold">Assunto</p>
                    <p className="text-white text-lg font-light leading-relaxed">{selectedLead.subject}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[#444] uppercase tracking-[0.2em] text-[10px] font-bold">Mensagem</p>
                    <div className="bg-white/5 border border-white/5 p-6 text-[#9CA3AF] text-sm leading-relaxed font-light whitespace-pre-wrap italic">
                      "{selectedLead.message}"
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                  <button 
                    onClick={() => {
                      updateLeadStatus(selectedLead.id, 'replied');
                      setSelectedLead(null);
                    }}
                    className="flex-1 py-4 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Marcar como Respondida
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Excluir esta mensagem permanentemente?')) {
                        deleteLead(selectedLead.id);
                        setSelectedLead(null);
                      }
                    }}
                    className="px-6 py-4 border border-white/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {isAddingPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0F0F0F] border border-white/10 w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsAddingPost(false)}
                className="absolute top-6 right-6 text-[#666] hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-12">
                <h2 className="text-2xl font-serif text-white mb-8 border-b border-white/5 pb-6">Publicar no Blog</h2>
                
                <form onSubmit={handleSavePost} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Título do Artigo</label>
                      <input name="title" required className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Categoria</label>
                      <select name="category" className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-[#666]">
                        <option>Tributário</option>
                        <option>Compliance</option>
                        <option>Aduaneiro</option>
                        <option>Empresarial</option>
                        <option>Criminal Tributário</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">URL da Imagem de Capa</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]" />
                      <input name="image" placeholder="https://..." className="w-full bg-[#151515] border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-white/30 outline-none text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Resumo (Preview)</label>
                    <textarea name="summary" required rows={2} className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white resize-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-[#666] tracking-[0.2em]">Conteúdo Completo</label>
                    <textarea name="content" required rows={8} className="w-full bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:border-white/30 outline-none text-white resize-none" />
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsAddingPost(false)}
                      className="flex-1 py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all font-bold text-[#666]"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D1D5DB] transition-all"
                    >
                      Publicar Artigo
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
