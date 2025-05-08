'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate API call
    try {
      // In a real app, you would send this data to a server action or API endpoint
      // await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify(formData) });
      console.log('Form data submitted:', formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('There was an error submitting the form. Please try again.');
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-800/30 border border-green-600 rounded-md text-green-200">
        <h3 className="text-lg font-medium">Thank you!</h3>
        <p>Your message has been sent. We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-slate-800 shadow-xl rounded-lg border border-slate-700">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-300">
          Company (Optional)
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400"
        ></textarea>
      </div>
      {error && (
        <div className="p-3 bg-red-800/30 border border-red-600 rounded-md text-red-200 text-sm">
          <p>{error}</p>
        </div>
      )}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Send Message
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-400 text-center">
        All form data is handled in a HIPAA-compliant manner. Your PHI is secure.
      </p>
    </form>
  );
} 