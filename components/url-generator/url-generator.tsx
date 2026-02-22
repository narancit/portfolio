'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BaseUrlInput } from './base-url-input';
import { QueryParameterList } from './query-parameter-list';
import { GeneratedUrlDisplay } from './generated-url-display';
import { HistoryPanel } from './history-panel';
import { generateUrl } from '@/lib/url-utils';
import {
  saveConfiguration,
  loadConfiguration,
  saveHistory,
  loadHistory,
} from '@/lib/storage-utils';
import type {
  QueryParameter,
  URLConfiguration,
  HistoryEntry,
} from '@/types/url-generator';
import { MAX_HISTORY_ENTRIES } from '@/types/url-generator';

/**
 * Main URL Generator component with state management
 * Validates: Requirements 1.1, 1.2, 2.1, 2.2, 2.4, 3.1, 3.2, 3.3, 4.2, 5.1, 5.2,
 * 7.1, 7.2, 7.3, 8.1, 9.1, 9.3, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6
 */
export function URLGenerator() {
  // State management
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [parameters, setParameters] = useState<QueryParameter[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load configuration from localStorage on mount
  // Validates: Requirements 8.1, 8.2
  useEffect(() => {
    const savedConfig = loadConfiguration();
    if (savedConfig) {
      setBaseUrl(savedConfig.baseUrl);
      setParameters(savedConfig.parameters);
    }

    const savedHistory = loadHistory();
    setHistory(savedHistory);
  }, []);

  // Regenerate URL when baseUrl or parameters change
  // Validates: Requirements 1.2, 2.4, 4.2
  useEffect(() => {
    const newUrl = generateUrl(baseUrl, parameters);
    setGeneratedUrl(newUrl);
  }, [baseUrl, parameters]);

  // Save configuration to localStorage on changes
  // Validates: Requirements 8.1
  useEffect(() => {
    const config: URLConfiguration = {
      baseUrl,
      parameters,
    };
    saveConfiguration(config);
  }, [baseUrl, parameters]);

  // Helper function to add current configuration to history
  // Validates: Requirements 9.1, 9.3, 9.6
  const addToHistory = () => {
    // Only add to history if we have a meaningful URL (base URL or parameters)
    if (baseUrl.trim() === '' && parameters.length === 0) {
      return;
    }

    // Don't add if the generated URL is empty
    if (generatedUrl.trim() === '') {
      return;
    }

    // Create new history entry
    const newEntry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      configuration: {
        baseUrl,
        parameters: [...parameters],
      },
      timestamp: Date.now(),
      generatedUrl,
    };

    setHistory((prevHistory) => {
      // Check if the most recent entry is identical to avoid duplicates
      if (prevHistory.length > 0) {
        const mostRecent = prevHistory[0];
        if (
          mostRecent.configuration.baseUrl === baseUrl &&
          JSON.stringify(mostRecent.configuration.parameters) ===
            JSON.stringify(parameters)
        ) {
          return prevHistory; // Don't add duplicate
        }
      }

      // Add new entry at the beginning and limit to MAX_HISTORY_ENTRIES
      const updatedHistory = [newEntry, ...prevHistory].slice(
        0,
        MAX_HISTORY_ENTRIES,
      );
      saveHistory(updatedHistory);
      return updatedHistory;
    });
  };

  // Handler: Add new parameter
  // Validates: Requirements 2.1, 2.2
  const handleAddParameter = () => {
    const newParameter: QueryParameter = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      value: '',
    };
    setParameters([...parameters, newParameter]);
  };

  // Handler: Update parameter name or value
  // Validates: Requirements 2.4
  const handleUpdateParameter = (
    id: string,
    field: 'name' | 'value',
    value: string,
  ) => {
    setParameters(
      parameters.map((param) =>
        param.id === id ? { ...param, [field]: value } : param,
      ),
    );
  };

  // Handler: Delete parameter
  // Validates: Requirements 3.1, 3.2, 3.3
  const handleDeleteParameter = (id: string) => {
    setParameters(parameters.filter((param) => param.id !== id));
  };

  // Handler: Copy generated URL to clipboard
  // Validates: Requirements 5.1, 5.2
  const handleCopy = () => {
    setCopySuccess(true);
    // Add to history when copy is clicked
    addToHistory();
    // Reset success state after 2 seconds
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  // Handler: Load configuration from history
  // Validates: Requirements 10.1, 10.2, 10.3, 10.4
  const handleLoadHistory = (entry: HistoryEntry) => {
    setBaseUrl(entry.configuration.baseUrl);
    setParameters([...entry.configuration.parameters]);
  };

  // Handler: Clear all history
  // Validates: Requirements 10.6
  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  // Handler: Delete single history entry
  // Validates: Requirements 10.5
  const handleDeleteHistoryEntry = (id: string) => {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6">
      {/* Main URL Generator Card */}
      <Card role="region" aria-label="URL Generator">
        <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
          {/* Base URL input */}
          <BaseUrlInput value={baseUrl} onChange={setBaseUrl} />

          {/* Query parameters list */}
          <QueryParameterList
            parameters={parameters}
            onUpdate={handleUpdateParameter}
            onDelete={handleDeleteParameter}
            onAdd={handleAddParameter}
          />

          {/* Generated URL display */}
          <GeneratedUrlDisplay
            url={generatedUrl}
            onCopy={handleCopy}
            copySuccess={copySuccess}
          />
        </CardContent>
      </Card>

      {/* History panel */}
      <HistoryPanel
        history={history}
        onLoad={handleLoadHistory}
        onDelete={handleDeleteHistoryEntry}
        onClearAll={handleClearHistory}
      />
    </div>
  );
}
