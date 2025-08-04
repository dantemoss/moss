# Configuración de Resend para Emails

Este documento explica cómo configurar Resend para el envío de emails del formulario de contacto.

## 🚀 ¿Por qué Resend?

### Ventajas sobre Gmail:
- ✅ **Mejor deliverability** (99% de emails llegan a la bandeja principal)
- ✅ **API moderna y fácil de usar**
- ✅ **Sin configuración compleja** (no necesitas contraseñas de aplicación)
- ✅ **Dashboard con analytics** (puedes ver estadísticas de envío)
- ✅ **Dominio personalizado** (opcional)
- ✅ **100 emails gratis por día** (suficiente para un portfolio)

## 📧 Configuración de Resend

### 1. Crear Cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key

1. En el dashboard de Resend, ve a **API Keys**
2. Crea una nueva API key
3. Copia la clave (empieza con `re_`)

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

**⚠️ IMPORTANTE:**
- Nunca subas el archivo `.env.local` a Git
- El archivo `.env.local` ya está en `.gitignore`

### 4. Verificar Dominio (Opcional pero Recomendado)

#### Opción A: Usar dominio personalizado
1. En Resend, ve a **Domains**
2. Agrega tu dominio (ej: `mail.tudominio.com`)
3. Configura los registros DNS según las instrucciones
4. Espera la verificación (puede tomar hasta 24 horas)

#### Opción B: Usar dominio de Resend (para pruebas)
- Puedes usar `onboarding@resend.dev` temporalmente
- Para producción, es mejor usar tu propio dominio

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

## 📁 Archivos del Sistema

### API Route
- **`app/api/contact/route.ts`**: Maneja el envío de emails con Resend
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
6. **Envío de email principal** (a tu Gmail via Resend)
7. **Envío de email de confirmación** (al remitente via Resend)
8. **Respuesta de éxito** al cliente

## 🔍 Monitoreo y Analytics

### Dashboard de Resend
- **Emails enviados**: Estadísticas diarias/mensuales
- **Tasa de entrega**: Porcentaje de emails que llegan
- **Tasa de apertura**: Cuántos emails se abren
- **Tasa de clics**: Cuántos enlaces se hacen clic
- **Logs detallados**: Información de cada envío

### Información Capturada
- **IP del remitente**
- **User Agent**
- **Fecha y hora exacta**
- **Contenido del mensaje**
- **Estado del envío** (enviado, entregado, fallido)

## 🛠️ Solución de Problemas

### Error: "Invalid API key"
- Verifica que la API key esté correcta
- Asegúrate de que la cuenta esté verificada
- Revisa que la API key no haya expirado

### Error: "Rate limit exceeded"
- Resend tiene límites de envío
- Plan gratuito: 100 emails/día
- Planes pagos: hasta 50,000 emails/día

### Error: "Invalid email format"
- Verifica el formato del email del remitente
- Revisa las validaciones de Zod

### Error: "Domain not verified"
- Si usas dominio personalizado, verifica que esté configurado
- Para pruebas, usa `onboarding@resend.dev`

## 📧 Personalización de Emails

### Email Principal
Puedes personalizar el template en `app/api/contact/route.ts`:

```typescript
const mainEmailData = {
  from: 'Portfolio <tu-email@tudominio.com>',
  to: ['dantemoss6@gmail.com'],
  subject: `Nuevo mensaje de contacto desde tu portfolio - ${name}`,
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
const confirmationEmailData = {
  from: 'Portfolio <tu-email@tudominio.com>',
  to: [email],
  subject: 'Mensaje recibido - Portfolio de Dante Moscoso',
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h2>Mensaje Recibido</h2>
      // ... tu HTML personalizado
    </div>
  `
}
```

## 🔄 Migración desde Gmail

### Cambios Realizados:
1. **Desinstalado**: `nodemailer` y `@types/nodemailer`
2. **Instalado**: `resend`
3. **Actualizado**: API route para usar Resend
4. **Simplificado**: Configuración (solo API key)

### Variables de Entorno:
```env
# Antes (Gmail)
EMAIL_USER=dantemoss6@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# Ahora (Resend)
RESEND_API_KEY=re_tu_api_key_aqui
```

## 💰 Planes y Precios

### Plan Gratuito
- **100 emails/día**
- **Dominio personalizado**
- **API completa**
- **Dashboard con analytics**

### Planes Pagos
- **Starter**: $20/mes - 50,000 emails
- **Pro**: $99/mes - 250,000 emails
- **Enterprise**: Personalizado

## ✅ Checklist de Configuración

- [ ] Cuenta de Resend creada
- [ ] API key generada
- [ ] Archivo `.env.local` creado con API key
- [ ] API route funcionando (`/api/contact`)
- [ ] Formulario conectado a la API
- [ ] Emails de prueba enviados correctamente
- [ ] Protecciones antispam activas
- [ ] Dominio verificado (opcional)

## 🎯 Próximos Pasos

1. **Configura tu cuenta de Resend**
2. **Obtén tu API key**
3. **Configura las variables de entorno**
4. **Prueba el envío de emails**
5. **Verifica tu dominio personalizado**
6. **Monitorea el dashboard de Resend**
7. **Personaliza los templates si es necesario**

## 🔗 Enlaces Útiles

- [Resend Dashboard](https://resend.com/dashboard)
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Resend Pricing](https://resend.com/pricing) 