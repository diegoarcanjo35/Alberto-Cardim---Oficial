export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  status: 'published' | 'draft';
}

export type ActuationArea = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  email: string;
  linkedin: string;
  instagram?: string;
  active: boolean;
}

export interface SiteSettings {
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    officeHours: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
    youtube: string;
  };
  institutional: {
    name: string;
    description: string;
    history: string;
    footerText: string;
    copyright: string;
  };
  images: {
    logo: string;
    heroVideo?: string;
    heroFallback: string;
    historyImage: string;
    officeImage1: string;
    officeImage2: string;
  };
  formSubjects: string[];
  team: TeamMember[];
}
