import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * 
 * Logs out the admin user by clearing the auth_token cookie.
 * 
 * Response: { success: boolean }
 * Status: 200
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the authentication cookie
  response.cookies.delete('auth_token');
  
  return response;
}
