# Project Structure

## Directory Organization

```
portfolio-website/
├── app/                    # Next.js App Router (pages & API routes)
│   ├── api/               # API route handlers
│   │   ├── auth/         # Authentication endpoints
│   │   ├── contact/      # Contact form submission
│   │   └── resume/       # Resume download
│   ├── blog/             # Blog pages
│   │   └── [slug]/       # Dynamic blog post routes
│   ├── layout.tsx        # Root layout with navigation & footer
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles & CSS variables
├── components/            # React components
│   ├── sections/         # Page section components (Hero, Projects, Skills, etc.)
│   └── ui/               # Reusable UI components (shadcn/ui)
├── data/                 # Static data files (TypeScript)
├── lib/                  # Utility functions & helpers
├── types/                # TypeScript type definitions
├── public/               # Static assets (images, icons)
│   └── images/
└── docs/                 # Documentation files
```

## Key Conventions

### File Naming

- React components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities & data: kebab-case (e.g., `personal-info.ts`)
- API routes: lowercase (e.g., `route.ts`)

### Component Organization

- **Sections**: Large page sections in `components/sections/`
- **UI Components**: Reusable primitives in `components/ui/`
- **Server Components**: Default for all components unless "use client" directive
- **Client Components**: Use "use client" only when needed (interactivity, hooks)

### Data Management

- Static data stored in `data/` directory as TypeScript files
- Type definitions in `types/portfolio.ts`
- No database - all content is statically generated

### Styling Patterns

- Tailwind utility classes for styling
- `cn()` utility from `lib/utils.ts` for conditional classes
- CSS variables in `globals.css` for theme colors
- Responsive breakpoints: mobile (max-767px), tablet (768-1023px), desktop (1024px+)

### API Routes

- Located in `app/api/` following Next.js App Router conventions
- Each route has a `route.ts` file with HTTP method handlers
- Authentication handled via `lib/auth.ts`

### Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Skip-to-content link for keyboard navigation
- Minimum touch target size (44x44px)
- Focus management and keyboard navigation support

### Import Patterns

- Use `@/` path alias for all imports
- Group imports: external packages, then internal modules
- Example: `import { Button } from "@/components/ui/button"`
