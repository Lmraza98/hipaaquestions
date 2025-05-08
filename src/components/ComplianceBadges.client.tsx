'use client';

import React from 'react';

// Placeholder SVGs - replace with actual SVG code
const HhsSvg = () => <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current text-gray-400"><text x="10" y="20">HHS</text></svg>;
const OncSvg = () => <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current text-gray-400"><text x="10" y="20">ONC</text></svg>;
const Soc2Svg = () => <svg viewBox="0 0 100 30" className="h-8 w-auto fill-current text-gray-400"><text x="10" y="20">SOC 2</text></svg>;


const badges = [
  { id: 'hhs', name: 'HHS Compliant', Icon: HhsSvg, href: '#' },
  { id: 'onc', name: 'ONC Certified HIT', Icon: OncSvg, href: '#' },
  { id: 'soc2', name: 'SOC 2 Type II', Icon: Soc2Svg, href: '#' },
];

export default function ComplianceBadges() {
  return (
    <div className="bg-transparent py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-300">
            Trusted by organizations committed to the highest standards of data security
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:mx-0 lg:grid-cols-3">
            {badges.map((badge) => (
              <a
                key={badge.id}
                href={badge.href}
                className="col-span-1 flex justify-center items-center group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200 ease-out group-hover:scale-105">
                  <badge.Icon />
                  <p className="mt-2 text-xs text-center text-gray-400 group-hover:text-gray-200 transition-colors duration-200">{badge.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 