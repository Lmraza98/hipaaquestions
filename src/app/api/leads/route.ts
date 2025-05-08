import { NextResponse } from 'next/server';
import { leadFormSchema, type LeadFormValues } from '@/lib/validators/lead';

export const runtime = 'edge'; // Specify Edge Runtime

export async function POST(request: Request) {
  let formData: LeadFormValues;

  try {
    formData = await request.json();
  } catch (error) {
    console.error('[API /leads] Error parsing JSON:', error);
    return NextResponse.json({ message: 'Invalid request body. Please provide valid JSON.' }, { status: 400 });
  }

  const validation = leadFormSchema.safeParse(formData);

  if (!validation.success) {
    console.warn('[API /leads] Validation failed:', validation.error.flatten().fieldErrors);
    return NextResponse.json(
      {
        message: 'Invalid form data.',
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 422 } // Unprocessable Entity
    );
  }

  const { name, email, phone, company, questionContext } = validation.data;

  console.log('[API /leads] New Lead Received:', {
    name,
    email,
    phone,
    company,
    questionContext,
    submittedAt: new Date().toISOString(),
  });

  // Placeholder for sending to a webhook
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });
      if (!webhookResponse.ok) {
        console.error(`[API /leads] Webhook failed with status: ${webhookResponse.status}`, await webhookResponse.text());
        // Optionally, you might want to inform the client or retry, but for now, we'll just log
      } else {
        console.log('[API /leads] Lead data successfully sent to webhook.');
      }
    } catch (error) {
      console.error('[API /leads] Error sending data to webhook:', error);
    }
  }

  // TODO: Add actual data processing logic here (e.g., save to database, CRM integration)

  return NextResponse.json(
    { message: 'Lead submitted successfully!', data: validation.data },
    { status: 201 } // Created
  );
} 