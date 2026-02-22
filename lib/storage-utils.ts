/**
 * localStorage wrapper utilities for URL Generator
 * Handles saving and loading configurations and history with error handling
 */

import type { URLConfiguration, HistoryEntry } from '@/types/url-generator';
import { STORAGE_KEYS } from '@/types/url-generator';

/**
 * Saves the current URL configuration to localStorage
 * @param config - The URL configuration to save
 * @returns true if successful, false if error occurred
 */
export function saveConfiguration(config: URLConfiguration): boolean {
  try {
    const serialized = JSON.stringify(config);
    localStorage.setItem(STORAGE_KEYS.CURRENT_CONFIG, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save configuration to localStorage:', error);
    return false;
  }
}

/**
 * Loads the current URL configuration from localStorage
 * @returns The saved configuration, or null if not found or error occurred
 */
export function loadConfiguration(): URLConfiguration | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.CURRENT_CONFIG);
    if (!serialized) {
      return null;
    }
    const config = JSON.parse(serialized) as URLConfiguration;
    return config;
  } catch (error) {
    console.error('Failed to load configuration from localStorage:', error);
    return null;
  }
}

/**
 * Saves the history array to localStorage
 * @param history - The history entries to save
 * @returns true if successful, false if error occurred
 */
export function saveHistory(history: HistoryEntry[]): boolean {
  try {
    const serialized = JSON.stringify(history);
    localStorage.setItem(STORAGE_KEYS.HISTORY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save history to localStorage:', error);
    return false;
  }
}

/**
 * Loads the history array from localStorage
 * @returns The saved history entries, or empty array if not found or error occurred
 */
export function loadHistory(): HistoryEntry[] {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!serialized) {
      return [];
    }
    const history = JSON.parse(serialized) as HistoryEntry[];
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error('Failed to load history from localStorage:', error);
    return [];
  }
}
