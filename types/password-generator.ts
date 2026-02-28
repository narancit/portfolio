/**
 * Character type options for password generation
 */
export interface CharacterOptions {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'Weak' | 'Fair' | 'Good' | 'Strong';

/**
 * Password generator component state
 */
export interface PasswordState {
  password: string;
  length: number;
  includeOptions: CharacterOptions;
  strength: PasswordStrength;
  copySuccess: boolean;
}
/**
 * Password configuration for history tracking
 */
export interface PasswordConfiguration {
  length: number;
  includeOptions: CharacterOptions;
}

/**
 * History entry for a generated password
 */
export interface PasswordHistoryEntry {
  id: string;
  password: string;
  configuration: PasswordConfiguration;
  timestamp: number;
}

/**
 * localStorage keys for password generator
 */
export const PASSWORD_STORAGE_KEYS = {
  CONFIG: 'password-generator-config',
  HISTORY: 'password-generator-history',
} as const;

/**
 * Maximum number of password history entries
 */
export const MAX_PASSWORD_HISTORY = 10;

/**
 * Number of history entries to display
 */
export const DISPLAY_PASSWORD_HISTORY = 3;
