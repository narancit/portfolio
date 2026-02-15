import React from 'react';

interface SectionWrapperProps {
  id: string;
  heading: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  containerClassName?: string;
}

export function SectionWrapper({
  id,
  heading,
  description,
  children,
  className = "py-16 md:py-24",
  headingClassName = "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
  containerClassName = "container mx-auto px-4 max-w-7xl"
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={className}
      aria-labelledby={`${id}-heading`}
    >
      <div className={containerClassName}>
        <div className="text-center mb-12">
          <h2 id={`${id}-heading`} className={headingClassName}>
            {heading}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
