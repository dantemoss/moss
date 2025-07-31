import { Github, Linkedin, Mail, FileText } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/dantemoscoso' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/dantemoscoso' },
    { name: 'Email', icon: Mail, href: 'mailto:dante@example.com' },
    { name: 'CV', icon: FileText, href: '/cv.pdf' },
  ]

  return (
    <footer className="bg-background-secondary border-t border-border-primary mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-text-secondary text-sm mb-4 md:mb-0">
            © 2024 Dante Moscoso. Built with Next.js & Tailwind CSS.
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-lavender transition-colors duration-200"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 