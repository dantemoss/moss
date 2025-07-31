# Portfolio Personal - Dante Moscoso

Un portfolio personal moderno y profesional construido con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Diseño Moderno**: Inspirado en Grok y Claude con estética minimalista
- **Responsive**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Framer Motion para transiciones elegantes
- **Performance**: Optimizado para velocidad y SEO
- **TypeScript**: Código tipado y mantenible
- **Sección About Mejorada**: Diseño con tarjetas interactivas y efectos visuales

## 📋 Actualizaciones Recientes

### Sección About - Mejoras de Diseño (Diciembre 2024)
- **Tarjetas Interactivas**: Implementación de tarjetas con efecto hover y animaciones suaves
- **Efectos Visuales**: Gradientes dinámicos y efectos de glassmorphism
- **Mejor UX**: Transiciones fluidas y feedback visual mejorado
- **Responsive Design**: Optimización para dispositivos móviles y tablets
- **Accesibilidad**: Mejoras en contraste y navegación por teclado

### TechStack Playground - Sistema de Drag & Drop Avanzado (Diciembre 2024)
- **Sistema de Física Realista**: Implementación de movimiento basado en física con atracción gravitacional
- **Drag & Drop Interactivo**: Iconos arrastrables con feedback visual y efectos de glow
- **Icono Central "Me"**: Elemento principal arrastrable que atrae a las tecnologías
- **Colisiones Inteligentes**: Sistema de rebote en bordes con pérdida de energía realista
- **Animaciones Suaves**: Transiciones fluidas usando Framer Motion y requestAnimationFrame
- **Gestión de Estados**: Control preciso de velocidad, posición y estados de arrastre
- **Optimización de Performance**: Uso eficiente de useRef y cancelAnimationFrame
- **Responsive Design**: Adaptación automática a diferentes tamaños de pantalla
- **Efectos Visuales**: Partículas flotantes, gradientes dinámicos y tooltips informativos
- **Compatibilidad Touch**: Soporte completo para dispositivos móviles y tablets

### Corrección de Imagen del Logo (Diciembre 2024)
- **Problema Resuelto**: Imagen del logo no se mostraba correctamente (ícono de imagen rota)
- **Solución Implementada**: Movimiento de la imagen `logoDM.png` de la carpeta `image/` a la carpeta `public/`
- **Actualización de Ruta**: Cambio de `/image/logoDM.png` a `/logoDM.png` en el componente Layout
- **Conformidad Next.js**: Las imágenes estáticas ahora están en la ubicación correcta según las convenciones de Next.js

## 🛠️ Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- @use-gesture/react (Drag & Drop)
- Simple Icons (Iconografía de tecnologías)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/dantemoscoso/portfolio.git
cd portfolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Personalización

### Colores
Los colores están definidos en `tailwind.config.ts`:
- Fondo principal: `#0B0F19`
- Texto primario: `#F2F2F2`
- Acento lavanda: `#B692F6`

### Fuentes
- **Satoshi**: Para títulos y headings
- **Inter**: Para texto del cuerpo

## 📁 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Layout.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── TechStackPlayground.tsx
├── public/
│   └── logoDM.png
├── tailwind.config.ts
└── package.json
```

## 🚀 Deployment

El proyecto está optimizado para deployment en Vercel:

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. El build se ejecutará automáticamente

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles. 