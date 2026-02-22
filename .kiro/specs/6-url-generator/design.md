# Design Document: URL Generator

## Overview

The URL Generator is a client-side tool that enables developers to construct URLs with query parameters interactively. The feature follows the established password generator pattern, using shadcn/ui components and maintaining consistency with the portfolio's dark theme aesthetic.

The tool provides real-time URL generation, clipboard integration, and persistent history management through browser localStorage. All operations occur client-side to ensure user privacy.

### Key Features

- Interactive base URL and query parameter management
- Real-time URL generation with proper encoding
- One-click clipboard copy with visual feedback
- Automatic persistence to localStorage
- History of recent URL configurations (minimum 3 entries)
- Load and modify previous configurations
- Responsive design matching portfolio aesthetic

## Architecture

### Component Structure

Following the password generator pattern, the URL Generator uses a modular component architecture:

```
app/projects/url-generator/
  └── page.tsx                    # Route page with metadata and layout

components/url-generator/
  ├── url-generator.tsx           # Main component with state management
  ├── base-url-input.tsx          # Base URL input field
  ├── query-parameter-list.tsx   # List of query parameters
  ├── query-parameter-item.tsx   # Individual parameter name/value inputs
  ├── generated-url-display.tsx  # Display and copy functionality
  └── history-panel.tsx           # History display and management

lib/
  ├── url-utils.ts                # URL generation and encoding logic
  └── storage-utils.ts            # localStorage wrapper utilities

types/
  └── url-generator.ts            # TypeScript type definitions
```

### State Management

The main `url-generator.tsx` component manages all state using React hooks:

- `baseUrl`: string - The base URL before query parameters
- `parameters`: QueryParameter[] - Array of name-value pairs
- `generatedUrl`: string - The computed full URL
- `copySuccess`: boolean - Clipboard copy feedback state
- `history`: HistoryEntry[] - Array of saved configurations

State updates trigger automatic URL regeneration and localStorage persistence.

### Data Flow

1. User modifies base URL or parameters
2. State updates trigger URL regeneration via `useEffect`
3. Generated URL updates in display
4. Configuration saves to localStorage
5. History updates with new entry (if URL is non-empty)

## Components and Interfaces

### Main Component: URLGenerator

**Location**: `components/url-generator/url-generator.tsx`

**Responsibilities**:

- Manage all application state
- Coordinate child components
- Handle localStorage persistence
- Trigger URL generation on state changes
- Manage history operations

**Key Methods**:

- `handleAddParameter()`: Add new empty parameter to list
- `handleUpdateParameter(id, field, value)`: Update parameter name or value
- `handleDeleteParameter(id)`: Remove parameter from list
- `handleCopy()`: Copy generated URL to clipboard
- `handleLoadHistory(entry)`: Restore configuration from history
- `handleClearHistory()`: Clear all history entries
- `handleDeleteHistoryEntry(id)`: Remove single history entry

### BaseUrlInput Component

**Location**: `components/url-generator/base-url-input.tsx`

**Props**:

- `value: string` - Current base URL
- `onChange: (value: string) => void` - Update handler

**UI Elements**:

- Label component from shadcn/ui
- Input component from shadcn/ui
- Placeholder text: "https://example.com/api/endpoint"

### QueryParameterList Component

**Location**: `components/url-generator/query-parameter-list.tsx`

**Props**:

- `parameters: QueryParameter[]` - Array of parameters
- `onUpdate: (id, field, value) => void` - Update handler
- `onDelete: (id) => void` - Delete handler
- `onAdd: () => void` - Add new parameter handler

**UI Elements**:

- Maps over parameters array rendering QueryParameterItem for each
- Button component for "Add Parameter" action
- Empty state message when no parameters exist

### QueryParameterItem Component

**Location**: `components/url-generator/query-parameter-item.tsx`

**Props**:

- `parameter: QueryParameter` - The parameter data
- `onUpdate: (field, value) => void` - Update handler
- `onDelete: () => void` - Delete handler

**UI Elements**:

- Two Input components (name and value)
- Label components for accessibility
- Button component with trash icon for deletion
- Flexbox layout for horizontal arrangement

### GeneratedUrlDisplay Component

**Location**: `components/url-generator/generated-url-display.tsx`

**Props**:

- `url: string` - The generated URL
- `onCopy: () => void` - Copy handler
- `copySuccess: boolean` - Success state for feedback

**UI Elements**:

- Read-only Input or textarea for URL display
- Button component with copy icon
- Visual feedback (icon change or text) on successful copy
- Badge component showing "Copied!" message

### HistoryPanel Component

**Location**: `components/url-generator/history-panel.tsx`

**Props**:

- `history: HistoryEntry[]` - Array of history entries
- `onLoad: (entry) => void` - Load configuration handler
- `onDelete: (id) => void` - Delete single entry handler
- `onClearAll: () => void` - Clear all history handler

**UI Elements**:

- Card component containing history list
- Each entry shows: base URL, parameter count, timestamp
- Button components for load and delete actions
- "Clear All" button at bottom
- Empty state when no history exists
- Display limited to 3 most recent entries

## Data Models

### QueryParameter

```typescript
interface QueryParameter {
  id: string; // Unique identifier (UUID or timestamp-based)
  name: string; // Parameter name
  value: string; // Parameter value
}
```

### URLConfiguration

```typescript
interface URLConfiguration {
  baseUrl: string;
  parameters: QueryParameter[];
}
```

### HistoryEntry

```typescript
interface HistoryEntry {
  id: string; // Unique identifier
  configuration: URLConfiguration;
  timestamp: number; // Unix timestamp in milliseconds
  generatedUrl: string; // Cached generated URL for display
}
```

### Storage Keys

```typescript
const STORAGE_KEYS = {
  CURRENT_CONFIG: 'url-generator-current',
  HISTORY: 'url-generator-history',
} as const;
```

### Constants

```typescript
const MAX_HISTORY_ENTRIES = 10; // Maximum history items to store
const DISPLAY_HISTORY_COUNT = 3; // Number of history items to display
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Base URL changes update generated URL

_For any_ base URL value, when the base URL is updated, the generated URL should reflect the new base URL.

**Validates: Requirements 1.2**

### Property 2: Parameter addition increases list size

_For any_ parameter list, when a new parameter is added, the parameter list length should increase by one.

**Validates: Requirements 2.2**

### Property 3: Parameter changes update generated URL

_For any_ parameter name or value change, the generated URL should be updated to reflect the change.

**Validates: Requirements 2.4**

### Property 4: URL encoding round-trip preserves values

_For any_ parameter name or value containing special characters, encoding then decoding should preserve the original value.

**Validates: Requirements 2.5**

### Property 5: Parameter deletion decreases list size

_For any_ non-empty parameter list and any parameter in that list, deleting the parameter should decrease the list length by one and remove that specific parameter.

**Validates: Requirements 3.2**

### Property 6: Parameter deletion updates generated URL

_For any_ parameter list with at least one parameter, deleting any parameter should result in a different generated URL.

**Validates: Requirements 3.3**

### Property 7: Generated URL combines base and parameters

_For any_ base URL and parameter list, the generated URL should contain both the base URL and all parameter names and values.

**Validates: Requirements 4.1**

### Property 8: State changes trigger URL updates

_For any_ change to base URL or parameters, the generated URL display should update immediately.

**Validates: Requirements 4.2**

### Property 9: Multiple parameters joined with ampersands

_For any_ parameter list with two or more parameters, the generated URL should contain "&" characters joining the parameters.

**Validates: Requirements 4.3**

### Property 10: Copy operation transfers URL to clipboard

_For any_ generated URL, when the copy button is clicked, the clipboard should contain the exact generated URL string.

**Validates: Requirements 5.2**

### Property 11: Successful copy shows confirmation

_For any_ successful copy operation, a success indicator should be displayed to the user.

**Validates: Requirements 5.3**

### Property 12: Configuration persistence round-trip

_For any_ URL configuration (base URL and parameters), saving to localStorage then loading should restore the exact same configuration.

**Validates: Requirements 8.1, 8.2**

### Property 13: localStorage stores valid JSON

_For any_ URL configuration saved to localStorage, the stored value should be valid JSON that can be parsed without errors.

**Validates: Requirements 8.3**

### Property 14: localStorage errors don't break functionality

_For any_ localStorage operation that throws an error, the URL generator should continue to function for URL generation and display.

**Validates: Requirements 8.4, 8.5**

### Property 15: History persists configurations

_For any_ generated URL configuration, it should be added to the history and persist in localStorage.

**Validates: Requirements 9.1, 9.3**

### Property 16: History entries include timestamps

_For any_ history entry, it should contain a valid timestamp value.

**Validates: Requirements 9.4**

### Property 17: History displays in reverse chronological order

_For any_ history with multiple entries, the displayed entries should be ordered from newest to oldest by timestamp.

**Validates: Requirements 9.5**

### Property 18: History respects maximum size limit

_For any_ history that exceeds the maximum entry limit, the oldest entries should be removed to maintain the limit.

**Validates: Requirements 9.6**

### Property 19: Loading history restores configuration

_For any_ history entry, loading it should restore the base URL and all parameters from that entry.

**Validates: Requirements 10.2**

### Property 20: Loading history updates generated URL

_For any_ history entry, loading it should update the generated URL display to match the entry's configuration.

**Validates: Requirements 10.3**

### Property 21: Loaded configurations are editable

_For any_ configuration loaded from history, users should be able to modify the base URL and parameters.

**Validates: Requirements 10.4**

### Property 22: Clearing history entry removes it

_For any_ history entry, clearing it should remove it from the history list and localStorage.

**Validates: Requirements 10.5**

### Property 23: Clear all removes all history

_For any_ history state, clearing all history should result in an empty history list and empty history in localStorage.

**Validates: Requirements 10.6**

## Error Handling

### localStorage Errors

The application must gracefully handle localStorage failures:

- **Quota Exceeded**: Catch and log error, continue without persistence
- **Access Denied**: Catch and log error, continue without persistence
- **Parse Errors**: Catch invalid JSON, reset to default state
- **Implementation**: Wrap all localStorage operations in try-catch blocks

### Clipboard API Errors

The application must handle clipboard access failures:

- **Permission Denied**: Show user-friendly error message
- **API Unavailable**: Fallback to manual copy instruction
- **Implementation**: Try-catch around `navigator.clipboard.writeText()`

### URL Encoding Errors

The application must handle encoding edge cases:

- **Invalid Characters**: Use `encodeURIComponent()` for all parameter names and values
- **Empty Values**: Allow empty parameter values (valid in URLs)
- **Special Characters**: Properly encode spaces, &, =, ?, #, etc.

### State Consistency

The application must maintain consistent state:

- **Empty Parameter Names**: Allow but don't include in generated URL
- **Duplicate Parameter Names**: Allow (valid in URLs)
- **Empty Base URL**: Generate URL with only parameters (starting with ?)

## Testing Strategy

### Unit Testing

Unit tests should focus on specific examples and edge cases:

- **URL Generation Logic** (`lib/url-utils.ts`):
  - Empty base URL with parameters
  - Base URL with existing query string
  - Base URL without query string
  - Special characters in parameter names and values
  - Empty parameter names or values
  - Multiple parameters with same name

- **Storage Utilities** (`lib/storage-utils.ts`):
  - Save and load operations
  - localStorage unavailable scenarios
  - Invalid JSON in storage
  - Quota exceeded errors

- **Component Rendering**:
  - Base URL input renders correctly
  - Parameter list renders with correct number of items
  - Generated URL displays correctly
  - History panel shows correct number of entries
  - Copy button exists and is clickable

### Property-Based Testing

Property-based tests should verify universal properties across all inputs using a library like **fast-check** for TypeScript/JavaScript:

- **Configuration**: Minimum 100 iterations per test
- **Tagging**: Each test references its design property
- **Format**: `// Feature: url-generator, Property {number}: {property_text}`

**Property Test Examples**:

1. **URL Encoding Round-Trip** (Property 4):
   - Generate random strings with special characters
   - Encode using `encodeURIComponent()`
   - Decode using `decodeURIComponent()`
   - Assert original equals decoded

2. **Parameter Addition** (Property 2):
   - Generate random parameter lists
   - Add a new parameter
   - Assert list length increased by 1

3. **localStorage Round-Trip** (Property 12):
   - Generate random URL configurations
   - Save to mock localStorage
   - Load from mock localStorage
   - Assert configurations are equal

4. **History Ordering** (Property 17):
   - Generate random history entries with timestamps
   - Sort by timestamp descending
   - Assert displayed order matches sorted order

5. **History Size Limit** (Property 18):
   - Generate more than MAX_HISTORY_ENTRIES
   - Add all to history
   - Assert history length equals MAX_HISTORY_ENTRIES
   - Assert oldest entries were removed

### Integration Testing

Integration tests should verify component interactions:

- User adds parameter → parameter appears in list
- User modifies parameter → generated URL updates
- User clicks copy → clipboard contains URL
- User loads history entry → form populates with saved values
- User clears history → history panel shows empty state

### Accessibility Testing

Manual accessibility verification:

- Keyboard navigation through all interactive elements
- Screen reader announces form labels and button purposes
- Focus indicators visible on all interactive elements
- Minimum touch target sizes (44x44px) on mobile
- Color contrast meets WCAG AA standards

### Testing Tools

- **Jest**: Unit test runner
- **React Testing Library**: Component testing
- **fast-check**: Property-based testing library
- **@testing-library/user-event**: User interaction simulation
- **jest-localstorage-mock**: Mock localStorage for tests

### Test Organization

```
__tests__/
  ├── lib/
  │   ├── url-utils.test.ts
  │   └── storage-utils.test.ts
  ├── components/
  │   └── url-generator/
  │       ├── url-generator.test.tsx
  │       ├── query-parameter-list.test.tsx
  │       └── history-panel.test.tsx
  └── properties/
      ├── url-encoding.property.test.ts
      ├── parameter-operations.property.test.ts
      ├── storage-persistence.property.test.ts
      └── history-management.property.test.ts
```

Note: Per development principles, tests should only be created if explicitly requested by the user.
