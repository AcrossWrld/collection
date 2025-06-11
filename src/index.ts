import express from 'express';
import bodyParser from 'body-parser';
import { answerQuestions } from './ai/flow/answer-questions';
import { evaluateQuizAnswer } from './ai/flow/evaluate-quiz-answer';
import { extractKeywords } from './ai/flow/extract-keywords';
import { generateQuizQuestions } from './ai/flow/generate-quiz-answers'
import { processPdf } from './ai/flow/process-pdf';
import { suggestFollowUpQuestion } from './ai/flow/suggest-follow-up-question'; 
import { suggestInitialQuestion } from './ai/flow/suggest-initial-question'; 
import { summarizePdf } from './ai/flow/summarize-pdf'; 
import dotenv from 'dotenv';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';


dotenv.config();
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route 1: PDF Question Answering
app.post('/api/answer', async (req, res) => {
  try {
    const { question, pdfContent } = req.body;

    if (!question || !pdfContent) {
      return res.status(400).json({ error: 'Missing question or pdfContent' });
    }

    const result = await answerQuestions({ question, pdfContent });
    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
});

// Route 2: Quiz Answer Evaluation
app.post('/api/evaluate', async (req, res) => {
  try {
    const { question, userAnswer, correctAnswer } = req.body;

    if (!question || !userAnswer || !correctAnswer) {
      return res.status(400).json({ error: 'Missing question, userAnswer, or correctAnswer' });
    }

    const result = await evaluateQuizAnswer({ question, userAnswer, correctAnswer });
    res.json(result);
  } catch (err) {
    console.error('Error in /api/evaluate:', err);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

//Route 3: Keyword Extractor
app.post('/api/keywords', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Missing text' });
    }
    const result = await extractKeywords({ text });
    res.json(result);
  } catch (err) {
    console.error('Error in /api/keywords:', err);
    res.status(500).json({ error: 'Failed to extract keywords' });
  }
});

//Route 4 : Generate Quiz Questions
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { pages } = req.body;
    if (!pages || !Array.isArray(pages)) {
      return res.status(400).json({ error: 'Missing or invalid "pages" array in request body.' });
    }

    const result = await generateQuizQuestions({ pages });
    res.json(result);
  } catch (err) {
    console.error('Error in /api/generate-quiz:', err);
    res.status(500).json({ error: 'Failed to generate quiz questions.' });
  }
});

// Route 5 : Process PDF from Base64 Data URI
app.post('/api/process-pdf', async (req, res) => {
  try {
    const { pdfDataUri } = req.body;

    if (!pdfDataUri || !pdfDataUri.startsWith('data:')) {
      return res.status(400).json({ error: 'Missing or invalid "pdfDataUri" field.' });
    }

    const result = await processPdf({ pdfDataUri });
    res.json(result);
  } catch (err) {
    console.error('Error in /api/process-pdf:', err);
    res.status(500).json({ error: 'Failed to process PDF document.' });
  }
});

//Route 6: Suggest Initial Question
app.post('/api/suggest-follow-up', async (req, res) => {
  try {
    const { pdfContent, lastUserQuestion, lastAiAnswer } = req.body;

    if (!pdfContent || !lastUserQuestion || !lastAiAnswer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await suggestFollowUpQuestion({
      pdfContent,
      lastUserQuestion,
      lastAiAnswer,
    });

    res.json(result);
  } catch (error) {
    console.error('Error generating follow-up question:', error);
    res.status(500).json({ error: 'Failed to generate follow-up question' });
  }
});

//Route 7: Suggest Initial Question
app.post('/api/suggest-initial-question', async (req, res) => {
  try {
    const { pdfContent } = req.body;

    if (!pdfContent) {
      return res.status(400).json({ error: 'Missing required field: pdfContent' });
    }

    const result = await suggestInitialQuestion({ pdfContent });

    res.json(result);
  } catch (error) {
    console.error('Error suggesting initial question:', error);
    res.status(500).json({ error: 'Failed to generate initial question' });
  }
});

//Route 8: Summarize PDFs
app.post('/api/summarize-pdf', async (req, res) => {
  try {
    const { pdfDataUri } = req.body;

    if (!pdfDataUri || !pdfDataUri.startsWith('data:application/pdf;base64,')) {
      return res.status(400).json({
        error: "Missing or invalid 'pdfDataUri'. Expected format: 'data:application/pdf;base64,<data>'",
      });
    }

    const result = await summarizePdf({ pdfDataUri });

    res.json(result);
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    res.status(500).json({ error: 'Failed to summarize the PDF document' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Genkit API is running.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
