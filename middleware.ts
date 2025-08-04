import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityConfig } from './security.config'

// Store para rate limiting (en producción usar Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Aplicar headers de seguridad
  Object.entries(securityConfig.securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting básico
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    const requestData = requestCounts.get(ip)
    if (!requestData || now > requestData.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + securityConfig.rateLimit.windowMs })
    } else {
      requestData.count++
      if (requestData.count > securityConfig.rateLimit.max) {
        return new NextResponse(
          JSON.stringify({ error: securityConfig.rateLimit.message }),
          { 
            status: 429, 
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }
  }

  // Validación de Content-Type para APIs
  if (request.nextUrl.pathname.startsWith('/api/') && request.method === 'POST') {
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return new NextResponse(
        JSON.stringify({ error: 'Content-Type debe ser application/json' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }

  // Bloquear rutas sensibles
  const blockedPaths = ['/api/test-email']
  if (blockedPaths.includes(request.nextUrl.pathname)) {
    return new NextResponse(
      JSON.stringify({ error: 'Ruta no disponible' }),
      { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 