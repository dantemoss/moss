import React from 'react'

// Utilidades para protección antispam y antibots

interface SpamProtectionConfig {
  maxClicksPerMinute: number
  maxFormSubmissionsPerHour: number
  honeypotFieldName: string
  timestampFieldName: string
}

const DEFAULT_CONFIG: SpamProtectionConfig = {
  maxClicksPerMinute: 10,
  maxFormSubmissionsPerHour: 5,
  honeypotFieldName: 'website',
  timestampFieldName: 'timestamp'
}

export class SpamProtection {
  private config: SpamProtectionConfig

  constructor(config: Partial<SpamProtectionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  // Verificar si el usuario está haciendo demasiados clicks
  isClickSpam(): boolean {
    const now = Date.now()
    const clicks = this.getStoredClicks()
    
    // Limpiar clicks antiguos (más de 1 minuto)
    const recentClicks = clicks.filter(timestamp => now - timestamp < 60000)
    
    // Guardar clicks recientes
    localStorage.setItem('emailClicks', JSON.stringify(recentClicks))
    
    // Verificar límite
    if (recentClicks.length >= this.config.maxClicksPerMinute) {
      return true
    }
    
    // Agregar click actual
    recentClicks.push(now)
    localStorage.setItem('emailClicks', JSON.stringify(recentClicks))
    
    return false
  }

  // Verificar si el usuario está enviando demasiados formularios
  isFormSpam(): boolean {
    const now = Date.now()
    const submissions = this.getStoredFormSubmissions()
    
    // Limpiar envíos antiguos (más de 1 hora)
    const recentSubmissions = submissions.filter(timestamp => now - timestamp < 3600000)
    
    // Guardar envíos recientes
    localStorage.setItem('formSubmissions', JSON.stringify(recentSubmissions))
    
    // Verificar límite
    if (recentSubmissions.length >= this.config.maxFormSubmissionsPerHour) {
      return true
    }
    
    // Agregar envío actual
    recentSubmissions.push(now)
    localStorage.setItem('formSubmissions', JSON.stringify(recentSubmissions))
    
    return false
  }

  // Detectar bots basado en comportamiento
  isBot(): boolean {
    // Verificar si JavaScript está habilitado (bots simples no lo tienen)
    if (typeof window === 'undefined') return true
    
    // Verificar si el usuario puede interactuar con el mouse
    const hasMouseInteraction = localStorage.getItem('mouseInteraction')
    if (!hasMouseInteraction) {
      // Marcar que el usuario ha interactuado con el mouse
      document.addEventListener('mousemove', () => {
        localStorage.setItem('mouseInteraction', 'true')
      }, { once: true })
    }
    
    // Verificar tiempo de carga de la página (bots cargan muy rápido)
    const pageLoadTime = performance.now()
    if (pageLoadTime < 100) return true
    
    // Verificar si el usuario tiene cookies habilitadas
    if (!navigator.cookieEnabled) return true
    
    return false
  }

  // Generar token de seguridad
  generateSecurityToken(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2)
    const userAgent = navigator.userAgent
    const token = btoa(`${timestamp}-${random}-${userAgent}`)
    return token
  }

  // Verificar token de seguridad
  verifySecurityToken(token: string): boolean {
    try {
      const decoded = atob(token)
      const [timestamp, random, userAgent] = decoded.split('-')
      
      // Verificar que el token no sea muy antiguo (máximo 1 hora)
      const now = Date.now()
      if (now - parseInt(timestamp) > 3600000) return false
      
      // Verificar que el user agent coincida
      if (userAgent !== navigator.userAgent) return false
      
      return true
    } catch {
      return false
    }
  }

  // Crear campo honeypot para el formulario
  createHoneypotField(): JSX.Element {
    return (
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
        <input
          type="text"
          name={this.config.honeypotFieldName}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
    )
  }

  // Verificar si el campo honeypot fue llenado (indica bot)
  isHoneypotFilled(formData: FormData): boolean {
    const honeypotValue = formData.get(this.config.honeypotFieldName)
    return honeypotValue !== null && honeypotValue !== ''
  }

  // Obtener clicks almacenados
  private getStoredClicks(): number[] {
    try {
      const stored = localStorage.getItem('emailClicks')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Obtener envíos de formulario almacenados
  private getStoredFormSubmissions(): number[] {
    try {
      const stored = localStorage.getItem('formSubmissions')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }
}

// Instancia global para usar en toda la aplicación
export const spamProtection = new SpamProtection()

// Función helper para verificar si el email es válido y no es spam
export const validateEmailForSpam = (email: string): boolean => {
  // Verificar formato básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false
  
  // Verificar dominios sospechosos
  const suspiciousDomains = [
    '10minutemail.com',
    'guerrillamail.com',
    'tempmail.org',
    'mailinator.com',
    'throwaway.email'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  if (suspiciousDomains.some(suspicious => domain?.includes(suspicious))) {
    return false
  }
  
  return true
}

// Función helper para sanitizar y validar mensajes
export const validateMessageForSpam = (message: string): boolean => {
  // Verificar longitud mínima y máxima
  if (message.length < 10 || message.length > 1000) return false
  
  // Verificar patrones sospechosos
  const suspiciousPatterns = [
    /buy\s+now/i,
    /click\s+here/i,
    /free\s+offer/i,
    /make\s+money/i,
    /viagra/i,
    /casino/i,
    /loan/i,
    /credit/i
  ]
  
  if (suspiciousPatterns.some(pattern => pattern.test(message))) {
    return false
  }
  
  // Verificar si hay demasiados enlaces
  const linkCount = (message.match(/https?:\/\/[^\s]+/g) || []).length
  if (linkCount > 3) return false
  
  return true
} 