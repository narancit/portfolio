# Tasks: Projects Page Enhancement

## Phase 1: Update Home Page Projects Section

### 1. Update ProjectsSection Component
**Requirements:** 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 4.1, 4.2, 5.1, 5.2

- [ ] 1.1 Modify `components/sections/ProjectsSection.tsx` to limit displayed projects to 3
  - Sort projects by `order` field (ascending)
  - Use `.slice(0, 3)` to get first 3 projects
  - Maintain existing project card rendering

- [ ] 1.2 Add "View All Projects" button below the project grid
  - Import `Link` from `next/link` and `ArrowRight` from `lucide-react`
  - Add centered button container after the grid
  - Use `Button` component with `variant="outline"` and `size="lg"`
  - Link to `/projects` route
  - Add `aria-label="View all projects"`
  - Include hover animation for arrow icon

- [ ] 1.3 Test home page projects section
  - Verify exactly 3 projects display
  - Verify projects are sorted by order field
  - Verify button styling matches BlogSection
  - Verify button navigates to `/projects`

## Phase 2: Create Projects Page

### 2. Create Projects Page Component
**Requirements:** 2.3, 2.4, 2.5, 2.6, 4.3, 4.4, 4.5, 5.1, 5.3

- [ ] 2.1 Create `app/projects/page.tsx` file
  - Add page metadata (title, description)
  - Import projects from `@/data/projects`
  - Import required components (Button, Card, Badge, Link)
  - Import `ArrowLeft` icon from `lucide-react`

- [ ] 2.2 Implement page layout structure
  - Add container with `min-h-screen py-16 md:py-24`
  - Add inner container with `max-w-7xl` constraint
  - Create header section with back button, title, and description
  - Create projects grid section

- [ ] 2.3 Implement back navigation button
  - Position in top left of header
  - Use `Button` with `variant="ghost"` and `size="sm"`
  - Link to `/` (home page)
  - Add ArrowLeft icon with hover translate effect
  - Text: "Back to Home"

- [ ] 2.4 Implement projects grid
  - Sort all projects by `order` field (ascending)
  - Use grid layout: 1 column mobile, 2 tablet, 3 desktop
  - Add `role="list"` and `aria-label="Project portfolio"`
  - Render each project using existing `ProjectCard` component
  - Wrap cards with `role="listitem"`

- [ ] 2.5 Add empty state handling
  - Check if projects array is empty
  - Display centered message if no projects exist
  - Keep back button visible in empty state

- [ ] 2.6 Test projects page
  - Verify all projects display
  - Verify projects are sorted correctly
  - Verify back button returns to home
  - Verify responsive grid layout
  - Verify empty state renders correctly

## Phase 3: Accessibility & UX Validation

### 3. Accessibility Testing
**Requirements:** 3.1, 3.2, 3.3, 3.4, 6.1, 6.2, 6.3, 6.4, 6.5

- [ ] 3.1 Test keyboard navigation
  - Tab through all interactive elements on both pages
  - Verify focus order is logical
  - Verify Enter/Space activates buttons and links
  - Verify focus states are visible

- [ ] 3.2 Verify ARIA labels and semantic HTML
  - Check "View All Projects" button has proper aria-label
  - Check back button text is descriptive
  - Check grid has role="list" and aria-label
  - Check cards have role="listitem"
  - Verify heading hierarchy (h1 for page title)

- [ ] 3.3 Test responsive design
  - Test on mobile viewport (< 768px)
  - Test on tablet viewport (768-1023px)
  - Test on desktop viewport (≥ 1024px)
  - Verify grid columns adjust correctly
  - Verify touch targets meet 44x44px minimum

## Phase 4: Final Validation

### 4. Cross-Browser & Integration Testing
**Requirements:** All requirements

- [ ] 4.1 Visual consistency check
  - Compare styling with BlogSection and blog page
  - Verify button styles match
  - Verify typography matches
  - Verify spacing and layout consistency
  - Verify dark theme with neon green accents

- [ ] 4.2 End-to-end navigation testing
  - Navigate from home to projects page
  - Navigate back to home
  - Verify URL changes correctly
  - Verify page transitions are smooth
  - Test browser back/forward buttons

- [ ] 4.3 Edge case testing
  - Test with 0 projects (empty state)
  - Test with < 3 projects on home page
  - Test with exactly 3 projects
  - Test with > 3 projects
  - Verify no console errors or warnings

- [ ] 4.4 Performance validation
  - Run `npm run build` to verify static generation
  - Check build output for projects page
  - Verify no client-side data fetching
  - Test page load performance

