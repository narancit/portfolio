import { cookies } from 'next/headers';

/**
 * Checks if the current user is authenticated by validating the auth token cookie
 * against the AUTH_TOKEN environment variable.
 * 
 * @returns {boolean} True if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token');
  
  if (!authToken) return false;
  
  // Simple token validation against environment variable
  return authToken.value === process.env.AUTH_TOKEN;
}
