/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import AreasAtuacao from './pages/AreasAtuacao';
import EscritorioPage from './pages/EscritorioPage';
import EquipePage from './pages/EquipePage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ContatoPage from './pages/ContatoPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import { AnimatePresence } from 'motion/react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem('acn_auth');
  if (auth !== 'true') return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {!location.pathname.startsWith('/admin') && <Header />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/areas-de-atuacao" element={<AreasAtuacao />} />
            <Route path="/escritorio" element={<EscritorioPage />} />
            <Route path="/equipe" element={<EquipePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!location.pathname.startsWith('/admin') && <Footer />}
    </div>
  );
}

