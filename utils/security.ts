import DOMPurify from 'dompurify'

/**
 * Sanitiza texto removiendo HTML y scripts maliciosos
 * @param text - Texto a sanitizar
 * @returns Texto sanitizado
 */
export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false
  })
}

/**
 * Valida formato de email
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida longitud de texto
 * @param text - Texto a validar
 * @param minLength - Longitud mínima
 * @param maxLength - Longitud máxima
 * @returns true si la longitud es válida
 */
export const validateTextLength = (text: string, minLength: number, maxLength: number): boolean => {
  const trimmedText = text.trim()
  return trimmedText.length >= minLength && trimmedText.length <= maxLength
}

/**
 * Remueve caracteres especiales y normaliza texto
 * @param text - Texto a normalizar
 * @returns Texto normalizado
 */
export const normalizeText = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Reemplaza múltiples espacios con uno solo
    .replace(/[^\w\s@.-]/g, '') // Solo permite letras, números, espacios, @, . y -
}

/**
 * Valida que el texto no contenga patrones sospechosos
 * @param text - Texto a validar
 * @returns true si no contiene patrones sospechosos
 */
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

/**
 * Función completa de validación y sanitización para formularios
 * @param data - Datos del formulario
 * @returns Datos sanitizados y validados
 */
export const sanitizeFormData = (data: Record<string, string>) => {
  const sanitized: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(data)) {
    // Sanitizar el valor
    let sanitizedValue = sanitizeText(value)
    
    // Normalizar según el tipo de campo
    if (key === 'name') {
      sanitizedValue = normalizeText(sanitizedValue)
    } else if (key === 'email') {
      sanitizedValue = sanitizedValue.toLowerCase().trim()
    }
    
    sanitized[key] = sanitizedValue
  }
  
  return sanitized
}

/**
 * Valida que los datos del formulario cumplan con las reglas de seguridad
 * @param data - Datos del formulario
 * @returns true si todos los datos son seguros
 */
export const validateFormSecurity = (data: Record<string, string>): boolean => {
  for (const value of Object.values(data)) {
    if (!validateNoSuspiciousPatterns(value)) {
      return false
    }
  }
  return true
} 