import { ApolloClient, HttpLink, InMemoryCache, gql, NormalizedCacheObject, DocumentNode } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;

// Ensure the environment variable is available.
// For client-side usage, this variable would typically need to be prefixed with NEXT_PUBLIC_
// (e.g., NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT) and exposed in next.config.js.
// However, for server-side fetching (RSCs, API routes), process.env is fine.
const WORDPRESS_GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

if (!WORDPRESS_GRAPHQL_ENDPOINT) {
  if (typeof window === "undefined") {
    // Running on the server, critical error
    console.error("ERROR: WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set.");
    // Potentially throw an error here or handle it as per application requirements
    // For now, we'll let the client creation fail if this isn't set.
  } else {
    // Running on the client, this might be an issue if client-side fetching is intended
    // without NEXT_PUBLIC_ prefix and proper exposure.
    console.warn("WORDPRESS_GRAPHQL_ENDPOINT is not set. Client-side GraphQL calls may fail if not configured via NEXT_PUBLIC_ prefix.");
  }
}

const httpLink = new HttpLink({
  uri: WORDPRESS_GRAPHQL_ENDPOINT || "/api/graphql", // Fallback if not set, though ideally it should always be set.
});

// Example: If you need to add an authorization header, you can use setContext
// const authLink = setContext((_, { headers }) => {
//   // Get the authentication token from local storage if it exists
//   const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
//   // Return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });
// const link = authLink.concat(httpLink);


export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (typeof window === "undefined") {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      ssrMode: true,
    });
  }
  // Client-side: reuse client or create if it doesn't exist
  if (!client) {
    client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      // ssrMode is false by default on client, or can be omitted
    });
  }
  return client;
}

/**
 * Fetches data from WordPress GraphQL API.
 * @param query The GraphQL query (string or DocumentNode).
 * @param variables Optional variables for the query.
 * @typeParam T The expected type of the `data` object returned by the GraphQL query.
 * @returns A promise that resolves with the typed data or throws an error.
 */
export async function fetchWP<T = unknown>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>
): Promise<T> {
  const SHOULD_MOCK =
    process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ||
    !process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (SHOULD_MOCK) {
    const { mockQuestions } = await import('@/data/mock-questions');

    // crude router based on query name ─ adjust to fit your queries
    // Ensure query is DocumentNode for this logic
    const queryDef = typeof query === 'string' ? gql(query) : query;

    if (queryDef.definitions.some(d => 'name' in d && d.name?.value === 'AllQuestions')) {
      return { questions: { nodes: mockQuestions } } as unknown as T;
    }
    if (queryDef.definitions.some(d => 'name' in d && d.name?.value === 'GetFirst200Questions')) {
      // For mock purposes, returning all questions under a 'nodes' array.
      return { questions: { nodes: mockQuestions } } as unknown as T;
    }
    if (queryDef.definitions.some(d => 'name' in d && d.name?.value === 'QuestionBySlug')) {
      const q = mockQuestions.find(q => q.slug === variables?.slug);
      if (!q) throw new Error('Mock question not found');
      return { question: q } as unknown as T;
    }

    // If you have a query for categories, you might add it here:
    // if (queryDef.definitions.some(d => 'name' in d && d.name?.value === 'AllCategories')) {
    //   // Extract unique categories from mockQuestions
    //   const allCategories = mockQuestions.reduce((acc, q) => {
    //     q.categories.forEach(cat => {
    //       if (!acc.find(existingCat => existingCat.slug === cat.slug)) {
    //         acc.push(cat);
    //       }
    //     });
    //     return acc;
    //   }, [] as { name: string; slug: string }[]);
    //   return { categories: { nodes: allCategories } } as unknown as T;
    // }

    console.warn("Unhandled mock query type. Query definition:", queryDef.definitions);
    throw new Error('Un-handled mock query. Check console for query details.');
  }

  const apolloClient = getApolloClient();
  const queryDocumentNode = typeof query === 'string' ? gql(query) : query;

  try {
    const { data, errors } = await apolloClient.query<T>({
      query: queryDocumentNode,
      variables,
    });

    if (errors && errors.length > 0) {
      console.error("GraphQL errors:", JSON.stringify(errors, null, 2));
      throw new Error(`GraphQL query failed: ${errors.map((e) => e.message).join(", ")}`);
    }

    // Apollo Client's query<T> method returns a result where `data` is of type `T | undefined`.
    // If errors occur, `data` might be undefined even if T is not nullable.
    if (data === undefined || data === null) { // Check for undefined or null
      throw new Error("GraphQL query returned no data or data is null/undefined.");
    }
    
    return data;

  } catch (error) {
    console.error("Error in fetchWP:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch WordPress data: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching WordPress data.");
  }
}

// Example usage (not part of the library file, just for illustration):
/*
interface Post {
  id: string;
  title: string;
  content: string;
}

interface AllPostsData {
  posts: {
    nodes: Post[];
  };
}

async function getSomePosts() {
  const query = gql\`
    query GetPosts {
      posts {
        nodes {
          id
          title
          content
        }
      }
    }
  \`;
  try {
    const result = await fetchWP<{ posts: { nodes: Post[] } }>(query);
    console.log(result.posts.nodes);
  } catch (error) {
    console.error("Could not fetch posts:", error);
  }
}
*/

// Commenting out or removing unused ICategoryNode and IQuestion interfaces
/*
interface ICategoryNode {
  __typename: 'Category'; // Or the actual GraphQL type name for Category
  name: string;
  slug: string;
}

interface IQuestion {
  __typename: 'Question'; // Or the actual GraphQL type name for your CPT
  id: string;
  slug: string;
  title: string;
  content: string; // HTML string
  excerpt: string; // HTML string
  categories: {
    nodes: ICategoryNode[];
  };
  updatedAt: string; // Typically an ISO 8601 date string
}
*/

export const QUESTION_FIELDS_FRAGMENT = gql`
  fragment QuestionFields on Question {
    __typename
    id
    slug
    title
    content # Assuming HTML content
    excerpt # Assuming HTML excerpt
    categories {
      nodes {
        __typename
        name
        slug
      }
    }
    updatedAt # As requested. WPGraphQL typically uses 'modified' or 'modifiedGmt' for this.
              # If using 'modified' or 'modifiedGmt', adjust the IQuestion interface accordingly.
  }
`;