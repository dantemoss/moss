/**
 * Configuración de seguridad centralizada
 * Este archivo contiene todas las configuraciones de seguridad para la aplicación
 */

export const securityConfig = {
  // Configuración de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas solicitudes desde esta IP, intenta nuevamente en 15 minutos',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Configuración de CORS
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://tu-dominio.com'] 
      : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  // Configuración de validación de entrada
  validation: {
    maxNameLength: 100,
    maxEmailLength: 254,
    maxMessageLength: 2000,
    allowedEmailDomains: [], // Array vacío permite todos los dominios
    blockedWords: [
      'spam', 'casino', 'viagra', 'lottery', 'winner',
      'click here', 'buy now', 'free money', 'make money fast'
    ],
  },

  // Configuración de sanitización
  sanitization: {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
    allowedAttributes: {
      'a': ['href', 'target', 'rel']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  },

  // Configuración de antispam
  antispam: {
    honeypotFieldName: 'website',
    maxSubmissionsPerHour: 5,
    maxSubmissionsPerDay: 20,
    suspiciousPatterns: [
      /buy\s+now/i,
      /click\s+here/i,
      /free\s+money/i,
      /make\s+money\s+fast/i,
      /viagra/i,
      /casino/i,
    ],
  },

  // Configuración de headers de seguridad
  securityHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },

  // Configuración de logging
  logging: {
    enabled: true,
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    logFailedRequests: true,
    logSuccessfulRequests: false,
  },

  // Configuración de cache
  cache: {
    staticAssets: {
      maxAge: 31536000, // 1 año
      immutable: true,
    },
    apiResponses: {
      maxAge: 0, // No cache para APIs
      noStore: true,
    },
  },
}

export default securityConfig 