'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">Error</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Failed to load blog content
          </h2>
          <p className="text-muted-foreground">
            We couldn&apos;t load the blog post you&apos;re looking for.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">All posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
