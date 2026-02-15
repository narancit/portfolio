# Development Principles

## Simplicity First

- Keep specs and implementations as simple as possible
- Avoid over-engineering solutions
- Focus on the minimum viable implementation that meets requirements
- Prefer straightforward approaches over complex architectures

## Component Reuse

- **ALWAYS** check existing components before creating new ones
- Reuse components from `components/ui/` and `components/sections/`
- Extend existing components rather than duplicating functionality
- Look for similar patterns in the codebase and follow them
- Check `data/` directory for existing data structures before creating new ones

## Testing Policy

- **DO NOT** automatically create tests unless explicitly requested by the user
- No test files should be generated during feature implementation
- Focus development time on the actual feature, not test coverage
- If the user wants tests, they will ask for them specifically

## Spec Creation Guidelines

- Keep specs concise and focused on essential requirements
- Avoid lengthy design documents or over-specification
- List only the core functionality needed
- Reference existing components and patterns
- Skip implementation details that can be inferred from existing code

## Code Generation

- Write minimal code that solves the problem
- Avoid boilerplate and unnecessary abstractions
- Use existing utilities from `lib/` directory
- Follow patterns already established in the codebase
- Don't add features that weren't requested

## When Creating New Features

1. Check what already exists in the codebase
2. Identify which components can be reused
3. Create only what's missing
4. Keep the implementation minimal
5. Skip tests unless requested
