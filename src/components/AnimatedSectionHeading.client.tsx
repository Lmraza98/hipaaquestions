'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionHeadingProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  kickerColorClass?: string;
  titleClasses?: string;
  subtitleClasses?: string;
  kickerClasses?: string;
  containerClasses?: string;
  spineColorClass?: string;
}

export default function AnimatedSectionHeading({
  title,
  subtitle,
  kicker,
  kickerColorClass = 'text-blue-400',
  titleClasses = 'text-3xl font-bold tracking-tight text-white sm:text-4xl',
  subtitleClasses = 'mt-4 text-lg leading-8 text-gray-300',
  kickerClasses = 'text-base font-semibold leading-7',
  containerClasses = 'mx-auto max-w-2xl lg:text-center mb-12 sm:mb-16',
  spineColorClass = 'bg-blue-500'
}: AnimatedSectionHeadingProps) {
  return (
    <div className={containerClasses}>
      {kicker && (
        <h2 className={`${kickerClasses} ${kickerColorClass}`}>{kicker}</h2>
      )}
      <div className="relative inline-block">
        <p className={`${titleClasses} relative z-10`}>
          {title}
        </p>
        <motion.div 
            className={`absolute bottom-0 left-0 h-[2px] ${spineColorClass} origin-left z-0`}
            style={{ top: 'calc(100% - 1px)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "circOut" }}
        />
      </div>
      {subtitle && (
        <p className={subtitleClasses}>{subtitle}</p>
      )}
    </div>
  );
} 