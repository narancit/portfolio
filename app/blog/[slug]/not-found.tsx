import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <FileQuestion className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, the blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button variant="default" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              View All Posts
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
