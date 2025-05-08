'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define Question and Category types here or import from a shared types file
export interface CategoryType {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  slug: string; // Retained for potential use, though Link is removed
  title: string;
  excerpt: string;
  content?: string; // Optional: for more comprehensive client-side search
  updatedAt: string; // Consider using Date type if performing date logic client-side
  categories: CategoryType[];
}

interface QuestionListClientProps {
  initialQuestions: Question[];
  onSelect: (question: Question) => void;
}

export default function QuestionListClient({ initialQuestions, onSelect }: QuestionListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    if (!initialQuestions) return [];
    const categoriesSet = new Set<string>();
    initialQuestions.forEach(q => q.categories.forEach(cat => categoriesSet.add(cat.name)));
    return Array.from(categoriesSet).sort(); // Sort for consistent order
  }, [initialQuestions]);

  const filteredQuestions = useMemo(() => {
    if (!initialQuestions) return [];
    return initialQuestions.filter(question => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearchTerm =
        question.title.toLowerCase().includes(lowerSearchTerm) ||
        (question.excerpt && question.excerpt.toLowerCase().includes(lowerSearchTerm)) ||
        (question.content && question.content.toLowerCase().includes(lowerSearchTerm));

      const matchesCategories =
        selectedCategories.length === 0 ||
        question.categories.some(cat => selectedCategories.includes(cat.name));

      return matchesSearchTerm && matchesCategories;
    });
  }, [initialQuestions, searchTerm, selectedCategories]);

  const handleCategoryToggle = useCallback((categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <input
          type="search"
          placeholder="Search questions by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Category Pills */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Filter by category:</span>
          {allCategories.map(categoryName => (
            <button
              key={categoryName}
              onClick={() => handleCategoryToggle(categoryName)}
              aria-pressed={selectedCategories.includes(categoryName)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                ${selectedCategories.includes(categoryName)
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {categoryName}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
                onClick={() => setSelectedCategories([])}
                className="ml-2 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                title="Clear all category filters"
            >
                Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Question List */}
      <div className="min-h-[200px]"> {/* Provides min height to avoid layout shifts when list is empty */}
        <AnimatePresence mode="wait"> {/* 'wait' ensures exit animations complete before enter */}
          {filteredQuestions.length > 0 ? (
            <motion.ul
              key="question-list" // Add key for AnimatePresence when swapping between list and empty message
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              exit="exit" // Define exit for the whole list if needed, or rely on item exits
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                hidden: {},
              }}
            >
              {filteredQuestions.map(question => (
                <motion.li
                  key={question.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } },
                    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
                  }}
                  layout // Smoothly animates layout changes (e.g., when items are filtered)
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-200 ease-out cursor-pointer flex flex-col"
                  onClick={() => onSelect(question)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(question)}
                >
                  <div className="p-5 flex-grow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">{question.title}</h2>
                    {/* Ensure question.excerpt is pre-sanitized if it contains HTML from untrusted sources */}
                    <div 
                      className="text-gray-600 dark:text-gray-400 text-sm mb-3 prose prose-sm dark:prose-invert max-h-24 overflow-hidden relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-6 after:bg-gradient-to-t after:from-white dark:after:from-gray-800 after:pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: question.excerpt }} 
                    />
                    <div className="flex flex-wrap gap-1.5 mt-auto mb-3">
                      {question.categories.map(cat => (
                          <span key={cat.id} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                              {cat.name}
                          </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last updated: {new Date(question.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="empty-message" // Key for AnimatePresence
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12"
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No questions found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm || selectedCategories.length > 0 ? "Try adjusting your search or filters." : "There are no questions to display yet."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 