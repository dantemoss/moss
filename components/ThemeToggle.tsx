'use client'

import { motion } from 'framer-motion'
import { Sun, Moon, Languages } from 'lucide-react'
import { useTheme } from '@/app/contexts/ThemeContext'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
             {/* Language Toggle */}
       <motion.button
         onClick={toggleLanguage}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="p-3 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-glacier/50 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
         title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
       >
         <Languages size={20} className="text-text-primary" />
       </motion.button>

             {/* Theme Toggle */}
       <motion.button
         onClick={toggleTheme}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="p-3 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-glacier/50 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
         title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
       >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-text-primary" />
          ) : (
            <Moon size={20} className="text-text-primary" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
} 