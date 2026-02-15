# Implementation Plan: Projects Page Enhancement

## Overview

Update the Projects section to display only 3 recent projects on the home page with a "View All Projects" button linking to a dedicated `/projects` page. Follow the existing blog page pattern for consistency.

## Tasks

- [x] 1. Update ProjectsSection component to show 3 projects with "View All" button
  - Modify `components/sections/ProjectsSection.tsx`
  - Add `.slice(0, 3)` after sorting projects by order field
  - Add `mb-12` to grid for spacing
  - Add "View All Projects" button below grid (centered, links to `/projects`)
  - Import `Link`, `Button`, and `ArrowRight` icon
  - Match BlogSection button styling exactly
  - Wrap grid and button in conditional rendering (only show if projects exist)
  - _Requirements: 1.1, 1.2, 2.1, 2.3, 4.1, 4.2_

- [x] 2. Create projects page at app/projects/page.tsx
  - Create new file `app/projects/page.tsx`
  - Add page metadata (title: "Projects | Melnar Ancit Cordova", description)
  - Import projects from `@/data/projects`, ProjectCard, Button, Link, ArrowLeft
  - Sort all projects by order field (ascending)
  - Implement page structure following blog page pattern:
    - Container: `min-h-screen py-16 md:py-24`
    - Inner container: `container mx-auto px-4 max-w-7xl`
    - Header section with back button, title, and description
    - Projects grid with all projects
    - Empty state handling
  - _Requirements: 2.4, 2.5, 2.6, 4.3, 5.3_

- [x] 3. Implement back navigation and page header
  - Add back button: `variant="ghost"`, `size="sm"`, links to `/`
  - Add ArrowLeft icon with hover translate effect
  - Add page title (h1): "Projects"
  - Add description paragraph matching blog page style
  - _Requirements: 2.5, 3.1, 3.4_

- [x] 4. Implement projects grid with accessibility
  - Grid: 1 column mobile, 2 tablet (md), 3 desktop (lg), gap-6
  - Add `role="list"` and `aria-label="Project portfolio"` to grid
  - Wrap each ProjectCard in div with `role="listitem"`
  - Reuse existing ProjectCard component
  - _Requirements: 2.4, 3.3, 4.4_

- [x] 5. Add empty state handling
  - Home page: Show empty message, hide "View All" button when no projects
  - Projects page: Show empty message, keep back button visible
  - Match empty state styling from blog page
  - _Requirements: 6.4_

- [x] 6. Verify implementation
  - Check home page shows exactly 3 projects (if 3+ exist)
  - Check "View All Projects" button navigates to `/projects`
  - Check projects page shows all projects
  - Check back button returns to home
  - Check responsive layout at mobile, tablet, desktop breakpoints
  - Check visual consistency with blog implementation
  - _Requirements: All_

## Notes

- Follow BlogSection.tsx and app/blog/page.tsx patterns exactly
- Reuse existing ProjectCard component (no changes needed)
- Use Tailwind utility classes only
- Import paths use `@/` alias
- Both pages use static generation (no client-side fetching)