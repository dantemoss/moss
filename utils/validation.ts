import { z } from 'zod'

// Esquema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/, 'El nombre solo puede contener letras, espacios y guiones'),
  
  email: z
    .string()
    .email('Por favor, ingresa un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
    .regex(/^[^<>]*$/, 'El mensaje no puede contener caracteres HTML')
})

// Tipo TypeScript derivado del esquema
export type ContactFormData = z.infer<typeof contactFormSchema>

// Función para validar que no contenga patrones sospechosos
export const validateNoSuspiciousPatterns = (text: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ]
  
  return !suspiciousPatterns.some(pattern => pattern.test(text))
}

// Esquema extendido con validación de seguridad
export const secureContactFormSchema = contactFormSchema.refine(
  (data) => {
    return validateNoSuspiciousPatterns(data.name) &&
           validateNoSuspiciousPatterns(data.email) &&
           validateNoSuspiciousPatterns(data.message)
  },
  {
    message: 'El formulario contiene contenido no permitido',
    path: ['message'] // Mostrar el error en el campo mensaje
  }
) 