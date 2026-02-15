import { skillCategories as skillCategoriesData } from '@/data/skills';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn, calculateYearsOfExperience } from '@/lib/utils';

const proficiencyConfig = {
  beginner: {
    percentage: 25,
    color: 'bg-slate-500',
    label: 'Beginner',
  },
  intermediate: {
    percentage: 50,
    color: 'bg-blue-500',
    label: 'Intermediate',
  },
  advanced: {
    percentage: 75,
    color: 'bg-primary/80',
    label: 'Advanced',
  },
  expert: {
    percentage: 100,
    color: 'bg-primary',
    label: 'Expert',
  },
};

export function SkillsSection() {
  const skillCategories = skillCategoriesData.sort((a, b) => a.order - b.order);

  return (
    <SectionWrapper
      id="skills"
      heading="Skills & Expertise"
      description="Technical skills and proficiency levels across various domains"
    >
      {/* Skills Matrix */}
      {skillCategories.length > 0 ? (
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.name}>
              {/* Category Title */}
              <h3
                className="text-xl md:text-2xl font-semibold mb-6 text-primary"
                id={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category.name}
              </h3>

              {/* Skills Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                role="list"
                aria-labelledby={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category.skills.map((skill) => {
                  const config = proficiencyConfig[skill.proficiency];
                  const displayYears =
                    skill.yearsOfExperience ??
                    (skill.experienceStartDate
                      ? calculateYearsOfExperience(skill.experienceStartDate)
                      : undefined);

                  return (
                    <div key={skill.name} role="listitem">
                      <div
                        className={cn(
                          'flex flex-col gap-2 p-3 rounded-lg border border-muted bg-muted/20 hover:bg-muted/30 transition-colors',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {config.label}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full transition-all duration-300',
                              config.color,
                            )}
                            style={{ width: `${config.percentage}%` }}
                          />
                        </div>

                        {displayYears && (
                          <span className="text-xs text-muted-foreground">
                            {displayYears}{' '}
                            {displayYears === 1 ? 'year' : 'years'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No skills to display at the moment.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
