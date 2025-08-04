# Medidas de Seguridad del Formulario de Contacto

## Resumen

El formulario de contacto ha sido completamente sanitizado y protegido contra ataques comunes. Se implementaron múltiples capas de seguridad para garantizar la protección de datos y prevenir vulnerabilidades.

## Medidas Implementadas

### 1. Sanitización de Datos
- **DOMPurify**: Utilizamos DOMPurify para remover HTML malicioso y scripts
- **Configuración estricta**: No se permiten tags HTML ni atributos
- **Sanitización en tiempo real**: Los datos se sanitizan al momento de la entrada

### 2. Validación de Entrada
- **Validación de email**: Regex estricto para formato de email
- **Longitud de campos**: Límites mínimos y máximos para cada campo
- **Validación de patrones sospechosos**: Detección de scripts y código malicioso

### 3. Prevención de Ataques XSS
- **Sanitización de HTML**: Remoción completa de tags HTML
- **Escape de caracteres especiales**: Prevención de inyección de scripts
- **Validación de protocolos**: Solo se permiten protocolos seguros

### 4. Validación de Seguridad
- **Patrones sospechosos**: Detección de:
  - Tags `<script>`
  - Protocolos `javascript:`
  - Eventos `onclick`, `onload`, etc.
  - URLs `data:text/html`
  - Tags `<iframe>`, `<object>`, `<embed>`

### 5. Manejo de Estado
- **Prevención de envíos múltiples**: Botón deshabilitado durante el envío
- **Feedback visual**: Indicadores de carga y estado
- **Limpieza de formulario**: Reset automático después del envío exitoso

### 6. Normalización de Datos
- **Nombre**: Remoción de caracteres especiales, normalización de espacios
- **Email**: Conversión a minúsculas, trim de espacios
- **Mensaje**: Sanitización completa de contenido

## Estructura de Archivos

```
utils/
  security.ts          # Funciones de seguridad y sanitización
components/
  Contact.tsx          # Componente del formulario sanitizado
app/contexts/
  LanguageContext.tsx  # Traducciones para mensajes de validación
```

## Funciones de Seguridad

### `sanitizeText(text: string)`
Sanitiza texto removiendo HTML y scripts maliciosos.

### `validateEmail(email: string)`
Valida el formato de email usando regex estricto.

### `validateTextLength(text: string, min: number, max: number)`
Valida que el texto esté dentro de los límites especificados.

### `validateNoSuspiciousPatterns(text: string)`
Detecta patrones sospechosos en el texto.

### `sanitizeFormData(data: Record<string, string>)`
Sanitiza y normaliza todos los datos del formulario.

### `validateFormSecurity(data: Record<string, string>)`
Valida que todos los datos cumplan con las reglas de seguridad.

## Validaciones Implementadas

### Campo Nombre
- **Requerido**: Sí
- **Longitud mínima**: 2 caracteres
- **Longitud máxima**: 50 caracteres
- **Caracteres permitidos**: Letras, números, espacios, guiones

### Campo Email
- **Requerido**: Sí
- **Formato**: Debe ser un email válido
- **Normalización**: Conversión a minúsculas

### Campo Mensaje
- **Requerido**: Sí
- **Longitud mínima**: 10 caracteres
- **Longitud máxima**: 1000 caracteres
- **Sanitización**: Remoción completa de HTML

## Mensajes de Error

Todos los mensajes de error están internacionalizados y disponibles en español e inglés:

- `contact.validation.nameRequired`
- `contact.validation.nameMinLength`
- `contact.validation.nameMaxLength`
- `contact.validation.emailRequired`
- `contact.validation.emailInvalid`
- `contact.validation.messageRequired`
- `contact.validation.messageMinLength`
- `contact.validation.messageMaxLength`
- `contact.validation.securityError`

## Integración con Backend

Para integrar con tu backend, reemplaza la simulación en `handleSubmit`:

```typescript
// Ejemplo de integración con API
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(sanitizedData)
})

if (!response.ok) {
  throw new Error('Error en el servidor')
}
```

## Recomendaciones Adicionales

1. **Rate Limiting**: Implementa límites de envío por IP
2. **CAPTCHA**: Considera agregar reCAPTCHA para bots
3. **Logging**: Registra intentos de envío para auditoría
4. **HTTPS**: Asegúrate de que el sitio use HTTPS
5. **Headers de Seguridad**: Implementa CSP, X-Frame-Options, etc.

## Testing

Para probar las medidas de seguridad, puedes intentar:

```javascript
// Estos inputs deberían ser rechazados:
"<script>alert('xss')</script>"
"javascript:alert('xss')"
"<img src=x onerror=alert('xss')>"
"data:text/html,<script>alert('xss')</script>"
```

Todos estos intentos serán detectados y bloqueados por las validaciones implementadas. 