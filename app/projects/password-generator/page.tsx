import { PasswordGenerator } from '@/components/password-generator/password-generator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Password Generator | Melnar Ancit Cordova',
  description:
    'Generate secure passwords with customizable length and character types. A client-side tool with strength indicator and clipboard support.',
};

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-6 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Password Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Create secure passwords with customizable length and character
            types. All generation happens in your browser for maximum privacy.
          </p>
        </div>

        {/* Password Generator Component */}
        <PasswordGenerator />
      </div>
    </div>
  );
}
