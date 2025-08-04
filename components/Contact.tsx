'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react'
import { useLanguage } from '../app/contexts/LanguageContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  secureContactFormSchema, 
  type ContactFormData 
} from '../utils/validation'
import { sanitizeFormData } from '../utils/security'
import { FormField } from './FormField'
import { spamProtection, validateEmailForSpam, validateMessageForSpam } from '../utils/antispam'

export default function Contact() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(secureContactFormSchema),
    mode: 'onChange'
  })

  const isFormValid = isValid && isDirty



  // Función para manejar el envío del formulario
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Verificaciones antispam y antibots
      if (spamProtection.isBot()) {
        throw new Error('Acceso denegado: comportamiento sospechoso detectado')
      }

      if (spamProtection.isFormSpam()) {
        throw new Error('Demasiados envíos. Por favor, espera antes de enviar otro mensaje.')
      }

      // Validaciones adicionales antispam
      if (!validateEmailForSpam(data.email)) {
        throw new Error('Email no válido o sospechoso')
      }

      if (!validateMessageForSpam(data.message)) {
        throw new Error('El mensaje contiene contenido no permitido')
      }

      // Sanitizar datos antes del envío
      const sanitizedData = sanitizeFormData(data)
      
      // Enviar datos a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje')
      }

      setSubmitStatus('success')
      reset() // Resetear el formulario
      
      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
               {/* Campo honeypot para protección antibots */}
               {spamProtection.createHoneypotField()}
               
               {/* Mensajes de estado */}
               {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                  <CheckCircle size={20} />
                  <span>{t('contact.success')}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle size={20} />
                  <span>{t('contact.error')}</span>
                </div>
              )}



              <FormField 
                label={t('contact.form.name')} 
                error={errors.name}
                required
              >
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-background-secondary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none transition-colors duration-200 ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-border-primary focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier'
                  }`}
                  placeholder={t('contact.form.namePlaceholder')}
                  disabled={isSubmitting}
                />
              </FormField>

              <FormField 
                label={t('contact.form.email')} 
                error={errors.email}
                required
              >
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-background-secondary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none transition-colors duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-border-primary focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                  disabled={isSubmitting}
                />
              </FormField>

              <FormField 
                label={t('contact.form.message')} 
                error={errors.message}
                required
              >
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 bg-background-secondary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none resize-none transition-colors duration-200 ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-border-primary focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier'
                  }`}
                  placeholder={t('contact.form.messagePlaceholder')}
                  disabled={isSubmitting}
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`w-full inline-flex items-center justify-center gap-2 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                  isFormValid && !isSubmitting
                    ? 'bg-accent-lavender hover:bg-purple-500 text-white hover:shadow-lg'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {isFormValid ? t('contact.form.send') : 'Completa el formulario'}
                  </>
                )}
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
                 href="mailto:dantemoss6@gmail.com?subject=Consulta%20desde%20Portfolio&body=Hola%20Dante,%0A%0AMe%20gustaría%20contactarte%20para%20discutir%20una%20oportunidad%20de%20colaboración.%0A%0ASaludos,%0A[Tu%20nombre]"
                 className="flex items-center gap-3 p-4 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-lavender data-[theme=light]:hover:border-accent-glacier transition-colors duration-200 group"
                 onClick={(e) => {
                   // Protección antispam mejorada
                   if (spamProtection.isClickSpam()) {
                     e.preventDefault()
                     alert('Demasiados clicks. Por favor, espera un momento.')
                     return false
                   }
                   
                   if (spamProtection.isBot()) {
                     e.preventDefault()
                     return false
                   }
                 }}
               >
                 <Mail size={20} className="text-accent-lavender group-hover:text-purple-400 transition-colors duration-200" />
                 <div>
                   <div className="font-medium">{t('contact.info.email')}</div>
                   <div className="text-sm text-text-secondary">dantemoss6@gmail.com</div>
                 </div>
               </a>

              <a
                href="https://www.linkedin.com/in/dante-moscoso-aa146825a/"
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