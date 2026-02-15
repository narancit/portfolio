# Error Handling Documentation

This document describes the error handling implementation for the portfolio website.

## Overview

The application implements comprehensive error handling at multiple levels:
- Global error boundaries for React errors
- Loading states for async operations
- 404 pages for missing content
- API error handling with proper status codes
- Client-side form validation

## Error Pages

### Global Error Boundary (`app/error.tsx`)

Catches and handles React errors at the root level:
- Displays user-friendly error message
- Shows error details in development mode
- Provides "Try again" and "Go home" actions
- Automatically logs errors to console

**Usage**: Automatically triggered when a React error occurs anywhere in the app.

### 404 Not Found (`app/not-found.tsx`)

Handles missing pages and routes:
- Clean 404 page with neon green accent
- "Return home" button
- Consistent with site design

**Usage**: Triggered by `notFound()` function or invalid routes.

### Blog-Specific Error (`app/blog/error.tsx`)

Specialized error page for blog section:
- Context-specific error message
- "Try again" and "All posts" actions
- Maintains blog navigation context

**Usage**: Automatically triggered for errors in blog pages.

## Loading States

### Global Loading (`app/loading.tsx`)

Default loading state for page transitions:
- Animated spinner with neon green accent
- Centered layout
- "Loading..." text with pulse animation

### Blog Loading (`app/blog/loading.tsx`)

Loading state for blog listing:
- Skeleton cards matching blog layout
- Animated pulse effect
- Maintains grid structure

### Blog Post Loading (`app/blog/[slug]/loading.tsx`)

Loading state for individual blog posts:
- Skeleton matching article layout
- Title, metadata, tags, and content placeholders
- Smooth loading experience

## API Error Handling

### Error Handler Utility (`lib/error-handler.ts`)

Centralized error handling for API routes:

#### APIError Class
```typescript
new APIError(statusCode, message)
```
Custom error class for structured API errors.

#### handleAPIError Function
```typescript
handleAPIError(error: unknown): NextResponse
```
Converts various error types into appropriate responses:
- APIError instances → structured JSON response
- Validation errors → 400 with details
- Unknown errors → 500 generic response

#### ErrorResponses Object
Pre-built error responses for common scenarios:
- `unauthorized()` - 401 Unauthorized
- `forbidden()` - 403 Forbidden
- `notFound(resource)` - 404 Not Found
- `badRequest(message)` - 400 Bad Request
- `tooManyRequests(resetTime)` - 429 Too Many Requests
- `internalError(message)` - 500 Internal Server Error

### API Route Error Handling

#### Contact Form (`app/api/contact/route.ts`)
- Validates request body with Zod schema
- Returns 400 for validation errors with field details
- Implements rate limiting (429 response)
- Handles email service errors (500 response)
- Catches unexpected errors with try-catch

#### Authentication (`app/api/auth/login/route.ts`)
- Returns 401 for invalid credentials
- Returns 400 for malformed requests
- Catches JSON parsing errors

#### Resume Download (`app/api/resume/download/route.ts`)
- Returns 401 if not authenticated
- Returns 404 if resume file not found
- Returns 500 for file system errors
- Includes proper error logging

## Error Handling Patterns

### 1. Try-Catch Blocks
All API routes use try-catch to handle unexpected errors:
```typescript
try {
  // API logic
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Message' }, { status: 500 });
}
```

### 2. Validation Errors
Form validation uses Zod with detailed error messages:
```typescript
const result = schema.safeParse(data);
if (!result.success) {
  return NextResponse.json({
    error: 'Validation failed',
    details: result.error.flatten().fieldErrors
  }, { status: 400 });
}
```

### 3. Not Found Handling
Missing resources trigger Next.js notFound():
```typescript
if (!post) {
  notFound(); // Renders app/not-found.tsx
}
```

### 4. Rate Limiting
Contact form implements rate limiting:
- 5 submissions per hour per IP
- Returns 429 with reset time
- Includes rate limit headers

### 5. Authentication Errors
Protected routes check authentication:
```typescript
if (!isAuthenticated()) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## Client-Side Error Handling

### Form Validation
Contact form validates on client before submission:
- Real-time validation with Zod
- Inline error messages
- Prevents invalid submissions

### Network Errors
Forms handle network failures gracefully:
- Loading states during submission
- Error messages for failed requests
- Success confirmation on completion

## Error Logging

### Development Mode
- Full error details displayed in UI
- Console logging for all errors
- Stack traces available

### Production Mode
- User-friendly error messages only
- Errors logged to console for monitoring
- No sensitive information exposed

## Best Practices

1. **Always use try-catch** in API routes
2. **Validate input** before processing
3. **Return appropriate status codes** (400, 401, 404, 429, 500)
4. **Log errors** for debugging
5. **Provide user-friendly messages** in production
6. **Handle edge cases** (missing files, network failures)
7. **Use TypeScript** for type safety
8. **Test error scenarios** manually

## Testing Error Handling

### Manual Testing Checklist

- [ ] Trigger React error to see error boundary
- [ ] Navigate to invalid URL to see 404 page
- [ ] Navigate to invalid blog slug to see 404
- [ ] Submit contact form with invalid data
- [ ] Submit contact form 6 times to trigger rate limit
- [ ] Try to download resume without authentication
- [ ] Test with missing resume.pdf file
- [ ] Test with invalid environment variables
- [ ] Test network failures (disconnect internet)
- [ ] Test slow loading (throttle network)

## Future Improvements

Potential enhancements for error handling:
- Error tracking service integration (Sentry, LogRocket)
- Custom error pages for specific error types
- Retry logic for transient failures
- Offline support with service workers
- Error analytics and monitoring
- User feedback collection on errors
