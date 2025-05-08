'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/20/solid'; // Using Heroicons
import AnimatedSectionHeading from './AnimatedSectionHeading.client'; // Import the new component

type Faq = {
  id: string;
  q: string;
  href: string;
  // We might not need 'a' (answer) if these link to separate pages.
  // a: string; 
};

// Sample FAQ data - this would ideally come from a CMS or data store
const faqs: Faq[] = [
  { id: '1', q: 'What constitutes Protected Health Information (PHI)?', href: '/questions/what-is-phi' },
  { id: '2', q: 'Is there a simple HIPAA compliance checklist for small practices?', href: '/questions/hipaa-compliance-checklist' },
  { id: '3', q: 'What are the rules for data breach notification under HIPAA?', href: '/questions/data-breach-notification' },
  { id: '4', q: 'When do I need a Business Associate Agreement (BAA)?', href: '/questions/business-associate-agreements' },
  { id: '5', q: 'What are the HIPAA training requirements for employees?', href: '/questions/hipaa-training-requirements' },
  { id: '6', q: 'How can PHI be properly de-identified according to HIPAA?', href: '/questions/de-identifying-phi' },
  { id: '7', q: 'What are patient rights under HIPAA regarding their medical records?', href: '/questions/patient-rights-medical-records' },
  { id: '8', q: 'How does HIPAA apply to telehealth services?', href: '/questions/hipaa-telehealth' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

export default function FAQSection() {
  if (!faqs || faqs.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-gray-400">No frequently asked questions available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-900/70">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <AnimatedSectionHeading 
          title="Your Questions, Answered"
          subtitle="Find quick answers to common HIPAA queries. For detailed information, each question links to a dedicated page."
          containerClasses="text-center mb-12 sm:mb-16" // Adjusted container for centered text, original max-w-4xl is handled by parent
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group relative"
            >
              <Link
                href={faq.href}
                className="block rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 lg:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 ease-out h-full flex flex-col justify-between"
              >
                <h3 className="text-base sm:text-lg font-medium text-gray-100 group-hover:text-white">
                  {faq.q}
                </h3>
                <div className="mt-3 text-right">
                  <ArrowRightIcon className="inline-block h-6 w-6 text-gray-400 opacity-0 transform -translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400 shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/questions"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-150"
          >
            Explore All Questions
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 