import { BlogPost } from '@/types/portfolio';

export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications: Best Practices",
    excerpt: "Learn how to architect Next.js applications for scale with proper data fetching strategies, caching, and performance optimization techniques.",
    content: `# Building Scalable Next.js Applications: Best Practices

Next.js has become the go-to framework for building modern React applications, but scaling them properly requires careful consideration of architecture and best practices.

## Server Components vs Client Components

One of the most important decisions in Next.js 14+ is choosing between Server and Client Components. Server Components are the default and should be your first choice:

\`\`\`typescript
// Server Component (default)
async function ProjectList() {
  const projects = await fetchProjects();
  return <div>{projects.map(p => <ProjectCard key={p.id} {...p} />)}</div>;
}
\`\`\`

Use Client Components only when you need interactivity:

\`\`\`typescript
'use client';

function ContactForm() {
  const [email, setEmail] = useState('');
  // Interactive form logic
}
\`\`\`

## Data Fetching Strategies

Next.js offers multiple data fetching patterns. Choose based on your needs:

- **Static Generation (SSG)**: Pre-render at build time for content that rarely changes
- **Server-Side Rendering (SSR)**: Render on each request for dynamic content
- **Incremental Static Regeneration (ISR)**: Update static pages after deployment

## Caching and Performance

Implement proper caching strategies to reduce server load:

\`\`\`typescript
export const revalidate = 3600; // Revalidate every hour

async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return res.json();
}
\`\`\`

## Conclusion

Building scalable Next.js applications requires understanding the framework's capabilities and making informed architectural decisions. Focus on Server Components, implement proper caching, and optimize your data fetching strategies.`,
    publishedDate: "2024-01-15",
    tags: ["Next.js", "React", "Performance", "Architecture"],
    readingTime: 8,
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Better Code Quality",
    excerpt: "Explore advanced TypeScript patterns including discriminated unions, conditional types, and type guards to write more maintainable and type-safe code.",
    content: `# Advanced TypeScript Patterns for Better Code Quality

TypeScript's type system is incredibly powerful. Let's explore some advanced patterns that can significantly improve your code quality.

## Discriminated Unions

Discriminated unions help create type-safe state machines:

\`\`\`typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

function handleState(state: LoadingState) {
  switch (state.status) {
    case 'success':
      // TypeScript knows state.data exists here
      console.log(state.data);
      break;
    case 'error':
      // TypeScript knows state.error exists here
      console.error(state.error);
      break;
  }
}
\`\`\`

## Conditional Types

Conditional types enable type transformations based on conditions:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Practical example: Extract promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

type Result = Awaited<Promise<string>>; // string
\`\`\`

## Type Guards

Custom type guards provide runtime type checking:

\`\`\`typescript
interface User {
  id: string;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(data.name);
  }
}
\`\`\`

## Mapped Types

Transform existing types into new ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: string;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
\`\`\`

## Conclusion

These advanced TypeScript patterns help catch errors at compile time and make your code more maintainable. Start incorporating them into your projects to level up your TypeScript skills.`,
    publishedDate: "2024-02-03",
    tags: ["TypeScript", "Programming", "Best Practices"],
    readingTime: 10,
  },
  {
    slug: "optimizing-database-queries",
    title: "Optimizing Database Queries: From Slow to Fast",
    excerpt: "A practical guide to identifying and fixing slow database queries with real-world examples and performance optimization techniques.",
    content: `# Optimizing Database Queries: From Slow to Fast

Database performance can make or break your application. Let's explore practical techniques for optimizing queries.

## Identifying Slow Queries

First, you need to find the bottlenecks. Most databases provide query analysis tools:

\`\`\`sql
-- PostgreSQL: Enable query timing
EXPLAIN ANALYZE
SELECT * FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at DESC;
\`\`\`

## Indexing Strategies

Indexes are your first line of defense against slow queries:

\`\`\`sql
-- Create index on frequently queried columns
CREATE INDEX idx_users_created_at ON users(created_at);

-- Composite index for multiple columns
CREATE INDEX idx_users_email_status ON users(email, status);

-- Partial index for specific conditions
CREATE INDEX idx_active_users ON users(id) WHERE status = 'active';
\`\`\`

## N+1 Query Problem

One of the most common performance issues:

\`\`\`typescript
// Bad: N+1 queries
const users = await db.users.findMany();
for (const user of users) {
  const posts = await db.posts.findMany({ where: { userId: user.id } });
}

// Good: Single query with join
const users = await db.users.findMany({
  include: { posts: true }
});
\`\`\`

## Query Optimization Techniques

1. **Select only needed columns**: Don't use \`SELECT *\`
2. **Use LIMIT**: Paginate large result sets
3. **Avoid subqueries**: Use JOINs when possible
4. **Cache frequently accessed data**: Use Redis or similar

\`\`\`sql
-- Optimized query
SELECT id, name, email
FROM users
WHERE status = 'active'
LIMIT 100 OFFSET 0;
\`\`\`

## Connection Pooling

Manage database connections efficiently:

\`\`\`typescript
import { Pool } from 'pg';

const pool = new Pool({
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
\`\`\`

## Conclusion

Database optimization is an iterative process. Monitor your queries, add appropriate indexes, and always measure the impact of your changes.`,
    publishedDate: "2024-02-20",
    tags: ["Database", "Performance", "SQL", "Optimization"],
    readingTime: 12,
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques You Should Know in 2024",
    excerpt: "Discover the latest CSS features including container queries, cascade layers, and modern layout techniques that will transform your styling workflow.",
    content: `# Modern CSS Techniques You Should Know in 2024

CSS has evolved significantly. Let's explore modern techniques that make styling easier and more powerful.

## Container Queries

Container queries allow components to respond to their container's size, not just the viewport:

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## CSS Grid and Subgrid

Modern grid layouts with subgrid support:

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

## Cascade Layers

Organize your CSS with explicit layer ordering:

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer components {
  .button { /* component styles */ }
}
\`\`\`

## Custom Properties with @property

Define custom properties with type checking:

\`\`\`css
@property --rotation {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.element {
  --rotation: 45deg;
  transform: rotate(var(--rotation));
}
\`\`\`

## Modern Color Functions

Use new color spaces and functions:

\`\`\`css
.element {
  /* Relative colors */
  background: oklch(from blue calc(l * 0.8) c h);
  
  /* Color mixing */
  color: color-mix(in oklch, blue 70%, white);
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating responsive, maintainable stylesheets. Start incorporating these techniques to improve your styling workflow.`,
    publishedDate: "2024-03-05",
    tags: ["CSS", "Web Development", "Frontend", "Design"],
    readingTime: 7,
  },
];
