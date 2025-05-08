import Link from 'next/link';

// Placeholder icons - replace with actual SVGs or an icon library if desired
const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <Link href={href} aria-label={label} className="text-gray-400 hover:text-white transition-colors">
    {children}
  </Link>
);

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a192f] border-t border-white/10 text-gray-300 w-full">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {currentYear} HIPAAQuestions.com. All rights reserved.
            </p>
          </div>

          <nav className="flex justify-center space-x-6 md:col-span-1">
            <Link href="/privacy-policy" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact Us</Link>
          </nav>

          <div className="flex justify-center md:justify-end space-x-5">
            {/* Replace with actual icons if you have them */}
            <SocialIcon href="#" label="Twitter">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
            </SocialIcon>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10">
          <details className="group">
            <summary className="text-xs text-gray-400 hover:text-gray-200 cursor-pointer list-none flex justify-between items-center">
              Legal & Compliance Information
              <span className="ml-2 transition-transform duration-200 group-open:rotate-90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                </svg>
              </span>
            </summary>
            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <p>
                HIPAAquestions.com is a resource for general information about the Health Insurance Portability and Accountability Act (HIPAA). 
                The content provided on this website, including articles, guides, and answers to frequently asked questions, is for informational purposes only. 
                It is not intended as, and should not be construed as, legal, medical, or professional compliance advice.
              </p>
              <p>
                While we strive to provide accurate and up-to-date information, healthcare regulations are complex and subject to change. 
                Users should consult with qualified legal counsel or a HIPAA compliance expert for advice tailored to their specific circumstances and to ensure full compliance with all applicable laws and regulations.
              </p>
              <p>
                All form data submitted through this website is handled in a manner consistent with HIPAA security and privacy principles. However, the use of this website does not in itself create a patient-provider or attorney-client relationship. 
                Your interactions with HIPAAquestions.com are governed by our <Link href="/terms-of-service" className="underline hover:text-gray-300">Terms of Service</Link> and <Link href="/privacy-policy" className="underline hover:text-gray-300">Privacy Policy</Link>.
              </p>
            </div>
          </details>
        </div>

      </div>
    </footer>
  );
} 