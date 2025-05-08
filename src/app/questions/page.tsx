import { fetchWP, QUESTION_FIELDS_FRAGMENT } from '@/lib/wp'; // Assuming @ is configured for src
import { gql } from '@apollo/client';
import QuestionList from './QuestionList.client'; // We will create this next

// Define the type for a single question based on QUESTION_FIELDS_FRAGMENT
interface CategoryNode {
  __typename: 'Category';
  name: string;
  slug: string;
}

export interface QuestionType {
  __typename: 'Question';
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  categories: {
    nodes: CategoryNode[];
  };
  updatedAt: string; // Matches the fragment; ensure 'updatedAt' is the correct sortable field in your WPGraphQL schema, might be 'modified'.
}

interface AllQuestionsData {
  questions: {
    nodes: QuestionType[];
  };
}

interface AllQuestionSlugsData {
  questions: {
    nodes: {
      slug: string;
    }[];
  };
}

// ISR revalidation period: 15 minutes
export const revalidate = 900;

const GET_FIRST_200_QUESTIONS_QUERY = gql`
  query GetFirst200Questions {
    questions(first: 200, where: {orderby: {field: MODIFIED, order: DESC}}) { # Assuming MODIFIED is the correct field for updatedAt
      nodes {
        ...QuestionFields
      }
    }
  }
  ${QUESTION_FIELDS_FRAGMENT}
`;

const GET_ALL_QUESTION_SLUGS_QUERY = gql`
  query GetAllQuestionSlugs {
    questions(first: 10000) { # Adjust 'first' if you have more than 10000 questions
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  try {
    const data = await fetchWP<AllQuestionSlugsData>(GET_ALL_QUESTION_SLUGS_QUERY);
    if (!data.questions || !data.questions.nodes) {
      console.warn('No question slugs found for generateStaticParams.');
      return [];
    }
    return data.questions.nodes.map((question: { slug: string }) => ({
      slug: question.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch question slugs for generateStaticParams:', error);
    return []; // Return empty array on error to prevent build failure
  }
}

export default async function QuestionsPage() {
  let questions: QuestionType[] = [];
  let error: string | null = null;

  try {
    const data = await fetchWP<AllQuestionsData>(GET_FIRST_200_QUESTIONS_QUERY);
    if (data.questions && data.questions.nodes) {
      questions = data.questions.nodes;
    } else {
      console.warn('No questions found or data format is unexpected.');
      // questions remains an empty array
    }
  } catch (e) {
    console.error('Failed to fetch questions for page:', e);
    error = e instanceof Error ? e.message : 'An unknown error occurred.';
    // questions remains an empty array
  }

  if (error) {
    return (
      <div>
        <h1>Questions</h1>
        <p>Could not load questions: {error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div>
        <h1>Questions</h1>
        <p>No questions available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>All Questions</h1>
      <QuestionList questions={questions} />
    </div>
  );
} 