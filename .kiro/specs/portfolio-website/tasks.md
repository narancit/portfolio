# Implementation Plan: Portfolio Website

## Overview

This implementation plan breaks down the portfolio website into discrete, incremental tasks. Each task builds on previous work, starting with project setup and foundational components, then adding features section by section, and finally integrating everything together. The site will be built using Next.js 14+ with TypeScript, Tailwind CSS, and shadcn/ui components.

## Tasks

- [x] 1. Initialize Next.js project and configure development environment
  - Create Next.js 14+ project with TypeScript and App Router
  - Install and configure Tailwind CSS
  - Initialize shadcn/ui and install base components (Button, Input, Card, etc.)
  - Set up project structure (components, data, lib, types directories)
  - Configure environment variables template (.env.example)
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 2. Define TypeScript types and data models
  - Create types/portfolio.ts with all interface definitions (TechStack, Project, Skill, BlogPost, PersonalInfo, ContactFormData)
  - Create lib/validation.ts with Zod schemas for form validation
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 3. Create static data files
  - [x] 3.1 Create data/personal-info.ts with Melnar's information
    - Add full name, title, bio, email, GitHub, and social links
    - _Requirements: 1.1, 5.6_
  
  - [x] 3.2 Create data/tech-stack.ts with technology icons
    - Add primary technologies with icon names and categories
    - _Requirements: 1.2_
  
  - [x] 3.3 Create data/projects.ts with project showcase data
    - Add project entries with titles, descriptions, technologies, and links
    - Include featured flag and ordering
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 3.4 Create data/skills.ts with skills matrix data
    - Organize skills into categories with proficiency levels
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [x] 3.5 Create data/blog-posts.ts with blog article data
    - Add blog posts with markdown content, metadata, and tags
    - _Requirements: 4.1, 4.2_

- [x] 4. Create data access layer
  - Create lib/data-access.ts with helper functions (getAllProjects, getFeaturedProjects, getAllSkillCategories, getAllBlogPosts, getBlogPostBySlug, getRecentBlogPosts)
  - _Requirements: 8.4_

- [x] 5. Configure Tailwind theme for dark mode design
  - Update tailwind.config.ts with custom color palette (black background, neon green accent, slate gray)
  - Add custom design tokens and responsive breakpoints
  - _Requirements: 6.1, 6.2, 6.3, 7.1, 7.2, 7.3_

- [x] 6. Build UI utility components
  - [x] 6.1 Create components/ui/section-container.tsx
    - Implement consistent section spacing and max-width container
    - _Requirements: 6.5_
  
  - [x] 6.2 Create components/ui/tech-icon.tsx
    - Render technology icons with tooltips
    - Use lucide-react icons
    - _Requirements: 1.2_
  
  - [x] 6.3 Create components/ui/markdown-renderer.tsx
    - Implement markdown rendering with syntax highlighting for code blocks
    - Use react-markdown or similar library
    - _Requirements: 4.4_

- [x] 7. Build Hero Section
  - [x] 7.1 Create components/sections/HeroSection.tsx
    - Display full name prominently with title
    - Render tech stack icons in a grid
    - Add GitHub link with external link icon (opens in new tab)
    - Implement responsive layout
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 8. Build Projects Section
  - [x] 8.1 Create components/ui/project-card.tsx
    - Display project title, description, and technology badges
    - Add conditional rendering for live demo and repo links (new tab)
    - Style with dark theme and hover effects
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [x] 8.2 Create components/sections/ProjectsSection.tsx
    - Implement responsive grid layout for project cards
    - Fetch and display all projects using data access layer
    - Handle empty state gracefully
    - _Requirements: 2.1, 2.5_

- [x] 9. Build Skills Section
  - [x] 9.1 Create components/ui/skill-badge.tsx
    - Display skill name with visual proficiency indicator (progress bar or badge)
    - Style according to proficiency level
    - _Requirements: 3.2_
  
  - [x] 9.2 Create components/sections/SkillsSection.tsx
    - Organize skills by category in a matrix layout
    - Render skill badges for each skill
    - Implement responsive layout
    - _Requirements: 3.1, 3.3, 3.4_

- [x] 10. Build Blog Section
  - [x] 10.1 Create components/ui/blog-card.tsx
    - Display blog post title, excerpt, date, and reading time
    - Add link to full article
    - Style with hover effects
    - _Requirements: 4.2_
  
  - [x] 10.2 Create components/sections/BlogSection.tsx
    - Display recent blog posts (limit to 3)
    - Add "View All Posts" link to blog page
    - _Requirements: 4.1_
  
  - [x] 10.3 Create app/blog/page.tsx
    - List all blog posts with pagination or infinite scroll
    - Use blog cards for display
    - _Requirements: 4.1_
  
  - [x] 10.4 Create app/blog/[slug]/page.tsx
    - Fetch blog post by slug
    - Render full markdown content with markdown-renderer
    - Display metadata (title, date, tags, reading time)
    - Handle 404 for missing posts
    - _Requirements: 4.3, 4.4_

- [x] 11. Build Contact Section and Form
  - [x] 11.1 Create components/ui/contact-form.tsx (Client Component)
    - Implement form with name, email, and message fields
    - Add client-side validation using Zod schema
    - Display validation errors inline
    - Handle form submission with loading and success/error states
    - _Requirements: 5.1, 5.3_
  
  - [x] 11.2 Create app/api/contact/route.ts
    - Validate request body using Zod schema
    - Implement rate limiting (5 submissions per hour per IP)
    - Send email using Resend API
    - Return appropriate success/error responses
    - _Requirements: 5.2_
  
  - [x] 11.3 Create components/sections/ContactSection.tsx
    - Embed contact form
    - Display social media links and contact information
    - _Requirements: 5.1, 5.6_

- [x] 12. Implement authentication for resume download
  - [x] 12.1 Create lib/auth.ts
    - Implement isAuthenticated() function using cookies
    - Use environment variable for auth token validation
    - _Requirements: 5.4_
  
  - [x] 12.2 Create app/api/auth/login/route.ts
    - Validate admin password against environment variable
    - Set secure HTTP-only cookie on successful login
    - _Requirements: 5.4_
  
  - [x] 12.3 Create app/api/auth/logout/route.ts
    - Clear authentication cookie
    - _Requirements: 5.4_
  
  - [x] 12.4 Create app/api/resume/download/route.ts
    - Check authentication before serving resume
    - Return 401 if not authenticated
    - Serve resume PDF with appropriate headers
    - _Requirements: 5.4, 5.5_
  
  - [x] 12.5 Create components/ui/admin-panel.tsx (Client Component)
    - Show login form when not authenticated (hidden by default)
    - Show resume download button and logout when authenticated
    - Position fixed in corner with low opacity
    - _Requirements: 5.4, 5.5_

- [x] 13. Build Navigation Component
  - [x] 13.1 Create components/ui/navigation.tsx (Client Component)
    - Implement sticky navigation bar with links to all sections
    - Add smooth scroll behavior on link clicks
    - Highlight active section based on scroll position
    - Implement mobile hamburger menu with collapsible drawer
    - Ensure keyboard accessibility (Tab navigation, Enter/Space activation)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 14. Create main landing page
  - [x] 14.1 Create app/page.tsx
    - Import and render all section components in order (Hero, Projects, Skills, Blog, Contact)
    - Fetch data using data access layer
    - Pass data as props to section components
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 15. Create root layout with navigation and footer
  - [x] 15.1 Update app/layout.tsx
    - Add Navigation component
    - Include AdminPanel component with authentication check
    - Add footer with copyright and links
    - Configure metadata (title, description, favicon)
    - _Requirements: 10.1_

- [x] 16. Implement image optimization
  - Create public/images directory structure
  - Add placeholder images for projects
  - Use Next.js Image component for all images
  - Configure next.config.js for image optimization (WebP/AVIF)
  - _Requirements: 9.5_

- [x] 17. Add error handling and loading states
  - Create app/error.tsx for error boundary
  - Create app/loading.tsx for loading states
  - Create app/not-found.tsx for 404 page
  - Add error handling in API routes
  - _Requirements: Error Handling section_

- [ ] 18. Implement accessibility features
  - Add proper ARIA labels to interactive elements
  - Ensure minimum touch target sizes (44x44px)
  - Verify keyboard navigation works throughout
  - Add skip-to-content link
  - Test with screen reader
  - _Requirements: 7.5, 10.5_

- [ ] 19. Verify responsive design
  - Test all breakpoints (mobile <768px, tablet 768-1023px, desktop ≥1024px)
  - Ensure Hero Section is visible across all viewport widths (320px-2560px)
  - Verify project grid reflows to single column on mobile
  - Test navigation menu collapses on mobile
  - _Requirements: 1.4, 2.5, 7.1, 7.2, 7.3, 10.4_

- [ ] 20. Verify color contrast and theme consistency
  - Ensure text contrast meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
  - Verify neon green accent color on all interactive elements
  - Check dark theme consistency across all pages
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 21. Final integration and polish
  - Add resume.pdf to public directory
  - Set up environment variables (.env.local)
  - Test contact form end-to-end with email service
  - Test authentication flow for resume download
  - Verify all external links open in new tabs
  - Run build and test static generation
  - _Requirements: 5.2, 5.5, 8.4, 8.5_

- [ ] 22. Checkpoint - Final review
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- No automated tests are required per project requirements
- All tasks build incrementally on previous work
- Each task references specific requirements for traceability
- Environment variables needed: ADMIN_PASSWORD, AUTH_TOKEN, RESEND_API_KEY
- Resume PDF file should be placed in public/resume.pdf
- The site will be fully static except for the contact form API route
