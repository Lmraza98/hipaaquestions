'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/questions/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <label htmlFor="search" className="sr-only">
        Search HIPAA Questions
      </label>
      <div className="relative flex items-center px-2 sm:px-6"
      style={{
        padding: '0px 10px'
      }}
      >
        <div
        style={{
          padding: '0px 10px'
        }}
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className="px-2 block w-full bg-transparent py-3.5 pl-12 pr-4 sm:pl-14 sm:pr-5 text-white placeholder:text-white/40 focus:outline-none sm:text-sm sm:leading-6 rounded-lg shadow-inner placeholder:px-2 placeholder:sm:px-6 "
          placeholder="Search for HIPAA topics, keywords, or questions..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 group"
        >
          <span className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-150 group-focus:ring-2 group-focus:ring-white group-focus:ring-offset-2 group-focus:ring-offset-transparent">
            Search
          </span>
        </button>
      </div>
    </form>
  );
} 