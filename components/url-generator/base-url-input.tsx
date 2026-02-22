'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BaseUrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BaseUrlInput({ value, onChange }: BaseUrlInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="base-url" className="text-sm font-medium">
        Base URL
      </Label>
      <Input
        id="base-url"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/api/endpoint"
        className="w-full font-mono text-sm"
        aria-label="Base URL input"
        aria-describedby="base-url-description"
      />
      <span id="base-url-description" className="sr-only">
        Enter the base URL before query parameters
      </span>
    </div>
  );
}
