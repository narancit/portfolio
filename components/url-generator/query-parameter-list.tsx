'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { QueryParameterItem } from './query-parameter-item';
import type { QueryParameter } from '@/types/url-generator';

interface QueryParameterListProps {
  parameters: QueryParameter[];
  onUpdate: (id: string, field: 'name' | 'value', value: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

/**
 * List component that manages query parameters
 * Validates: Requirements 2.1, 2.2, 6.1
 */
export function QueryParameterList({
  parameters,
  onUpdate,
  onDelete,
  onAdd,
}: QueryParameterListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium" id="query-params-heading">
          Query Parameters
        </h3>
        {parameters.length > 0 && (
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {parameters.length}{' '}
            {parameters.length === 1 ? 'parameter' : 'parameters'}
          </span>
        )}
      </div>

      {/* Parameter list */}
      {parameters.length > 0 ? (
        <div
          className="space-y-3"
          role="list"
          aria-labelledby="query-params-heading"
        >
          {parameters.map((parameter) => (
            <div key={parameter.id} role="listitem">
              <QueryParameterItem
                parameter={parameter}
                onUpdate={(field, value) =>
                  onUpdate(parameter.id, field, value)
                }
                onDelete={() => onDelete(parameter.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-lg">
          No parameters yet. Click &ldquo;Add Parameter&rdquo; to get started.
        </p>
      )}

      {/* Add parameter button */}
      <Button
        onClick={onAdd}
        variant="outline"
        className="w-full min-h-[44px]"
        size="lg"
        aria-label="Add new query parameter"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Parameter
      </Button>
    </div>
  );
}
