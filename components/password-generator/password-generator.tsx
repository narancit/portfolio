'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { PasswordDisplay } from './password-display';
import { LengthSlider } from './length-slider';
import { CharacterOptions } from './character-options';
import { StrengthIndicator } from './strength-indicator';
import { generatePassword, calculateStrength } from '@/lib/password-utils';
import type {
  CharacterOptions as CharacterOptionsType,
  PasswordStrength,
} from '@/types/password-generator';

/**
 * Main password generator component with state management
 * Validates: Requirements 1.1, 1.2, 1.3, 3.3
 */
export function PasswordGenerator() {
  // State management
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(16);
  const [includeOptions, setIncludeOptions] = useState<CharacterOptionsType>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState<PasswordStrength>('Strong');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Generate initial password on mount and regenerate when length or options change
  // Validates: Requirements 1.2, 1.4, 1.5, 2.1, 2.5, 3.2
  useEffect(() => {
    const newPassword = generatePassword(length, includeOptions);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword, includeOptions));
  }, [length, includeOptions]);

  // Handler for manual regeneration button
  // Validates: Requirements 3.1, 3.2, 3.3
  const handleRegenerate = () => {
    const newPassword = generatePassword(length, includeOptions);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword, includeOptions));
  };

  // Handler for clipboard copy functionality
  // Validates: Requirements 4.1, 4.2, 4.3, 4.4
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      // Handle clipboard API failures
      console.error('Failed to copy password:', error);
      alert('Unable to copy to clipboard. Please copy manually.');
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Password display */}
          <PasswordDisplay
            password={password}
            onCopy={handleCopy}
            copySuccess={copySuccess}
          />

          {/* Strength indicator */}
          <StrengthIndicator strength={strength} />

          {/* Length slider */}
          <LengthSlider value={length} onChange={setLength} min={8} max={32} />

          {/* Character options */}
          <CharacterOptions
            options={includeOptions}
            onChange={setIncludeOptions}
            disabled={false}
          />

          {/* Regenerate button */}
          <Button onClick={handleRegenerate} className="w-full" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
