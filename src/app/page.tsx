import type { Metadata } from 'next';

import HeroSection from '@/components/HeroSection';
import ComplianceBadges from '@/components/ComplianceBadges.client';
import PillarsSection from '@/components/PillarsSection';
import FAQSection from '@/components/FAQSection.client';
import ContactFormSidebar from '@/components/ContactFormSidebar.client';

export const metadata: Metadata = {
  title: 'HIPAA Questions – Clear Answers, Expert Guidance',
  description: 'Get clear, reliable answers to your HIPAA questions. Search our comprehensive knowledge base, find human-verified information, and connect with compliance specialists. HIPAAquestions.com helps you navigate complex healthcare regulations with confidence.',
  openGraph: {
    title: 'HIPAA Questions – Clear Answers, Expert Guidance',
    description: 'Your trusted resource for navigating HIPAA compliance with ease and confidence.',
    images: [
      {
        url: '/og-image-hipaaquestions-v2.png',
        width: 1200,
        height: 630,
        alt: 'HIPAAquestions.com - Clear HIPAA Answers',
      },
    ],
    siteName: 'HIPAAquestions.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIPAA Questions – Clear Answers, Expert Guidance',
    description: 'Your trusted resource for navigating HIPAA compliance with ease and confidence.',
    // images: ['/twitter-image-hipaaquestions-v2.png'],
  },
};

export default function HomePage() {
  return (
    <main className="bg-[#0e223d] container mx-auto px-4 md:px-8 lg:px-12">
      <div className="flex flex-col items-center gap-6 md:gap-8 py-28 md:py-40">
        <HeroSection />
      </div>

      <div className="mt-16 md:mt-20 gap-6 flex justify-center flex-wrap">
        <ComplianceBadges />
      </div>

      <div className="pt-24 md:pt-32">
        <PillarsSection />
      </div>
      
      <div className="w-full max-w-[90rem] pt-16 sm:pt-24 pb-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 items-start">
          <div className="lg:col-span-8 mt-20 md:mt-24 space-y-10">
            <FAQSection />
          </div>
          
          <div className="lg:col-span-4 ml-0 lg:ml-10 xl:ml-14 mt-12 lg:mt-0">
            <ContactFormSidebar />
          </div>
        </div>
      </div>
      
      {/* <CTASection /> */}
      <div className="pt-16 md:pt-24 pb-12">
        {/* Placeholder for Footer Content. Consider creating a <Footer /> component here. */}
      </div>
    </main>
  );
}
