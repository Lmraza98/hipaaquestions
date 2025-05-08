import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
  company: z.string().optional(),
  questionContext: z.string().optional(), // This could be a hidden field or pre-filled
});

export type LeadFormValues = z.infer<typeof leadFormSchema>; 