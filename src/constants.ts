import { ActuationArea, BlogPost } from './types';

export const LOGO_URL = "https://raw.githubusercontent.com/diegoarcanjo35/Alberto-Cardim/main/Cart%C3%A3o_ACN_PARA_IMPRESS%C3%83O_page-0001.5.jpg.jpeg";

export const ACTUATION_AREAS: string[] = [
  "Defesa em investigações por crimes tributários",
  "Atuação em casos de prisão relacionada a questões fiscais",
  "Defesa em acusações de sonegação fiscal",
  "Operações Policiais e Investigações",
  "Prevenção de Responsabilização Criminal",
  "Defesa criminal de empresários e gestores",
  "Procedimentos Especiais",
  "Perdimento de mercadorias",
  "Valoração aduaneira",
  "Canal Cinza",
  "Consultas Administrativas",
  "Inaptidão do CNPJ",
  "Planejamento e/ou contencioso Tributário",
  "Áreas Complementares",
  "Pedido de restituição de coisa apreendida"
];

// Fallback for old imports if any
export const ACTUATION_AREAS_1 = [];
export const ACTUATION_AREAS_2 = [];

export const TEAM = [
  {
    name: "Dr. Alberto C. Cardim Neto",
    role: "Sócio Fundador",
    bio: "Especialista em Direito Tributário e Defesa Criminal Empresarial com mais de 20 anos de atuação em casos de alta complexidade.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Dra. Helena Martins",
    role: "Sócia Senior",
    bio: "Especialista em Compliance e Gestão de Riscos Corporativos, com foco em governança e integridade empresarial.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Novas Perspectivas no Direito Tributário Corporativo para 2024",
    category: "Tributário",
    summary: "Uma análise detalhada sobre as recentes mudanças legislativas e seus impactos diretos na gestão fiscal de grandes empresas.",
    content: "O cenário tributário brasileiro está em constante evolução. Recentemente, novas diretrizes foram estabelecidas para a compensação de créditos e a tributação de lucros no exterior. Neste artigo, exploramos como os departamentos jurídicos devem se preparar para estas mudanças, minimizando riscos e otimizando a carga tributária dentro da legalidade.",
    author: "Dr. Alberto C. Cardim Neto",
    date: "2024-05-15",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop",
    slug: "novas-perspectivas-direito-tributario-2024",
    status: 'published'
  },
  {
    id: '2',
    title: "Compliance e a Proteção de Dados: O papel do jurídico na era digital",
    category: "Compliance",
    summary: "Como a integração entre LGPD e programas de integridade pode salvar empresas de multas milionárias e danos à reputação.",
    content: "A governança de dados não é mais apenas uma questão de TI, mas um pilar estratégico da segurança jurídica empresarial. Analisamos casos recentes de vazamentos e como a atuação preventiva do jurídico pode mitigar responsabilidades.",
    author: "Dra. Helena Martins",
    date: "2024-05-10",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop",
    slug: "compliance-protecao-dados-era-digital",
    status: 'published'
  }
];
