/**
 * localStorage wrapper utilities for URL Generator and Password Generator
 * Handles saving and loading configurations and history with error handling
 */

import type { URLConfiguration, HistoryEntry } from '@/types/url-generator';
import { STORAGE_KEYS } from '@/types/url-generator';
import type { PasswordConfiguration, PasswordHistoryEntry } from '@/types/password-generator';
import { PASSWORD_STORAGE_KEYS } from '@/types/password-generator';

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

/**
 * Saves password configuration to localStorage
 * @param config - The password configuration to save
 * @returns true if successful, false if error occurred
 */
export function savePasswordConfiguration(config: PasswordConfiguration): boolean {
  try {
    const serialized = JSON.stringify(config);
    localStorage.setItem(PASSWORD_STORAGE_KEYS.CONFIG, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save password configuration to localStorage:', error);
    return false;
  }
}

/**
 * Loads password configuration from localStorage
 * @returns The saved configuration, or null if not found or error occurred
 */
export function loadPasswordConfiguration(): PasswordConfiguration | null {
  try {
    const serialized = localStorage.getItem(PASSWORD_STORAGE_KEYS.CONFIG);
    if (!serialized) {
      return null;
    }
    const config = JSON.parse(serialized) as PasswordConfiguration;
    return config;
  } catch (error) {
    console.error('Failed to load password configuration from localStorage:', error);
    return null;
  }
}

/**
 * Saves password history to localStorage
 * @param history - The history entries to save
 * @returns true if successful, false if error occurred
 */
export function savePasswordHistory(history: PasswordHistoryEntry[]): boolean {
  try {
    const serialized = JSON.stringify(history);
    localStorage.setItem(PASSWORD_STORAGE_KEYS.HISTORY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save password history to localStorage:', error);
    return false;
  }
}

/**
 * Loads password history from localStorage
 * @returns The saved history entries, or empty array if not found or error occurred
 */
export function loadPasswordHistory(): PasswordHistoryEntry[] {
  try {
    const serialized = localStorage.getItem(PASSWORD_STORAGE_KEYS.HISTORY);
    if (!serialized) {
      return [];
    }
    const history = JSON.parse(serialized) as PasswordHistoryEntry[];
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error('Failed to load password history from localStorage:', error);
    return [];
  }
}
