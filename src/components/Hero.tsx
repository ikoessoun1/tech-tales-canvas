
import { personalInfo } from "@/utils/demoData";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen pt-20 flex items-center">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6 animate-slide-up">
            <div className="flex items-center gap-2">
              <div className="h-1 w-10 bg-primary"></div>
              <p className="text-primary font-medium">Hi there, I'm</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {personalInfo.name}
              <span className="inline-block animate-wave origin-[70%_70%]"> 👋</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary font-bold">
              {personalInfo.title}
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View My Work</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <SocialLink
                href={personalInfo.socialLinks.github}
                aria-label="GitHub"
                icon={<Github className="size-5" />}
              />
              <SocialLink
                href={personalInfo.socialLinks.linkedin}
                aria-label="LinkedIn"
                icon={<Linkedin className="size-5" />}
              />
              <SocialLink
                href={personalInfo.socialLinks.twitter}
                aria-label="Twitter"
                icon={<Twitter className="size-5" />}
              />
              <SocialLink
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                icon={<Mail className="size-5" />}
              />
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end animate-slide-up animate-delay-200">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({
  href,
  icon,
  className,
  ...props
}: {
  href: string;
  icon: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300",
        className
      )}
      {...props}
    >
      {icon}
    </a>
  );
};

export default Hero;
