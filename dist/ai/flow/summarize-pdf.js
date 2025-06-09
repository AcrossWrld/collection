"use strict";
/**
 * @fileOverview PDF summarization AI agent.
 *
 * - summarizePdf - A function that handles the PDF summarization process.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
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
exports.summarizePdf = void 0;
var genkit_1 = require("../genkit");
var genkit_2 = require("genkit");
var SummarizePdfInputSchema = genkit_2.z.object({
    pdfDataUri: genkit_2.z
        .string()
        .describe('A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
var SummarizePdfOutputSchema = genkit_2.z.object({
    summary: genkit_2.z.string().describe('A concise summary of the PDF document.'),
    keywords: genkit_2.z.array(genkit_2.z.object({ word: genkit_2.z.string(), frequency: genkit_2.z.number() })).describe('Keywords with their occurrence frequencies.'),
});
function summarizePdf(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, summarizePdfFlow(input)];
        });
    });
}
exports.summarizePdf = summarizePdf;
var summarizePdfPrompt = genkit_1.ai.definePrompt({
    name: 'summarizePdfPrompt',
    input: { schema: SummarizePdfInputSchema },
    output: { schema: SummarizePdfOutputSchema },
    prompt: "You are an expert AI assistant specializing in summarizing PDF documents and extracting key information.\n\nYou will receive a PDF document as input. Your task is to:\n\n1.  Provide a concise and meaningful summary of the PDF's content.\n2.  Identify and list the keywords that reflect the key topics discussed in the PDF, along with their occurrence frequencies.\n\nHere is the PDF document:\n\n{{media url=pdfDataUri}}",
});
var summarizePdfFlow = genkit_1.ai.defineFlow({
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
}, function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, summarizePdfPrompt(input)];
            case 1:
                output = (_a.sent()).output;
                return [2 /*return*/, output];
        }
    });
}); });
//# sourceMappingURL=summarize-pdf.js.map