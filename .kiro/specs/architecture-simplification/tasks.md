# Implementation Plan: Architecture Simplification

## Overview

This plan outlines the incremental steps to simplify the portfolio website architecture by removing unnecessary abstractions, consolidating components, and reducing code complexity by 30-40%. Each task builds on previous steps to ensure the codebase remains functional throughout the refactoring process.

## Tasks

- [x] 1. Create SectionWrapper component
  - Create components/ui/SectionWrapper.tsx with props for id, heading, description, and children
  - Include consistent spacing (py-16 md:py-24), container layout, and accessibility attributes
  - Add TypeScript interface for SectionWrapperProps
  - _Requirements: 3.1, 3.2, 3.3_

- [ ]* 1.1 Write unit tests for SectionWrapper
  - Test rendering with all props provided
  - Test rendering with optional props omitted
  - Test accessibility attributes are present
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 2. Refactor section components to use SectionWrapper
  - [x] 2.1 Refactor ProjectsSection to use SectionWrapper
    - Replace section boilerplate with SectionWrapper component
    - Update imports to include SectionWrapper
    - Verify accessibility attributes are preserved
    - _Requirements: 3.4, 9.3_
  
  - [x] 2.2 Refactor SkillsSection to use SectionWrapper
    - Replace section boilerplate with SectionWrapper component
    - Update imports to include SectionWrapper
    - Verify accessibility attributes are preserved
    - _Requirements: 3.4, 9.3_
  
  - [x] 2.3 Refactor BlogSection to use SectionWrapper
    - Replace section boilerplate with SectionWrapper component
    - Update imports to include SectionWrapper
    - Verify accessibility attributes are preserved
    - _Requirements: 3.4, 9.3_
  
  - [x] 2.4 Refactor ContactSection to use SectionWrapper
    - Replace section boilerplate with SectionWrapper component
    - Update imports to include SectionWrapper
    - Verify accessibility attributes are preserved
    - _Requirements: 3.4, 9.3_

- [ ]* 2.5 Write property test for SectionWrapper usage
  - **Property 5: Section Components Use SectionWrapper**
  - **Validates: Requirements 3.4**

- [x] 3. Checkpoint - Verify section components work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Inline wrapper components into their parent sections
  - [x] 4.1 Inline SkillBadge into SkillsSection
    - Copy proficiencyConfig and rendering logic into SkillsSection
    - Remove import of SkillBadge component
    - Delete components/ui/skill-badge.tsx
    - Verify visual styling is preserved
    - _Requirements: 5.1, 5.3_
  
  - [x] 4.2 Inline TechIcon into HeroSection
    - Copy icon rendering and tooltip logic into HeroSection
    - Remove import of TechIcon component
    - Delete components/ui/tech-icon.tsx
    - Verify visual styling and tooltips work correctly
    - _Requirements: 5.1, 5.3_
  
  - [x] 4.3 Inline BlogCard into BlogSection
    - Copy card rendering logic into BlogSection
    - Remove import of BlogCard component
    - Delete components/ui/blog-card.tsx
    - Verify visual styling and links work correctly
    - _Requirements: 5.1, 5.3_

- [ ]* 4.4 Verify component count reduction
  - Count component files in components directory
  - Verify total is between 12-15 components
  - _Requirements: 5.4_

- [ ] 5. Remove data access layer and use direct imports
  - [x] 5.1 Update ProjectsSection to use direct imports
    - Import projects directly from @/data/projects
    - Implement sorting logic inline: projects.sort((a, b) => a.order - b.order)
    - Remove import from @/lib/data-access
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [x] 5.2 Update SkillsSection to use direct imports
    - Import skillCategories directly from @/data/skills
    - Implement sorting logic inline: skillCategories.sort((a, b) => a.order - b.order)
    - Remove import from @/lib/data-access
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [x] 5.3 Update BlogSection to use direct imports
    - Import blogPosts directly from @/data/blog-posts
    - Implement sorting logic inline: blogPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    - Remove import from @/lib/data-access
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [x] 5.4 Update blog page to use direct imports
    - Update app/blog/[slug]/page.tsx to import blogPosts directly
    - Implement getBlogPostBySlug logic inline: blogPosts.find(post => post.slug === slug)
    - Remove import from @/lib/data-access
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [x] 5.5 Delete lib/data-access.ts
    - Verify no remaining imports reference this file
    - Delete the file
    - _Requirements: 1.1_

- [ ]* 5.6 Write property tests for direct imports
  - **Property 2: No Imports from Removed Modules (data-access)**
  - **Property 3: Components Use Direct Data Imports**
  - **Validates: Requirements 1.2, 1.3, 1.4**

- [x] 6. Checkpoint - Verify data access refactoring works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Simplify API routes and remove error handler
  - [x] 7.1 Simplify contact API route
    - Replace error handler imports with inline error responses
    - Use inline NextResponse.json() for validation errors (status 400)
    - Use inline NextResponse.json() for server errors (status 500)
    - Maintain rate limiting logic inline or remove if unnecessary
    - Document rate limiting decision in comments
    - _Requirements: 2.2, 2.3, 8.1, 8.2, 8.3, 6.4_
  
  - [x] 7.2 Delete lib/error-handler.ts
    - Verify no remaining imports reference this file
    - Delete the file
    - _Requirements: 2.1_
  
  - [x] 7.3 Delete lib/rate-limiter.ts (if removed)
    - If rate limiting was removed in 7.1, delete this file
    - If kept, simplify the implementation
    - Document the decision in comments
    - _Requirements: 6.3, 6.4_

- [ ]* 7.4 Write property test for inline error handling
  - **Property 4: API Routes Use Inline Error Handling**
  - **Validates: Requirements 2.2, 2.3, 8.1, 8.3**

- [ ]* 7.5 Write unit tests for API route error responses
  - Test validation error returns 400 status
  - Test server error returns 500 status
  - Test successful submission returns 200 status
  - _Requirements: 2.3, 8.3_

- [ ] 8. Simplify MarkdownRenderer component
  - [x] 8.1 Remove custom component overrides
    - Remove components prop from ReactMarkdown (or minimize to essential overrides)
    - Remove remarkGfm plugin from remarkPlugins array
    - Remove rehypeRaw plugin from rehypePlugins array
    - Keep rehypeHighlight for syntax highlighting
    - Rely on Tailwind prose classes for styling
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 8.2 Verify markdown rendering still works
    - Test with sample markdown content
    - Verify syntax highlighting works for code blocks
    - Verify prose classes apply correct styling
    - _Requirements: 4.3_

- [ ]* 8.3 Write unit tests for MarkdownRenderer
  - Test rendering basic markdown (headings, paragraphs, lists)
  - Test syntax highlighting for code blocks
  - Test prose classes are applied
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 9. Remove unused dependencies
  - [x] 9.1 Remove class-variance-authority
    - Remove from package.json dependencies
    - Verify no imports reference this package
    - Run npm install to update package-lock.json
    - _Requirements: 7.1, 7.5_
  
  - [x] 9.2 Remove rehype-raw
    - Remove from package.json dependencies
    - Verify MarkdownRenderer doesn't use it
    - Run npm install to update package-lock.json
    - _Requirements: 7.2, 7.5_
  
  - [x] 9.3 Remove remark-gfm
    - Remove from package.json dependencies
    - Verify MarkdownRenderer doesn't use it
    - Run npm install to update package-lock.json
    - _Requirements: 7.3, 7.5_

- [ ]* 9.4 Write property test for removed dependencies
  - **Property 7: Removed Dependencies Not in Package.json**
  - **Validates: Requirements 7.1, 7.2, 7.3**

- [ ] 10. Final verification and testing
  - [x] 10.1 Run build and verify no errors
    - Run npm run build
    - Verify no TypeScript errors
    - Verify no build errors
    - _Requirements: 9.4_
  
  - [x] 10.2 Verify all removed files are gone
    - Check lib/data-access.ts does not exist
    - Check lib/error-handler.ts does not exist
    - Check lib/rate-limiter.ts does not exist (if removed)
    - Check components/ui/skill-badge.tsx does not exist
    - Check components/ui/tech-icon.tsx does not exist
    - Check components/ui/blog-card.tsx does not exist
    - _Requirements: 1.1, 2.1, 5.1_
  
  - [ ] 10.3 Count lines of code and files
    - Count total lines of code in components and lib directories
    - Count total component files
    - Verify 30-40% code reduction achieved
    - Verify component count is 12-15
    - _Requirements: 10.1, 10.2_

- [ ]* 10.4 Write property test for removed files
  - **Property 1: Removed Files Do Not Exist**
  - **Validates: Requirements 1.1, 2.1**

- [ ]* 10.5 Write property test for no imports from removed modules
  - **Property 2: No Imports from Removed Modules**
  - **Validates: Requirements 1.4, 2.4, 6.3, 8.2**

- [ ]* 10.6 Write property test for accessibility preservation
  - **Property 6: Accessibility Attributes Preserved**
  - **Validates: Requirements 9.3**

- [ ] 11. Final checkpoint - Manual testing
  - Test all pages render correctly (home, blog, individual posts)
  - Test responsive design at different breakpoints
  - Test contact form submission and error handling
  - Test navigation and all interactive features
  - Verify accessibility with screen reader or axe DevTools
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster completion
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout the refactoring
- Property tests validate structural correctness (file existence, imports, code structure)
- Unit tests validate functional correctness (component rendering, API responses)
- Manual testing verifies visual appearance and user experience
- The refactoring is designed to be incremental - each step maintains a working codebase
