/**
 * Character sets for password generation
 * Validates: Requirements 1.3
 */
export const CHARACTER_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

import type { CharacterOptions } from '@/types/password-generator';

/**
 * Generates a secure random password based on specified length and character options
 * Validates: Requirements 1.1, 1.2, 1.4, 1.5
 *
 * @param length - Password length (8-32 characters)
 * @param options - Character types to include in password
 * @returns Generated password string
 */
export function generatePassword(
  length: number,
  options: CharacterOptions,
): string {
  // Build character pool from selected options
  let characterPool = '';
  const selectedSets: string[] = [];

  if (options.lowercase) {
    characterPool += CHARACTER_SETS.lowercase;
    selectedSets.push(CHARACTER_SETS.lowercase);
  }
  if (options.uppercase) {
    characterPool += CHARACTER_SETS.uppercase;
    selectedSets.push(CHARACTER_SETS.uppercase);
  }
  if (options.numbers) {
    characterPool += CHARACTER_SETS.numbers;
    selectedSets.push(CHARACTER_SETS.numbers);
  }
  if (options.symbols) {
    characterPool += CHARACTER_SETS.symbols;
    selectedSets.push(CHARACTER_SETS.symbols);
  }

  // If no character types selected, return empty string
  if (characterPool.length === 0) {
    return '';
  }

  // Ensure at least one character from each selected type
  const passwordChars: string[] = [];

  for (const charSet of selectedSets) {
    const randomIndex = getSecureRandomInt(charSet.length);
    passwordChars.push(charSet[randomIndex]);
  }

  // Fill remaining length with random characters from pool
  const remainingLength = length - passwordChars.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = getSecureRandomInt(characterPool.length);
    passwordChars.push(characterPool[randomIndex]);
  }

  // Shuffle to randomize positions using Fisher-Yates algorithm
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join('');
}

/**
 * Generates a cryptographically secure random integer between 0 (inclusive) and max (exclusive)
 * Uses crypto.getRandomValues for secure randomness
 *
 * @param max - Upper bound (exclusive)
 * @returns Random integer in range [0, max)
 */
function getSecureRandomInt(max: number): number {
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % max;
}

import type { PasswordStrength } from '@/types/password-generator';

/**
 * Calculates password strength based on length and character type diversity
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4
 *
 * @param password - The password string to evaluate
 * @param options - Character types included in the password
 * @returns Password strength level: Weak, Fair, Good, or Strong
 */
export function calculateStrength(
  password: string,
  options: CharacterOptions,
): PasswordStrength {
  const length = password.length;

  // Count number of character types used
  const typesCount = [
    options.lowercase,
    options.uppercase,
    options.numbers,
    options.symbols,
  ].filter(Boolean).length;

  // Apply strength rules based on requirements
  // Requirement 2.3: Length < 12 = Weak or Fair
  if (length < 12) {
    // Use types count to differentiate between Weak and Fair
    return typesCount >= 3 ? 'Fair' : 'Weak';
  }

  // Requirement 2.4: Length >= 12 && types >= 3 = Good or Strong
  if (length >= 12 && typesCount >= 3) {
    // Use length and types to differentiate between Good and Strong
    // Strong: 16+ characters with 4 types, or 20+ with 3+ types
    if ((length >= 16 && typesCount === 4) || length >= 20) {
      return 'Strong';
    }
    return 'Good';
  }

  // Length >= 12 but fewer than 3 types
  return typesCount >= 2 ? 'Fair' : 'Weak';
}
