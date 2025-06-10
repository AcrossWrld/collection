
import { config } from 'dotenv';
config();

import './flow/answer-questions';
import './flows/process-pdf';
import './flows/suggest-initial-question';
import './flows/suggest-follow-up-question';
import './flows/evaluate-quiz-answer';
import './flows/generate-quiz-questions';
import './flows/summarize-pdf';
import './flows/extract-keywords';
