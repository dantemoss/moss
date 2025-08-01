'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-background-secondary border border-border-primary rounded-2xl px-4 py-2 mb-8"
          >
                         <Sparkles size={16} className="text-accent-glacier" />
            <span className="text-text-secondary text-sm">{t('hero.available')}</span>
          </motion.div>
        </motion.div>

                  <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
          >
            {t('hero.greeting')}{' '}
            <span className="gradient-text">Dante</span>
            <br />
            {t('hero.title')}
            <br />
            {t('hero.subtitle')}
          </motion.h1>

                  <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
          >
                         {t('hero.description')}
          </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
                     <a
             href="#projects"
             className="inline-flex items-center gap-2 bg-accent-glacier hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg data-[theme=dark]:bg-accent-lavender data-[theme=dark]:hover:bg-accent-glacier"           >
            {t('hero.viewProjects')}
            <ArrowRight size={16} />
          </a>
          
                     <a
             href="#contact"
             className="inline-flex items-center gap-2 border border-border-primary hover:border-accent-glacier text-text-primary hover:text-accent-glacier font-medium px-6 py-3 rounded-2xl transition-all duration-200"
           >
            {t('hero.contact')}
          </a>
        </motion.div>
      </div>
    </section>
  )
} 