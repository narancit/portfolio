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
