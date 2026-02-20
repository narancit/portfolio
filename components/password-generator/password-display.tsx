'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  copySuccess: boolean;
}

export function PasswordDisplay({
  password,
  onCopy,
  copySuccess,
}: PasswordDisplayProps) {
  return (
    <>
      {/* Success message */}
      {copySuccess && (
        <p className="text-sm text-green-500" role="status" aria-live="polite">
          Password copied to clipboard!
        </p>
      )}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Password display area */}
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                {password ? (
                  <p
                    className="font-mono text-lg break-all text-foreground"
                    aria-label="Generated password"
                  >
                    {password}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No password generated yet
                  </p>
                )}
              </div>

              {/* Copy button */}
              <Button
                onClick={onCopy}
                disabled={!password}
                size="icon"
                variant="outline"
                aria-label={
                  copySuccess ? 'Password copied' : 'Copy password to clipboard'
                }
                className="shrink-0"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
