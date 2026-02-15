import { projects as projectsData } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Projects | Melnar Ancit Cordova',
  description: 'A showcase of my work and coding projects',
};

export default function ProjectsPage() {
  // const allProjects = projectsData.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A showcase of my work and coding projects. Each project demonstrates
            different skills and technologies I&apos;ve worked with.
          </p>
        </div>

        {/* Projects Grid */}
        {projectsData.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Project portfolio"
          >
            {projectsData.map((project) => (
              <div key={project.id} role="listitem">
                <ProjectCard project={project} showLongDescription />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No projects to display at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
