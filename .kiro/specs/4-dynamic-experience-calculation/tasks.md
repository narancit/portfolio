# Implementation Plan: Dynamic Experience Calculation

## Overview

This implementation adds support for automatic calculation of years of experience from start dates while maintaining backward compatibility with existing static number values. The changes are minimal and focused on three files.

## Tasks

- [x] 1. Update type definitions
  - Add `experienceStartDate?: string` field to the Skill interface in `types/portfolio.ts`
  - Keep existing `yearsOfExperience?: number` field
  - Both fields remain optional for backward compatibility
  - _Requirements: 1.1, 1.2, 1.4_

- [x] 2. Create experience calculation utility
  - Add `calculateYearsOfExperience` function to `lib/utils.ts`
  - Accept ISO date string parameter (YYYY-MM-DD format)
  - Validate date and return undefined for invalid inputs
  - Calculate years elapsed from start date to current date
  - Adjust for month/day to ensure accurate year calculation
  - Return minimum of 1 year for recent dates
  - Return whole numbers only (floor the result)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Update skills display component
  - Import `calculateYearsOfExperience` from `@/lib/utils` in `components/sections/SkillsSection.tsx`
  - Add logic to compute display years: prioritize static `yearsOfExperience`, fallback to calculated value from `experienceStartDate`
  - Use nullish coalescing operator (`??`) for the priority logic
  - Keep existing conditional rendering for when no experience data exists
  - Maintain existing singular/plural formatting ("year" vs "years")
  - _Requirements: 1.3, 3.1, 3.2, 3.3, 3.4, 4.1, 4.3_

## Notes

- No changes needed to `data/skills.ts` - existing skills continue to work
- Skills can be migrated to date-based format incrementally
- Both formats can coexist in the same category
- Static numbers take priority when both fields are present
