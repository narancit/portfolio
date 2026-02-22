/**
 * Manual verification tests for localStorage utilities
 * Tests error handling and graceful degradation
 */

import type { URLConfiguration, HistoryEntry } from '@/types/url-generator';

// Mock localStorage for testing
class MockLocalStorage {
  private store: Record<string, string> = {};
  private shouldThrow = false;

  setItem(key: string, value: string) {
    if (this.shouldThrow) {
      throw new Error('QuotaExceededError: localStorage quota exceeded');
    }
    this.store[key] = value;
  }

  getItem(key: string): string | null {
    if (this.shouldThrow) {
      throw new Error('SecurityError: localStorage access denied');
    }
    return this.store[key] || null;
  }

  clear() {
    this.store = {};
  }

  enableErrors() {
    this.shouldThrow = true;
  }

  disableErrors() {
    this.shouldThrow = false;
  }
}

// Replace global localStorage with mock
const mockStorage = new MockLocalStorage();
(global as any).localStorage = mockStorage;

// Import after mocking
const {
  saveConfiguration,
  loadConfiguration,
  saveHistory,
  loadHistory,
} = require('@/lib/storage-utils');

console.log('=== localStorage Utilities Verification ===\n');

// Test 1: Save and load configuration
console.log('Test 1: Save and load configuration');
const config: URLConfiguration = {
  baseUrl: 'https://example.com',
  parameters: [{ id: '1', name: 'test', value: 'value' }],
};
const saved = saveConfiguration(config);
const loaded = loadConfiguration();
console.log('Save successful:', saved);
console.log('Load successful:', loaded !== null);
console.log('Data matches:', JSON.stringify(loaded) === JSON.stringify(config));
console.log('');

// Test 2: Save and load history
console.log('Test 2: Save and load history');
const history: HistoryEntry[] = [
  {
    id: '1',
    configuration: config,
    timestamp: Date.now(),
    generatedUrl: 'https://example.com?test=value',
  },
];
const historySaved = saveHistory(history);
const historyLoaded = loadHistory();
console.log('Save successful:', historySaved);
console.log('Load successful:', historyLoaded.length > 0);
console.log(
  'Data matches:',
  JSON.stringify(historyLoaded) === JSON.stringify(history),
);
console.log('');

// Test 3: Error handling - save with errors
console.log('Test 3: Error handling - save operations');
mockStorage.enableErrors();
const saveWithError = saveConfiguration(config);
const historySaveWithError = saveHistory(history);
console.log('Save returns false on error:', saveWithError === false);
console.log(
  'History save returns false on error:',
  historySaveWithError === false,
);
console.log('');

// Test 4: Error handling - load with errors
console.log('Test 4: Error handling - load operations');
const loadWithError = loadConfiguration();
const historyLoadWithError = loadHistory();
console.log('Load returns null on error:', loadWithError === null);
console.log(
  'History load returns empty array on error:',
  Array.isArray(historyLoadWithError) && historyLoadWithError.length === 0,
);
console.log('');

// Test 5: Invalid JSON handling
console.log('Test 5: Invalid JSON handling');
mockStorage.disableErrors();
mockStorage.clear();
(mockStorage as any).store['url-generator-current'] = 'invalid json {';
const invalidLoad = loadConfiguration();
console.log('Invalid JSON returns null:', invalidLoad === null);
console.log('');

// Test 6: Empty storage
console.log('Test 6: Empty storage');
mockStorage.clear();
const emptyLoad = loadConfiguration();
const emptyHistory = loadHistory();
console.log('Empty config returns null:', emptyLoad === null);
console.log(
  'Empty history returns empty array:',
  Array.isArray(emptyHistory) && emptyHistory.length === 0,
);
console.log('');

console.log('=== All localStorage tests completed ===');
