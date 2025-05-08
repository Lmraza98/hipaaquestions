'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, type LeadFormValues } from '@/lib/validators/lead';
import { useState, useTransition } from 'react';

export default function LeadForm() {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      questionContext: '', // You might want to pre-fill this if available
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    startTransition(async () => {
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong. Please try again.');
        }
        
        // const result = await response.json(); // If your API returns data
        setSubmitSuccess('Thank you! Your information has been submitted successfully.');
        reset(); // Reset form fields
      } catch (error) {
        if (error instanceof Error) {
          setSubmitError(error.message);
        } else {
          setSubmitError('An unexpected error occurred.');
        }
      }
    });
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500";
  const labelClasses = "block text-sm font-medium text-slate-700";
  const errorClasses = "mt-1 text-xs text-pink-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-50 p-6 md:p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className={labelClasses}>
          Full Name <span className="text-pink-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={commonInputClasses}
          disabled={isPending || isSubmitting}
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email Address <span className="text-pink-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={commonInputClasses}
          disabled={isPending || isSubmitting}
        />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={commonInputClasses}
          disabled={isPending || isSubmitting}
        />
        {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>
          Company Name
        </label>
        <input
          id="company"
          type="text"
          {...register('company')}
          className={commonInputClasses}
          disabled={isPending || isSubmitting}
        />
        {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="questionContext" className={labelClasses}>
          How can we help you? (Optional)
        </label>
        <textarea
          id="questionContext"
          {...register('questionContext')}
          rows={4}
          className={commonInputClasses}
          placeholder="Please provide some context about your inquiry."
          disabled={isPending || isSubmitting}
        />
        {errors.questionContext && <p className={errorClasses}>{errors.questionContext.message}</p>}
      </div>

      {
        // Display general submission error
        submitError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{submitError}</p>
              </div>
            </div>
          </div>
        )
      }

      {
        // Display success message
        submitSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{submitSuccess}</p>
              </div>
            </div>
          </div>
        )
      }

      <div>
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isPending || isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </div>
       <p className="mt-4 text-xs text-slate-500 text-center">
        All form data is handled in a HIPAA-compliant manner.
      </p>
    </form>
  );
} 