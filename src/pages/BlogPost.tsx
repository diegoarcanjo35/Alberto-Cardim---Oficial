import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useBlog } from '../services/blogService';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2, Tag } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const { posts } = useBlog();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="bg-[#050505] min-h-screen text-[#D1D5DB]">
      {/* Article Hero */}
      <section className="pt-40 pb-20 px-8 md:px-20 border-b border-white/5 relative">
        <Link to="/blog" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#666] hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Blog
        </Link>
        
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-[9px] uppercase tracking-[0.4em] mb-8 text-[#9CA3AF]">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-12 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-[10px] uppercase tracking-[0.3em] text-[#666]">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 stroke-[1px]" />
              <div className="flex flex-col">
                <span className="text-white/30 text-[8px] tracking-[0.1em] mb-1">Autor</span>
                {post.author}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 stroke-[1px]" />
              <div className="flex flex-col">
                <span className="text-white/30 text-[8px] tracking-[0.1em] mb-1">Publicação</span>
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </div>
            </div>
            <button className="flex items-center gap-3 hover:text-white transition-colors">
              <Share2 className="w-4 h-4 stroke-[1px]" />
              Compartilhar
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8 md:px-20 max-w-4xl mx-auto">
        <div className="aspect-video w-full border border-white/5 mb-20 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-[#9CA3AF] prose-p:font-light prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-white prose-blockquote:border-white/20 prose-blockquote:italic prose-blockquote:text-white/60">
          <div className="text-2xl font-serif text-white mb-10 border-l-4 border-white/10 pl-8 py-2 italic bg-white/[0.01]">
            {post.summary}
          </div>
          
          <p className="mb-8 whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="mt-20 p-10 bg-[#080808] border border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2">
              <Tag className="w-3 h-3" />
              Tópicos Relacionados
            </div>
            <div className="flex flex-wrap gap-4">
              {["Direito Empresarial", "Estratégia Jurídica", "Alta Complexidade", post.category].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-[#666]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-20 border-t border-white/5 px-8 md:px-20 bg-[#080808]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/blog" className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all flex items-center gap-4">
            <ArrowLeft className="w-4 h-4" />
            Post Anterior
          </Link>
          <div className="w-[1px] h-12 bg-white/5" />
          <Link to="/blog" className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all flex items-center gap-4">
            Próximo Insight
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
