# Design Document: Architecture Simplification

## Overview

This design outlines the approach for simplifying the portfolio website architecture by removing unnecessary abstractions, consolidating components, and reducing code complexity by 30-40%. The refactoring will maintain all existing functionality while improving maintainability and reducing cognitive overhead for developers.

### Current State Analysis

The portfolio website currently has:
- 21 components (target: 12-15)
- ~100 lines of duplicated section boilerplate across 5 section components
- 6 trivial data access wrapper functions in lib/data-access.ts
- Verbose error handling utilities in lib/error-handler.ts (mostly unused)
- Complex markdown renderer with 40+ lines of custom component overrides
- Over-engineered rate limiter for simple contact form
- 3 unused dependencies: class-variance-authority, rehype-raw, remark-gfm
- Verbose API routes with excessive error handling

### Simplification Strategy

The refactoring follows these principles:
1. **Direct over indirect**: Remove wrapper functions and use direct imports
2. **Inline over abstraction**: Inline simple logic instead of creating utilities
3. **Reuse over duplication**: Create SectionWrapper to eliminate boilerplate
4. **Standard over custom**: Use Tailwind prose classes instead of custom markdown styling
5. **Essential over comprehensive**: Keep only necessary error handling and features

## Architecture

### High-Level Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Simplified with inline error handling
│   ├── blog/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx       # Refactored to use SectionWrapper
│   │   ├── ProjectsSection.tsx   # Refactored to use SectionWrapper
│   │   ├── SkillsSection.tsx     # Refactored to use SectionWrapper
│   │   ├── BlogSection.tsx       # Refactored to use SectionWrapper
│   │   └── ContactSection.tsx    # Refactored to use SectionWrapper
│   └── ui/
│       ├── SectionWrapper.tsx    # NEW: Reusable section container
│       ├── navigation.tsx
│       ├── contact-form.tsx
│       ├── project-card.tsx
│       ├── markdown-renderer.tsx # Simplified to use prose classes
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
│       # REMOVED: tech-icon.tsx, skill-badge.tsx, blog-card.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── blog-posts.ts
│   ├── personal-info.ts
│   └── tech-stack.ts
├── lib/
│   ├── utils.ts                  # Keep (contains cn utility)
│   └── validation.ts             # Keep (contains Zod schemas)
│   # REMOVED: data-access.ts, error-handler.ts, rate-limiter.ts
└── types/
    └── portfolio.ts
```

### Component Reduction Strategy

**Components to Remove (3):**
1. `tech-icon.tsx` - Inline into HeroSection (only used once)
2. `skill-badge.tsx` - Inline into SkillsSection (only used once)
3. `blog-card.tsx` - Inline into BlogSection (only used once)

**Components to Add (1):**
1. `SectionWrapper.tsx` - Reusable section container

**Net Reduction:** 21 → 19 components (with potential for further reduction)

### File Removal Strategy

**Files to Remove (3):**
1. `lib/data-access.ts` - Replace with direct imports
2. `lib/error-handler.ts` - Replace with inline error responses
3. `lib/rate-limiter.ts` - Simplify or remove based on needs

## Components and Interfaces

### SectionWrapper Component

A new reusable component that encapsulates common section structure and eliminates ~100 lines of boilerplate.

```typescript
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
```

### Simplified MarkdownRenderer

Replace 40+ lines of custom component overrides with Tailwind prose classes:

```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert prose-green max-w-none ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

**Key Changes:**
- Remove `remarkGfm` plugin (unused GitHub Flavored Markdown features)
- Remove `rehypeRaw` plugin (unnecessary HTML parsing)
- Remove all custom component overrides (h1, h2, h3, a, code, pre, blockquote, ul, ol, p, table, th, td, hr)
- Rely on Tailwind's `@tailwindcss/typography` prose classes for styling
- Keep only `rehypeHighlight` for syntax highlighting

### Refactored Section Components

Example of ProjectsSection using SectionWrapper:

**Before (25 lines):**
```typescript
export function ProjectsSection() {
  const projects = getAllProjects();

  return (
    <section 
      id="projects" 
      className="py-16 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 id="projects-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and coding projects
          </p>
        </div>
        {/* ... content ... */}
      </div>
    </section>
  );
}
```

**After (15 lines):**
```typescript
export function ProjectsSection() {
  const projects = projectsData.sort((a, b) => a.order - b.order);

  return (
    <SectionWrapper
      id="projects"
      heading="Projects"
      description="A showcase of my recent work and coding projects"
    >
      {/* ... content ... */}
    </SectionWrapper>
  );
}
```

### Simplified API Route

Example of contact route with inline error handling:

**Before (120+ lines with error-handler.ts):**
```typescript
import { handleAPIError, ErrorResponses } from '@/lib/error-handler';
import { contactRateLimiter } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimitResult = contactRateLimiter.check(clientIP);
    
    if (!rateLimitResult.allowed) {
      return ErrorResponses.tooManyRequests(new Date(rateLimitResult.resetTime));
    }
    // ... more code
  } catch (error) {
    return handleAPIError(error);
  }
}
```

**After (80-90 lines, inline):**
```typescript
export async function POST(request: NextRequest) {
  try {
    // Simple inline rate limiting check (or remove if not needed)
    // ... validation and processing
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error },
        { status: 400 }
      );
    }
    // ... rest of logic
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

### Direct Data Imports

Replace data access layer with direct imports:

**Before:**
```typescript
import { getAllProjects, getFeaturedProjects } from '@/lib/data-access';

const projects = getAllProjects();
const featured = getFeaturedProjects();
```

**After:**
```typescript
import { projects } from '@/data/projects';

const allProjects = projects.sort((a, b) => a.order - b.order);
const featured = projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
```

### Inlined Component Logic

Example of inlining SkillBadge into SkillsSection:

**Before (separate component):**
```typescript
// skill-badge.tsx (30 lines)
export function SkillBadge({ skill }: SkillBadgeProps) {
  const config = proficiencyConfig[skill.proficiency];
  return (
    <div className="...">
      {/* ... */}
    </div>
  );
}

// SkillsSection.tsx
import { SkillBadge } from '@/components/ui/skill-badge';
{category.skills.map((skill) => (
  <SkillBadge key={skill.name} skill={skill} />
))}
```

**After (inlined):**
```typescript
// SkillsSection.tsx
const proficiencyConfig = {
  beginner: { percentage: 25, color: 'bg-slate-500', label: 'Beginner' },
  intermediate: { percentage: 50, color: 'bg-blue-500', label: 'Intermediate' },
  advanced: { percentage: 75, color: 'bg-primary/80', label: 'Advanced' },
  expert: { percentage: 100, color: 'bg-primary', label: 'Expert' },
};

{category.skills.map((skill) => {
  const config = proficiencyConfig[skill.proficiency];
  return (
    <div key={skill.name} className="...">
      {/* ... inline rendering ... */}
    </div>
  );
})}
```

## Data Models

No changes to existing data models. All types in `types/portfolio.ts` remain unchanged:

- `Project`
- `SkillCategory`
- `Skill`
- `BlogPost`
- `TechStack`
- `PersonalInfo`

The refactoring only changes how data is accessed (direct imports vs. wrapper functions), not the data structure itself.


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Removed Files Do Not Exist

*For all* files in the removal list (lib/data-access.ts, lib/error-handler.ts, lib/rate-limiter.ts), those files should not exist in the filesystem after refactoring.

**Validates: Requirements 1.1, 2.1**

### Property 2: No Imports from Removed Modules

*For all* TypeScript/TSX files in the codebase, none should contain import statements referencing the removed modules (lib/data-access, lib/error-handler, lib/rate-limiter).

**Validates: Requirements 1.4, 2.4, 6.3, 8.2**

### Property 3: Components Use Direct Data Imports

*For all* section components that need data, they should import directly from data files (data/projects, data/skills, data/blog-posts) rather than from a data access layer.

**Validates: Requirements 1.2, 1.3**

### Property 4: API Routes Use Inline Error Handling

*For all* API route files, error responses should be created using inline NextResponse.json() calls with appropriate status codes, not imported error handler functions.

**Validates: Requirements 2.2, 2.3, 8.1, 8.3**

### Property 5: Section Components Use SectionWrapper

*For all* section components (HeroSection, ProjectsSection, SkillsSection, BlogSection, ContactSection), they should import and use the SectionWrapper component.

**Validates: Requirements 3.4**

### Property 6: Accessibility Attributes Preserved

*For all* refactored components, accessibility attributes (aria-label, aria-labelledby, role) that existed in the original components should still be present after refactoring.

**Validates: Requirements 9.3**

### Property 7: Removed Dependencies Not in Package.json

*For all* dependencies in the removal list (class-variance-authority, rehype-raw, remark-gfm), they should not appear in the dependencies or devDependencies sections of package.json.

**Validates: Requirements 7.1, 7.2, 7.3**

## Error Handling

### API Route Error Handling

After removing lib/error-handler.ts, API routes will use inline error handling:

**Validation Errors (400):**
```typescript
if (!validationResult.success) {
  return NextResponse.json(
    { error: 'Validation failed', details: validationResult.error },
    { status: 400 }
  );
}
```

**Server Errors (500):**
```typescript
catch (error) {
  console.error('Error context:', error);
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  );
}
```

**Rate Limiting (429) - if kept:**
```typescript
if (requestCount > limit) {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429 }
  );
}
```

### Component Error Boundaries

No changes to error boundaries. The refactoring focuses on simplification, not error boundary logic.

### Data Access Error Handling

With direct imports, error handling becomes simpler:

**Before (with data access layer):**
```typescript
try {
  const projects = getAllProjects();
} catch (error) {
  // Handle data access error
}
```

**After (direct import):**
```typescript
import { projects } from '@/data/projects';
// No try-catch needed - data is static and imported at build time
const sortedProjects = projects.sort((a, b) => a.order - b.order);
```

## Testing Strategy

### Dual Testing Approach

This refactoring requires both unit tests and property-based tests to ensure correctness:

**Unit Tests** will verify:
- SectionWrapper component renders correctly with various prop combinations
- MarkdownRenderer renders markdown with syntax highlighting
- Inlined component logic (skill badges, tech icons, blog cards) renders correctly
- API routes return correct responses for specific inputs
- Error responses have correct status codes and messages

**Property-Based Tests** will verify:
- All removed files do not exist (file system check)
- No imports reference removed modules (codebase scan)
- All section components use SectionWrapper (component analysis)
- All API routes use inline error handling (code structure check)
- Accessibility attributes are preserved (HTML attribute check)
- Removed dependencies are not in package.json (dependency check)

### Testing Configuration

**Property-Based Testing Library:** For this refactoring, we'll use custom scripts rather than a traditional PBT library, since we're testing code structure and file system state rather than algorithmic properties.

**Test Scripts:**
1. File existence checks (verify removed files don't exist)
2. Import analysis (grep/regex to find imports from removed modules)
3. Component structure analysis (verify SectionWrapper usage)
4. Dependency checks (parse package.json)
5. Accessibility attribute checks (parse JSX for ARIA attributes)

**Unit Testing:**
- Test SectionWrapper with different prop combinations
- Test MarkdownRenderer with various markdown inputs
- Test inlined component rendering logic
- Test API route error responses
- Verify visual regression (manual or automated screenshot comparison)

### Manual Testing Checklist

Since some requirements involve visual appearance and user experience:

1. Visual inspection of all pages (home, blog, individual blog posts)
2. Test responsive design at different breakpoints (mobile, tablet, desktop)
3. Test interactive features (navigation, contact form, links)
4. Verify accessibility with screen reader
5. Test contact form submission and error handling
6. Verify syntax highlighting in blog posts

### Code Metrics

Track these metrics before and after refactoring:

- Total lines of code (target: 30-40% reduction)
- Number of component files (target: 12-15 components)
- Number of lib files (target: reduce from 6 to 3)
- Number of dependencies (target: reduce by 3)
- Cyclomatic complexity (should maintain or improve)

### Regression Prevention

To prevent regressions:

1. Take screenshots of all pages before refactoring (visual regression baseline)
2. Document all API response formats before changes
3. List all accessibility attributes before refactoring
4. Run build and verify no TypeScript errors
5. Test all interactive features manually
6. Verify no console errors in browser
