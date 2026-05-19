import React from 'react';
import { motion } from 'motion/react';
import { useBlog } from '../services/blogService';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Blog() {
  const { posts } = useBlog();
  const publishedPosts = posts.filter(p => p.status === 'published');

  const categories = ["Tributário", "Aduaneiro", "Empresarial", "Criminal Tributário", "Compliance", "Julgados"];

  return (
    <div className="bg-[#050505] min-h-screen text-[#D1D5DB]">
      {/* Hero Blog */}
      <section className="pt-40 pb-20 px-8 md:px-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-[10px] tracking-[0.5em] uppercase mb-8 text-white/50">
            Inteligência Jurídica
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Insights Jurídicos <br/> <span className="italic text-white/30">Estratégicos.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl font-light leading-relaxed">
            Análises, decisões relevantes e conteúdos jurídicos voltados ao ambiente empresarial e tributário.
          </p>
        </div>

        {/* Categories scroll */}
        <div className="mt-20 flex gap-6 overflow-x-auto pb-4 scrollbar-hide border-t border-white/5 pt-10">
          {categories.map(cat => (
            <button key={cat} className="whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#666] hover:text-white transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-24 px-8 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {publishedPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-video overflow-hidden border border-white/5 mb-8 relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-white">
                    {post.category}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-[#444]">
                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center gap-2"><User className="w-3 h-3" /> {post.author}</span>
                  </div>
                  <h2 className="text-3xl font-serif text-white group-hover:text-white/80 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#9CA3AF] font-light leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="pt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white font-bold group-hover:gap-6 transition-all">
                    Ler Mais
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-32 px-8 md:px-20 border-t border-white/5 bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif text-white">Acompanhe as Novidades</h3>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#666]">Inscreva-se para receber insights jurídicos exclusivos</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="SEU E-MAIL CORPORATIVO" 
              className="flex-1 bg-transparent border border-white/10 px-8 py-5 text-xs tracking-widest text-white focus:outline-none focus:border-white/40 transition-all font-light"
            />
            <button className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#D1D5DB] transition-all">
              INSCREVER
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
