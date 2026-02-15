"use client"

import { PersonalInfo, TechStack } from "@/types/portfolio"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface HeroSectionProps {
  personalInfo: PersonalInfo
  techStack: TechStack[]
}

export function HeroSection({ personalInfo, techStack }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center py-16 md:py-24"
      aria-label="Introduction and hero section"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-8">
          {/* Name and Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {personalInfo.fullName}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              {personalInfo.title}
            </p>
          </div>

          {/* Bio */}
          <p className="text-base md:text-lg text-secondary-foreground max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>

          {/* Tech Stack Badges */}
          <div className="py-8">
            <h2 className="text-lg md:text-xl font-semibold mb-6 text-muted-foreground">
              Tech Stack
            </h2>
            <div 
              className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
              role="list"
              aria-label="Technologies and tools"
            >
              {techStack.map((tech) => {
                // Convert icon name to PascalCase for lucide-react
                const iconName = tech.icon
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join("")

                // Get the icon component from lucide-react
                const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<
                  LucideIcons.LucideProps
                >

                // Fallback to Code icon if the specified icon doesn't exist
                const Icon = IconComponent || LucideIcons.Code

                return (
                  <Badge 
                    key={tech.name} 
                    variant="outline"
                    className={cn(
                      "gap-1.5 px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    )}
                    role="listitem"
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{tech.name}</span>
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* GitHub Link */}
          <div className="pt-4">
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View my GitHub profile (opens in new tab)"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                View GitHub
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
