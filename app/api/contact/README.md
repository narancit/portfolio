# Contact API Route

This API route handles contact form submissions with validation, rate limiting, and email delivery.

## Endpoint

`POST /api/contact`

## Features

- **Request Validation**: Uses Zod schema to validate name, email, and message fields
- **Rate Limiting**: Limits submissions to 5 per hour per IP address
- **Email Delivery**: Sends emails using Resend API
- **Error Handling**: Returns appropriate error responses with details

## Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here (minimum 10 characters)"
}
```

## Validation Rules

- **name**: Minimum 2 characters
- **email**: Valid email format
- **message**: Minimum 10 characters

## Response

### Success (200)

```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

Headers:
- `X-RateLimit-Limit`: 5
- `X-RateLimit-Remaining`: Number of remaining requests
- `X-RateLimit-Reset`: ISO timestamp when the rate limit resets

### Validation Error (400)

```json
{
  "error": "Validation failed",
  "details": {
    "name": ["Name must be at least 2 characters"],
    "email": ["Invalid email address"],
    "message": ["Message must be at least 10 characters"]
  }
}
```

### Rate Limit Exceeded (429)

```json
{
  "error": "Too many requests. Please try again later.",
  "resetTime": "2024-01-15T12:00:00.000Z"
}
```

Headers:
- `X-RateLimit-Limit`: 5
- `X-RateLimit-Remaining`: 0
- `X-RateLimit-Reset`: ISO timestamp when the rate limit resets

### Server Error (500)

```json
{
  "error": "An unexpected error occurred. Please try again later."
}
```

## Environment Variables

Required environment variable:

```env
RESEND_API_KEY=re_your_api_key_here
```

Get your API key from [Resend](https://resend.com).

## Rate Limiting

The rate limiter uses an in-memory store with the following configuration:
- **Max Requests**: 5 per window
- **Window Duration**: 1 hour (3600000 ms)
- **Identifier**: Client IP address (from x-forwarded-for, x-real-ip, or cf-connecting-ip headers)

The rate limiter automatically cleans up expired entries to prevent memory leaks.

## Email Configuration

Emails are sent to the address specified in `data/personal-info.ts` with:
- **From**: `Portfolio Contact <onboarding@resend.dev>` (update with your verified domain)
- **Reply-To**: Sender's email address
- **Subject**: `Portfolio Contact from [Name]`
- **Format**: Both plain text and HTML

## Testing

To test the API route:

1. Ensure `RESEND_API_KEY` is set in `.env.local`
2. Start the development server: `npm run dev`
3. Use the contact form on the website or send a POST request:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form."
  }'
```

## Notes

- The rate limiter is in-memory and will reset when the server restarts
- For production, consider using a persistent store (Redis, database) for rate limiting
- Update the `from` email address to use your verified domain in Resend
- The email recipient is configured in `data/personal-info.ts`
