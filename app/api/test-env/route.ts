import { NextResponse } from 'next/server';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route tests if environment variables are configured
export async function GET() {
  const hasGemini = !!process.env.GEMINI_API_KEY;

  // Get first/last characters of key if it exists (for verification without exposing)
  const geminiPreview = process.env.GEMINI_API_KEY
    ? `${process.env.GEMINI_API_KEY.substring(0, 7)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}`
    : 'NOT SET';

  return NextResponse.json({
    environment: process.env.NODE_ENV || 'unknown',
    vercel: !!process.env.VERCEL,
    gemini_configured: hasGemini,
    gemini_preview: geminiPreview,
    timestamp: new Date().toISOString()
  });
}
