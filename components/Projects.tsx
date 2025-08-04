'use client'

import { motion } from 'framer-motion'
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
    githubUrl: "https://github.com/dantemoscoso/ai-chat"
  },
  {
    id: 2,
    titleKey: 'projects.ecommerce.title',
    descriptionKey: 'projects.ecommerce.description',
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#6366F1",
    icon: "🛒",
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/ecommerce"
  },
  {
    id: 3,
    titleKey: 'projects.taskManager.title',
    descriptionKey: 'projects.taskManager.description',
    technologies: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    color: "#F59E0B",
    icon: "📋",
    liveUrl: "https://task-manager-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/task-manager"
  },
  {
    id: 4,
    titleKey: 'projects.portfolio.title',
    descriptionKey: 'projects.portfolio.description',
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    color: "#B692F6",
    icon: "✨",
    liveUrl: "https://dantemoscoso.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/portfolio"
  },
  {
    id: 5,
    titleKey: 'projects.analytics.title',
    descriptionKey: 'projects.analytics.description',
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    color: "#EF4444",
    icon: "📈",
    liveUrl: "https://analytics-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/analytics"
  },
  {
    id: 6,
    titleKey: 'projects.social.title',
    descriptionKey: 'projects.social.description',
    technologies: ["React Native", "Firebase", "Redux", "Socket.io"],
    color: "#06B6D4",
    icon: "📱",
    liveUrl: "https://social-app-demo.vercel.app",
    githubUrl: "https://github.com/dantemoscoso/social-app"
  }
]

// Linux Window Component
function LinuxWindow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-background-secondary border border-border-primary rounded-lg shadow-2xl">
      {/* Window Title Bar */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 flex items-center justify-between">
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
        </div>
        
        {/* Window Title */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent-lavender/20 rounded flex items-center justify-center">
            <span className="text-xs text-accent-lavender">📁</span>
          </div>
          <span className="text-sm text-white font-medium data-[theme=dark]:text-text-primary">{title}</span>
        </div>
        
        {/* Spacer for centering */}
        <div className="w-12"></div>
      </div>
      
      {/* Window Content */}
      <div className="p-12 bg-background-primary overflow-visible">
        {children}
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-text-primary to-accent-lavender bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-text-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Single Linux Window containing all projects */}
        <LinuxWindow title={t('projects.window.title')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex flex-col items-center ${index >= 3 ? 'mt-20' : 'mt-8'}`}
              >
                {/* Folder Container */}
                <div className="mb-6 flex justify-center">
                  <div className="relative" style={{ height: '200px' }}>
                    <Folder 
                      size={2} 
                      color={project.color} 
                      className="custom-folder"
                      items={[
                        <div key="1" className="w-full h-full flex items-center justify-center text-3xl">
                          {project.icon}
                        </div>,
                        <div key="2" className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
                          {t(project.titleKey).split(' ')[0]}
                        </div>,
                        <div key="3" className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                          {project.technologies[0]}
                        </div>
                      ]}
                    />
                  </div>
                </div>
                
                {/* Project Information */}
                <div className="text-center w-full space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-4 group-hover:text-accent-lavender transition-colors duration-300">
                      {t(project.titleKey)}
                    </h3>
                    
                    <p className="text-text-secondary text-base leading-relaxed line-clamp-3">
                      {t(project.descriptionKey)}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-background-primary/60 border border-border-primary rounded-full text-xs text-text-secondary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1.5 bg-background-primary/60 border border-border-primary rounded-full text-xs text-text-secondary font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 justify-center pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent-glacier/10 border border-border-primary rounded-lg text-accent-glacier hover:bg-accent-glacier/20 data-[theme=dark]:bg-accent-lavender/10 data-[theme=dark]:text-accent-lavender data-[theme=dark]:hover:bg-accent-lavender/20 transition-all duration-200 text-sm font-medium"
                      >
                        {t('projects.viewDemo')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-background-primary/60 border border-border-primary rounded-lg text-text-secondary hover:text-accent-lavender data-[theme=light]:hover:text-accent-glacier transition-all duration-200 text-sm font-medium"
                      >
                        {t('projects.viewCode')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </LinuxWindow>
      </div>
    </section>
  )
} 