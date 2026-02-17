import { NextResponse } from 'next/server';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route tests if environment variables are configured
export async function GET() {
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasCricketAPI = !!process.env.CRICKET_API_KEY;

  // Get first/last characters of keys if they exist (for verification without exposing)
  const geminiPreview = process.env.GEMINI_API_KEY
    ? `${process.env.GEMINI_API_KEY.substring(0, 7)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}`
    : 'NOT SET';

  const cricketApiPreview = process.env.CRICKET_API_KEY
    ? `${process.env.CRICKET_API_KEY.substring(0, 8)}...${process.env.CRICKET_API_KEY.substring(process.env.CRICKET_API_KEY.length - 4)}`
    : 'NOT SET';

  return NextResponse.json({
    environment: process.env.NODE_ENV || 'unknown',
    vercel: !!process.env.VERCEL,
    gemini_configured: hasGemini,
    cricket_api_configured: hasCricketAPI,
    gemini_preview: geminiPreview,
    cricket_api_preview: cricketApiPreview,
    timestamp: new Date().toISOString()
  });
}
