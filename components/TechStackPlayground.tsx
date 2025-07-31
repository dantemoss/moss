'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { useState, useEffect, useRef } from 'react'

interface TechIcon {
  id: string
  name: string
  icon: string
  color: string
  size: number
}

// Safe way to get Simple Icons
const getSimpleIcon = (iconName: string) => {
  try {
    const icons = require('simple-icons')
    // Try different naming conventions
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
  { id: 'html5', name: 'HTML5', icon: getSimpleIcon('Html5')?.path || '', color: `#${getSimpleIcon('Html5')?.hex || 'E34F26'}`, size: 55 },
  { id: 'css3', name: 'CSS3', icon: 'M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63', color: '#663399', size: 55 },
  { id: 'javascript', name: 'JavaScript', icon: getSimpleIcon('Javascript')?.path || '', color: `#${getSimpleIcon('Javascript')?.hex || 'F7DF1E'}`, size: 55 },
  { id: 'typescript', name: 'TypeScript', icon: getSimpleIcon('Typescript')?.path || '', color: `#${getSimpleIcon('Typescript')?.hex || '3178C6'}`, size: 55 },
  { id: 'tailwindcss', name: 'Tailwind CSS', icon: getSimpleIcon('Tailwindcss')?.path || '', color: `#${getSimpleIcon('Tailwindcss')?.hex || '06B6D4'}`, size: 55 },
  { id: 'react', name: 'React', icon: getSimpleIcon('React')?.path || '', color: `#${getSimpleIcon('React')?.hex || '61DAFB'}`, size: 55 },
  { id: 'nextdotjs', name: 'Next.js', icon: getSimpleIcon('Nextdotjs')?.path || '', color: `#${getSimpleIcon('Nextdotjs')?.hex || '000000'}`, size: 55 },
  { id: 'nodedotjs', name: 'Node.js', icon: getSimpleIcon('Nodedotjs')?.path || '', color: `#${getSimpleIcon('Nodedotjs')?.hex || '339933'}`, size: 55 },
  { id: 'git', name: 'Git', icon: getSimpleIcon('Git')?.path || '', color: `#${getSimpleIcon('Git')?.hex || 'F05032'}`, size: 50 },
  { id: 'github', name: 'GitHub', icon: getSimpleIcon('Github')?.path || '', color: `#${getSimpleIcon('Github')?.hex || '181717'}`, size: 50 },
  { id: 'postgresql', name: 'PostgreSQL', icon: getSimpleIcon('Postgresql')?.path || '', color: `#${getSimpleIcon('Postgresql')?.hex || '4169E1'}`, size: 50 },
  { id: 'supabase', name: 'Supabase', icon: getSimpleIcon('Supabase')?.path || '', color: `#${getSimpleIcon('Supabase')?.hex || '3ECF8E'}`, size: 50 },
  { id: 'firebase', name: 'Firebase', icon: getSimpleIcon('Firebase')?.path || '', color: `#${getSimpleIcon('Firebase')?.hex || 'FFCA28'}`, size: 50 },
  { id: 'visualstudiocode', name: 'VS Code', icon: getSimpleIcon('Visualstudiocode')?.path || '', color: `#${getSimpleIcon('Visualstudiocode')?.hex || '007ACC'}`, size: 50 },
  { id: 'openai', name: 'OpenAI', icon: getSimpleIcon('Openai')?.path || '', color: `#${getSimpleIcon('Openai')?.hex || '10A37F'}`, size: 50 },
  { id: 'google', name: 'Google', icon: getSimpleIcon('Google')?.path || '', color: `#${getSimpleIcon('Google')?.hex || '4285F4'}`, size: 50 },
]

export default function TechStackPlayground() {
  const [bounds, setBounds] = useState({ width: 0, height: 0 })
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newBounds = {
          width: rect.width - 80,
          height: rect.height - 80
        }
        setBounds(newBounds)
        // Initialize center position
        setCenterPosition({
          x: newBounds.width / 2,
          y: newBounds.height / 2
        })
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  return (
    <div className="relative w-full h-80 bg-background-secondary border border-border-primary rounded-2xl overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${'#B692F6'} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Container for draggable icons */}
      <div 
        ref={containerRef}
        className="relative w-full h-full p-4"
      >
        {/* Central "Me" icon - now draggable */}
        <DraggableMeIcon 
          position={centerPosition}
          setPosition={setCenterPosition}
          bounds={bounds}
        />

        {techIcons.map((tech, index) => (
          <DraggableTechIcon
            key={tech.id}
            tech={tech}
            bounds={bounds}
            centerPosition={centerPosition}
            index={index}
            totalIcons={techIcons.length}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-lavender/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-background-primary/80 backdrop-blur-sm border border-border-primary rounded-lg p-3">
          <p className="text-xs text-text-secondary text-center">
            💡 Drag "Me" to lead the technologies or drag individual icons to explore
          </p>
        </div>
      </div>
    </div>
  )
}

interface DraggableMeIconProps {
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
  bounds: { width: number; height: number }
}

function DraggableMeIcon({ position, setPosition, bounds }: DraggableMeIconProps) {
  const [isDragging, setIsDragging] = useState(false)

  const bind = useDrag(({ down, offset: [ox, oy], first, last }) => {
    if (first) {
      setIsDragging(true)
    }
    
    if (down) {
      const newX = Math.max(0, Math.min(bounds.width, ox))
      const newY = Math.max(0, Math.min(bounds.height, oy))
      setPosition({ x: newX, y: newY })
    }
    
    if (last) {
      setIsDragging(false)
    }
  }, {
    from: () => [position.x, position.y],
    bounds: { left: 0, top: 0, right: bounds.width, bottom: bounds.height },
    rubberband: true,
    preventDefault: true,
    filterTaps: true,
  })

  return (
    <div
      {...bind()}
      style={{
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 15,
        touchAction: 'none',
        userSelect: 'none',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      }}
      className="group"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent-lavender/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Main icon */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-accent-lavender to-purple-600 rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
          <div className="text-white font-display font-bold text-lg">Me</div>
        </div>
        
        {/* Orbiting ring */}
        <div className="absolute inset-0 -m-2 border-2 border-accent-lavender/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-accent-lavender/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}

interface DraggableTechIconProps {
  tech: TechIcon
  bounds: { width: number; height: number }
  centerPosition: { x: number; y: number }
  index: number
  totalIcons: number
  containerRef: React.RefObject<HTMLDivElement>
}

function DraggableTechIcon({ tech, bounds, centerPosition, index, totalIcons, containerRef }: DraggableTechIconProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: Math.random() * Math.max(bounds.width, 100), y: Math.random() * Math.max(bounds.height, 100) })
  const [velocity, setVelocity] = useState({ x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 })
  const animationRef = useRef<number>()
  
  const scale = useTransform(useMotionValue(position.x), [0, Math.max(bounds.width, 1)], [0.8, 1.2])
  const rotate = useTransform(useMotionValue(position.y), [0, Math.max(bounds.height, 1)], [-10, 10])

  // Physics-based movement system with collisions
  useEffect(() => {
    if (isDragging || bounds.width === 0 || bounds.height === 0) return

    const iconSize = tech.size
    const attractionForce = 0.003 // Increased force towards center (was 0.001)
    const maxSpeed = 4 // Increased max speed (was 2)
    const friction = 0.99 // Reduced friction for faster movement (was 0.98)

    const animatePhysics = () => {
      if (isDragging) return

      // Calculate distance to center
      const dx = centerPosition.x - position.x
      const dy = centerPosition.y - position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Apply attraction force towards center
      if (distance > 0) {
        const attractionX = (dx / distance) * attractionForce
        const attractionY = (dy / distance) * attractionForce
        
        setVelocity(prev => ({
          x: prev.x + attractionX,
          y: prev.y + attractionY
        }))
      }

      // Update position based on velocity
      const newX = position.x + velocity.x
      const newY = position.y + velocity.y

      // Apply friction
      setVelocity(prev => ({
        x: prev.x * friction,
        y: prev.y * friction
      }))

      // Limit speed
      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
      if (speed > maxSpeed) {
        setVelocity(prev => ({
          x: (prev.x / speed) * maxSpeed,
          y: (prev.y / speed) * maxSpeed
        }))
      }

      // Boundary collision detection
      let finalX = newX
      let finalY = newY
      let newVelX = velocity.x
      let newVelY = velocity.y

      // Check horizontal boundaries
      if (newX <= 0 || newX >= bounds.width - iconSize) {
        newVelX = -newVelX * 0.9 // Increased bounce energy (was 0.8)
        finalX = newX <= 0 ? 0 : bounds.width - iconSize
      }

      // Check vertical boundaries
      if (newY <= 0 || newY >= bounds.height - iconSize) {
        newVelY = -newVelY * 0.9 // Increased bounce energy (was 0.8)
        finalY = newY <= 0 ? 0 : bounds.height - iconSize
      }

      // Update velocity if there was a collision
      if (newVelX !== velocity.x || newVelY !== velocity.y) {
        setVelocity({ x: newVelX, y: newVelY })
      }

      // Ensure position stays within bounds
      const clampedX = Math.max(0, Math.min(bounds.width - iconSize, finalX))
      const clampedY = Math.max(0, Math.min(bounds.height - iconSize, finalY))

      setPosition({ x: clampedX, y: clampedY })

      animationRef.current = requestAnimationFrame(animatePhysics)
    }

    animationRef.current = requestAnimationFrame(animatePhysics)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [bounds.width, bounds.height, isDragging, position.x, position.y, velocity.x, velocity.y, centerPosition.x, centerPosition.y, tech.size])

  const bind = useDrag(({ down, offset: [ox, oy], velocity: [vx, vy], first, last }) => {
    if (first) {
      setIsDragging(true)
      // Cancel physics animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    
    if (down) {
      // Update position in real-time
      const newX = Math.max(0, Math.min(bounds.width - tech.size, ox))
      const newY = Math.max(0, Math.min(bounds.height - tech.size, oy))
      
      setPosition({ x: newX, y: newY })
    }
    
    if (last) {
      setIsDragging(false)
      // Set new velocity based on drag velocity
      setVelocity({ x: vx * 0.5, y: vy * 0.5 })
    }
  }, {
    // Configure drag options
    from: () => [position.x, position.y],
    bounds: { left: 0, top: 0, right: bounds.width - tech.size, bottom: bounds.height - tech.size },
    rubberband: true,
    preventDefault: true,
    filterTaps: true,
  })

  // Use position directly since physics animation updates position
  const finalX = position.x
  const finalY = position.y

  return (
    <div
      {...bind()}
      style={{
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 20 : 5,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        transform: `translate(${finalX}px, ${finalY}px) scale(${isDragging ? 1.2 : scale.get()}) rotate(${isDragging ? 0 : rotate.get()}deg)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      }}
      className="group"
    >
      <div
        className="relative flex items-center justify-center rounded-2xl border-2 border-transparent hover:border-accent-lavender/30 transition-all duration-300"
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

        {/* Glow effect when dragging */}
        {isDragging && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${tech.color}20 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Tooltip */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background-primary border border-border-primary rounded-lg px-2 py-1 text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          initial={{ y: 5 }}
          whileHover={{ y: 0 }}
        >
          {tech.name}
        </motion.div>
      </div>
    </div>
  )
} 