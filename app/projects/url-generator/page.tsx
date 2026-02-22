import { URLGenerator } from '@/components/url-generator/url-generator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'URL Generator | Melnar Ancit Cordova',
  description:
    'Construct URLs with query parameters interactively. A client-side tool with real-time generation, clipboard support, and history management.',
};

export default function URLGeneratorPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#url-generator-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to URL Generator
        </a>

        {/* Header */}
        <header className="mb-12">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-6 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            URL Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Build URLs with query parameters interactively. All generation
            happens in your browser for maximum privacy.
          </p>
        </header>

        {/* URL Generator Component */}
        <main id="url-generator-main">
          <URLGenerator />
        </main>
      </div>
    </div>
  );
}
