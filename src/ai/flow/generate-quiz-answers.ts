/**
 * @fileOverview This file defines a Genkit flow for generating quiz questions from a given document.
 *
 * - generateQuizQuestions - A function that generates a list of quiz questions with answers and page references.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const PageContentSchema = z.object({
  pageNumber: z.number().describe('The page number.'),
  content: z.string().describe('The text content of the page.'),
});

const GenerateQuizQuestionsInputSchema = z.object({
  pages: z.array(PageContentSchema).describe('An array of page contents from the document.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  pageNumber: z.number().optional().describe('The page number in the document where the answer can be found.'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z
    .array(QuizQuestionOutputSchema)
    .describe('An array of quiz questions generated from the document, including correct answers and page numbers.'),
});

export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert quiz creator. Your task is to generate up to 10 insightful quiz questions based on the provided document content. The document content is given as a series of pages, each with its page number and text.

For each question you generate, you MUST provide:
1.  \`questionText\`: The question itself.
2.  \`correctAnswer\`: The accurate answer to the question.
3.  \`pageNumber\`: The page number from the document where the information for the correct answer can be found. If the information spans multiple pages, pick the primary page. If a page number cannot be reasonably determined, you may omit it or set it to null.

Document Content by Page:
{{#each pages}}
--- Page {{this.pageNumber}} ---
{{{this.content}}}
--- End of Page {{this.pageNumber}} ---

{{/each}}

Please ensure your output is a JSON array of objects, where each object strictly follows this structure:
\`{ "questionText": "...", "correctAnswer": "...", "pageNumber": ... }\`
Do not include any questions if the document content is insufficient or not suitable for generating meaningful quiz questions. Ensure that correctAnswers are derived from the provided text.
If no questions can be generated, return an empty array for "questions".
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    // Ensure input has pages, otherwise, return empty questions to prevent AI errors
    if (!input.pages || input.pages.length === 0) {
      return { questions: [] };
    }
    const {output} = await prompt(input);
    return output!
  }
);

