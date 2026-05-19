import { SiteSettings } from '../types';
import { LOGO_URL } from '../constants';

const SETTINGS_KEY = 'acn_site_settings';

const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    phone: '+55 (61) 3213-9000',
    whatsapp: '+55 (61) 98111-9000',
    email: 'contato@acn.adv.br',
    address: 'SHN Quadra 02, Bloco F, Executive Office Tower',
    city: 'Brasília',
    state: 'DF',
    zipCode: '70702-906',
    officeHours: 'Seg - Sex, 09:00 - 18:00',
  },
  social: {
    instagram: 'https://instagram.com/acnadvogados',
    linkedin: 'https://linkedin.com/company/acnadvogados',
    facebook: 'https://facebook.com/acnadvogados',
    youtube: 'https://youtube.com/acnadvogados',
  },
  institutional: {
    name: 'Alberto C. Cardim Neto',
    description: 'Boutique jurídica focada em resultados estratégicos e defesa criminal empresarial de alta complexidade.',
    history: 'Nosso escritório atua como uma boutique jurídica focada em resultados estratégicos. Não buscamos apenas a resolução de conflitos, mas a antecipação de riscos e a proteção institucional de nossos parceiros empresariais.',
    footerText: 'Autoridade técnica em cenários complexos. Advocacia empresarial premium.',
    copyright: `© ${new Date().getFullYear()} Alberto C. Cardim Neto Advogados Associados.`,
  },
  images: {
    logo: LOGO_URL,
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-a-city-at-night-11910-large.mp4',
    heroFallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    historyImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2670&auto=format&fit=crop',
    officeImage1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
    officeImage2: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2674&auto=format&fit=crop',
  },
  formSubjects: [
    'Direito Tributário',
    'Direito Aduaneiro',
    'Defesa Criminal Empresarial',
    'Direito do Agronegócio',
    'Compliance e ESG',
    'Consultoria Empresarial',
    'Outros'
  ],
  team: [
    {
      id: '1',
      name: 'Alberto C. Cardim Neto',
      role: 'Sócio Fundador',
      specialty: 'Direito Tributário e Aduaneiro',
      bio: 'Especialista em contencioso estratégico com mais de 20 anos de experiência.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
      email: 'alberto@acn.adv.br',
      linkedin: 'https://linkedin.com',
      active: true
    },
    {
      id: '2',
      name: 'Dr. Diego Arcanjo',
      role: 'Sócio Diretor',
      specialty: 'Defesa Criminal Empresarial',
      bio: 'Focado em crimes do colarinho branco e compliance corporativo.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop',
      email: 'diego@acn.adv.br',
      linkedin: 'https://linkedin.com',
      active: true
    }
  ],
};

export const settingsService = {
  getSettings(): SiteSettings {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings(settings: SiteSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Trigger an event for live updates
    window.dispatchEvent(new Event('settingsUpdated'));
  },

  resetSettings(): void {
    localStorage.removeItem(SETTINGS_KEY);
    window.dispatchEvent(new Event('settingsUpdated'));
  },
};
