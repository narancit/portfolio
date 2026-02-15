import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/resume/download
 * 
 * Protected endpoint that serves the resume PDF file.
 * Requires authentication via auth_token cookie.
 * 
 * Response: PDF file with appropriate headers
 * Status: 200 on success, 401 if not authenticated, 404 if resume not found
 */
export async function GET() {
  // Check authentication
  if (!isAuthenticated()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Construct path to resume PDF in public directory
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    // Check if file exists
    if (!fs.existsSync(resumePath)) {
      return NextResponse.json(
        { error: 'Resume file not found' },
        { status: 404 }
      );
    }
    
    // Read the resume file
    const resumeBuffer = fs.readFileSync(resumePath);
    
    // Return PDF with appropriate headers
    return new NextResponse(resumeBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Melnar_Cordova_Resume.pdf"',
        'Content-Length': resumeBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return NextResponse.json(
      { error: 'Failed to serve resume' },
      { status: 500 }
    );
  }
}
