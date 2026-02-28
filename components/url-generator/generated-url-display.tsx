'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';

interface GeneratedUrlDisplayProps {
  url: string;
  onCopy: () => void;
  copySuccess: boolean;
}

export function GeneratedUrlDisplay({
  url,
  onCopy,
  copySuccess,
}: GeneratedUrlDisplayProps) {
  const handleCopy = async () => {
    // Check if Clipboard API is available
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      // Fallback: select the text for manual copying
      const input = document.querySelector(
        'input[aria-label="Generated URL output"]',
      ) as HTMLInputElement;
      if (input) {
        input.select();
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      onCopy();
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
      // Fallback: select the text for manual copying
      const input = document.querySelector(
        'input[aria-label="Generated URL output"]',
      ) as HTMLInputElement;
      if (input) {
        input.select();
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium" id="generated-url-heading">
        Generated URL
      </h3>

      <Card className="border-2">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              {url ? (
                  <p
                    className="font-mono text-lg break-all text-foreground"
                    aria-label="Generated password"
                  >
                    {url}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No URL generated yet
                  </p>
                )}
            </div>

            {/* Copy button */}
            <Button
              onClick={handleCopy}
              disabled={!url}
              size="icon"
              variant={copySuccess ? 'default' : 'outline'}
              aria-label={
                copySuccess
                  ? 'URL copied to clipboard'
                  : 'Copy URL to clipboard'
              }
              className="shrink-0 min-h-[44px] min-w-[44px] w-full sm:w-auto"
            >
              {copySuccess ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
