# Implementation Plan: URL Generator

## Overview

This implementation plan creates a client-side URL generator tool following the established password generator pattern. The feature enables developers to construct URLs with query parameters interactively, with real-time generation, clipboard integration, and persistent history management through localStorage.

The implementation reuses existing shadcn/ui components and follows the portfolio's dark theme aesthetic. All operations occur client-side to ensure user privacy.

## Tasks

- [x] 1. Set up type definitions and utility functions
  - [x] 1.1 Create TypeScript type definitions
    - Create `types/url-generator.ts` with QueryParameter, URLConfiguration, HistoryEntry interfaces
    - Define STORAGE_KEYS and constants (MAX_HISTORY_ENTRIES = 10, DISPLAY_HISTORY_COUNT = 3)
    - _Requirements: 8.3, 9.2, 9.6_
  - [x] 1.2 Implement URL generation utilities
    - Create `lib/url-utils.ts` with URL generation and encoding logic
    - Implement function to combine base URL with query parameters
    - Handle base URLs with existing query strings (append with & vs ?)
    - Use encodeURIComponent() for parameter names and values
    - Handle empty base URLs and empty parameter names
    - _Requirements: 1.2, 2.5, 4.1, 4.3, 4.4, 4.5_
  - [x] 1.3 Implement localStorage wrapper utilities
    - Create `lib/storage-utils.ts` with localStorage operations
    - Implement saveConfiguration() and loadConfiguration() functions
    - Implement saveHistory() and loadHistory() functions
    - Wrap all operations in try-catch blocks for error handling
    - Return null or default values on errors
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 2. Create base component structure
  - [x] 2.1 Create route page
    - Create `app/projects/url-generator/page.tsx` with metadata
    - Set page title and description
    - Import and render URLGenerator component
    - _Requirements: 6.5_
  - [x] 2.2 Create main URLGenerator component
    - Create `components/url-generator/url-generator.tsx` with "use client" directive
    - Set up state: baseUrl, parameters, generatedUrl, copySuccess, history
    - Implement useEffect to load configuration from localStorage on mount
    - Implement useEffect to regenerate URL when baseUrl or parameters change
    - Implement useEffect to save configuration to localStorage on changes
    - Implement handler functions: handleAddParameter, handleUpdateParameter, handleDeleteParameter, handleCopy, handleLoadHistory, handleClearHistory, handleDeleteHistoryEntry
    - Render child components with appropriate props
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.4, 3.1, 3.2, 3.3, 4.2, 5.1, 5.2, 7.1, 7.2, 7.3, 8.1, 9.1, 9.3, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 3. Implement input components
  - [x] 3.1 Create BaseUrlInput component
    - Create `components/url-generator/base-url-input.tsx`
    - Use shadcn/ui Label and Input components
    - Add placeholder text: "https://example.com/api/endpoint"
    - Wire onChange handler to parent
    - _Requirements: 1.1, 1.2, 6.1_
  - [x] 3.2 Create QueryParameterItem component
    - Create `components/url-generator/query-parameter-item.tsx`
    - Use shadcn/ui Label, Input, and Button components
    - Create two input fields (name and value) with labels
    - Add delete button with trash icon (lucide-react)
    - Use flexbox layout for horizontal arrangement
    - Wire onUpdate and onDelete handlers to parent
    - _Requirements: 2.3, 2.4, 3.1, 6.1_
  - [x] 3.3 Create QueryParameterList component
    - Create `components/url-generator/query-parameter-list.tsx`
    - Map over parameters array rendering QueryParameterItem for each
    - Add "Add Parameter" button using shadcn/ui Button
    - Show empty state message when no parameters exist
    - Wire handlers to parent component
    - _Requirements: 2.1, 2.2, 6.1_

- [x] 4. Checkpoint - Verify basic URL generation
  - Ensure base URL input and parameter list render correctly
  - Verify URL generation logic works with test inputs
  - Check that localStorage utilities handle errors gracefully
  - Ask the user if questions arise

- [x] 5. Implement display and copy functionality
  - [x] 5.1 Create GeneratedUrlDisplay component
    - Create `components/url-generator/generated-url-display.tsx`
    - Use shadcn/ui Input (read-only) or textarea for URL display
    - Add copy button using shadcn/ui Button with copy icon
    - Show Badge component with "Copied!" message on success
    - Implement clipboard copy using navigator.clipboard.writeText()
    - Handle clipboard API errors with try-catch
    - Wire onCopy handler to parent
    - _Requirements: 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 6.1_

- [x] 6. Implement history management
  - [x] 6.1 Create HistoryPanel component
    - Create `components/url-generator/history-panel.tsx`
    - Use shadcn/ui Card component for container
    - Display up to 3 most recent history entries
    - Show base URL, parameter count, and formatted timestamp for each entry
    - Add load button for each entry using shadcn/ui Button
    - Add delete button for each entry with trash icon
    - Add "Clear All" button at bottom
    - Show empty state when no history exists
    - Wire onLoad, onDelete, and onClearAll handlers to parent
    - _Requirements: 9.1, 9.2, 9.4, 9.5, 10.1, 10.2, 10.5, 10.6, 6.1_
  - [x] 6.2 Implement history operations in main component
    - Update handleLoadHistory to restore configuration from history entry
    - Update handleClearHistory to clear all history from state and localStorage
    - Update handleDeleteHistoryEntry to remove single entry
    - Update handleCopy to add current URL_Configuration to history when copy button is clicked
    - Implement history size limiting (remove oldest when exceeding MAX_HISTORY_ENTRIES)
    - Ensure history persists to localStorage on changes
    - _Requirements: 9.1, 9.3, 9.6, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 7. Apply styling and responsive design
  - [x] 7.1 Style components with Tailwind CSS
    - Apply dark theme with neon green accents
    - Follow password generator layout pattern
    - Use consistent spacing and typography
    - Apply proper focus states and hover effects
    - _Requirements: 6.2, 6.4_
  - [x] 7.2 Implement responsive layout
    - Test and adjust layout for mobile (max-767px)
    - Test and adjust layout for tablet (768-1023px)
    - Test and adjust layout for desktop (1024px+)
    - Ensure touch targets are minimum 44x44px on mobile
    - _Requirements: 6.3_

- [x] 8. Final integration and polish
  - [x] 8.1 Wire all components together in main URLGenerator
    - Verify all state updates trigger appropriate side effects
    - Ensure URL regeneration happens on all relevant changes
    - Verify localStorage persistence works correctly
    - Test history operations (add, load, delete, clear all)
    - _Requirements: All_
  - [x] 8.2 Add accessibility features
    - Verify all inputs have associated labels
    - Ensure keyboard navigation works through all interactive elements
    - Add ARIA labels where needed
    - Test focus management
    - _Requirements: 6.1_
  - [x] 8.3 Handle edge cases
    - Test with empty base URL
    - Test with base URL containing existing query string
    - Test with special characters in parameter names and values
    - Test with localStorage disabled/unavailable
    - Test with clipboard API unavailable
    - Verify error handling doesn't break functionality
    - _Requirements: 1.4, 4.4, 4.5, 5.4, 8.4, 8.5_

- [x] 9. Add URL Generator to projects list
  - [x] 9.1 Update projects data file
    - Add URL Generator entry to `data/projects.ts`
    - Set id: 'url-generator'
    - Set title: 'URL Generator'
    - Set description: 'Build URLs with query parameters interactively'
    - Set longDescription with feature highlights
    - Set technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    - Set liveUrl: '/projects/url-generator'
    - Set featured: false
    - Set order: 2 (after password generator)
    - _Requirements: 6.6_

- [x] 10. Final checkpoint - Complete verification
  - Test all functionality end-to-end
  - Verify responsive design on different screen sizes
  - Check accessibility with keyboard navigation
  - Ensure localStorage persistence works across page refreshes
  - Verify history management works correctly (especially history addition on copy)
  - Verify URL Generator appears in projects list
  - Ensure all tests pass, ask the user if questions arise

## Notes

- This implementation follows the password generator pattern for consistency
- All shadcn/ui components should be reused from `components/ui/`
- No tests are created per development principles (unless explicitly requested)
- All operations are client-side for privacy
- localStorage errors are handled gracefully without breaking functionality
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
