/**
 * Type definitions for the URL Generator feature
 */

/**
 * Represents a single query parameter with name-value pair
 */
export interface QueryParameter {
  /** Unique identifier for the parameter */
  id: string;
  /** Parameter name (key) */
  name: string;
  /** Parameter value */
  value: string;
}

/**
 * Represents a complete URL configuration with base URL and parameters
 */
export interface URLConfiguration {
  /** The base URL before query parameters */
  baseUrl: string;
  /** Array of query parameters */
  parameters: QueryParameter[];
}

/**
 * Represents a saved history entry with timestamp
 */
export interface HistoryEntry {
  /** Unique identifier for the history entry */
  id: string;
  /** The saved URL configuration */
  configuration: URLConfiguration;
  /** Unix timestamp in milliseconds when the entry was created */
  timestamp: number;
  /** The cached generated URL for display purposes */
  generatedUrl: string;
}

/**
 * localStorage keys for persisting data
 */
export const STORAGE_KEYS = {
  /** Key for storing the current URL configuration */
  CURRENT_CONFIG: 'url-generator-current',
  /** Key for storing the history of URL configurations */
  HISTORY: 'url-generator-history',
} as const;

/**
 * Maximum number of history entries to store in localStorage
 */
export const MAX_HISTORY_ENTRIES = 10;

/**
 * Number of history entries to display in the UI
 */
export const DISPLAY_HISTORY_COUNT = 3;
