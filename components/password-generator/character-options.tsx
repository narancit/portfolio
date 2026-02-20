'use client';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
    { key: 'lowercase' as const, label: 'Lowercase (a-z)' },
    { key: 'uppercase' as const, label: 'Uppercase (A-Z)' },
    { key: 'numbers' as const, label: 'Numbers (0-9)' },
    { key: 'symbols' as const, label: 'Symbols (!@#$...)' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm text-muted-foreground">Character Types</Label>

      <div className="space-y-2">
        {characterTypes.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={`char-${key}`}
              checked={options[key]}
              onCheckedChange={() => handleCheckboxChange(key)}
              disabled={disabled}
              aria-label={`Include ${label}`}
            />
            <Label
              htmlFor={`char-${key}`}
              className="text-sm font-normal text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
          </div>
        ))}
      </div>

      {disabled && (
        <p className="text-xs text-muted-foreground mt-2">
          Please select at least one character type
        </p>
      )}
    </div>
  );
}
