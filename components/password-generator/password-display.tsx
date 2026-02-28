'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  onRegenerate: () => void;
  copySuccess: boolean;
}

export function PasswordDisplay({
  password,
  onCopy,
  onRegenerate,
  copySuccess,
}: PasswordDisplayProps) {
  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Password display area */}
            <div className="flex items-center gap-2">
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

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  onClick={onRegenerate}
                  disabled={!password}
                  size="icon"
                  variant="outline"
                  aria-label="Generate new password"
                  title="Generate new password"
                  className="h-10 w-10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={onCopy}
                  disabled={!password}
                  size="icon"
                  variant={copySuccess ? 'default' : 'outline'}
                  aria-label={
                    copySuccess ? 'Password copied' : 'Copy password to clipboard'
                  }
                  title={copySuccess ? 'Password copied' : 'Copy to clipboard'}
                  className="h-10 w-10"
                >
                  {copySuccess ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
