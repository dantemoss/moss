'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { useLanguage } from '../app/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200 resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent-lavender hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send size={16} />
                {t('contact.form.send')}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-display font-semibold mb-6">
                {t('contact.info.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {t('contact.info.description')}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:dante@example.com"
                className="flex items-center gap-3 p-4 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-lavender data-[theme=light]:hover:border-accent-glacier transition-colors duration-200 group"
              >
                <Mail size={20} className="text-accent-lavender group-hover:text-purple-400 transition-colors duration-200" />
                <div>
                  <div className="font-medium">{t('contact.info.email')}</div>
                  <div className="text-sm text-text-secondary">dante@example.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/dantemoscoso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-lavender transition-colors duration-200 group"
              >
                <MessageSquare size={20} className="text-accent-lavender group-hover:text-purple-400 transition-colors duration-200" />
                <div>
                  <div className="font-medium">{t('contact.info.linkedin')}</div>
                  <div className="text-sm text-text-secondary">{t('contact.info.connect')}</div>
                </div>
              </a>
            </div>

            <div className="p-6 bg-background-secondary border border-border-primary rounded-xl">
              <h4 className="font-display font-semibold mb-3">{t('contact.services.title')}</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>{t('contact.services.webdev')}</li>
                <li>{t('contact.services.ai')}</li>
                <li>{t('contact.services.api')}</li>
                <li>{t('contact.services.uiux')}</li>
                <li>{t('contact.services.consulting')}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 