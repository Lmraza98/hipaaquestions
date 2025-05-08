'use client';

import LeadForm from './LeadForm'; // Assuming LeadForm.tsx is in the same directory

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Need more help?
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-md mx-auto md:mx-0">
              Submit your details and we&apos;ll connect you with a compliance specialist who can assist with your specific HIPAA challenges.
            </p>
            <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto md:mx-0">
              Our network includes legal experts, cybersecurity professionals, and experienced software developers specializing in HIPAA-compliant solutions.
            </p>
          </div>
          <div className="w-full max-w-lg mx-auto">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
} 