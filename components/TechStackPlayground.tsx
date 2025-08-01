'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

interface TechIcon {
  id: string
  name: string
  icon: string
  color: string
  size: number
  points: number
  effect: string
}

interface GameObject {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  tech: TechIcon
  isActive: boolean
}

interface FloatingText {
  id: string
  x: number
  y: number
  text: string
  color: string
  timestamp: number
}

// Safe way to get Simple Icons
const getSimpleIcon = (iconName: string) => {
  try {
    const icons = require('simple-icons')
    const possibleNames = [
      `si${iconName}`,
      `si${iconName.toLowerCase()}`,
      `si${iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()}`,
      iconName,
      iconName.toLowerCase()
    ]

    for (const name of possibleNames) {
      if (icons[name]) {
        return { path: icons[name].path, hex: icons[name].hex }
      }
    }

    console.warn(`Icon ${iconName} not found. Tried:`, possibleNames)
    return null
  } catch (error) {
    console.warn(`Error loading icon ${iconName}:`, error)
    return null
  }
}

const techIcons: TechIcon[] = [
  { id: 'html5', name: 'HTML5', icon: getSimpleIcon('Html5')?.path || '', color: `#${getSimpleIcon('Html5')?.hex || 'E34F26'}`, size: 45, points: 10, effect: '+conocimiento' },
  { id: 'css3', name: 'CSS3', icon: 'M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63', color: '#663399', size: 45, points: 10, effect: '+estilo' },
  { id: 'javascript', name: 'JavaScript', icon: getSimpleIcon('Javascript')?.path || '', color: `#${getSimpleIcon('Javascript')?.hex || 'F7DF1E'}`, size: 45, points: 15, effect: '+lógica' },
  { id: 'typescript', name: 'TypeScript', icon: getSimpleIcon('Typescript')?.path || '', color: `#${getSimpleIcon('Typescript')?.hex || '3178C6'}`, size: 45, points: 20, effect: '+tipado' },
  { id: 'tailwindcss', name: 'Tailwind CSS', icon: getSimpleIcon('Tailwindcss')?.path || '', color: `#${getSimpleIcon('Tailwindcss')?.hex || '06B6D4'}`, size: 45, points: 12, effect: '+diseño' },
  { id: 'react', name: 'React', icon: getSimpleIcon('React')?.path || '', color: `#${getSimpleIcon('React')?.hex || '61DAFB'}`, size: 45, points: 25, effect: '+componentes' },
  { id: 'nextdotjs', name: 'Next.js', icon: getSimpleIcon('Nextdotjs')?.path || '', color: `#${getSimpleIcon('Nextdotjs')?.hex || '000000'}`, size: 45, points: 30, effect: '+rendimiento' },
  { id: 'nodedotjs', name: 'Node.js', icon: getSimpleIcon('Nodedotjs')?.path || '', color: `#${getSimpleIcon('Nodedotjs')?.hex || '339933'}`, size: 45, points: 20, effect: '+backend' },
  { id: 'git', name: 'Git', icon: getSimpleIcon('Git')?.path || '', color: `#${getSimpleIcon('Git')?.hex || 'F05032'}`, size: 40, points: 8, effect: '+control' },
  { id: 'github', name: 'GitHub', icon: getSimpleIcon('Github')?.path || '', color: `#${getSimpleIcon('Github')?.hex || '181717'}`, size: 40, points: 8, effect: '+colaboración' },
  { id: 'postgresql', name: 'PostgreSQL', icon: getSimpleIcon('Postgresql')?.path || '', color: `#${getSimpleIcon('Postgresql')?.hex || '4169E1'}`, size: 40, points: 18, effect: '+datos' },
  { id: 'supabase', name: 'Supabase', icon: getSimpleIcon('Supabase')?.path || '', color: `#${getSimpleIcon('Supabase')?.hex || '3ECF8E'}`, size: 40, points: 22, effect: '+backend-as-a-service' },
  { id: 'firebase', name: 'Firebase', icon: getSimpleIcon('Firebase')?.path || '', color: `#${getSimpleIcon('Firebase')?.hex || 'FFCA28'}`, size: 40, points: 20, effect: '+servicios' },
  { id: 'visualstudiocode', name: 'VS Code', icon: getSimpleIcon('Visualstudiocode')?.path || '', color: `#${getSimpleIcon('Visualstudiocode')?.hex || '007ACC'}`, size: 40, points: 5, effect: '+productividad' },
  { id: 'openai', name: 'OpenAI', icon: getSimpleIcon('Openai')?.path || '', color: `#${getSimpleIcon('Openai')?.hex || '10A37F'}`, size: 40, points: 35, effect: '+IA' },
  { id: 'google', name: 'Google', icon: getSimpleIcon('Google')?.path || '', color: `#${getSimpleIcon('Google')?.hex || '4285F4'}`, size: 40, points: 15, effect: '+búsqueda' },
]

export default function TechStackPlayground() {
  const [bounds, setBounds] = useState({ width: 0, height: 0 })
  const [player, setPlayer] = useState<GameObject>({
    id: 'player',
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 60,
    tech: { id: 'me', name: 'Me', icon: '', color: '#B692F6', size: 60, points: 0, effect: '' },
    isActive: true
  })
  const [gameObjects, setGameObjects] = useState<GameObject[]>([])
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([])
  const [score, setScore] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Initialize game objects
  useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) return

    const initialObjects = techIcons.map((tech, index) => ({
      id: `tech-${index}`,
      x: Math.random() * (bounds.width - tech.size),
      y: Math.random() * (bounds.height - tech.size),
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: tech.size,
      tech,
      isActive: true
    }))

    setGameObjects(initialObjects)
    setPlayer(prev => ({
      ...prev,
      x: bounds.width / 2 - 30,
      y: bounds.height / 2 - 30
    }))
  }, [bounds.width, bounds.height])

  // Physics and collision detection
  const updatePhysics = useCallback(() => {
    setGameObjects(prevObjects => {
      return prevObjects.map(obj => {
        if (!obj.isActive) return obj

        // Update position
        let newX = obj.x + obj.vx
        let newY = obj.y + obj.vy
        let newVx = obj.vx
        let newVy = obj.vy

        // Boundary collisions
        if (newX <= 0 || newX >= bounds.width - obj.size) {
          newVx = -newVx * 0.6
          newX = newX <= 0 ? 0 : bounds.width - obj.size
        }
        if (newY <= 0 || newY >= bounds.height - obj.size) {
          newVy = -newVy * 0.6
          newY = newY <= 0 ? 0 : bounds.height - obj.size
        }

        // Inter-object collisions
        prevObjects.forEach(otherObj => {
          if (otherObj.id === obj.id || !otherObj.isActive) return

          const dx = (newX + obj.size / 2) - (otherObj.x + otherObj.size / 2)
          const dy = (newY + obj.size / 2) - (otherObj.y + otherObj.size / 2)
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = (obj.size + otherObj.size) / 2

          if (distance < minDistance && distance > 0) {
            // Collision response
            const angle = Math.atan2(dy, dx)
            const overlap = minDistance - distance

            // Push objects apart
            const pushX = Math.cos(angle) * overlap * 0.5
            const pushY = Math.sin(angle) * overlap * 0.5

            newX += pushX
            newY += pushY

            // Bounce velocities
            const normalX = dx / distance
            const normalY = dy / distance

            const relativeVx = obj.vx - otherObj.vx
            const relativeVy = obj.vy - otherObj.vy

            const velocityAlongNormal = relativeVx * normalX + relativeVy * normalY

            if (velocityAlongNormal < 0) {
              const restitution = 0.5
              const impulse = -(1 + restitution) * velocityAlongNormal

              newVx += impulse * normalX
              newVy += impulse * normalY
            }
          }
        })

        return {
          ...obj,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        }
      })
    })
  }, [bounds.width, bounds.height])

  // Player movement with keyboard
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        event.preventDefault()
        setKeysPressed(prev => new Set(prev).add(key))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        setKeysPressed(prev => {
          const newSet = new Set(prev)
          newSet.delete(key)
          return newSet
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Update player position based on keys pressed
  useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) return

    const moveSpeed = 3
    let newX = player.x
    let newY = player.y

    // Handle movement
    if (keysPressed.has('w') || keysPressed.has('arrowup')) {
      newY = Math.max(0, newY - moveSpeed)
    }
    if (keysPressed.has('s') || keysPressed.has('arrowdown')) {
      newY = Math.min(bounds.height - player.size, newY + moveSpeed)
    }
    if (keysPressed.has('a') || keysPressed.has('arrowleft')) {
      newX = Math.max(0, newX - moveSpeed)
    }
    if (keysPressed.has('d') || keysPressed.has('arrowright')) {
      newX = Math.min(bounds.width - player.size, newX + moveSpeed)
    }

    if (newX !== player.x || newY !== player.y) {
      setPlayer(prev => ({ ...prev, x: newX, y: newY }))
    }
  }, [keysPressed, bounds.width, bounds.height, player.x, player.y, player.size])

  // Player collision detection and eating mechanics
  const checkPlayerCollisions = useCallback(() => {
    setGameObjects(prevObjects => {
      const newObjects = [...prevObjects]
      let newScore = score
      let newFloatingTexts = [...floatingTexts]

      newObjects.forEach((obj, index) => {
        if (!obj.isActive) return

        const dx = (player.x + player.size / 2) - (obj.x + obj.size / 2)
        const dy = (player.y + player.size / 2) - (obj.y + obj.size / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const minDistance = (player.size + obj.size) / 2

        if (distance < minDistance) {
          // Player eats the technology
          newObjects[index] = { ...obj, isActive: false }
          newScore += obj.tech.points

          // Add floating text effect
          const floatingText: FloatingText = {
            id: `text-${Date.now()}-${Math.random()}`,
            x: obj.x,
            y: obj.y,
            text: obj.tech.effect,
            color: obj.tech.color,
            timestamp: Date.now()
          }
          newFloatingTexts.push(floatingText)

          // Respawn the technology after 3 seconds
          setTimeout(() => {
            setGameObjects(current =>
              current.map(currentObj =>
                currentObj.id === obj.id
                  ? {
                    ...currentObj,
                    x: Math.random() * (bounds.width - obj.size),
                    y: Math.random() * (bounds.height - obj.size),
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    isActive: true
                  }
                  : currentObj
              )
            )
          }, 3000)
        }
      })

      setScore(newScore)
      setFloatingTexts(newFloatingTexts)
      return newObjects
    })
  }, [player, score, floatingTexts, bounds.width, bounds.height])

  // Clean up old floating texts
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingTexts(prev => prev.filter(text => Date.now() - text.timestamp < 2000))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      updatePhysics()
      checkPlayerCollisions()
      animationRef.current = requestAnimationFrame(gameLoop)
    }

    if (bounds.width > 0 && bounds.height > 0) {
      animationRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updatePhysics, checkPlayerCollisions, bounds.width, bounds.height])

  // Update bounds on resize
  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setBounds({
          width: rect.width - 80,
          height: rect.height - 80
        })
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  return (
            <div className="relative w-full h-96 bg-background-secondary border-2 border-border-primary rounded-2xl overflow-hidden shadow-2xl hover:shadow-accent-lavender/10 data-[theme=light]:hover:shadow-accent-glacier/10 transition-all duration-500">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${'#B692F6'} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

             {/* Subtle gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-accent-lavender/5 via-transparent to-purple-500/5 data-[theme=light]:from-accent-glacier/5 data-[theme=light]:to-blue-500/5"></div>

      {/* Score display */}
      <div className="absolute top-4 right-4 z-30">
                 <div className="bg-background-primary/80 backdrop-blur-sm border border-border-primary rounded-lg px-3 py-2 shadow-md">
           <p className="text-sm text-text-primary font-medium">
             🎯 <span className="text-accent-lavender font-bold data-[theme=light]:text-accent-glacier">{score}</span>
           </p>
        </div>
      </div>

      {/* Game container */}
      <div
        ref={containerRef}
        className="relative w-full h-full p-4"
      >
        {/* Player */}
        <PlayerIcon
          player={player}
        />

        {/* Technology objects */}
        <AnimatePresence>
          {gameObjects.map((obj) => (
            obj.isActive && (
              <motion.div
                key={obj.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  left: obj.x,
                  top: obj.y,
                  width: obj.size,
                  height: obj.size,
                  zIndex: 10
                }}
              >
                <TechIconDisplay tech={obj.tech} />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Floating text effects */}
        <AnimatePresence>
          {floatingTexts.map((text) => (
            <motion.div
              key={text.id}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -50, opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                left: text.x,
                top: text.y,
                color: text.color,
                fontSize: '14px',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(0,0,0,0.5)',
                zIndex: 25,
                pointerEvents: 'none'
              }}
            >
              {text.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

             {/* Instructions overlay */}
       <div className="absolute bottom-4 left-4 right-4">
         <div className="bg-background-primary/80 backdrop-blur-sm border border-border-primary rounded-lg p-3">
           <p className="text-xs text-text-secondary text-center">
             🎮 Usa WASD o las flechas para mover "Me" y comer las tecnologías
           </p>
         </div>
       </div>
    </div>
  )
}

interface PlayerIconProps {
  player: GameObject
}

function PlayerIcon({ player }: PlayerIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 20,
        transform: `translate(${player.x}px, ${player.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="group"
    >
      <div className="relative">
                 {/* Glow effect */}
         <div className="absolute inset-0 bg-accent-lavender/20 rounded-full blur-xl animate-pulse data-[theme=light]:bg-accent-glacier/20"></div>

                 {/* Main icon */}
         <div className="relative w-16 h-16 bg-gradient-to-br from-accent-lavender to-purple-600 rounded-full flex items-center justify-center border-4 border-accent-lavender/20 data-[theme=light]:border-accent-glacier/20 shadow-2xl overflow-hidden data-[theme=light]:from-accent-glacier data-[theme=light]:to-blue-600">
          <img
            src="/ImageMe.png"
            alt="Me"
            className="w-12 h-12 object-cover rounded-full"
            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
          />
        </div>

        {/* Orbiting ring */}
        <div className="absolute inset-0 -m-1 border border-accent-lavender/40 data-[theme=light]:border-accent-glacier/40 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>

                 {/* Hover effect */}
         <div className="absolute inset-0 bg-accent-lavender/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 data-[theme=light]:bg-accent-glacier/10"></div>
      </div>
    </div>
  )
}

interface TechIconDisplayProps {
  tech: TechIcon
}

function TechIconDisplay({ tech }: TechIconDisplayProps) {
  return (
    <div
             className="relative flex items-center justify-center rounded-2xl border-2 border-transparent hover:border-accent-lavender/30 data-[theme=light]:hover:border-accent-glacier/30 transition-all duration-300 group"
      style={{
        width: tech.size,
        height: tech.size,
        backgroundColor: `${tech.color}15`,
      }}
    >
      {/* SVG Icon */}
      {tech.icon ? (
        <svg
          width={tech.size * 0.5}
          height={tech.size * 0.5}
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: tech.color }}
          className="text-current pointer-events-none"
        >
          <path d={tech.icon} />
        </svg>
      ) : (
        <div
          className="flex items-center justify-center text-lg font-bold pointer-events-none"
          style={{ color: tech.color }}
        >
          {tech.name.charAt(0)}
        </div>
      )}

             {/* Tooltip */}
       <motion.div
         className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background-primary border border-border-primary rounded-lg px-2 py-1 text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
         initial={{ y: 5 }}
         whileHover={{ y: 0 }}
       >
         {tech.name} (+{tech.points})
       </motion.div>
    </div>
  )
} 