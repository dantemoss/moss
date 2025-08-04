import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { securityConfig } from '../../../security.config'

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada')
      return NextResponse.json(
        { error: 'Configuración de email no disponible' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    console.log('Datos recibidos:', { name, email, message: message?.substring(0, 50) + '...' })

    // Validaciones básicas
    if (!name || !email || !message) {
      console.error('Campos faltantes:', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validaciones de longitud
    if (name.length > securityConfig.validation.maxNameLength) {
      return NextResponse.json(
        { error: `El nombre no puede exceder ${securityConfig.validation.maxNameLength} caracteres` },
        { status: 400 }
      )
    }

    if (email.length > securityConfig.validation.maxEmailLength) {
      return NextResponse.json(
        { error: `El email no puede exceder ${securityConfig.validation.maxEmailLength} caracteres` },
        { status: 400 }
      )
    }

    if (message.length > securityConfig.validation.maxMessageLength) {
      return NextResponse.json(
        { error: `El mensaje no puede exceder ${securityConfig.validation.maxMessageLength} caracteres` },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('Email inválido:', email)
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Validar palabras bloqueadas
    const lowerMessage = message.toLowerCase()
    const blockedWord = securityConfig.validation.blockedWords.find(word => 
      lowerMessage.includes(word.toLowerCase())
    )
    if (blockedWord) {
      console.error('Mensaje contiene palabra bloqueada:', blockedWord)
      return NextResponse.json(
        { error: 'El mensaje contiene contenido no permitido' },
        { status: 400 }
      )
    }

    // Validar patrones sospechosos
    const suspiciousPattern = securityConfig.antispam.suspiciousPatterns.find(pattern => 
      pattern.test(message)
    )
    if (suspiciousPattern) {
      console.error('Mensaje contiene patrón sospechoso:', suspiciousPattern.source)
      return NextResponse.json(
        { error: 'El mensaje contiene contenido sospechoso' },
        { status: 400 }
      )
    }

    // Configurar el email principal
    const mainEmailData = {
      from: 'Portfolio <onboarding@resend.dev>', // Cambiar por tu dominio verificado
      to: ['dantemoss6@gmail.com'], // Email verificado en Resend
      subject: `Nuevo mensaje de contacto desde tu portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366f1; margin-top: 0;">Información del Remitente:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', {
              timeZone: 'America/Guayaquil',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
            <p><strong>IP del remitente:</strong> ${request.headers.get('x-forwarded-for') || request.ip || 'No disponible'}</p>
            <p><strong>User Agent:</strong> ${request.headers.get('user-agent') || 'No disponible'}</p>
          </div>
        </div>
      `,
      text: `
        Nuevo Mensaje de Contacto
        
        Información del Remitente:
        - Nombre: ${name}
        - Email: ${email}
        - Fecha: ${new Date().toLocaleString('es-ES', {
          timeZone: 'America/Guayaquil',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
        
        Mensaje:
        ${message}
        
        ---
        IP: ${request.headers.get('x-forwarded-for') || request.ip || 'No disponible'}
        User Agent: ${request.headers.get('user-agent') || 'No disponible'}
      `
    }

    console.log('Enviando email principal a:', 'dantemoss6@gmail.com')
    
    // Enviar el email principal
    const mainEmailResult = await resend.emails.send(mainEmailData)
    console.log('Email principal enviado:', mainEmailResult)

    console.log('Enviando email de confirmación a:', email)
    
    // Email de confirmación al remitente (opcional)
    const confirmationEmailData = {
      from: 'Portfolio <onboarding@resend.dev>', // Cambiar por tu dominio verificado
      to: [email],
      subject: 'Mensaje recibido - Portfolio de Dante Moscoso',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Mensaje Recibido
          </h2>
          
          <p>Hola <strong>${name}</strong>,</p>
          
          <p>Gracias por contactarme a través de mi portfolio. He recibido tu mensaje y te responderé lo antes posible.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Resumen de tu mensaje:</strong></p>
            <p style="font-style: italic; color: #6b7280;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
          </div>
          
          <p>Mientras tanto, puedes revisar mi trabajo en:</p>
          <ul>
            <li><a href="https://github.com/tu-usuario" style="color: #6366f1;">GitHub</a></li>
            <li><a href="https://linkedin.com/in/dante-moscoso-aa146825a/" style="color: #6366f1;">LinkedIn</a></li>
          </ul>
          
          <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
            Saludos,<br>
            <strong>Dante Moscoso</strong><br>
            Desarrollador Full Stack
          </p>
        </div>
      `
    }

    // Enviar email de confirmación
    const confirmationEmailResult = await resend.emails.send(confirmationEmailData)
    console.log('Email de confirmación enviado:', confirmationEmailResult)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error al enviar email:', error)
    
    // Log más detallado del error
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor. Por favor, intenta nuevamente.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Error desconocido') : undefined
      },
      { status: 500 }
    )
  }
} 