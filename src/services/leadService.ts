import { useState, useEffect, useCallback } from 'react';
import { Lead } from '../types';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = useCallback(() => {
    const saved = localStorage.getItem('acn_leads');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    // Initial load
    setLeads(loadLeads());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'acn_leads') {
        setLeads(loadLeads());
      }
    };

    const handleCustomEvent = () => {
      setLeads(loadLeads());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('leadsUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('leadsUpdated', handleCustomEvent);
    };
  }, [loadLeads]);

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    localStorage.setItem('acn_leads', JSON.stringify(updatedLeads));
    window.dispatchEvent(new Event('leadsUpdated'));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'company'> & { company?: string }) => {
    const newLead: Lead = {
      ...lead,
      company: lead.company || 'N/A',
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    // Always read fresh from storage before adding
    const currentLeads = loadLeads();
    const updatedLeads = [newLead, ...currentLeads];
    setLeads(updatedLeads);
    saveLeadsToStorage(updatedLeads);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const currentLeads = loadLeads();
    const updatedLeads = currentLeads.map((l: Lead) => l.id === id ? { ...l, status } : l);
    setLeads(updatedLeads);
    saveLeadsToStorage(updatedLeads);
  };

  const deleteLead = (id: string) => {
    const currentLeads = loadLeads();
    const updatedLeads = currentLeads.filter((l: Lead) => l.id !== id);
    setLeads(updatedLeads);
    saveLeadsToStorage(updatedLeads);
  };

  return { leads, addLead, updateLeadStatus, deleteLead };
}
