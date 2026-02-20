# Design Document: Password Generator

## Overview

The password generator is a client-side utility tool that creates secure, customizable passwords. It will be implemented as a standalone page at `/projects/password-generator` using Next.js App Router with React Server Components where possible and Client Components for interactive functionality.

The implementation follows the portfolio's existing design system (dark theme with neon green accents) and reuses shadcn/ui components for consistency. The generator operates entirely in the browser with no backend dependencies, ensuring fast performance and user privacy.

## Architecture

### Component Structure

```
app/projects/password-generator/
└── page.tsx                    # Main page component (Server Component)

components/password-generator/
├── password-generator.tsx      # Main client component with state management
├── password-display.tsx        # Password output display with copy button
├── character-options.tsx       # Checkbox group for character types
├── length-slider.tsx           # Range input for password length
└── strength-indicator.tsx      # Visual strength meter

data/
└── projects.ts                 # Add password generator project entry
```

### Projects Page Integration

The password generator will be added to the `data/projects.ts` file as a new project entry:

```typescript
{
  id: "password-generator",
  title: "Password Generator",
  description: "Generate secure passwords with customizable length and character types",
  longDescription: "A client-side password generator tool with strength indicator, clipboard support, and full accessibility. Demonstrates React state management and cryptographically secure random generation.",
  technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  liveUrl: "/projects/password-generator",
  featured: false,
  order: 2, // Adjust based on existing projects
}
```

The existing `ProjectCard` component will automatically render the password generator with a "Live Demo" button that navigates to `/projects/password-generator`.

### State Management

Client-side React state using `useState` hook:

- `password`: string - Current generated password
- `length`: number - Password length (8-32)
- `includeOptions`: object - Boolean flags for each character type
- `strength`: string - Calculated strength level
- `copySuccess`: boolean - Temporary flag for copy feedback

### Data Flow

1. User adjusts controls (length slider or character type checkboxes)
2. State updates trigger password regeneration
3. Password generation function creates new password based on current settings
4. Strength calculation function evaluates the new password
5. UI updates to display new password and strength indicator

## Components and Interfaces

### PasswordGenerator Component

Main orchestrating component that manages all state and coordinates child components.

```typescript
interface PasswordGeneratorProps {}

interface PasswordState {
  password: string;
  length: number;
  includeOptions: CharacterOptions;
  strength: PasswordStrength;
  copySuccess: boolean;
}

interface CharacterOptions {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

type PasswordStrength = 'Weak' | 'Fair' | 'Good' | 'Strong';
```

### PasswordDisplay Component

Displays the generated password in a monospace font with a copy button.

```typescript
interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  copySuccess: boolean;
}
```

Reuses: `Card`, `Button` from shadcn/ui

### CharacterOptions Component

Checkbox group for selecting character types to include in password.

```typescript
interface CharacterOptionsProps {
  options: CharacterOptions;
  onChange: (options: CharacterOptions) => void;
  disabled: boolean;
}
```

Reuses: `Label` from shadcn/ui, native checkbox with custom styling

### LengthSlider Component

Range input for selecting password length with current value display.

```typescript
interface LengthSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}
```

Reuses: `Label` from shadcn/ui, native range input with custom styling

### StrengthIndicator Component

Visual indicator showing password strength with color-coded meter.

```typescript
interface StrengthIndicatorProps {
  strength: PasswordStrength;
}
```

Reuses: `Badge` from shadcn/ui for strength label

## Data Models

### Character Sets

```typescript
const CHARACTER_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;
```

### Password Generation Algorithm

```typescript
function generatePassword(length: number, options: CharacterOptions): string {
  // 1. Build character pool from selected options
  // 2. Ensure at least one character from each selected type
  // 3. Fill remaining length with random characters from pool
  // 4. Shuffle to randomize positions
  // 5. Return generated password
}
```

### Strength Calculation Algorithm

```typescript
function calculateStrength(
  password: string,
  options: CharacterOptions,
): PasswordStrength {
  // Calculate based on:
  // - Password length
  // - Number of character types used
  // - Character diversity
  // Rules:
  // - Length < 12: Weak or Fair
  // - Length >= 12 && types >= 3: Good or Strong
  // - Length >= 16 && types === 4: Strong
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Password Length Constraint

_For any_ password generation request with a specified length between 8 and 32 characters and at least one character type selected, the generated password length should exactly match the requested length.

**Validates: Requirements 1.1, 1.2**

### Property 2: Character Type Restriction

_For any_ password generated with a specific set of character types selected, every character in the password should belong to one of the selected character type sets.

**Validates: Requirements 1.4**

### Property 3: Character Type Representation

_For any_ password generated with multiple character types selected, the password should contain at least one character from each selected character type.

**Validates: Requirements 1.5**

### Property 4: Valid Strength Levels

_For any_ generated password, the calculated strength should be one of the four valid levels: Weak, Fair, Good, or Strong.

**Validates: Requirements 2.2**

### Property 5: Short Password Strength

_For any_ password with length less than 12 characters, the calculated strength should be either Weak or Fair.

**Validates: Requirements 2.3**

### Property 6: Long Diverse Password Strength

_For any_ password with length 12 or more characters and three or more character types included, the calculated strength should be either Good or Strong.

**Validates: Requirements 2.4**

### Property 7: Regeneration Preserves Settings

_For any_ password generator configuration (length and character type selections), regenerating a password should produce a new password that uses the same length and character type settings.

**Validates: Requirements 3.3**

## Error Handling

### Invalid Configuration States

- **No character types selected**: Disable password generation, display message "Please select at least one character type"
- **Length out of bounds**: Clamp to valid range (8-32) automatically

### Clipboard API Failures

- **Permission denied**: Display error message "Unable to copy to clipboard. Please copy manually."
- **API not available**: Fallback to displaying message with manual copy instruction
- **Network/browser issues**: Catch all clipboard errors and show user-friendly message

### Edge Cases

- **Empty password state**: On initial load, generate password with default settings (length: 16, all character types enabled)
- **Single character type with short length**: Still enforce "at least one from each type" rule, may result in predictable patterns
- **Maximum length with all types**: Ensure even distribution of character types

## Testing Strategy

### Unit Testing

Unit tests will focus on specific examples and edge cases for the core utility functions:

- **Password generation function**: Test with specific configurations (e.g., length 8 with only lowercase, length 32 with all types)
- **Strength calculation function**: Test specific examples for each strength level
- **Character validation**: Test edge cases like empty character sets, single character type
- **Clipboard error handling**: Test error scenarios with mocked clipboard API

### Property-Based Testing

Property-based tests will verify universal properties across randomized inputs using **fast-check** library (JavaScript/TypeScript property testing):

- **Configuration**: Minimum 100 iterations per property test
- **Tagging**: Each test tagged with comment: `// Feature: 5-password-generator, Property {number}: {property_text}`
- **Coverage**: All seven correctness properties will be implemented as property-based tests

Property tests will generate random:

- Password lengths (8-32)
- Character type combinations (all possible subsets)
- Multiple password generations with same settings

This dual approach ensures both concrete correctness (unit tests) and comprehensive coverage (property tests).
