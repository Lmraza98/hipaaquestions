import React from 'react';
import SearchInput from './SearchInput.client'; // Assuming SearchInput is styled for glassmorphism

const DottedGridOverlay = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <defs>
      <pattern
        id="dotted-pattern"
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.5)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
  </svg>
);

export default function HeroSection() {
  return (
    <div className="w-full relative isolate overflow-hidden bg-gradient-radial from-[#08182d] to-[#0e223d] py-24 sm:py-32 min-h-[70vh] flex flex-col items-center justify-center">
      <DottedGridOverlay />
      <div className="w-1/2 px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          HIPAA Questions?
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-300 sm:text-xl">
          Get clear, reliable answers. Fast.
        </p>
        
        <div className="mt-10 mx-auto w-full">
          {/* Glassmorphism Search Bar Container */}
          <div className="flex flex-col align-middle justify-center rounded-xl bg-white/5 p-1.5 shadow-xl ring-1 ring-inset ring-white/10 backdrop-blur-md focus-within:ring-2 focus-within:ring-blue-400 transition-all sm:h-12">
            <SearchInput /> 
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Your trusted resource for navigating HIPAA compliance with ease and confidence.
          </p>
           <p className="mt-2 text-xs text-gray-500">
            e.g., <a href="#" className="underline hover:text-gray-300">Business Associate Agreements</a>, <a href="#" className="underline hover:text-gray-300">PHI data breach notification</a>
          </p>
        </div>
      </div>
      {/* Optional: Add subtle shapes or glows for more depth */}
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#204F7E] to-[#122A44] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
} 