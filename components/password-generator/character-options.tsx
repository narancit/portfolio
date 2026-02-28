'use client';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { CharacterOptions } from '@/types/password-generator';

interface CharacterOptionsProps {
  options: CharacterOptions;
  onChange: (options: CharacterOptions) => void;
  disabled: boolean;
}

export function CharacterOptions({
  options,
  onChange,
  disabled,
}: CharacterOptionsProps) {
  const handleCheckboxChange = (key: keyof CharacterOptions) => {
    onChange({
      ...options,
      [key]: !options[key],
    });
  };

  const characterTypes = [
    { key: 'lowercase' as const, label: 'Lowercase', example: 'abc' },
    { key: 'uppercase' as const, label: 'Uppercase', example: 'ABC' },
    { key: 'numbers' as const, label: 'Numbers', example: '123' },
    { key: 'symbols' as const, label: 'Symbols', example: '!@#' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm text-muted-foreground">Character Types</Label>

      <div className="grid grid-cols-2 gap-2">
        {characterTypes.map(({ key, label, example }) => (
          <div
            key={key}
            className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
          >
            <Checkbox
              id={`char-${key}`}
              checked={options[key]}
              onCheckedChange={() => handleCheckboxChange(key)}
              disabled={disabled}
              aria-label={`Include ${label}`}
            />
            <Label
              htmlFor={`char-${key}`}
              className="flex-1 text-sm font-normal text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="block">{label}</span>
              <Badge
                variant="outline"
                className="mt-0.5 font-mono text-xs px-1.5 py-0"
              >
                {example}
              </Badge>
            </Label>
          </div>
        ))}
      </div>

      {disabled && (
        <p className="text-xs text-muted-foreground">
          Please select at least one character type
        </p>
      )}
    </div>
  );
}
