'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PasswordDisplay } from './password-display';
import { LengthSlider } from './length-slider';
import { CharacterOptions } from './character-options';
import { StrengthIndicator } from './strength-indicator';
import { HistoryPanel } from './history-panel';
import { generatePassword, calculateStrength } from '@/lib/password-utils';
import {
  savePasswordConfiguration,
  loadPasswordHistory,
  savePasswordHistory,
} from '@/lib/storage-utils';
import type {
  CharacterOptions as CharacterOptionsType,
  PasswordStrength,
  PasswordHistoryEntry,
  PasswordConfiguration,
} from '@/types/password-generator';
import { MAX_PASSWORD_HISTORY } from '@/types/password-generator';

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
  const [history, setHistory] = useState<PasswordHistoryEntry[]>([]);
  const isLoadingFromHistoryRef = useRef<boolean>(false);

  // Load saved history on mount
  // Validates: Requirements 2.2
  useEffect(() => {
    const savedHistory = loadPasswordHistory();
    setHistory(savedHistory);
  }, []);

  // Generate initial password on mount and regenerate when length or options change
  // Validates: Requirements 1.2, 1.4, 1.5, 2.1, 2.5, 3.2
  useEffect(() => {
    // Skip regeneration if we're loading from history
    if (isLoadingFromHistoryRef.current) {
      isLoadingFromHistoryRef.current = false;
      return;
    }
    
    const newPassword = generatePassword(length, includeOptions);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword, includeOptions));
  }, [length, includeOptions]);

  // Save configuration to localStorage when length or options change
  // Validates: Requirements 3.1, 3.2
  useEffect(() => {
    const config: PasswordConfiguration = {
      length,
      includeOptions,
    };
    savePasswordConfiguration(config);
  }, [length, includeOptions]);

  // Handler for clipboard copy functionality with history tracking
  // Validates: Requirements 1.1, 1.3, 1.4, 1.6, 4.1, 4.2, 4.3, 4.4, 7.1, 7.3, 7.4
  const handleCopyWithHistory = async () => {
    // Don't add to history if password is empty or no options selected
    if (!password || !Object.values(includeOptions).some((v) => v)) {
      return;
    }

    // Check for duplicate consecutive entries
    const isDuplicate =
      history.length > 0 &&
      history[0].password === password &&
      history[0].configuration.length === length &&
      JSON.stringify(history[0].configuration.includeOptions) ===
        JSON.stringify(includeOptions);

    if (!isDuplicate) {
      // Generate unique ID (timestamp + random)
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create new history entry
      const newEntry: PasswordHistoryEntry = {
        id,
        password,
        configuration: {
          length,
          includeOptions,
        },
        timestamp: Date.now(),
      };

      // Add to history (newest first)
      let updatedHistory = [newEntry, ...history];

      // Remove oldest entry if exceeding max
      if (updatedHistory.length > MAX_PASSWORD_HISTORY) {
        updatedHistory = updatedHistory.slice(0, MAX_PASSWORD_HISTORY);
      }

      // Update state and persist
      setHistory(updatedHistory);
      savePasswordHistory(updatedHistory);
    }

    // Copy to clipboard
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

  // Handler for manual regeneration button
  // Validates: Requirements 3.1, 3.2, 3.3
  const handleRegenerate = () => {
    const newPassword = generatePassword(length, includeOptions);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword, includeOptions));
  };

  // Handler for loading configuration from history
  // Validates: Requirements 5.1, 5.5
  const handleLoadFromHistory = (entry: PasswordHistoryEntry) => {
    // Set flag to prevent regeneration
    isLoadingFromHistoryRef.current = true;
    // Load the exact password from history
    setPassword(entry.password);
    // Update configuration
    setLength(entry.configuration.length);
    setIncludeOptions(entry.configuration.includeOptions);
    // Recalculate strength for the loaded password
    setStrength(calculateStrength(entry.password, entry.configuration.includeOptions));
  };

  // Handler for deleting a specific history entry
  // Validates: Requirements 5.2, 5.4
  const handleDeleteEntry = (id: string) => {
    // Filter out the entry by id
    const updatedHistory = history.filter((entry) => entry.id !== id);
    // Update state and localStorage
    setHistory(updatedHistory);
    savePasswordHistory(updatedHistory);
  };

  // Handler for clearing all history entries
  // Validates: Requirements 5.3, 5.4
  const handleClearHistory = () => {
    // Set history to empty array
    setHistory([]);
    // Update localStorage
    savePasswordHistory([]);
  };

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6">
      {/* Main Password Generator Card */}
      <Card role="region" aria-label="Password Generator">
        <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
          {/* Password display */}
          <PasswordDisplay
            password={password}
            onCopy={handleCopyWithHistory}
            onRegenerate={handleRegenerate}
            copySuccess={copySuccess}
          />

          {/* Strength indicator with length */}
          <StrengthIndicator strength={strength} length={length} />

          {/* Length slider */}
          <LengthSlider value={length} onChange={setLength} min={8} max={32} />

          {/* Character options */}
          <CharacterOptions
            options={includeOptions}
            onChange={setIncludeOptions}
            disabled={false}
          />
        </CardContent>
      </Card>

      {/* History panel */}
      <HistoryPanel
        history={history}
        onLoad={handleLoadFromHistory}
        onDelete={handleDeleteEntry}
        onClearAll={handleClearHistory}
      />
    </div>
  );
}
