#!/usr/bin/env node

/**
 * Script de análisis de rendimiento
 * Ejecutar con: node scripts/performance-audit.js
 */

const fs = require('fs')
const path = require('path')

const performanceChecks = {
  // Verificar configuración de Next.js
  nextConfig: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    const optimizations = [
      'compress: true',
      'poweredByHeader: false',
      'optimizeCss: true',
      'optimizePackageImports'
    ]
    
    const missing = optimizations.filter(opt => !nextConfig.includes(opt))
    if (missing.length > 0) {
      console.error('❌ Optimizaciones de Next.js faltantes:', missing)
      return false
    }
    console.log('✅ Configuración de Next.js optimizada')
    return true
  },

  // Verificar configuración de imágenes
  imageOptimization: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    const imageOpts = [
      'formats:',
      'minimumCacheTTL:',
      'dangerouslyAllowSVG: false'
    ]
    
    const missing = imageOpts.filter(opt => !nextConfig.includes(opt))
    if (missing.length > 0) {
      console.error('❌ Optimizaciones de imágenes faltantes:', missing)
      return false
    }
    console.log('✅ Optimizaciones de imágenes configuradas')
    return true
  },

  // Verificar bundle splitting
  bundleSplitting: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    const splitting = [
      'splitChunks',
      'cacheGroups',
      'vendors'
    ]
    
    const missing = splitting.filter(opt => !nextConfig.includes(opt))
    if (missing.length > 0) {
      console.error('❌ Bundle splitting faltante:', missing)
      return false
    }
    console.log('✅ Bundle splitting configurado')
    return true
  },

  // Verificar lazy loading
  lazyLoading: () => {
    // Verificar que existe al menos un componente con lazy loading
    const components = [
      'components/Projects.tsx',
      'components/TechStackPlayground.tsx',
      'components/Contact.tsx'
    ]
    
    const hasLazyLoading = components.some(comp => {
      if (!fs.existsSync(comp)) return false
      const content = fs.readFileSync(comp, 'utf8')
      return content.includes('lazy') || content.includes('dynamic') || content.includes('IntersectionObserver')
    })
    
    if (!hasLazyLoading) {
      console.error('❌ Lazy loading no implementado en componentes principales')
      return false
    }
    console.log('✅ Lazy loading implementado')
    return true
  },

  // Verificar compresión
  compression: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    if (!nextConfig.includes('compress: true')) {
      console.error('❌ Compresión no habilitada')
      return false
    }
    console.log('✅ Compresión habilitada')
    return true
  },

  // Verificar cache headers
  cacheHeaders: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    const cacheHeaders = [
      'Cache-Control',
      'max-age'
    ]
    
    const missing = cacheHeaders.filter(header => !nextConfig.includes(header))
    if (missing.length > 0) {
      console.error('❌ Headers de cache faltantes:', missing)
      return false
    }
    console.log('✅ Headers de cache configurados')
    return true
  },

  // Verificar tree shaking
  treeShaking: () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    if (packageJson.sideEffects === undefined) {
      console.error('❌ Tree shaking no configurado en package.json')
      return false
    }
    console.log('✅ Tree shaking configurado')
    return true
  },

  // Verificar dependencias optimizadas
  optimizedDependencies: () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const optimizedDeps = [
      'framer-motion',
      'lucide-react',
      'react-icons'
    ]
    
    const missing = optimizedDeps.filter(dep => !packageJson.dependencies[dep])
    if (missing.length > 0) {
      console.error('❌ Dependencias optimizadas faltantes:', missing)
      return false
    }
    console.log('✅ Dependencias optimizadas instaladas')
    return true
  }
}

// Ejecutar análisis
console.log('⚡ Iniciando análisis de rendimiento...\n')

const results = Object.entries(performanceChecks).map(([name, check]) => {
  try {
    return { name, passed: check() }
  } catch (error) {
    console.error(`❌ Error en ${name}:`, error.message)
    return { name, passed: false }
  }
})

const passed = results.filter(r => r.passed).length
const total = results.length

console.log('\n📊 Resumen del análisis:')
console.log(`✅ Pasaron: ${passed}/${total}`)
console.log(`❌ Fallaron: ${total - passed}/${total}`)

if (passed === total) {
  console.log('\n🎉 ¡Análisis de rendimiento exitoso! Tu aplicación está optimizada.')
  process.exit(0)
} else {
  console.log('\n⚠️  Se encontraron problemas de rendimiento. Considera optimizarlos.')
  process.exit(1)
} 