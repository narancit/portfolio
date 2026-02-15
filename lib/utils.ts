import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate years of experience from a start date
 * @param startDate - ISO date string (YYYY-MM-DD)
 * @returns Number of years (minimum 1) or undefined if invalid
 */
export function calculateYearsOfExperience(
  startDate: string,
): number | undefined {
  const start = new Date(startDate);
  const now = new Date();

  // Validate date
  if (isNaN(start.getTime())) {
    return undefined;
  }

  // Calculate difference in years
  const years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();

  // Adjust if birthday hasn't occurred this year
  const adjustedYears =
    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? years - 1 : years;

  // Return minimum of 1 year
  return Math.max(1, adjustedYears);
}
