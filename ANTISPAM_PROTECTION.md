# Protección Antispam y Antibots

Este documento describe las medidas de protección implementadas para prevenir spam y ataques de bots en el formulario de contacto y enlaces de email.

## Características Implementadas

### 1. Protección del Email (dantemoss6@gmail.com)

#### Enlace Mailto Mejorado
- **URL codificada**: El enlace mailto incluye subject y body predefinidos
- **Protección de clicks**: Limita el número de clicks por minuto
- **Detección de bots**: Verifica comportamiento sospechoso antes de abrir el email

#### Medidas de Seguridad
```typescript
// Límite de clicks por minuto
maxClicksPerMinute: 10

// Verificación de comportamiento humano
- Interacción con mouse
- Tiempo de carga de página
- Cookies habilitadas
- JavaScript habilitado
```

### 2. Protección del Formulario de Contacto

#### Validaciones Antispam
- **Email**: Verifica dominios sospechosos (10minutemail.com, guerrillamail.com, etc.)
- **Mensaje**: Detecta patrones de spam y enlaces excesivos
- **Frecuencia**: Limita envíos por hora (máximo 5 por hora)

#### Campo Honeypot
- Campo invisible que solo los bots llenan
- Posicionado fuera de la pantalla
- Sin tabindex para usuarios reales

#### Detección de Bots
```typescript
// Verificaciones implementadas
- JavaScript habilitado
- Interacción con mouse
- Tiempo de carga de página
- Cookies habilitadas
- User Agent válido
```

### 3. Sistema de Tokens de Seguridad

#### Generación de Tokens
- Timestamp + random string + user agent
- Codificación en base64
- Expiración automática (1 hora)

#### Verificación
- Validez del timestamp
- Coincidencia del user agent
- Integridad del token

## Archivos de Implementación

### `utils/antispam.ts`
Contiene todas las utilidades de protección:
- Clase `SpamProtection`
- Funciones de validación
- Detección de bots
- Gestión de tokens

### `components/Contact.tsx`
Integra las protecciones en:
- Enlace de email
- Formulario de contacto
- Validaciones en tiempo real

## Configuración

### Límites Configurables
```typescript
const DEFAULT_CONFIG = {
  maxClicksPerMinute: 10,      // Clicks en email
  maxFormSubmissionsPerHour: 5, // Envíos de formulario
  honeypotFieldName: 'website', // Nombre del campo honeypot
  timestampFieldName: 'timestamp'
}
```

### Dominios Sospechosos
```typescript
const suspiciousDomains = [
  '10minutemail.com',
  'guerrillamail.com',
  'tempmail.org',
  'mailinator.com',
  'throwaway.email'
]
```

### Patrones de Spam
```typescript
const suspiciousPatterns = [
  /buy\s+now/i,
  /click\s+here/i,
  /free\s+offer/i,
  /make\s+money/i,
  /viagra/i,
  /casino/i,
  /loan/i,
  /credit/i
]
```

## Beneficios

### Para el Usuario
- **Experiencia fluida**: Las protecciones son transparentes para usuarios legítimos
- **Feedback claro**: Mensajes de error específicos cuando se detecta spam
- **Seguridad**: Protección contra ataques automatizados

### Para el Desarrollador
- **Fácil mantenimiento**: Sistema modular y configurable
- **Escalabilidad**: Fácil agregar nuevas protecciones
- **Debugging**: Logs detallados para monitoreo

### Para el Negocio
- **Reducción de spam**: Filtrado automático de contenido no deseado
- **Protección de recursos**: Evita sobrecarga del servidor
- **Reputación**: Mantiene la calidad de las comunicaciones

## Monitoreo y Logs

### Eventos Registrados
- Clicks en email con timestamp
- Envíos de formulario
- Intentos de spam bloqueados
- Detección de bots

### Almacenamiento
- LocalStorage para persistencia temporal
- Limpieza automática de datos antiguos
- Sin datos personales almacenados

## Recomendaciones Adicionales

### Servidor
- Implementar rate limiting en el backend
- Validación adicional de emails
- Logs de seguridad
- CAPTCHA para casos extremos

### Monitoreo
- Alertas por actividad sospechosa
- Métricas de spam vs. tráfico legítimo
- Análisis de patrones de ataque

### Actualizaciones
- Mantener lista de dominios sospechosos
- Actualizar patrones de spam
- Revisar límites de frecuencia

## Consideraciones de Privacidad

- **Sin tracking**: No se almacenan datos personales
- **Temporal**: Los datos se limpian automáticamente
- **Transparente**: Los usuarios pueden ver qué se verifica
- **Minimalista**: Solo se recopila lo necesario para la protección 