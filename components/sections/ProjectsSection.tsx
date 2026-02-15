import { projects as projectsData } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProjectsSection() {
  const recentProjects = projectsData
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <SectionWrapper
      id="projects"
      heading="Projects"
      description="A showcase of my recent work and coding projects"
    >
      {/* Projects Grid */}
      {recentProjects.length > 0 ? (
        <>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            role="list"
            aria-label="Project portfolio"
          >
            {recentProjects.map((project) => (
              <div key={project.id} role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                aria-label="View all projects"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No projects to display at the moment.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
