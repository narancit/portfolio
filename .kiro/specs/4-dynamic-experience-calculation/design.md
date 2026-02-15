# Design Document: Dynamic Experience Calculation

## Overview

This feature extends the existing skill tracking system to support automatic calculation of years of experience based on start dates. The implementation adds a new optional field to the Skill type and creates a utility function to compute experience duration, while maintaining full backward compatibility with existing static number values.

The solution is minimal and follows existing patterns in the codebase, requiring changes to only three files: the type definition, the utility library, and the display component.

## Architecture

The architecture follows the existing data-driven pattern:

1. **Type Layer** (`types/portfolio.ts`): Extended Skill interface with new optional field
2. **Utility Layer** (`lib/utils.ts`): New calculation function for date-based experience
3. **Display Layer** (`components/sections/SkillsSection.tsx`): Updated rendering logic to handle both formats
4. **Data Layer** (`data/skills.ts`): No changes required (backward compatible)

Data flows from the static skills data through the utility function (if needed) to the display component.

## Components and Interfaces

### Type Definition Changes

Extend the existing `Skill` interface in `types/portfolio.ts`:

```typescript
export interface Skill {
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  experienceStartDate?: string; // ISO date string (YYYY-MM-DD)
}
```

**Design Decision**: Use ISO date string format for simplicity and JSON compatibility. The field is optional to maintain backward compatibility.

### Utility Function

Add to `lib/utils.ts`:

```typescript
/**
 * Calculate years of experience from a start date
 * @param startDate - ISO date string (YYYY-MM-DD)
 * @returns Number of years (minimum 1) or undefined if invalid
 */
export function calculateYearsOfExperience(
  startDate: string,
): number | undefined {
  const start = new Date(startDate);
  const now = new Date();

  // Validate date
  if (isNaN(start.getTime())) {
    return undefined;
  }

  // Calculate difference in years
  const years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();

  // Adjust if birthday hasn't occurred this year
  const adjustedYears =
    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? years - 1 : years;

  // Return minimum of 1 year
  return Math.max(1, adjustedYears);
}
```

**Design Decision**: Return minimum of 1 year to avoid showing "0 years" for recent skills. Return undefined for invalid dates to allow graceful fallback.

### Display Component Changes

Update `components/sections/SkillsSection.tsx` to use the utility function:

```typescript
import { calculateYearsOfExperience } from '@/lib/utils';

// Inside the map function for skills:
const displayYears = skill.yearsOfExperience
  ?? (skill.experienceStartDate ? calculateYearsOfExperience(skill.experienceStartDate) : undefined);

{displayYears && (
  <span className="text-xs text-muted-foreground">
    {displayYears} {displayYears === 1 ? 'year' : 'years'}
  </span>
)}
```

**Design Decision**: Prioritize static `yearsOfExperience` over calculated value using nullish coalescing. This allows manual overrides when needed.

## Data Models

No changes to existing data models. The `data/skills.ts` file can remain unchanged, and skills can be migrated incrementally:

**Current format (unchanged):**

```typescript
{
  name: 'JavaScript',
  category: 'Programming Languages',
  proficiency: 'advanced',
  yearsOfExperience: 6,
}
```

**New format (optional migration):**

```typescript
{
  name: 'JavaScript',
  category: 'Programming Languages',
  proficiency: 'advanced',
  experienceStartDate: '2019-01-15',
}
```

**Mixed format (both fields):**

```typescript
{
  name: 'JavaScript',
  category: 'Programming Languages',
  proficiency: 'advanced',
  yearsOfExperience: 6, // Takes priority
  experienceStartDate: '2019-01-15', // Fallback
}
```

## Error Handling

The system handles errors gracefully through optional chaining and fallback values:

1. **Invalid Dates**: The `calculateYearsOfExperience` function validates dates using `isNaN(date.getTime())` and returns `undefined` for invalid inputs
2. **Missing Fields**: The display component uses nullish coalescing (`??`) to handle missing experience data
3. **No Experience Data**: When neither field is provided, the experience display is hidden using conditional rendering

No user-facing errors are thrown. Invalid data simply results in no experience duration being displayed.
