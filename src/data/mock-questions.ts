export const mockQuestions = [
  {
    id: "1",
    slug: "does-hipaa-apply-to-telehealth-apps",
    title: "Does HIPAA apply to telehealth apps?",
    content: "<p>Yes, HIPAA regulations generally apply to telehealth applications that handle Protected Health Information (PHI). This includes ensuring secure communication channels, data storage, and access controls.</p><p>It is crucial for telehealth providers to implement appropriate technical, administrative, and physical safeguards to protect PHI.</p>",
    excerpt: "HIPAA regulations generally apply to telehealth applications that handle PHI, requiring secure communication, data storage, and access controls.",
    categories: [
      { name: "Telehealth", slug: "telehealth" },
      { name: "Compliance", slug: "compliance" },
    ],
    updatedAt: "2024-07-28T10:00:00Z",
  },
  {
    id: "2",
    slug: "what-are-patient-rights-under-hipaa",
    title: "What are patient rights under HIPAA?",
    content: "<p>HIPAA grants patients several rights regarding their health information. These include the right to access their medical records, request amendments to their records, receive an accounting of disclosures of their PHI, and request restrictions on certain uses and disclosures.</p><p>Patients also have the right to file a complaint if they believe their privacy rights have been violated.</p>",
    excerpt: "Patients have rights to access and amend their records, receive accounting of disclosures, request restrictions, and file complaints under HIPAA.",
    categories: [
      { name: "Patient Rights", slug: "patient-rights" },
      { name: "Privacy", slug: "privacy" },
    ],
    updatedAt: "2024-07-27T14:30:00Z",
  },
  {
    id: "3",
    slug: "hipaa-compliant-email-practices",
    title: "What are best practices for HIPAA-compliant email?",
    content: "<p>Emailing PHI requires strong security measures. Best practices include using end-to-end encryption, obtaining patient consent before emailing PHI, verifying recipient email addresses, and avoiding the inclusion of sensitive information in email subject lines.</p><p>Additionally, organizations should have policies and procedures in place for secure email communication.</p>",
    excerpt: "Best practices for HIPAA-compliant email include encryption, patient consent, address verification, and avoiding PHI in subject lines.",
    categories: [
      { name: "Email Security", slug: "email-security" },
      { name: "Data Protection", slug: "data-protection" },
    ],
    updatedAt: "2024-07-26T09:15:00Z",
  },
  {
    id: "4",
    slug: "business-associate-agreements-hipaa",
    title: "When is a Business Associate Agreement (BAA) required under HIPAA?",
    content: "<p>A Business Associate Agreement (BAA) is required when a covered entity engages a third-party vendor (a business associate) that will create, receive, maintain, or transmit PHI on its behalf. This includes services like cloud storage, data analytics, and billing.</p><p>The BAA contractually obligates the business associate to protect the PHI according to HIPAA rules.</p>",
    excerpt: "A BAA is needed when a covered entity uses a vendor that handles PHI, contractually obligating the vendor to HIPAA rules.",
    categories: [
      { name: "Business Associates", slug: "business-associates" },
      { name: "Contracts", slug: "contracts" },
    ],
    updatedAt: "2024-07-25T16:45:00Z",
  },
]; 