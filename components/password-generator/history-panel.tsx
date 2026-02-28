'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw } from 'lucide-react';
import type { PasswordHistoryEntry } from '@/types/password-generator';
import { DISPLAY_PASSWORD_HISTORY } from '@/types/password-generator';

interface HistoryPanelProps {
  /** Array of history entries */
  history: PasswordHistoryEntry[];
  /** Handler for loading a history entry */
  onLoad: (entry: PasswordHistoryEntry) => void;
  /** Handler for deleting a single history entry */
  onDelete: (id: string) => void;
  /** Handler for clearing all history */
  onClearAll: () => void;
}

/**
 * HistoryPanel component displays recent password generation history
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 6.6
 */
export function HistoryPanel({
  history,
  onLoad,
  onDelete,
  onClearAll,
}: HistoryPanelProps) {
  // Get the most recent entries up to DISPLAY_PASSWORD_HISTORY
  const displayedHistory = history.slice(0, DISPLAY_PASSWORD_HISTORY);

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  // Mask password with dots matching length
  const maskPassword = (password: string): string => {
    return '•'.repeat(password.length);
  };

  // Format configuration summary (e.g., "16 chars • Aa1@")
  const formatConfiguration = (entry: PasswordHistoryEntry): string => {
    const { length, includeOptions } = entry.configuration;
    const chars: string[] = [];
    
    if (includeOptions.lowercase) chars.push('a');
    if (includeOptions.uppercase) chars.push('A');
    if (includeOptions.numbers) chars.push('1');
    if (includeOptions.symbols) chars.push('@');

    return `${length} chars • ${chars.join('')}`;
  };

  return (
    <Card role="region" aria-labelledby="history-heading">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" id="history-heading">
            Recent History
          </CardTitle>
          {displayedHistory.length > 0 && (
            <span className="text-xs text-muted-foreground" aria-live="polite">
              Showing {displayedHistory.length} of {history.length}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        {displayedHistory.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-muted-foreground border border-dashed rounded-lg">
            <p className="font-medium">No history yet</p>
            <p className="text-sm mt-1">Generated passwords will appear here</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {displayedHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col sm:flex-row items-start gap-3 p-3 sm:p-4 rounded-lg border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group"
                >
                  <div className="flex-1 min-w-0 space-y-1.5 w-full">
                    <p
                      className="text-sm font-medium font-mono"
                      title={entry.password}
                    >
                      {maskPassword(entry.password)}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatConfiguration(entry)}</span>
                      <span>•</span>
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 self-end sm:self-auto w-full sm:w-auto justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onLoad(entry)}
                      title="Load this configuration"
                      aria-label={`Load configuration: ${formatConfiguration(entry)}`}
                      className="h-11 w-11 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(entry.id)}
                      title="Delete this entry"
                      aria-label={`Delete history entry: ${formatConfiguration(entry)}`}
                      className="h-11 w-11 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={onClearAll}
              className="w-full min-h-[44px]"
              size="lg"
              disabled={history.length === 0}
              aria-label="Clear all history entries"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All History
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
