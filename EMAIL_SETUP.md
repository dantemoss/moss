# Configuración del Sistema de Email

Este documento explica cómo configurar el sistema de envío de emails para el formulario de contacto.

## 📧 Configuración de Gmail

### 1. Habilitar Verificación en Dos Pasos

1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Navega a **Seguridad**
3. Activa **Verificación en dos pasos** si no está activada

### 2. Generar Contraseña de Aplicación

1. En la sección **Seguridad**, busca **Contraseñas de aplicación**
2. Selecciona **Otra (nombre personalizado)**
3. Escribe "Portfolio" como nombre
4. Copia la contraseña generada (16 caracteres)

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
EMAIL_USER=dantemoss6@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_aqui
```

**⚠️ IMPORTANTE:**
- Usa la contraseña de aplicación, NO tu contraseña normal de Gmail
- Nunca subas el archivo `.env.local` a Git
- El archivo `.env.local` ya está en `.gitignore`

## 🔧 Funcionalidades Implementadas

### Email Principal (Para ti)
- **Destinatario**: `dantemoss6@gmail.com`
- **Asunto**: "Nuevo mensaje de contacto desde tu portfolio - [Nombre]"
- **Contenido**: 
  - Información del remitente
  - Mensaje completo
  - Fecha y hora
  - IP y User Agent del remitente

### Email de Confirmación (Para el remitente)
- **Destinatario**: Email del remitente
- **Asunto**: "Mensaje recibido - Portfolio de Dante Moscoso"
- **Contenido**:
  - Confirmación de recepción
  - Resumen del mensaje
  - Enlaces a GitHub y LinkedIn

## 🛡️ Seguridad Implementada

### Validaciones del Servidor
- Verificación de campos requeridos
- Validación de formato de email
- Sanitización de datos
- Rate limiting (5 envíos por hora)

### Protección Antispam
- Detección de dominios temporales
- Validación de patrones sospechosos
- Campo honeypot invisible
- Verificación de comportamiento humano

## 📁 Archivos del Sistema

### API Route
- **`app/api/contact/route.ts`**: Maneja el envío de emails
- **Método**: POST
- **Endpoint**: `/api/contact`

### Componente
- **`components/Contact.tsx`**: Formulario de contacto
- Integra validaciones y envío a la API

### Utilidades
- **`utils/antispam.tsx`**: Protección antispam
- **`utils/security.ts`**: Sanitización de datos
- **`utils/validation.ts`**: Validaciones con Zod

## 🚀 Proceso de Envío

1. **Usuario llena el formulario**
2. **Validaciones del cliente** (React Hook Form + Zod)
3. **Protecciones antispam** (dominios, patrones, honeypot)
4. **Envío a la API** (`/api/contact`)
5. **Validaciones del servidor**
6. **Envío de email principal** (a tu Gmail)
7. **Envío de email de confirmación** (al remitente)
8. **Respuesta de éxito** al cliente

## 🔍 Monitoreo y Logs

### Información Capturada
- **IP del remitente**
- **User Agent**
- **Fecha y hora exacta**
- **Contenido del mensaje**

### Logs del Servidor
- Errores de envío
- Intentos fallidos
- Información de debugging

## 🛠️ Solución de Problemas

### Error: "Invalid login"
- Verifica que la verificación en dos pasos esté activada
- Asegúrate de usar la contraseña de aplicación correcta
- Revisa que el email esté bien escrito

### Error: "Rate limit exceeded"
- El usuario ha enviado demasiados mensajes
- Espera 1 hora antes de permitir más envíos

### Error: "Invalid email format"
- Verifica el formato del email del remitente
- Revisa las validaciones de Zod

### Error: "Suspicious content detected"
- El mensaje contiene patrones de spam
- Verifica el contenido del mensaje

## 📧 Personalización de Emails

### Email Principal
Puedes personalizar el template en `app/api/contact/route.ts`:

```typescript
const mailOptions = {
  // ... configuración
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h2>Nuevo Mensaje de Contacto</h2>
      // ... tu HTML personalizado
    </div>
  `
}
```

### Email de Confirmación
También puedes personalizar el email de confirmación:

```typescript
const confirmationMailOptions = {
  // ... configuración
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h2>Mensaje Recibido</h2>
      // ... tu HTML personalizado
    </div>
  `
}
```

## 🔄 Alternativas de Configuración

### Otros Proveedores de Email
Puedes cambiar de Gmail a otros proveedores:

```typescript
// Para Outlook/Hotmail
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Para Yahoo
const transporter = nodemailer.createTransporter({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

### Servicios de Email Transaccional
Para mayor confiabilidad, considera usar servicios como:
- **SendGrid**
- **Mailgun**
- **Amazon SES**
- **Resend**

## ✅ Checklist de Configuración

- [ ] Verificación en dos pasos activada en Gmail
- [ ] Contraseña de aplicación generada
- [ ] Archivo `.env.local` creado con credenciales
- [ ] Variables de entorno configuradas
- [ ] API route funcionando (`/api/contact`)
- [ ] Formulario conectado a la API
- [ ] Emails de prueba enviados correctamente
- [ ] Protecciones antispam activas

## 🎯 Próximos Pasos

1. **Configura las variables de entorno**
2. **Prueba el envío de emails**
3. **Personaliza los templates si es necesario**
4. **Monitorea los logs para detectar spam**
5. **Considera implementar un dashboard de mensajes** 