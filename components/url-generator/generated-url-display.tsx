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
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium" id="generated-url-heading">
          Generated URL
        </h3>
        {copySuccess && (
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground"
            role="status"
            aria-live="polite"
          >
            <Check className="mr-1 h-3 w-3" />
            Copied!
          </Badge>
        )}
      </div>

      <Card className="border-2">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <Input
                value={url}
                readOnly
                className="font-mono text-sm bg-background border-0 focus-visible:ring-0 px-0"
                placeholder="Your generated URL will appear here"
                aria-label="Generated URL output"
                aria-describedby="generated-url-heading"
              />
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
