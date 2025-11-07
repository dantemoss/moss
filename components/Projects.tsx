'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Folder from './Folder'
import { useLanguage } from '../app/contexts/LanguageContext'

interface Project {
  id: number
  titleKey: string
  descriptionKey: string
  technologies: string[]
  color: string
  icon: string
  liveUrl?: string
  githubUrl?: string
  images?: string[]
  position: { x: number; y: number }
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: 'projects.aiChat.title',
    descriptionKey: 'projects.aiChat.description',
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    color: "#10A37F",
    icon: "🤖",
    liveUrl: "https://ai-chat-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/ai-chat",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 0, y: 0 }
  },
  {
    id: 2,
    titleKey: 'projects.ecommerce.title',
    descriptionKey: 'projects.ecommerce.description',
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#6366F1",
    icon: "🛒",
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/ecommerce",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 1, y: 0 }
  },
  {
    id: 3,
    titleKey: 'projects.taskManager.title',
    descriptionKey: 'projects.taskManager.description',
    technologies: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    color: "#F59E0B",
    icon: "📋",
    liveUrl: "https://task-manager-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/task-manager",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 2, y: 0 }
  },
  {
    id: 4,
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    color: "#B692F6",
    icon: "✨",
    liveUrl: "https://dantemoscoso.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/portfolio",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 0, y: 1 }
  },
  {
    id: 5,
    titleKey: 'projects.analytics.title',
    descriptionKey: 'projects.analytics.description',
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    color: "#EF4444",
    icon: "📈",
    liveUrl: "https://analytics-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/analytics",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 1, y: 1 }
  },
  {
    id: 6,
    titleKey: 'projects.social.title',
    descriptionKey: 'projects.social.description',
    technologies: ["React Native", "Firebase", "Redux", "Socket.io"],
    color: "#06B6D4",
    icon: "📱",
    liveUrl: "https://social-app-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/social-app",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    position: { x: 2, y: 1 }
  }
]

// Terminal themes
interface TerminalTheme {
  name: string
  displayName: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    error: string
    background: string
  }
}

const terminalThemes: { [key: string]: TerminalTheme } = {
  emerald: {
    name: 'emerald',
    displayName: 'Emerald Pulse',
    colors: {
      primary: '#1DB954',    // Spotify green
      secondary: '#1ed760',
      accent: '#1aa34a',
      text: '#b3b3b3',
      error: '#e22134',
      background: '#121212'
    }
  },
  azure: {
    name: 'azure',
    displayName: 'Azure Velocity',
    colors: {
      primary: '#1DA1F2',    // Twitter blue
      secondary: '#8ed0f9',
      accent: '#0c85d0',
      text: '#e7e9ea',
      error: '#f4212e',
      background: '#15202b'
    }
  },
  violet: {
    name: 'violet',
    displayName: 'Violet Nexus',
    colors: {
      primary: '#5865F2',    // Discord blurple
      secondary: '#7983f5',
      accent: '#4752c4',
      text: '#dbdee1',
      error: '#ed4245',
      background: '#2c2f33'
    }
  },
  obsidian: {
    name: 'obsidian',
    displayName: 'Obsidian Flow',
    colors: {
      primary: '#ffffff',    // Notion white/gray
      secondary: '#9b9a97',
      accent: '#37352f',
      text: '#9b9a97',
      error: '#eb5757',
      background: '#191919'
    }
  },
  neon: {
    name: 'neon',
    displayName: 'Neon Matrix',
    colors: {
      primary: '#00ff41',    // Classic terminal green
      secondary: '#00d936',
      accent: '#00b82b',
      text: '#0dbc79',
      error: '#ff0055',
      background: '#0a0e0a'
    }
  }
}

// Terminal Component
function Terminal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output' | 'error'; text: string }>>([])
  const [currentTheme, setCurrentTheme] = useState<TerminalTheme>(terminalThemes.emerald)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const asciiArt = `
    ____  __  __   ____            __  ____      ___      
   / __ \\|  \\/  | |  _ \\ ___  _ __|  ||  _ \\    / _ \\     
  | |  | | |\\/| | | |_) / _ \\| '__| __| |_) |  | | | |    
  | |__| | |  | | |  __/ (_) | |  | |_|  __/ _ | |_| |    
   \\____/|_|  |_| |_|   \\___/|_|   \\__|_|   (_) \\___/     
                                                           
  ═══════════════════════════════════════════════════════
   Terminal Interactiva v1.0 | Portfolio Edition
  ═══════════════════════════════════════════════════════
  `

  const commands = {
    help: {
      description: 'Muestra todos los comandos disponibles',
      output: `
Comandos disponibles:
  
  help       - Muestra esta ayuda
  about      - Información sobre mí
  skills     - Mis habilidades técnicas
  experience - Experiencia profesional
  contact    - Información de contacto
  projects   - Lista de proyectos
  cv         - Descarga mi CV
  theme      - Cambia el tema de la terminal
  clear      - Limpia la consola
  exit       - Cierra la terminal

Tip: Escribe un comando y presiona Enter
Tip: Los comandos válidos se resaltan automáticamente
      `
    },
    about: {
      description: 'Información personal',
      output: `
╔════════════════════════════════════════╗
║         SOBRE MÍ                       ║
╚════════════════════════════════════════╝

👨‍💻 Desarrollador Full Stack apasionado por crear
   experiencias web innovadoras y funcionales.

🎓 Especializado en tecnologías modernas de
   JavaScript/TypeScript y frameworks como
   React, Next.js y Node.js.

🚀 Siempre en busca de nuevos desafíos y
   oportunidades para aprender y crecer.
      `
    },
    skills: {
      description: 'Habilidades técnicas',
      output: `
╔════════════════════════════════════════╗
║         HABILIDADES                    ║
╚════════════════════════════════════════╝

Frontend:
  ▸ React.js / Next.js      ████████████ 95%
  ▸ TypeScript              ███████████░ 90%
  ▸ Tailwind CSS            ████████████ 95%
  ▸ Framer Motion           ██████████░░ 85%

Backend:
  ▸ Node.js / Express       ████████████ 90%
  ▸ PostgreSQL / MongoDB    ███████████░ 88%
  ▸ REST APIs               ████████████ 95%
  ▸ Firebase                ██████████░░ 85%

Herramientas:
  ▸ Git / GitHub            ████████████ 95%
  ▸ Docker                  ████████░░░░ 75%
  ▸ VS Code                 ████████████ 100%
      `
    },
    experience: {
      description: 'Experiencia profesional',
      output: `
╔════════════════════════════════════════╗
║         EXPERIENCIA                    ║
╚════════════════════════════════════════╝

📍 Desarrollador Full Stack
   └─ 2022 - Presente
   └─ Desarrollo de aplicaciones web modernas
   └─ React, Next.js, Node.js, TypeScript

📍 Desarrollador Frontend
   └─ 2020 - 2022
   └─ Interfaces de usuario responsivas
   └─ React, Vue.js, CSS/SASS

📍 Desarrollador Junior
   └─ 2019 - 2020
   └─ Mantenimiento y desarrollo web
   └─ JavaScript, HTML, CSS
      `
    },
    contact: {
      description: 'Información de contacto',
      output: `
╔════════════════════════════════════════╗
║         CONTACTO                       ║
╚════════════════════════════════════════╝

📧 Email:    tu.email@example.com
🌐 Website:  https://tuportfolio.com
💼 LinkedIn: linkedin.com/in/tu-perfil
🐙 GitHub:   github.com/tu-usuario

¿Tienes un proyecto en mente?
¡No dudes en contactarme!
      `
    },
    projects: {
      description: 'Lista de proyectos destacados',
      output: `
╔════════════════════════════════════════╗
║         PROYECTOS                      ║
╚════════════════════════════════════════╝

1. 🤖 AI Chat Assistant
   └─ Chat con IA usando OpenAI API
   └─ Next.js, TypeScript, Tailwind

2. 🛒 E-commerce Platform
   └─ Plataforma de comercio electrónico
   └─ React, Node.js, MongoDB, Stripe

3. 📋 Task Manager App
   └─ Gestión de tareas colaborativa
   └─ Vue.js, Firebase, PWA

4. ✨ Portfolio Website
   └─ Este portfolio que estás viendo
   └─ Next.js, Framer Motion, Tailwind

5. 📈 Data Analytics Dashboard
   └─ Visualización de datos en tiempo real
   └─ React, D3.js, Node.js

6. 📱 Social Media App
   └─ Aplicación social móvil
   └─ React Native, Firebase, Socket.io
      `
    },
    cv: {
      description: 'Descarga CV',
      output: `
╔════════════════════════════════════════╗
║         CURRICULUM VITAE               ║
╚════════════════════════════════════════╝

📄 Descargando CV...

✓ Curriculum_Vitae.pdf

[████████████████████████████] 100%

¡Descarga completada!

Nota: Esta es una simulación.
Para descargar mi CV real, visita la sección
de contacto o envíame un correo.
      `
    },
    clear: {
      description: 'Limpia la consola',
      output: 'CLEAR'
    },
    theme: {
      description: 'Cambia el tema de la terminal',
      output: `
╔════════════════════════════════════════╗
║         TEMAS DISPONIBLES              ║
╚════════════════════════════════════════╝

Usa: theme [nombre]

Temas épicos disponibles:

  ⚡ emerald       - Emerald Pulse
     └─ Inspirado en la energía de Spotify
     └─ Verde vibrante y dinámico

  ⚡ azure         - Azure Velocity  
     └─ Inspirado en la velocidad de Twitter
     └─ Azul eléctrico y fluido

  ⚡ violet        - Violet Nexus
     └─ Inspirado en la comunidad Discord
     └─ Púrpura místico y conectado

  ⚡ obsidian      - Obsidian Flow
     └─ Inspirado en la claridad de Notion
     └─ Minimalista y elegante

  ⚡ neon          - Neon Matrix
     └─ Terminal clásico hacker
     └─ Verde matriz cyber

Ejemplo: theme azure
      `
    }
  }

  useEffect(() => {
    // Show welcome message on mount
    setHistory([
      { type: 'output', text: asciiArt },
      { type: 'output', text: '  Bienvenido a mi terminal interactiva!' },
      { type: 'output', text: '  Escribe "help" para ver los comandos disponibles.\n' }
    ])
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const fullCommand = cmd.trim()
    const parts = fullCommand.toLowerCase().split(' ')
    const command = parts[0]
    const args = parts.slice(1)
    
    if (!command) return

    // Add command to history
    const newHistory = [...history, { type: 'command' as const, text: `$ ${fullCommand}` }]

    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (command === 'exit') {
      onClose()
      return
    }

    // Handle theme command
    if (command === 'theme') {
      if (args.length === 0) {
        const output = commands.theme.output
        newHistory.push({ type: 'output' as const, text: output })
      } else {
        const themeName = args[0]
        if (terminalThemes[themeName]) {
          setCurrentTheme(terminalThemes[themeName])
          newHistory.push({ 
            type: 'output' as const, 
            text: `\n✓ Tema cambiado a: ${terminalThemes[themeName].displayName}\n` 
          })
        } else {
          newHistory.push({ 
            type: 'error' as const, 
            text: `Tema no encontrado: "${themeName}"\nEscribe "theme" para ver los temas disponibles.` 
          })
        }
      }
      setHistory(newHistory)
      setInput('')
      return
    }

    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands].output
      newHistory.push({ type: 'output' as const, text: output })
    } else {
      newHistory.push({ 
        type: 'error' as const, 
        text: `Comando no reconocido: "${command}"\nEscribe "help" para ver los comandos disponibles.` 
      })
    }

    setHistory(newHistory)
    setInput('')
  }

  // Highlight command keywords in input
  const highlightKeywords = (text: string) => {
    const commandNames = Object.keys(commands)
    const words = text.toLowerCase().split(' ')
    
    if (commandNames.includes(words[0])) {
      return true
    }
    return false
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl h-[600px] rounded-lg shadow-2xl overflow-hidden border"
        style={{ 
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.accent 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400" onClick={onClose}></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>terminal</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm"
          style={{ backgroundColor: currentTheme.colors.background }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-1">
              {entry.type === 'command' && (
                <div style={{ color: currentTheme.colors.primary }}>{entry.text}</div>
              )}
              {entry.type === 'output' && (
                <pre 
                  className="whitespace-pre-wrap"
                  style={{ color: currentTheme.colors.text }}
                >
                  {entry.text}
                </pre>
              )}
              {entry.type === 'error' && (
                <div style={{ color: currentTheme.colors.error }}>{entry.text}</div>
              )}
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-center gap-2" style={{ color: currentTheme.colors.primary }}>
            <span>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              style={{ 
                color: highlightKeywords(input) ? currentTheme.colors.secondary : currentTheme.colors.text,
                caretColor: currentTheme.colors.primary
              }}
              autoFocus
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Background options
interface BackgroundOption {
  id: string
  name: string
  type: 'gradient' | 'video' | 'solid'
  value: string
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'gradient-1',
    name: 'Degradado Clásico',
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: 'gradient-2',
    name: 'Océano Profundo',
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'gradient-3',
    name: 'Atardecer',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'gradient-4',
    name: 'Ciberpunk',
    type: 'gradient',
    value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'gradient-5',
    name: 'Aurora Boreal',
    type: 'gradient',
    value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'gradient-6',
    name: 'Noche Estrellada',
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
  },
  {
    id: 'gradient-7',
    name: 'Lavanda Suave',
    type: 'gradient',
    value: 'linear-gradient(135deg, #b692f6 0%, #8b5cf6 100%)'
  },
  {
    id: 'solid-dark',
    name: 'Negro Puro',
    type: 'solid',
    value: '#000000'
  },
  {
    id: 'solid-charcoal',
    name: 'Carbón',
    type: 'solid',
    value: '#1a1a1a'
  },
  {
    id: 'video-1',
    name: 'Video Krumzi 1',
    type: 'video',
    value: '/krumzi-video.mp4'
  },
  {
    id: 'video-2',
    name: 'Video Krumzi 2',
    type: 'video',
    value: '/krumzi-video (1).mp4'
  }
]

// Desktop OS Window Component
function DesktopWindow({ children, title }: { children: React.ReactNode; title: string }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showSettings, setShowSettings] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption>(backgroundOptions[0])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  const handleBackgroundChange = (bg: BackgroundOption) => {
    setSelectedBackground(bg)
  }

  return (
    <div className="bg-background-secondary border border-border-primary rounded-lg shadow-2xl overflow-hidden">
      {/* Window Title Bar */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2.5 flex items-center justify-between">
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
        </div>
        
        {/* Window Title */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="text-sm text-white font-medium">{title}</span>
        </div>
        
        {/* Spacer for centering */}
        <div className="w-12"></div>
      </div>

      {/* Toolbar */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        {/* Left side - Action buttons */}
        <div className="flex items-center gap-1">
          {/* View options */}
          <button className="p-2 hover:bg-white/10 rounded transition-colors group" title="Vista de cuadrícula">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          
          <button className="p-2 hover:bg-white/10 rounded transition-colors group" title="Vista de lista">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-700 mx-1"></div>

          {/* Sorting */}
          <button className="p-2 hover:bg-white/10 rounded transition-colors group" title="Ordenar">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>

          <button className="p-2 hover:bg-white/10 rounded transition-colors group" title="Filtrar">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-700 mx-1"></div>

          {/* Settings button with current background indicator */}
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 hover:bg-white/10 rounded transition-colors group relative ${showSettings ? 'bg-white/10' : ''}`}
            title={`Configuración de fondo - ${selectedBackground.name}`}
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {/* Active indicator dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent-lavender rounded-full border border-gray-800"></div>
          </button>

          <div className="w-px h-5 bg-gray-700 mx-1"></div>

          {/* Terminal button */}
          <button 
            onClick={() => setShowTerminal(!showTerminal)}
            className={`p-2 hover:bg-white/10 rounded transition-colors group ${showTerminal ? 'bg-white/10' : ''}`}
            title="Abrir Terminal Interactiva"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md pl-10 pr-4 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-lavender/50 transition-colors"
            />
          </div>
        </div>

        {/* Right side - System info */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>{projects.length} proyectos</span>
          </div>

          <div className="w-px h-5 bg-gray-700 hidden md:block"></div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
      
      {/* Desktop Content */}
      <div className="min-h-[600px] p-4 sm:p-12 relative overflow-hidden">
        {/* Background Layer */}
        {selectedBackground.type === 'video' ? (
          <video
            key={selectedBackground.id}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={selectedBackground.value} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: selectedBackground.type === 'gradient' 
                ? selectedBackground.value 
                : selectedBackground.value
            }}
          />
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <>
              {/* Backdrop for mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                onClick={() => setShowSettings(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute top-0 right-0 md:top-4 md:right-4 w-full md:w-80 h-full md:h-auto bg-background-primary/95 backdrop-blur-xl border-l md:border border-border-primary md:rounded-lg shadow-2xl z-40 md:max-h-[calc(100%-2rem)] overflow-auto"
              >
              {/* Settings Header */}
              <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between border-b border-border-primary">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <h3 className="text-sm font-semibold text-white">Personalizar Fondo</h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Settings Content */}
              <div className="p-4 space-y-3">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => handleBackgroundChange(bg)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      selectedBackground.id === bg.id
                        ? 'border-accent-lavender bg-accent-lavender/10'
                        : 'border-border-primary bg-background-secondary hover:border-accent-lavender/50'
                    }`}
                  >
                    {/* Preview */}
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-border-primary">
                      {bg.type === 'video' ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{
                            background: bg.type === 'gradient' ? bg.value : bg.value
                          }}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-text-primary">{bg.name}</p>
                      <p className="text-xs text-text-secondary capitalize">{bg.type}</p>
                    </div>

                    {/* Check mark */}
                    {selectedBackground.id === bg.id && (
                      <svg className="w-5 h-5 text-accent-lavender flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>{projects.length} elementos</span>
          </div>
          
          <div className="w-px h-3 bg-gray-700"></div>
          
          <div className="hidden sm:flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Vista cuadrícula</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Conectado</span>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      </AnimatePresence>
    </div>
  )
}

// Project Modal Component
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-background-primary/95 backdrop-blur-xl border border-border-primary rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-border-primary">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">{project.icon}</span>
            <h3 className="text-lg sm:text-2xl font-display font-bold text-white truncate">
              {t(project.titleKey)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 transition-colors flex-shrink-0"
          >
            <span className="text-white text-lg">×</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="relative">
              <div className="aspect-video bg-background-secondary rounded-lg overflow-hidden border border-border-primary">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${t(project.titleKey)} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {project.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-accent-lavender w-8'
                          : 'bg-border-primary hover:bg-accent-lavender/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
              Descripción
            </h4>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {t(project.descriptionKey)}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
              Tecnologías
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-background-secondary/50 border border-border-primary rounded-full text-xs sm:text-sm text-text-primary font-medium backdrop-blur-sm"
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: project.color }}
                  />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-accent-lavender text-white rounded-lg hover:bg-accent-lavender/80 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('projects.viewDemo')}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-background-secondary border border-border-primary rounded-lg text-text-primary hover:border-accent-lavender transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {t('projects.viewCode')}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Desktop Icon Component
function DesktopIcon({ project, onClick }: { project: Project; onClick: () => void }) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)

  const handleDoubleClick = () => {
    onClick()
  }

  const handleClick = () => {
    setSelected(true)
    setTimeout(() => setSelected(false), 200)
  }

  const handleTouchStart = () => {
    setTouchStartTime(Date.now())
  }

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime
    // If touch is quick (< 300ms), open immediately on mobile
    if (touchDuration < 300) {
      onClick()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: project.id * 0.1 }}
      className="group cursor-pointer select-none"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg transition-all duration-200 hover:bg-white/5">
        {/* Folder with animation */}
        <div className={`transition-transform duration-200 ${selected ? 'scale-95' : 'group-hover:scale-105'}`}>
          <Folder 
            size={1.2}
            color={project.color} 
            items={[
              <div key="1" className="w-full h-full flex items-center justify-center text-xl sm:text-2xl">
                {project.icon}
              </div>,
              <div key="2" className="w-full h-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
                {t(project.titleKey).split(' ')[0]}
              </div>,
              <div key="3" className="w-full h-full flex items-center justify-center text-[10px] sm:text-xs text-gray-500">
                {project.technologies[0]}
              </div>
            ]}
          />
        </div>
        
        {/* Label */}
        <div className={`text-center px-2 py-1 rounded transition-colors duration-200 ${
          selected ? 'bg-accent-lavender/20' : ''
        }`}>
          <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {t(project.titleKey)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-text-primary to-accent-lavender bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-text-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Desktop Window */}
        <DesktopWindow title={t('projects.window.title')}>
          {/* Desktop Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 auto-rows-[200px] sm:auto-rows-[220px] max-w-4xl mx-auto py-8">
              {projects.map((project) => (
                <DesktopIcon
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Hint Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-white/70 text-xs sm:text-sm"
            >
              <svg className="w-4 h-4 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline drop-shadow-lg">Haz doble clic en una carpeta para ver más detalles</span>
              <span className="inline sm:hidden drop-shadow-lg">Toca una carpeta para ver más detalles</span>
            </motion.div>
          </div>
        </DesktopWindow>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 