export interface QuestionType {
  id: string;
  slug: string;
  title: string;
  contentHtml: string; // HTML content to be rendered
  excerpt: string;     // For meta description
  category?: string;
  tags?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  // Add other fields as necessary, e.g., author, publishedAt for richer metadata
  // publishedAt?: string; // ISO date string for <meta property="article:published_time" />
  // authorName?: string; // for <meta name="author" />
}

/**
 * Fetches a question by its slug.
 * Replace this with your actual data fetching logic (e.g., from a database, CMS, or API).
 * @param slug The slug of the question to fetch.
 * @returns A promise that resolves to the QuestionType object or null if not found.
 */
export async function getQuestionBySlug(slug: string): Promise<QuestionType | null> {
  // This is placeholder data.
  const questions: Record<string, QuestionType> = {
    "sample-question": {
      id: "1",
      slug: "sample-question",
      title: "Sample Question: Understanding HIPAA Compliance",
      contentHtml: `
        <h2>What is HIPAA?</h2>
        <p>The Health Insurance Portability and Accountability Act of 1996 (HIPAA) is a federal law that required the creation of national standards to protect sensitive patient health information from being disclosed without the patient\'s consent or knowledge.</p>
        <h3>Key Aspects:</h3>
        <ul>
          <li>Privacy Rule: Protects personal health information (PHI).</li>
          <li>Security Rule: Sets standards for securing electronic PHI.</li>
          <li>Breach Notification Rule: Requires notification following a breach of unsecured PHI.</li>
        </ul>
        <p>Ensuring compliance is crucial for any entity handling PHI.</p>
      `,
      excerpt: "Learn about the basics of HIPAA, including the Privacy Rule, Security Rule, and Breach Notification Rule. Understand why compliance is critical.",
      category: "HIPAA Basics",
      tags: ["HIPAA", "Compliance", "Healthcare"],
      faqs: [
        { question: "What is PHI?", answer: "Protected Health Information (PHI) is any information in a medical record that can be used to identify an individual, and that was created, used, or disclosed in the course of providing a health care service, such as a diagnosis or treatment." },
        { question: "Who needs to comply with HIPAA?", answer: "HIPAA applies to covered entities (health plans, health care clearinghouses, and health care providers who conduct certain financial and administrative transactions electronically) and their business associates." },
      ],
      // publishedAt: "2023-10-26T10:00:00Z",
      // authorName: "HIPAAquestions.com Team"
    },
    "another-question": {
      id: "2",
      slug: "another-question",
      title: "Exploring Data Encryption under HIPAA",
      contentHtml: `
        <h2>HIPAA and Data Encryption</h2>
        <p>While HIPAA does not explicitly mandate encryption for all PHI, it is a critical addressable implementation specification under the Security Rule. Entities must assess their risks and document why encryption is not used if they choose not to implement it.</p>
        <p>Strong encryption for data at rest and in transit is a best practice to safeguard ePHI.</p>
      `,
      excerpt: "A look into HIPAA\'s stance on data encryption for Protected Health Information (PHI), and why it\'s a crucial best practice for ePHI security.",
      category: "HIPAA Security",
      tags: ["HIPAA", "Encryption", "ePHI", "Security Rule"],
      faqs: [
        { question: "Is encryption mandatory under HIPAA?", answer: "Encryption is an 'addressable' safeguard under the HIPAA Security Rule, meaning covered entities must implement it if reasonable and appropriate, or document why not and implement an equivalent alternative measure." },
      ],
      // publishedAt: "2023-11-05T14:30:00Z",
      // authorName: "Dr. Secure Data"
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));

  return questions[slug] || null;
}

// Optional: Function to get all question slugs for generateStaticParams
export async function getAllQuestionSlugs(): Promise<Array<{ slug: string }>> {
  // In a real app, fetch all slugs from your data source
  // For this placeholder, we'll use the keys from the sample data
  console.log("Fetching all question slugs for generateStaticParams");
  const questions = {
    "sample-question": {},
    "another-question": {}
  };
  return Object.keys(questions).map(slug => ({ slug }));
} 