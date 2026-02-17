import { NextResponse } from 'next/server';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route tests if environment variables are configured
export async function GET() {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasRapidAPI = !!process.env.RAPIDAPI_KEY;

  // Get first/last 4 characters of keys if they exist (for verification without exposing)
  const openAIPreview = process.env.OPENAI_API_KEY
    ? `${process.env.OPENAI_API_KEY.substring(0, 7)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)}`
    : 'NOT SET';

  const rapidAPIPreview = process.env.RAPIDAPI_KEY
    ? `${process.env.RAPIDAPI_KEY.substring(0, 4)}...${process.env.RAPIDAPI_KEY.substring(process.env.RAPIDAPI_KEY.length - 4)}`
    : 'NOT SET';

  return NextResponse.json({
    environment: process.env.NODE_ENV || 'unknown',
    vercel: !!process.env.VERCEL,
    openai_configured: hasOpenAI,
    rapidapi_configured: hasRapidAPI,
    openai_preview: openAIPreview,
    rapidapi_preview: rapidAPIPreview,
    timestamp: new Date().toISOString()
  });
}
