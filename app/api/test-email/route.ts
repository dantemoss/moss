import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    console.log('API Key configurada:', !!process.env.RESEND_API_KEY)
    console.log('API Key (primeros 10 caracteres):', process.env.RESEND_API_KEY?.substring(0, 10) + '...')

    const testEmailData = {
      from: 'onboarding@resend.dev',
      to: ['dantemoss6@gmail.com'], // Email verificado en Resend
      subject: 'Prueba de Resend - Portfolio',
      html: '<p>Este es un email de prueba para verificar que Resend funciona correctamente.</p>',
      text: 'Este es un email de prueba para verificar que Resend funciona correctamente.'
    }

    console.log('Enviando email de prueba...')
    const result = await resend.emails.send(testEmailData)
    console.log('Resultado del envío:', result)

    return NextResponse.json({
      success: true,
      message: 'Email de prueba enviado correctamente',
      result
    })

  } catch (error) {
    console.error('Error en prueba de email:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      apiKeyConfigured: !!process.env.RESEND_API_KEY
    }, { status: 500 })
  }
} 