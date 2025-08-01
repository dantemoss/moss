'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-lavender data-[theme=light]:focus:border-accent-glacier transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent-lavender hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-display font-semibold mb-6">
                Get in Touch
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                I'm currently available for freelance work and full-time opportunities. 
                Whether you have a project in mind or just want to chat, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:dante@example.com"
                className="flex items-center gap-3 p-4 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-lavender data-[theme=light]:hover:border-accent-glacier transition-colors duration-200 group"
              >
                <Mail size={20} className="text-accent-lavender group-hover:text-purple-400 transition-colors duration-200" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-text-secondary">dante@example.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/dantemoscoso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-background-secondary border border-border-primary rounded-xl hover:border-accent-lavender transition-colors duration-200 group"
              >
                <MessageSquare size={20} className="text-accent-lavender group-hover:text-purple-400 transition-colors duration-200" />
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-text-secondary">Connect with me</div>
                </div>
              </a>
            </div>

            <div className="p-6 bg-background-secondary border border-border-primary rounded-xl">
              <h4 className="font-display font-semibold mb-3">What I can help with:</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Full-stack web development</li>
                <li>• AI/ML integration</li>
                <li>• API development</li>
                <li>• UI/UX design</li>
                <li>• Technical consulting</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 