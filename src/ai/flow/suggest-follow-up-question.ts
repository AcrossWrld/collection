
'use server';
/**
 * @fileOverview Suggests a follow-up question based on the last interaction and PDF content.
 *
 * - suggestFollowUpQuestion - A function that suggests a follow-up question.
 * - SuggestFollowUpQuestionInput - The input type for the suggestFollowUpQuestion function.
 * - SuggestFollowUpQuestionOutput - The return type for the suggestFollowUpQuestion function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SuggestFollowUpInputSchema = z.object({
  pdfContent: z.string().describe('The content of the PDF document.'),
  lastUserQuestion: z.string().describe('The last question asked by the user.'),
  lastAiAnswer: z.string().describe('The last answer provided by the AI.'),
});
export type SuggestFollowUpInput = z.infer<typeof SuggestFollowUpInputSchema>;

const SuggestFollowUpOutputSchema = z.object({
  suggestedQuestion: z
    .string()
    .min(1, "Suggested question cannot be empty.")
    .describe('A concise and relevant follow-up question for the user, based on the PDF content and last interaction.'),
});
export type SuggestFollowUpOutput = z.infer<typeof SuggestFollowUpOutputSchema>;

export async function suggestFollowUpQuestion(input: SuggestFollowUpInput): Promise<SuggestFollowUpOutput> {
  return suggestFollowUpQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFollowUpQuestionPrompt',
  input: {schema: SuggestFollowUpInputSchema},
  output: {schema: SuggestFollowUpOutputSchema},
  prompt: `You are an AI assistant. Based on the PDF content, the last user question, and your last answer, suggest one concise and relevant follow-up question that the user might find helpful or interesting to explore next. Ensure the question is not empty.

Document Content (for context):
{{{pdfContent}}}

Last User Question:
{{{lastUserQuestion}}}

Your Last Answer:
{{{lastAiAnswer}}}

Suggest one follow-up question:`,
});

const suggestFollowUpQuestionFlow = ai.defineFlow(
  {
    name: 'suggestFollowUpQuestionFlow',
    inputSchema: SuggestFollowUpInputSchema,
    outputSchema: SuggestFollowUpOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
