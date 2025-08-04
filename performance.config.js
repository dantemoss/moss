/**
 * Configuración de rendimiento centralizada
 * Este archivo contiene todas las optimizaciones de rendimiento para la aplicación
 */

export const performanceConfig = {
  // Configuración de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    quality: 85,
    placeholder: 'blur',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  },

  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
    delay: 100,
  },

  // Configuración de preload
  preload: {
    critical: [
      '/fonts/inter-var.woff2',
      '/api/contact',
    ],
    fonts: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ],
  },

  // Configuración de cache
  cache: {
    static: {
      maxAge: 31536000, // 1 año
      immutable: true,
    },
    dynamic: {
      maxAge: 3600, // 1 hora
      staleWhileRevalidate: 86400, // 24 horas
    },
    api: {
      maxAge: 0,
      noStore: true,
    },
  },

  // Configuración de compresión
  compression: {
    enabled: true,
    level: 6,
    threshold: 1024,
  },

  // Configuración de bundle splitting
  bundleSplitting: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      priority: 10,
    },
    common: {
      name: 'common',
      minChunks: 2,
      chunks: 'all',
      priority: 5,
    },
  },

  // Configuración de tree shaking
  treeShaking: {
    enabled: true,
    sideEffects: false,
  },

  // Configuración de minificación
  minification: {
    enabled: true,
    removeComments: true,
    removeConsole: process.env.NODE_ENV === 'production',
    removeDebugger: process.env.NODE_ENV === 'production',
  },

  // Configuración de análisis de rendimiento
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    webVitals: true,
    coreWebVitals: true,
  },

  // Configuración de PWA
  pwa: {
    enabled: false, // Habilitar cuando tengas un service worker
    name: 'Portfolio de Dante Moscoso',
    shortName: 'Portfolio',
    description: 'Portfolio personal de Dante Moscoso - Desarrollador Full Stack',
    themeColor: '#6366f1',
    backgroundColor: '#ffffff',
    display: 'standalone',
    startUrl: '/',
    scope: '/',
  },
}

export default performanceConfig 