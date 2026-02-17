import { NextResponse } from 'next/server';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route tests if environment variables are configured
export async function GET() {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  // Get first/last characters of key if it exists (for verification without exposing)
  const openAIPreview = process.env.OPENAI_API_KEY
    ? `${process.env.OPENAI_API_KEY.substring(0, 7)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)}`
    : 'NOT SET';

  return NextResponse.json({
    environment: process.env.NODE_ENV || 'unknown',
    vercel: !!process.env.VERCEL,
    openai_configured: hasOpenAI,
    openai_preview: openAIPreview,
    timestamp: new Date().toISOString()
  });
}
