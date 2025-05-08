import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getQuestionBySlug, getAllQuestionSlugs } from '@/lib/data/questions';
import LeadForm from '@/components/LeadForm';

// -------------------------------------------------
//  Static params (ISR or full SSG, as you prefer)
// -------------------------------------------------
export async function generateStaticParams() {
  const slugs = await getAllQuestionSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

interface QuestionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// -------------------------------------------------
//  Metadata
// -------------------------------------------------
export async function generateMetadata({ params: paramsPromise }: QuestionPageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const question = await getQuestionBySlug(params.slug);
  if (!question) return { title: 'Question Not Found' };

  const siteName = 'HIPAAquestions.com';
  return {
    title:       `${question.title} | ${siteName}`,
    description: question.excerpt,
    alternates:  { canonical: `/questions/${question.slug}` },
    openGraph:   {
      title:       question.title,
      description: question.excerpt,
      url:         `/questions/${question.slug}`,
      siteName,
      type:        'article',
      tags:        question.tags,
    },
    twitter: {
      card:        'summary_large_image',
      title:       question.title,
      description: question.excerpt,
    },
  };
}

// -------------------------------------------------
//  Page component
// -------------------------------------------------
export default async function QuestionPage(props: QuestionPageProps) {
  const params = await props.params;
  const question = await getQuestionBySlug(params.slug);
  if (!question) notFound();

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (question.faqs ?? []).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <article className="prose prose-slate lg:prose-xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
          {question.title}
        </h1>

        {question.category && (
          <p className="mt-2 text-sm text-indigo-600 font-semibold uppercase tracking-wide">
            Category: {question.category}
          </p>
        )}
      </header>

      {/* Render sanitised HTML from WP */}
      <div dangerouslySetInnerHTML={{ __html: question.contentHtml }} />

      {/* JSON‑LD */}
      {jsonLdFaq.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      <hr className="my-12 border-slate-300" />
      <LeadForm />
    </article>
  );
}
