# Design: Projects Page Enhancement

## Overview
This design implements a dedicated projects page following the existing blog page pattern. The home page will display only the 3 most recent projects with a "View All Projects" button linking to `/projects`, which displays all projects in a grid layout.

## Architecture

### Component Structure

```
app/
├── page.tsx                              # Home page (updated)
├── projects/
│   └── page.tsx                          # New: All projects page
components/
├── sections/
│   └── ProjectsSection.tsx               # Updated: Show 3 projects + button
└── ui/
    └── project-card.tsx                  # Existing: Reused
```

### Data Flow

1. **Home Page Projects Section**
   - Import projects from `data/projects.ts`
   - Sort by `order` field (ascending)
   - Slice to first 3 projects: `.slice(0, 3)`
   - Render using existing `ProjectCard` component
   - Display "View All Projects" button

2. **Projects Page**
   - Import all projects from `data/projects.ts`
   - Sort by `order` field (ascending)
   - Display all projects in grid layout
   - Include back navigation to home

## Component Design

### 1. Updated ProjectsSection Component

**File:** `components/sections/ProjectsSection.tsx`

**Changes:**
- Limit displayed projects to 3 using `.slice(0, 3)`
- Add "View All Projects" button after the grid
- Button styled consistently with BlogSection's "View All Posts" button

**Implementation Pattern:**
```tsx
const recentProjects = projects
  .sort((a, b) => a.order - b.order)
  .slice(0, 3);

// Grid rendering...

{/* View All Projects Button */}
<div className="text-center">
  <Link href="/projects">
    <Button 
      variant="outline" 
      size="lg"
      className="group"
      aria-label="View all projects"
    >
      View All Projects
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Button>
  </Link>
</div>
```

### 2. New Projects Page Component

**File:** `app/projects/page.tsx`

**Structure:**
- Page metadata (title, description)
- Container with max-width constraint
- Header section with back button, title, and description
- Projects grid displaying all projects
- Empty state handling

**Layout Pattern (mirrors blog page):**
```tsx
export const metadata = {
  title: 'Projects | Melnar Ancit Cordova',
  description: 'A showcase of my work and coding projects',
};

export default function ProjectsPage() {
  const allProjects = projects.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with back button */}
        {/* Projects grid */}
        {/* Empty state */}
      </div>
    </div>
  );
}
```

## UI/UX Design

### Visual Consistency

**Design System Alignment:**
- Use existing Card, Button, Badge components
- Match BlogSection and blog page styling patterns
- Maintain dark theme with neon green accents
- Consistent spacing and typography

**Grid Layout:**
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns
- Gap: 6 units (1.5rem)

### Navigation Elements

**Back Button:**
- Position: Top left of page header
- Icon: ArrowLeft from lucide-react
- Variant: ghost
- Size: sm
- Hover effect: Icon translates left
- ARIA label: Implicit from button text

**View All Projects Button:**
- Position: Centered below project grid on home page
- Icon: ArrowRight from lucide-react
- Variant: outline
- Size: lg
- Hover effect: Icon translates right
- ARIA label: "View all projects"

### Typography

**Projects Page Header:**
- Title: `text-4xl md:text-5xl lg:text-6xl font-bold mb-4`
- Description: `text-lg text-muted-foreground max-w-2xl`

**Consistency:** Match blog page typography scale

## Accessibility

### ARIA Labels
- Back button: Implicit from "Back to Home" text
- View All Projects button: `aria-label="View all projects"`
- Project cards: Existing implementation maintains accessibility
- Grid container: `role="list" aria-label="Project portfolio"`
- Individual cards: `role="listitem"`

### Keyboard Navigation
- All interactive elements focusable via Tab
- Focus states visible (default browser + Tailwind focus rings)
- Enter/Space activates buttons and links

### Semantic HTML
- Use `<Link>` for navigation
- Use `<Button>` component with proper semantics
- Maintain heading hierarchy (h1 for page title)

## Responsive Design

### Breakpoints
- Mobile: < 768px (1 column)
- Tablet: 768px - 1023px (2 columns)
- Desktop: ≥ 1024px (3 columns)

### Container Constraints
- Max width: 7xl (80rem)
- Horizontal padding: 4 units (1rem)
- Vertical padding: 16 units mobile, 24 units desktop

### Touch Targets
- Buttons meet 44x44px minimum
- Card hover areas are full card size
- Adequate spacing between interactive elements

## Edge Cases

### Empty States
**Home Page (0 projects):**
- Display empty state message
- Hide "View All Projects" button

**Projects Page (0 projects):**
- Display centered empty state message
- Keep back button visible

### Data Validation
- Projects array may be empty
- Sort operation handles empty arrays gracefully
- Slice operation safe on arrays with < 3 items

## Performance Considerations

### Static Generation
- Both pages use static generation (no dynamic data)
- Projects data imported at build time
- No client-side data fetching required

### Code Splitting
- Projects page code split automatically by Next.js
- Shared components (Card, Button) bundled efficiently

### Image Optimization
- Project images use Next.js Image component (existing)
- SVG placeholders load instantly

## Testing Strategy

### Manual Testing Checklist
- [ ] Home page displays exactly 3 projects
- [ ] Projects sorted by order field
- [ ] "View All Projects" button navigates to `/projects`
- [ ] Projects page displays all 6 projects
- [ ] Back button returns to home page
- [ ] Responsive layout works on all breakpoints
- [ ] Keyboard navigation functional
- [ ] Focus states visible
- [ ] Empty states render correctly
- [ ] Visual consistency with blog implementation

### Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Android)

## Implementation Notes

### Reusable Patterns
- Follow BlogSection.tsx structure exactly
- Copy blog page layout for projects page
- Maintain consistent component composition

### Import Paths
- Use `@/` alias for all imports
- Import from existing UI components
- Import icons from `lucide-react`

### Styling Approach
- Tailwind utility classes only
- No custom CSS required
- Use `cn()` utility for conditional classes if needed

## Migration Path

### Phase 1: Update ProjectsSection
1. Add `.slice(0, 3)` to limit projects
2. Add "View All Projects" button with link
3. Test home page rendering

### Phase 2: Create Projects Page
1. Create `app/projects/page.tsx`
2. Implement layout following blog page pattern
3. Add metadata
4. Test navigation and rendering

### Phase 3: Validation
1. Manual testing across devices
2. Accessibility audit
3. Visual consistency check

## Success Criteria

- ✅ Home page shows exactly 3 projects
- ✅ Projects page shows all 6 projects
- ✅ Navigation works bidirectionally
- ✅ Visual consistency with blog implementation
- ✅ No accessibility regressions
- ✅ Responsive on all breakpoints
- ✅ Empty states handled gracefully
