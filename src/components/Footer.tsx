
import { personalInfo } from "@/utils/demoData";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <h3 className="text-xl font-bold mb-4">DevPortfolio</h3>
            <p className="text-foreground/70 max-w-md">
              A full-stack developer portfolio showcasing projects, skills, and 
              blog posts. Connect with me to discuss potential collaborations
              or opportunities.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 mb-4">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors border border-border"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors border border-border"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="bg-background hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors border border-border"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-foreground/70">
              {personalInfo.location}
            </p>
            <p className="text-foreground/70">
              {personalInfo.email}
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-foreground/60 text-sm">
          <p>
            © {year} DevPortfolio. All rights reserved.
          </p>
          <p className="mt-2">
            Designed and developed with ❤️ using React, Node.js, and MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
