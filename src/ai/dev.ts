
import { config } from 'dotenv';
config();

import './flows/answer-questions.ts';
import './flows/process-pdf.ts';
import './flows/suggest-initial-question.ts';
import './flows/suggest-follow-up-question.ts';
import './flows/evaluate-quiz-answer.ts';
import './flows/generate-quiz-questions.ts';
import './flows/summarize-pdf.ts';
import './flows/extract-keywords.ts';
