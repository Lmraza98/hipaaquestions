import React from 'react';
import AnimatedSectionHeading from './AnimatedSectionHeading.client';

// Placeholder Icons - replace with actual SVG icons
const UpToDateIcon = () => <svg className="h-10 w-10 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HumanVerifiedIcon = () => <svg className="h-10 w-10 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FreeConsultIcon = () => <svg className="h-10 w-10 text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

const pillars = [
  {
    title: 'Up-to-date Guidance',
    description: 'Access the latest interpretations and official documentation for HIPAA rules and regulations.',
    Icon: UpToDateIcon,
  },
  {
    title: 'Human-verified Answers',
    description: 'Our content is curated and verified by compliance experts to ensure accuracy and reliability.',
    Icon: HumanVerifiedIcon,
  },
  {
    title: 'Free Intro Consult',
    description: 'Connect with a specialist for a complimentary consultation to discuss your specific HIPAA needs.',
    Icon: FreeConsultIcon,
  },
];

export default function PillarsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSectionHeading 
          kicker="Navigate HIPAA with Confidence"
          title="Three Pillars of Trustworthy Information"
          subtitle="We provide the resources you need to understand and comply with complex healthcare regulations, ensuring your organization stays protected."
        />
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 px-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <dt className="flex flex-col items-center text-white">
                  <pillar.Icon />
                  <span className="text-lg font-semibold leading-7">{pillar.title}</span>
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-300">
                  {pillar.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
} 