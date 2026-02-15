import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * 
 * Authenticates the admin user by validating the password against the
 * ADMIN_PASSWORD environment variable. On success, sets a secure HTTP-only
 * cookie with the auth token.
 * 
 * Request body: { password: string }
 * Response: { success: boolean }
 * Status: 200 on success, 401 on invalid credentials
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Validate password against environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set secure HTTP-only cookie
      response.cookies.set('auth_token', process.env.AUTH_TOKEN!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      
      return response;
    }
    
    // Invalid credentials
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
