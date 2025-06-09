"use strict";
/**
 * @fileOverview Answers questions about the content of an uploaded PDF document.
 *
 * - answerQuestions - A function that takes a question and PDF content as input and returns an answer.
 * - AnswerQuestionsInput - The input type for the answerQuestions function.
 * - AnswerQuestionsOutput - The return type for the answerQuestions function.
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
exports.answerQuestions = void 0;
var genkit_1 = require("../genkit");
var genkit_2 = require("genkit");
var AnswerQuestionsInputSchema = genkit_2.z.object({
    question: genkit_2.z.string().describe('The question to be answered.'),
    pdfContent: genkit_2.z.string().describe('The content of the PDF document.'),
});
var AnswerQuestionsOutputSchema = genkit_2.z.object({
    answer: genkit_2.z
        .string()
        .describe('The answer to the question based on the PDF content, including a reference to the page number where the information was found, if available. For example: "The capital is Paris. (Reference: Page 5)" or "The information is XYZ. (Reference: Page number not found in text)"'),
});
function answerQuestions(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, answerQuestionsFlow(input)];
        });
    });
}
exports.answerQuestions = answerQuestions;
var prompt = genkit_1.ai.definePrompt({
    name: 'answerQuestionsPrompt',
    input: { schema: AnswerQuestionsInputSchema },
    output: { schema: AnswerQuestionsOutputSchema },
    prompt: "You are an AI assistant designed to answer questions based on the content of a provided PDF document.\nYour primary task is to answer the user's question accurately using the PDF content.\nAfter providing the answer, you MUST include a reference to the specific page number(s) from which the information was drawn.\nIf page numbers are not explicitly available or discernible in the provided text, state that the page number could not be determined.\nFormat the reference clearly at the end of your answer, for example: \"The answer is XYZ. (Reference: Page 3)\" or \"The answer is ABC. (Reference: Page number not found in text)\".\n\nPDF Content:\n{{{pdfContent}}}\n\nQuestion:\n{{{question}}}\n\nAnswer:",
});
var answerQuestionsFlow = genkit_1.ai.defineFlow({
    name: 'answerQuestionsFlow',
    inputSchema: AnswerQuestionsInputSchema,
    outputSchema: AnswerQuestionsOutputSchema,
}, function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompt(input)];
            case 1:
                output = (_a.sent()).output;
                return [2 /*return*/, output];
        }
    });
}); });
//# sourceMappingURL=answer-questions.js.map