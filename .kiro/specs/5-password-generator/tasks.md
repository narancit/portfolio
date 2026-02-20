# Implementation Plan: Password Generator

## Overview

Implement a client-side password generator tool as a standalone page at `/projects/password-generator`. The implementation will use Next.js App Router with React Server Components for the page wrapper and Client Components for interactive functionality. All password generation happens in the browser using cryptographically secure random generation.

## Tasks

- [x] 1. Add password generator project entry to projects data
  - Add new project object to `data/projects.ts` with id "password-generator"
  - Include title, description, technologies, and liveUrl pointing to `/projects/password-generator`
  - Set appropriate order value based on existing projects
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 2. Create password generation utility functions
  - [x] 2.1 Create `lib/password-utils.ts` with character sets constants
    - Define CHARACTER_SETS object with lowercase, uppercase, numbers, and symbols
    - _Requirements: 1.3_
  - [x] 2.2 Implement generatePassword function
    - Accept length and CharacterOptions parameters
    - Build character pool from selected options
    - Ensure at least one character from each selected type
    - Use crypto.getRandomValues for secure randomness
    - Return generated password string
    - _Requirements: 1.1, 1.2, 1.4, 1.5_
  - [ ]\* 2.3 Write property test for Password Length Constraint
    - **Property 1: Password Length Constraint**
    - **Validates: Requirements 1.1, 1.2**
  - [ ]\* 2.4 Write property test for Character Type Restriction
    - **Property 2: Character Type Restriction**
    - **Validates: Requirements 1.4**
  - [ ]\* 2.5 Write property test for Character Type Representation
    - **Property 3: Character Type Representation**
    - **Validates: Requirements 1.5**
  - [x] 2.6 Implement calculateStrength function
    - Accept password string and CharacterOptions parameters
    - Calculate strength based on length and character type diversity
    - Return one of four levels: Weak, Fair, Good, or Strong
    - Apply rules: length < 12 = Weak/Fair, length >= 12 && types >= 3 = Good/Strong
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ]\* 2.7 Write property test for Valid Strength Levels
    - **Property 4: Valid Strength Levels**
    - **Validates: Requirements 2.2**
  - [ ]\* 2.8 Write property test for Short Password Strength
    - **Property 5: Short Password Strength**
    - **Validates: Requirements 2.3**
  - [ ]\* 2.9 Write property test for Long Diverse Password Strength
    - **Property 6: Long Diverse Password Strength**
    - **Validates: Requirements 2.4**

- [x] 3. Checkpoint - Ensure utility functions work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create TypeScript interfaces and types
  - Create `types/password-generator.ts` with CharacterOptions interface
  - Define PasswordStrength type as union of four strength levels
  - Define PasswordState interface for component state
  - _Requirements: 1.3, 2.2_

- [x] 5. Implement StrengthIndicator component
  - Create `components/password-generator/strength-indicator.tsx` as client component
  - Accept strength prop and display color-coded visual indicator
  - Use Badge component from shadcn/ui for strength label
  - Apply color classes: Weak (red), Fair (yellow), Good (blue), Strong (green)
  - _Requirements: 2.2, 2.5, 5.1, 6.5_

- [x] 6. Implement LengthSlider component
  - Create `components/password-generator/length-slider.tsx` as client component
  - Accept value, onChange, min, max props
  - Render Label from shadcn/ui and native range input
  - Display current length value next to slider
  - Apply Tailwind styling consistent with portfolio theme
  - _Requirements: 1.1, 1.2, 5.3, 5.5, 6.5_

- [x] 7. Implement CharacterOptions component
  - Create `components/password-generator/character-options.tsx` as client component
  - Accept options, onChange, disabled props
  - Render checkbox group for four character types
  - Use Label components from shadcn/ui
  - Apply appropriate ARIA labels for accessibility
  - _Requirements: 1.3, 1.4, 1.6, 5.2, 5.5, 5.6, 6.5_

- [x] 8. Implement PasswordDisplay component
  - Create `components/password-generator/password-display.tsx` as client component
  - Accept password, onCopy, copySuccess props
  - Display password in monospace font within Card component
  - Add copy Button from shadcn/ui with clipboard icon
  - Show success message when copySuccess is true
  - Handle empty password state gracefully
  - _Requirements: 4.1, 4.3, 5.1, 5.5, 6.5, 6.6_

- [ ] 9. Implement main PasswordGenerator component
  - [x] 9.1 Create `components/password-generator/password-generator.tsx` as client component
    - Set up state management with useState for password, length, includeOptions, strength, copySuccess
    - Initialize with default settings: length 16, all character types enabled
    - Generate initial password on component mount
    - _Requirements: 1.1, 1.2, 1.3, 3.3_
  - [x] 9.2 Implement password generation logic
    - Create effect that regenerates password when length or options change
    - Call generatePassword utility function
    - Update strength using calculateStrength utility function
    - _Requirements: 1.2, 1.4, 1.5, 2.1, 2.5, 3.2_
  - [x] 9.3 Implement regenerate button handler
    - Add regenerate button that triggers password generation with current settings
    - Maintain all user-selected options
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 9.4 Implement clipboard copy functionality
    - Use navigator.clipboard.writeText API
    - Handle success with temporary copySuccess state (2 second timeout)
    - Catch errors and display user-friendly error message
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 9.5 Wire all child components together
    - Render PasswordDisplay, LengthSlider, CharacterOptions, StrengthIndicator
    - Pass appropriate props and event handlers
    - Apply Card layout with proper spacing and responsive design
    - _Requirements: 5.4, 6.5_
  - [ ]\* 9.6 Write property test for Regeneration Preserves Settings
    - **Property 7: Regeneration Preserves Settings**
    - **Validates: Requirements 3.3**

- [x] 10. Checkpoint - Ensure components render and interact correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create password generator page
  - Create `app/projects/password-generator/page.tsx` as Server Component
  - Import and render PasswordGenerator client component
  - Add page title and description
  - Apply consistent layout with portfolio design system
  - Ensure proper metadata for SEO
  - _Requirements: 6.1, 6.5, 6.7_

- [x] 12. Final integration and accessibility verification
  - Verify keyboard navigation works for all controls
  - Verify ARIA labels are present and correct
  - Test responsive behavior on mobile, tablet, desktop breakpoints
  - Verify dark theme with neon green accents is applied consistently
  - Test navigation from projects page to password generator page
  - _Requirements: 5.4, 5.5, 5.6, 6.4, 6.5, 6.7_

- [x] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check library with minimum 100 iterations
- All components reuse shadcn/ui primitives (Button, Card, Label, Badge) for consistency
- Password generation uses crypto.getRandomValues for cryptographic security
- All interactive components are Client Components ("use client" directive)
- Page wrapper is a Server Component for optimal performance
