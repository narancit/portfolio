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

## shadcn/ui Component Priority

- **ALWAYS prioritize shadcn/ui components over native HTML tags**
- Check `components/ui/` directory for available shadcn/ui components before using native elements
- Common shadcn/ui components to use:
  - Use `<Input>` instead of `<input>` for text inputs
  - Use `<Button>` instead of `<button>` for buttons
  - Use `<Label>` instead of `<label>` for form labels
  - Use `<Textarea>` instead of `<textarea>` for text areas
  - Use `<Checkbox>` instead of `<input type="checkbox">` for checkboxes
  - Use `<Slider>` instead of `<input type="range">` for range sliders
  - Use `<Card>`, `<CardHeader>`, `<CardContent>` for card layouts
  - Use `<Badge>` for status indicators and tags
  - Use `<Tooltip>` for hover information
- Only use native HTML elements when:
  - No shadcn/ui equivalent exists
  - The native element is specifically required for semantic HTML or accessibility
  - The shadcn/ui component doesn't fit the use case
- When using native elements, ensure they follow the portfolio's design system with appropriate Tailwind classes

## Testing Policy

- **DO NOT** automatically create tests unless explicitly requested by the user
- No test files should be generated during feature implementation
- Focus development time on the actual feature, not test coverage
- If the user wants tests, they will ask for them specifically

## Spec Creation Guidelines

- **Always number specs sequentially** based on existing specs in `.kiro/specs/`
- Check existing spec directories to determine the next number (e.g., if specs 1-4 exist, create spec 5)
- Use format: `{number}-{descriptive-name}` (e.g., `5-contact-form-enhancement`)
- Keep specs concise and focused on essential requirements
- Avoid lengthy design documents or over-specification
- List only the core functionality needed
- Reference existing components and patterns
- Skip implementation details that can be inferred from existing code

## File Organization

- **Verification results and task completion files belong in their spec directories**
- Place files like `verification-results.md` or `TASK_X_COMPLETION.md` in `.kiro/specs/{spec-number}-{spec-name}/`
- **DO NOT** create these files in the project root
- Keep the root directory clean and organized
- All spec-related documentation should be contained within the spec folder

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
