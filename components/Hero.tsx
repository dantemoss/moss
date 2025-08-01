'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
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
            <Sparkles size={16} className="text-accent-lavender" />
            <span className="text-text-secondary text-sm">Disponible para oportunidades</span>
          </motion.div>
        </motion.div>

                  <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
          >
            Hola, soy{' '}
            <span className="gradient-text">Dante</span>
            <br />
            Desarrollador Full Stack
            <br />
            con enfoque en seguridad.
          </motion.h1>

                  <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
          >
                         Desarrollador Web Full Stack con orientación a la seguridad informática. 
             Experto en ReactJS, Next.js, TypeScript y Node.js. Actualmente trabajo en OSPADEP 
             desarrollando herramientas internas para el sector salud.
          </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-accent-lavender hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Ver Proyectos
            <ArrowRight size={16} />
          </a>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border-primary hover:border-accent-lavender text-text-primary hover:text-accent-lavender font-medium px-6 py-3 rounded-2xl transition-all duration-200"
          >
            Contactar
          </a>
        </motion.div>
      </div>
    </section>
  )
} 