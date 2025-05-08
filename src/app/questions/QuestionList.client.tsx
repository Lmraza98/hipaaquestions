'use client';

import Link from 'next/link';
import { QuestionType } from './page'; // Import the QuestionType from the server component

interface QuestionListProps {
  questions: QuestionType[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  if (!questions || questions.length === 0) {
    return <p>No questions to display.</p>;
  }

  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id}>
          <Link href={`/questions/${question.slug}`}>
            <h2>{question.title}</h2>
          </Link>
          {/* Simple rendering of excerpt, ensure it's safe or sanitize if it contains arbitrary HTML */}
          <div dangerouslySetInnerHTML={{ __html: question.excerpt }} />
          <p><small>Last updated: {new Date(question.updatedAt).toLocaleDateString()}</small></p>
        </li>
      ))}
    </ul>
  );
} 