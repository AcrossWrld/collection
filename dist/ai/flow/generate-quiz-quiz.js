"use strict";
/**
 * @fileOverview This file defines a Genkit flow for generating quiz questions from a given document.
 *
 * - generateQuizQuestions - A function that generates a list of quiz questions with answers and page references.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuizQuestions = void 0;
var genkit_1 = require("../genkit");
var genkit_2 = require("genkit");
var PageContentSchema = genkit_2.z.object({
    pageNumber: genkit_2.z.number().describe('The page number.'),
    content: genkit_2.z.string().describe('The text content of the page.'),
});
var GenerateQuizQuestionsInputSchema = genkit_2.z.object({
    pages: genkit_2.z.array(PageContentSchema).describe('An array of page contents from the document.'),
});
var QuizQuestionOutputSchema = genkit_2.z.object({
    questionText: genkit_2.z.string().describe('The text of the quiz question.'),
    correctAnswer: genkit_2.z.string().describe('The correct answer to the question.'),
    pageNumber: genkit_2.z.number().optional().describe('The page number in the document where the answer can be found.'),
});
var GenerateQuizQuestionsOutputSchema = genkit_2.z.object({
    questions: genkit_2.z
        .array(QuizQuestionOutputSchema)
        .describe('An array of quiz questions generated from the document, including correct answers and page numbers.'),
});
function generateQuizQuestions(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, generateQuizQuestionsFlow(input)];
        });
    });
}
exports.generateQuizQuestions = generateQuizQuestions;
var prompt = genkit_1.ai.definePrompt({
    name: 'generateQuizQuestionsPrompt',
    input: { schema: GenerateQuizQuestionsInputSchema },
    output: { schema: GenerateQuizQuestionsOutputSchema },
    prompt: "You are an expert quiz creator. Your task is to generate up to 10 insightful quiz questions based on the provided document content. The document content is given as a series of pages, each with its page number and text.\n\nFor each question you generate, you MUST provide:\n1.  `questionText`: The question itself.\n2.  `correctAnswer`: The accurate answer to the question.\n3.  `pageNumber`: The page number from the document where the information for the correct answer can be found. If the information spans multiple pages, pick the primary page. If a page number cannot be reasonably determined, you may omit it or set it to null.\n\nDocument Content by Page:\n{{#each pages}}\n--- Page {{this.pageNumber}} ---\n{{{this.content}}}\n--- End of Page {{this.pageNumber}} ---\n\n{{/each}}\n\nPlease ensure your output is a JSON array of objects, where each object strictly follows this structure:\n`{ \"questionText\": \"...\", \"correctAnswer\": \"...\", \"pageNumber\": ... }`\nDo not include any questions if the document content is insufficient or not suitable for generating meaningful quiz questions. Ensure that correctAnswers are derived from the provided text.\nIf no questions can be generated, return an empty array for \"questions\".\n",
});
var generateQuizQuestionsFlow = genkit_1.ai.defineFlow({
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
}, function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Ensure input has pages, otherwise, return empty questions to prevent AI errors
                if (!input.pages || input.pages.length === 0) {
                    return [2 /*return*/, { questions: [] }];
                }
                return [4 /*yield*/, prompt(input)];
            case 1:
                output = (_a.sent()).output;
                return [2 /*return*/, output];
        }
    });
}); });
//# sourceMappingURL=generate-quiz-quiz.js.map