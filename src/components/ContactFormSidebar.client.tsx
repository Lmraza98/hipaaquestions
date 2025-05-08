'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder for a more sophisticated form component
const BasicContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation
    if (!fullName || !email || !message) {
      // Handle empty fields error - perhaps set an error state
      console.warn("Form fields cannot be empty.");
      return;
    }
    // Simulate API call
    console.log({ fullName, email, message }); 
    // In a real app, you'd send data to a server action or API endpoint here.
    // For example: await sendLeadData({ fullName, email, message });

    setIsSubmitted(true);
    // Optionally reset form fields after a delay or keep them
    // setTimeout(() => {
    //   setFullName('');
    //   setEmail('');
    //   setMessage('');
    //   setIsSubmitted(false); // Allow resubmission or navigate away
    // }, 3000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="absolute inset-0 bg-green-500/10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-8 z-10 border border-green-500"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-green-400 mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring', stiffness: 120 } }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </motion.svg>
            <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
            <p className="text-green-200 text-center text-sm">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
            <button
              onClick={() => {
                setFullName('');
                setEmail('');
                setMessage('');
                setIsSubmitted(false);
              }}
              className="mt-6 rounded-md bg-green-600/50 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 transition-colors duration-150"
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className={`space-y-4 ${isSubmitted ? 'blur-sm pointer-events-none' : ''}`}>
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-300">
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="full-name"
              id="full-name"
              autoComplete="name"
              placeholder="e.g., Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 md:py-3 md:px-4 text-white shadow-inner ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-white/40"
              disabled={isSubmitted}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
            Email address
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 md:py-3 md:px-4 text-white shadow-inner ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-white/40"
              disabled={isSubmitted}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-300">
            Message
          </label>
          <div className="mt-2">
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="How can we help you with HIPAA?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 md:py-3 md:px-4 text-white shadow-inner ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-white/40"
              disabled={isSubmitted}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitted}
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-150 disabled:opacity-50"
          >
            Send message
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">
          All form data is handled in a HIPAA-compliant manner.
        </p>
      </form>
    </div>
  );
};

export default function ContactFormSidebar() {
  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-[100px] self-start">
      <div className="rounded-2xl bg-gray-800/60 p-8 backdrop-blur-lg border border-white/10">
        <h3 className="text-2xl font-semibold leading-7 text-white">
          Have Specific Questions?
        </h3>
        <p className="mt-3 text-base leading-6 text-gray-300">
          Reach out to our specialists for personalized advice. We&apos;re here to help you navigate the complexities of HIPAA compliance.
        </p>
        <div className="mt-8">
          <BasicContactForm />
        </div>
      </div>
    </aside>
  );
} 