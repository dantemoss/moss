'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Award, 
  Code, 
  Database, 
  Globe, 
  Zap, 
  Cpu, 
  Cloud, 
  Shield, 
  Rocket,
  Star,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Building,
  Calendar,
  MapPin
} from 'lucide-react'
import TechStackPlayground from './TechStackPlayground'
import { useLanguage } from '@/app/contexts/LanguageContext'

const certifications = [
  { 
    name: "Microsoft Power Platform", 
    description: "Power Platform Fundamentals (PL-900)",
    icon: Cloud,
    year: "2024",
    badge: "Microsoft"
  },
  { 
    name: "Carrera Full Stack", 
    description: "Desarrollo de Aplicaciones - Coderhouse",
    icon: Code,
    year: "2024",
    badge: "Coderhouse"
  },
  { 
    name: "ReactJS", 
    description: "Certificado ReactJS - Coderhouse",
    icon: Cpu,
    year: "2023",
    badge: "Coderhouse"
  },
  { 
    name: "JavaScript", 
    description: "Certificado JavaScript - Coderhouse",
    icon: Shield,
    year: "2022",
    badge: "Coderhouse"
  }
]

export default function About() {
  const { t } = useLanguage()
  
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            {t('about.title')}
          </h2>
                     <p className="text-text-secondary text-lg max-w-3xl mx-auto">
                         {t('about.description')}
           </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
                                             <p className="text-text-secondary leading-relaxed">
                  {t('about.bio1')}
                </p>
                
                <p className="text-text-secondary leading-relaxed">
                  {t('about.bio2')}
                </p>

                             <div className="flex items-center gap-2 text-accent-glacier">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">{t('about.available')}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                                     <div className="text-2xl font-display font-bold text-accent-glacier mb-1">10+</div>
                   <div className="text-xs text-text-secondary">{t('about.projects')}</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                                     <div className="text-2xl font-display font-bold text-accent-glacier mb-1">1+</div>
                   <div className="text-xs text-text-secondary">{t('about.experience')}</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                                     <div className="text-2xl font-display font-bold text-accent-glacier mb-1">15+</div>
                   <div className="text-xs text-text-secondary">{t('about.technologies')}</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                                     <div className="text-2xl font-display font-bold text-accent-glacier mb-1">7</div>
                   <div className="text-xs text-text-secondary">{t('about.certifications')}</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Playground */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
                             <div className="relative">
                 <div className="p-3 bg-accent-glacier/10 border border-accent-glacier/20 rounded-2xl">
                   <Code size={24} className="text-accent-glacier" />
                 </div>
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-glacier rounded-full animate-pulse"></div>
               </div>
                             <div>
                 <h3 className="text-2xl font-display font-bold">{t('about.techStack')}</h3>
                 <p className="text-text-secondary">{t('about.techStackDesc')}</p>
               </div>
            </motion.div>
            
            <div className="w-full">
              <TechStackPlayground />
            </div>
          </motion.div>
        </div>

        {/* Certifications Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                <Award size={24} className="text-yellow-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
            </div>
            <div>
                             <h3 className="text-2xl font-display font-bold">{t('about.certificationsTitle')}</h3>
               <p className="text-text-secondary">{t('about.certificationsDesc')}</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                                 <div className="relative p-6 bg-background-secondary border border-border-primary rounded-2xl hover:border-accent-glacier/50 transition-all duration-500 hover:shadow-xl">
                  {/* Certificate glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-background-primary border border-border-primary rounded-xl group-hover:border-yellow-500/30 transition-colors duration-300">
                          <cert.icon size={20} className="text-yellow-500" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-lg group-hover:text-accent-glacier transition-colors duration-300">
                            {cert.name}
                          </h4>
                          <p className="text-text-secondary text-sm mt-1">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-text-secondary font-medium">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Badge and verification */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-background-primary border border-border-primary rounded-full">
                                                     <span className="text-xs font-medium text-accent-glacier">
                            {cert.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp size={12} className="text-green-400" />
                                                     <span className="text-xs text-green-400 font-medium">{t('about.verified')}</span>
                        </div>
                      </div>
                                             <div className="text-xs text-text-secondary">
                         {t('about.professional')}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
                     </div>
         </motion.div>

         {/* Experience Section */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mt-20"
         >
           <motion.div 
             className="flex items-center gap-3 mb-8"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
           >
             <div className="relative">
               <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                 <Building size={24} className="text-blue-500" />
               </div>
               <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-400" />
             </div>
             <div>
                               <h3 className="text-2xl font-display font-bold">{t('about.experienceTitle')}</h3>
                <p className="text-text-secondary">{t('about.experienceDesc')}</p>
             </div>
           </motion.div>
           
           <div className="space-y-6">
             {/* OSPADEP */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="group"
             >
                               <div className="relative p-6 bg-background-secondary border border-border-primary rounded-2xl hover:border-accent-glacier/50 transition-all duration-500 hover:shadow-xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-4">
                       <div className="p-3 bg-background-primary border border-border-primary rounded-xl group-hover:border-blue-500/30 transition-colors duration-300">
                         <Building size={20} className="text-blue-500" />
                       </div>
                       <div>
                                                   <h4 className="font-display font-semibold text-lg group-hover:text-accent-glacier transition-colors duration-300">
                            Auxiliar de Sistemas
                          </h4>
                         <p className="text-text-secondary text-sm mt-1">
                           O.S.P.A.D.E.P.
                         </p>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-blue-400" />
                       <span className="text-sm text-text-secondary font-medium">
                         Feb 2025 - Actualidad
                       </span>
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                     <p className="text-text-secondary text-sm leading-relaxed">
                       Desarrollo del Cotizador Online de Planes Médicos, herramienta 100% funcional 
                       utilizada por el equipo comercial para generar cotizaciones en 3 pasos para 
                       individuos, familias y empresas.
                     </p>
                                           <ul className="text-text-secondary text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-glacier rounded-full"></div>
                          Automatización de tareas y soporte técnico a usuarios internos
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-glacier rounded-full"></div>
                          Integraciones con bases de datos y mejoras continuas en procesos internos
                        </li>
                      </ul>
                   </div>
                 </div>
               </div>
             </motion.div>

             {/* ReadyMind */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="group"
             >
                               <div className="relative p-6 bg-background-secondary border border-border-primary rounded-2xl hover:border-accent-glacier/50 transition-all duration-500 hover:shadow-xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-4">
                       <div className="p-3 bg-background-primary border border-border-primary rounded-xl group-hover:border-green-500/30 transition-colors duration-300">
                         <Code size={20} className="text-green-500" />
                       </div>
                       <div>
                                                   <h4 className="font-display font-semibold text-lg group-hover:text-accent-glacier transition-colors duration-300">
                            Trainee Low-Code Developer
                          </h4>
                         <p className="text-text-secondary text-sm mt-1">
                           ReadyMind
                         </p>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-green-400" />
                       <span className="text-sm text-text-secondary font-medium">
                         May 2024 - Ago 2024
                       </span>
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                     <p className="text-text-secondary text-sm leading-relaxed">
                       Entrenamiento intensivo en Microsoft Power Platform, obteniendo la certificación PL-900.
                     </p>
                                           <ul className="text-text-secondary text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-glacier rounded-full"></div>
                          Desarrollo de apps internas con PowerApps, automatización de flujos con Power Automate
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-glacier rounded-full"></div>
                          Dashboards con Power BI y trabajo colaborativo en GitHub y Azure DevOps
                        </li>
                      </ul>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
         </motion.div>
       </div>
     </section>
   )
} 