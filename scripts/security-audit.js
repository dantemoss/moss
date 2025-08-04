#!/usr/bin/env node

/**
 * Script de auditoría de seguridad
 * Ejecutar con: node scripts/security-audit.js
 */

const fs = require('fs')
const path = require('path')

const securityChecks = {
  // Verificar archivos de configuración
  configFiles: () => {
    const requiredFiles = [
      '.env.local',
      'next.config.js',
      'security.config.js',
      'middleware.ts'
    ]
    
    const missing = requiredFiles.filter(file => !fs.existsSync(file))
    if (missing.length > 0) {
      console.error('❌ Archivos de configuración faltantes:', missing)
      return false
    }
    console.log('✅ Archivos de configuración presentes')
    return true
  },

  // Verificar dependencias de seguridad
  dependencies: () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const securityDeps = ['dompurify', 'zod', 'react-hook-form']
    
    const missing = securityDeps.filter(dep => !packageJson.dependencies[dep])
    if (missing.length > 0) {
      console.error('❌ Dependencias de seguridad faltantes:', missing)
      return false
    }
    console.log('✅ Dependencias de seguridad instaladas')
    return true
  },

  // Verificar headers de seguridad
  securityHeaders: () => {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8')
    const requiredHeaders = [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy'
    ]
    
    const missing = requiredHeaders.filter(header => !nextConfig.includes(header))
    if (missing.length > 0) {
      console.error('❌ Headers de seguridad faltantes:', missing)
      return false
    }
    console.log('✅ Headers de seguridad configurados')
    return true
  },

  // Verificar validación de entrada
  inputValidation: () => {
    const contactRoute = fs.readFileSync('app/api/contact/route.ts', 'utf8')
    const validations = [
      'emailRegex',
      'securityConfig',
      'blockedWords',
      'suspiciousPatterns'
    ]
    
    const missing = validations.filter(validation => !contactRoute.includes(validation))
    if (missing.length > 0) {
      console.error('❌ Validaciones de entrada faltantes:', missing)
      return false
    }
    console.log('✅ Validaciones de entrada implementadas')
    return true
  },

  // Verificar protección antispam
  antispam: () => {
    const antispamFile = fs.readFileSync('utils/antispam.tsx', 'utf8')
    const protections = [
      'honeypot',
      'isClickSpam',
      'isBot',
      'SpamProtection'
    ]
    
    const missing = protections.filter(protection => !antispamFile.includes(protection))
    if (missing.length > 0) {
      console.error('❌ Protecciones antispam faltantes:', missing)
      return false
    }
    console.log('✅ Protecciones antispam implementadas')
    return true
  },

  // Verificar variables de entorno
  environmentVariables: () => {
    try {
      const envFile = fs.readFileSync('.env.local', 'utf8')
      const requiredVars = ['RESEND_API_KEY']
      
      const missing = requiredVars.filter(varName => !envFile.includes(varName))
      if (missing.length > 0) {
        console.error('❌ Variables de entorno faltantes:', missing)
        return false
      }
      console.log('✅ Variables de entorno configuradas')
      return true
    } catch (error) {
      console.error('❌ Error leyendo .env.local:', error.message)
      return false
    }
  },

  // Verificar archivos sensibles en .gitignore
  gitignore: () => {
    const gitignore = fs.readFileSync('.gitignore', 'utf8')
    const sensitiveFiles = [
      '.env*.local',
      'node_modules'
    ]
    
    const missing = sensitiveFiles.filter(file => !gitignore.includes(file))
    if (missing.length > 0) {
      console.error('❌ Archivos sensibles no ignorados:', missing)
      return false
    }
    console.log('✅ Archivos sensibles protegidos')
    return true
  }
}

// Ejecutar auditoría
console.log('🔒 Iniciando auditoría de seguridad...\n')

const results = Object.entries(securityChecks).map(([name, check]) => {
  try {
    return { name, passed: check() }
  } catch (error) {
    console.error(`❌ Error en ${name}:`, error.message)
    return { name, passed: false }
  }
})

const passed = results.filter(r => r.passed).length
const total = results.length

console.log('\n📊 Resumen de la auditoría:')
console.log(`✅ Pasaron: ${passed}/${total}`)
console.log(`❌ Fallaron: ${total - passed}/${total}`)

if (passed === total) {
  console.log('\n🎉 ¡Auditoría de seguridad exitosa! Tu aplicación cumple con los estándares de seguridad.')
  process.exit(0)
} else {
  console.log('\n⚠️  Se encontraron problemas de seguridad. Por favor, corrígelos antes de desplegar.')
  process.exit(1)
} 