import { Project } from '@/types/portfolio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  showLongDescription?: boolean;
}

export function ProjectCard({ project, showLongDescription = false }: ProjectCardProps) {
  return (
    <Card className="group h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      {project.imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={project.imageUrl}
            alt={`Screenshot of ${project.title} project`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {project.description}
        </CardDescription>
        {showLongDescription && project.longDescription && (
          <CardDescription className="text-muted-foreground mt-2">
            {project.longDescription}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-xs"
              role="listitem"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        {project.liveUrl && (
          <Button
            variant="default"
            size="sm"
            asChild
            className="flex-1"
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label={`View live demo of ${project.title} (opens in new tab)`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </a>
          </Button>
        )}
        
        {project.repoUrl && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1"
          >
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label={`View ${project.title} repository on GitHub (opens in new tab)`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Repository
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
