'use client';

import { ShieldCheck, Users, MessageSquareHeart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: 'Up-to-date guidance',
    description: 'Real-time data directly from HIPAA regulation updates.',
  },
  {
    icon: Users,
    title: 'Human-verified answers',
    description: 'Every article reviewed by compliance experts.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Free intro consult',
    description: 'Connect with our partner developers for compliant apps.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeInOut',
    },
  }),
};

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center p-6 text-center bg-slate-800 rounded-lg shadow-md hover:shadow-lg hover:bg-slate-700/70 transition-all duration-300"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="p-3 mb-4 text-sky-300 bg-sky-700/50 rounded-full">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">{feature.title}</h3>
              <p className="mt-2 text-base text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 