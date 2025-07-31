'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Award, 
  Code, 
  Database, 
  Globe, 
  Zap, 
  Cpu, 
  Cloud, 
  Shield, 
  Rocket,
  Star,
  TrendingUp,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import TechStackPlayground from './TechStackPlayground'

const certifications = [
  { 
    name: "Microsoft PL-900", 
    description: "Power Platform Fundamentals",
    icon: Award,
    year: "2024",
    badge: "Microsoft"
  },
  { 
    name: "AWS Solutions Architect", 
    description: "Associate Level",
    icon: Cloud,
    year: "2023",
    badge: "AWS"
  },
  { 
    name: "Google Cloud", 
    description: "Professional Cloud Developer",
    icon: Globe,
    year: "2023",
    badge: "Google"
  },
  { 
    name: "Azure Developer", 
    description: "Microsoft Certified",
    icon: Shield,
    year: "2024",
    badge: "Microsoft"
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            About Me
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            I'm a passionate full-stack developer with a focus on creating innovative 
            solutions that combine cutting-edge technologies with exceptional user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-text-secondary leading-relaxed">
                With over 5 years of experience in web development, I specialize in building 
                scalable applications that leverage modern technologies and AI capabilities. 
                My passion lies in creating intuitive interfaces and robust backend systems 
                that solve real-world problems.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                I'm constantly learning and exploring new technologies, particularly in the 
                AI/ML space, to stay ahead of industry trends and deliver innovative solutions 
                that make a difference.
              </p>

              <div className="flex items-center gap-2 text-accent-lavender">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Available for new opportunities</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                  <div className="text-2xl font-display font-bold text-accent-lavender mb-1">50+</div>
                  <div className="text-xs text-text-secondary">Projects Completed</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                  <div className="text-2xl font-display font-bold text-accent-lavender mb-1">5+</div>
                  <div className="text-xs text-text-secondary">Years Experience</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                  <div className="text-2xl font-display font-bold text-accent-lavender mb-1">15+</div>
                  <div className="text-xs text-text-secondary">Technologies</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-background-secondary border border-border-primary rounded-xl"
                >
                  <div className="text-2xl font-display font-bold text-accent-lavender mb-1">4</div>
                  <div className="text-xs text-text-secondary">Certifications</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Playground */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="p-3 bg-accent-lavender/10 border border-accent-lavender/20 rounded-2xl">
                  <Code size={24} className="text-accent-lavender" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-lavender rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">Tech Stack</h3>
                <p className="text-text-secondary">Interactive exploration of my skills</p>
              </div>
            </motion.div>
            
            <TechStackPlayground />
          </motion.div>
        </div>

        {/* Certifications Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                <Award size={24} className="text-yellow-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold">Certifications</h3>
              <p className="text-text-secondary">Professional achievements & credentials</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-6 bg-background-secondary border border-border-primary rounded-2xl hover:border-accent-lavender/50 transition-all duration-500 hover:shadow-xl">
                  {/* Certificate glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-background-primary border border-border-primary rounded-xl group-hover:border-yellow-500/30 transition-colors duration-300">
                          <cert.icon size={20} className="text-yellow-500" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-lg group-hover:text-accent-lavender transition-colors duration-300">
                            {cert.name}
                          </h4>
                          <p className="text-text-secondary text-sm mt-1">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-text-secondary font-medium">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Badge and verification */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-background-primary border border-border-primary rounded-full">
                          <span className="text-xs font-medium text-accent-lavender">
                            {cert.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp size={12} className="text-green-400" />
                          <span className="text-xs text-green-400 font-medium">Verified</span>
                        </div>
                      </div>
                      <div className="text-xs text-text-secondary">
                        Professional
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 