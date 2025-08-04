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

    // Contact
    'contact.title': 'Trabajemos Juntos',
    'contact.subtitle': 'Siempre estoy interesado en nuevas oportunidades y proyectos emocionantes. Hablemos sobre cómo podemos hacer realidad tus ideas.',
    'contact.form.name': 'Nombre',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'tu.email@ejemplo.com',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    'contact.form.send': 'Enviar Mensaje',
    'contact.info.title': 'Ponte en Contacto',
    'contact.info.description': 'Actualmente estoy disponible para trabajo freelance y oportunidades de tiempo completo. Ya sea que tengas un proyecto en mente o solo quieras charlar, me encantaría saber de ti.',
    'contact.info.email': 'Email',
    'contact.info.linkedin': 'LinkedIn',
    'contact.info.connect': 'Conéctate conmigo',
    'contact.services.title': 'En qué puedo ayudarte:',
    'contact.services.webdev': '• Desarrollo web full-stack',
    'contact.services.ai': '• Integración de IA/ML',
    'contact.services.api': '• Desarrollo de APIs',
    'contact.services.uiux': '• Diseño UI/UX',
    'contact.services.consulting': '• Consultoría técnica',

    // Projects
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Una colección de mis trabajos más recientes, mostrando mi pasión por crear soluciones innovadoras y experiencias de usuario excepcionales.',
    'projects.window.title': 'Projects Explorer - Portfolio',
    'projects.viewDemo': 'Ver Demo',
    'projects.viewCode': 'Ver Código',
    'projects.aiChat.title': 'AI Chat Assistant',
    'projects.aiChat.description': '🚀 Revolucionario asistente de IA conversacional con memoria contextual y capacidades de voz. Transforma la forma de interactuar con la tecnología.',
    'projects.ecommerce.title': 'E-commerce Platform',
    'projects.ecommerce.description': '💎 Plataforma de comercio electrónico de próxima generación con gestión de inventario en tiempo real y análisis avanzados.',
    'projects.taskManager.title': 'Task Management App',
    'projects.taskManager.description': '⚡ Aplicación de gestión de tareas colaborativa con actualizaciones en tiempo real y seguimiento de progreso inteligente.',
    'projects.portfolio.title': 'Portfolio Website',
    'projects.portfolio.description': '🎨 Portfolio moderno y responsivo con animaciones fluidas y diseño elegante que muestra proyectos y habilidades.',
    'projects.analytics.title': 'Data Analytics Dashboard',
    'projects.analytics.description': '📊 Dashboard de análisis de datos interactivo con visualizaciones dinámicas y reportes en tiempo real.',
    'projects.social.title': 'Social Media App',
    'projects.social.description': '🌐 Aplicación de redes sociales con funcionalidades avanzadas de mensajería y contenido multimedia.',
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

    // Contact
    'contact.title': 'Let\'s Work Together',
    'contact.subtitle': 'I\'m always interested in new opportunities and exciting projects. Let\'s discuss how we can bring your ideas to life.',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your.email@example.com',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell me about your project...',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Get in Touch',
    'contact.info.description': 'I\'m currently available for freelance work and full-time opportunities. Whether you have a project in mind or just want to chat, I\'d love to hear from you.',
    'contact.info.email': 'Email',
    'contact.info.linkedin': 'LinkedIn',
    'contact.info.connect': 'Connect with me',
    'contact.services.title': 'What I can help with:',
    'contact.services.webdev': '• Full-stack web development',
    'contact.services.ai': '• AI/ML integration',
    'contact.services.api': '• API development',
    'contact.services.uiux': '• UI/UX design',
    'contact.services.consulting': '• Technical consulting',

    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A collection of my most recent work, showcasing my passion for creating innovative solutions and exceptional user experiences.',
    'projects.window.title': 'Projects Explorer - Portfolio',
    'projects.viewDemo': 'View Demo',
    'projects.viewCode': 'View Code',
    'projects.aiChat.title': 'AI Chat Assistant',
    'projects.aiChat.description': '🚀 Revolutionary conversational AI assistant with contextual memory and voice capabilities. Transforms the way we interact with technology.',
    'projects.ecommerce.title': 'E-commerce Platform',
    'projects.ecommerce.description': '💎 Next-generation e-commerce platform with real-time inventory management and advanced analytics.',
    'projects.taskManager.title': 'Task Management App',
    'projects.taskManager.description': '⚡ Collaborative task management application with real-time updates and intelligent progress tracking.',
    'projects.portfolio.title': 'Portfolio Website',
    'projects.portfolio.description': '🎨 Modern and responsive portfolio with fluid animations and elegant design showcasing projects and skills.',
    'projects.analytics.title': 'Data Analytics Dashboard',
    'projects.analytics.description': '📊 Interactive data analytics dashboard with dynamic visualizations and real-time reports.',
    'projects.social.title': 'Social Media App',
    'projects.social.description': '🌐 Social media application with advanced messaging features and multimedia content.',
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