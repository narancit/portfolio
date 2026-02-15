# Technology Stack

## Core Framework

- **Next.js 14+** with App Router
- **React 18** for UI components
- **TypeScript 5** for type safety

## Styling & UI

- **Tailwind CSS 3** for utility-first styling
- **shadcn/ui** for accessible component primitives
- **Radix UI** for headless component foundations
- **lucide-react** for icons
- **tailwindcss-animate** for animations
- **@tailwindcss/typography** for markdown styling

## Content & Validation

- **react-markdown** with **rehype-highlight** for markdown rendering
- **highlight.js** for code syntax highlighting
- **Zod** for schema validation

## External Services

- **Resend** for email delivery (contact form)

## Development Tools

- **ESLint** with Next.js config
- **PostCSS** for CSS processing
- **TypeScript** strict mode enabled

## Common Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Create optimized production build
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint checks
```

## Path Aliases

- `@/*` maps to project root for clean imports
- Example: `import { Button } from "@/components/ui/button"`

## Image Optimization

Next.js configured for AVIF and WebP formats for optimal performance.
