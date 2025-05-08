import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hipaaquestions.com';

export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /api/
Sitemap: ${SITE_URL}/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 