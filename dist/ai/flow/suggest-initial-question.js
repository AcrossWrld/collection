'use server';
"use strict";
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
exports.suggestInitialQuestion = void 0;
/**
 * @fileOverview Suggests an initial question for the user after a PDF is processed.
 *
 * - suggestInitialQuestion - A function that takes PDF content and suggests a question.
 * - SuggestInitialQuestionInput - The input type for the suggestInitialQuestion function.
 * - SuggestInitialQuestionOutput - The return type for the suggestInitialQuestion function.
 */
var genkit_1 = require("../genkit");
var genkit_2 = require("genkit");
var SuggestInitialQuestionInputSchema = genkit_2.z.object({
    pdfContent: genkit_2.z.string().describe('The content of the PDF document.'),
});
var SuggestInitialQuestionOutputSchema = genkit_2.z.object({
    suggestedQuestion: genkit_2.z
        .string()
        .min(1, "Suggested question cannot be empty.")
        .describe('A concise and relevant initial question the user might ask about the PDF document.'),
});
function suggestInitialQuestion(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, suggestInitialQuestionFlow(input)];
        });
    });
}
exports.suggestInitialQuestion = suggestInitialQuestion;
var prompt = genkit_1.ai.definePrompt({
    name: 'suggestInitialQuestionPrompt',
    input: { schema: SuggestInitialQuestionInputSchema },
    output: { schema: SuggestInitialQuestionOutputSchema },
    prompt: "You are an AI assistant. Based on the following content of a PDF document, suggest one concise and relevant question that a user could ask to start learning about the document. Ensure the question is not empty.\n\nPDF Content:\n{{{pdfContent}}}\n\nSuggest one initial question:",
});
var suggestInitialQuestionFlow = genkit_1.ai.defineFlow({
    name: 'suggestInitialQuestionFlow',
    inputSchema: SuggestInitialQuestionInputSchema,
    outputSchema: SuggestInitialQuestionOutputSchema,
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
//# sourceMappingURL=suggest-initial-question.js.map