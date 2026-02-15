import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionContainer({
  children,
  id,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 px-4 sm:px-6 lg:px-8",
        "w-full mx-auto max-w-7xl",
        className
      )}
    >
      {children}
    </section>
  );
}
