import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Quem Somos', to: '/quem-somos' },
    { name: 'Áreas de Atuação', to: '/areas-de-atuacao' },
    { name: 'Escritório', to: '/escritorio' },
    { name: 'Equipe', to: '/equipe' },
    { name: 'Blog', to: '/blog' },
    { name: 'Contato', to: '/contato' },
  ];

  const handleNavClick = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-16 flex items-center justify-between",
        isScrolled || mobileMenuOpen ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
      )}>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('/')}>
          <img src={settings.images.logo} alt="ACN Logo" className="h-12 md:h-20 object-contain brightness-110 contrast-125 transition-all duration-500" />
          <div className="hidden sm:flex flex-col border-l border-white/20 pl-6">
            <span className="text-white font-serif tracking-[0.12em] text-base md:text-lg font-bold uppercase leading-tight">{settings.institutional.name}</span>
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/50 uppercase">Advogados Associados</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.to)}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] transition-all relative group",
                location.pathname === link.to ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500",
                location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </button>
          ))}
          <Link 
            to="/admin" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 border border-white/30 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 font-bold group"
          >
            <User className="w-3 h-3 group-hover:animate-pulse" />
            Painel Admin
          </Link>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] pt-32 px-10 flex flex-col gap-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className={cn(
                  "text-3xl font-serif text-left tracking-widest",
                  location.pathname === link.to ? "text-white" : "text-white/30 font-light"
                )}
              >
                {link.name}
              </button>
            ))}
            <Link 
              to="/admin" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 py-4 border border-white/20 text-center text-[10px] uppercase tracking-[0.5em] text-white font-bold"
            >
              Painel Admin
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
