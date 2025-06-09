
'use server';
/**
 * @fileOverview Suggests an initial question for the user after a PDF is processed.
 *
 * - suggestInitialQuestion - A function that takes PDF content and suggests a question.
 * - SuggestInitialQuestionInput - The input type for the suggestInitialQuestion function.
 * - SuggestInitialQuestionOutput - The return type for the suggestInitialQuestion function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SuggestInitialQuestionInputSchema = z.object({
  pdfContent: z.string().describe('The content of the PDF document.'),
});
export type SuggestInitialQuestionInput = z.infer<typeof SuggestInitialQuestionInputSchema>;

const SuggestInitialQuestionOutputSchema = z.object({
  suggestedQuestion: z
    .string()
    .min(1, "Suggested question cannot be empty.")
    .describe('A concise and relevant initial question the user might ask about the PDF document.'),
});
export type SuggestInitialQuestionOutput = z.infer<typeof SuggestInitialQuestionOutputSchema>;

export async function suggestInitialQuestion(input: SuggestInitialQuestionInput): Promise<SuggestInitialQuestionOutput> {
  return suggestInitialQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInitialQuestionPrompt',
  input: {schema: SuggestInitialQuestionInputSchema},
  output: {schema: SuggestInitialQuestionOutputSchema},
  prompt: `You are an AI assistant. Based on the following content of a PDF document, suggest one concise and relevant question that a user could ask to start learning about the document. Ensure the question is not empty.

PDF Content:
{{{pdfContent}}}

Suggest one initial question:`,
});

const suggestInitialQuestionFlow = ai.defineFlow(
  {
    name: 'suggestInitialQuestionFlow',
    inputSchema: SuggestInitialQuestionInputSchema,
    outputSchema: SuggestInitialQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
