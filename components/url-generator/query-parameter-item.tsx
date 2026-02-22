'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { QueryParameter } from '@/types/url-generator';

interface QueryParameterItemProps {
  parameter: QueryParameter;
  onUpdate: (field: 'name' | 'value', value: string) => void;
  onDelete: () => void;
}

/**
 * Individual query parameter component with name and value inputs
 * Validates: Requirements 2.3, 2.4, 3.1, 6.1
 */
export function QueryParameterItem({
  parameter,
  onUpdate,
  onDelete,
}: QueryParameterItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-end p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
      {/* Parameter name input */}
      <div className="flex-1 space-y-2">
        <Label
          htmlFor={`param-name-${parameter.id}`}
          className="text-xs font-medium"
        >
          Name
        </Label>
        <Input
          id={`param-name-${parameter.id}`}
          type="text"
          value={parameter.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="key"
          className="w-full font-mono text-sm"
          aria-label={`Parameter name ${parameter.name ? `for ${parameter.name}` : ''}`}
        />
      </div>

      {/* Parameter value input */}
      <div className="flex-1 space-y-2">
        <Label
          htmlFor={`param-value-${parameter.id}`}
          className="text-xs font-medium"
        >
          Value
        </Label>
        <Input
          id={`param-value-${parameter.id}`}
          type="text"
          value={parameter.value}
          onChange={(e) => onUpdate('value', e.target.value)}
          placeholder="value"
          className="w-full font-mono text-sm"
          aria-label={`Parameter value ${parameter.name ? `for ${parameter.name}` : ''}`}
        />
      </div>

      {/* Delete button */}
      <Button
        onClick={onDelete}
        variant="ghost"
        size="icon"
        className="shrink-0 self-end sm:self-auto text-destructive hover:text-destructive hover:bg-destructive/10 min-h-[44px] min-w-[44px]"
        aria-label={`Delete parameter ${parameter.name || 'unnamed'}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
