import { projects as projectsData } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function ProjectsSection() {
  const projects = projectsData.sort((a, b) => a.order - b.order);

  return (
    <SectionWrapper
      id="projects"
      heading="Projects"
      description="A showcase of my recent work and coding projects"
    >
      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Project portfolio"
        >
          {projects.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
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
