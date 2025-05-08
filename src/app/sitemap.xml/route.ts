import { NextResponse } from 'next/server';

// IMPORTANT: Replace this with your actual data fetching logic
async function getQuestions(): Promise<{ slug: string; updatedAt: string }[]> {
  // Example: Fetch from a CMS or database
  // For demonstration, returning a static list
  return [
    { slug: 'what-is-phi', updatedAt: new Date().toISOString() },
    { slug: 'hipaa-compliance-checklist', updatedAt: new Date().toISOString() },
    // Add more questions here
  ];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hipaaquestions.com';

export const revalidate = 900; // 15 minutes

export async function GET() {
  const questions = await getQuestions();
  const today = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add homepage
  sitemapXml += `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add question pages
  questions.forEach(question => {
    const questionLastMod = new Date(question.updatedAt).toISOString().split('T')[0];
    sitemapXml += `  <url>
      <loc>${SITE_URL}/questions/${question.slug}</loc>
      <lastmod>${questionLastMod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
`;
  });

  sitemapXml += '</urlset>';

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 