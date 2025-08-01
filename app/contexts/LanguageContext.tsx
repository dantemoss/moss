'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  es: {
    // Hero
    'hero.available': 'Disponible para oportunidades',
    'hero.greeting': 'Hola, soy',
    'hero.title': 'Desarrollador Full Stack',
    'hero.subtitle': 'con enfoque en seguridad.',
    'hero.description': 'Desarrollador Web Full Stack con orientación a la seguridad informática. Experto en ReactJS, Next.js, TypeScript y Node.js. Actualmente trabajo en OSPADEP desarrollando herramientas internas para el sector salud.',
    'hero.viewProjects': 'Ver Proyectos',
    'hero.contact': 'Contactar',

    // About
    'about.title': 'Sobre Mí',
    'about.description': 'Desarrollador Web Full Stack con orientación a la seguridad informática y experiencia tanto en frontend como backend. Manejo tecnologías modernas como ReactJS, Next.js, TypeScript, Node.js, MongoDB y PostgreSQL.',
    'about.bio1': 'Actualmente trabajo como Auxiliar de Sistemas en OSPADEP, donde desarrollé herramientas internas reales para uso diario en el sector salud. Estoy certificado por Microsoft en Power Platform (PL-900) y tengo sólidos conocimientos en automatización con Power Automate, Power Apps y Power BI.',
    'about.bio2': 'Apasionado por la innovación, actualmente curso la Tecnicatura en Ciberseguridad (Teclab), enfocándome en aplicar buenas prácticas en arquitecturas seguras, escalables y modernas. Me apoyo en herramientas con inteligencia artificial como Cursor, Claude, GPT-4, Copilot y otras para maximizar mi productividad.',
    'about.available': 'Disponible para nuevas oportunidades',
    'about.projects': 'Proyectos Completados',
    'about.experience': 'Años de Experiencia',
    'about.technologies': 'Tecnologías',
    'about.certifications': 'Certificaciones',
    'about.techStack': 'Tech Stack',
    'about.techStackDesc': 'Exploración interactiva de mis habilidades',
    'about.certificationsTitle': 'Certificaciones',
    'about.certificationsDesc': 'Logros profesionales y credenciales',
    'about.experienceTitle': 'Experiencia Laboral',
    'about.experienceDesc': 'Trayectoria profesional y logros',
    'about.verified': 'Verificado',
    'about.professional': 'Profesional',

    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',

    // Common
    'common.loading': 'Cargando...',
  },
  en: {
    // Hero
    'hero.available': 'Available for opportunities',
    'hero.greeting': 'Hi, I\'m',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'with security focus.',
    'hero.description': 'Full Stack Web Developer with cybersecurity orientation. Expert in ReactJS, Next.js, TypeScript and Node.js. Currently working at OSPADEP developing internal tools for the healthcare sector.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact',

    // About
    'about.title': 'About Me',
    'about.description': 'Full Stack Web Developer with cybersecurity orientation and experience in both frontend and backend. I handle modern technologies such as ReactJS, Next.js, TypeScript, Node.js, MongoDB and PostgreSQL.',
    'about.bio1': 'I currently work as a Systems Assistant at OSPADEP, where I developed real internal tools for daily use in the healthcare sector. I am certified by Microsoft in Power Platform (PL-900) and have solid knowledge in automation with Power Automate, Power Apps and Power BI.',
    'about.bio2': 'Passionate about innovation, I am currently pursuing a Cybersecurity Technician degree (Teclab), focusing on applying best practices in secure, scalable and modern architectures. I rely on AI tools such as Cursor, Claude, GPT-4, Copilot and others to maximize my productivity.',
    'about.available': 'Available for new opportunities',
    'about.projects': 'Completed Projects',
    'about.experience': 'Years of Experience',
    'about.technologies': 'Technologies',
    'about.certifications': 'Certifications',
    'about.techStack': 'Tech Stack',
    'about.techStackDesc': 'Interactive exploration of my skills',
    'about.certificationsTitle': 'Certifications',
    'about.certificationsDesc': 'Professional achievements and credentials',
    'about.experienceTitle': 'Work Experience',
    'about.experienceDesc': 'Professional trajectory and achievements',
    'about.verified': 'Verified',
    'about.professional': 'Professional',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Common
    'common.loading': 'Loading...',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    // Check for saved language preference or default to Spanish
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 