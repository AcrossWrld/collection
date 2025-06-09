"use strict";
/**
 * @fileOverview Extracts keywords and their frequencies from a given text.
 *
 * - extractKeywords - A function that handles the keyword extraction process.
 * - ExtractKeywordsInput - The input type for the extractKeywords function.
 * - ExtractKeywordsOutput - The return type for the extractKeywords function.
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
exports.extractKeywords = void 0;
var genkit_1 = require("../genkit");
var genkit_2 = require("genkit");
var ExtractKeywordsInputSchema = genkit_2.z.object({
    text: genkit_2.z.string().describe('The text from which to extract keywords.'),
});
var ExtractKeywordsOutputSchema = genkit_2.z.array(genkit_2.z.object({
    keyword: genkit_2.z.string().describe('The extracted keyword.'),
    frequency: genkit_2.z.number().describe('The number of times the keyword appears in the text.'),
}));
function extractKeywords(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, extractKeywordsFlow(input)];
        });
    });
}
exports.extractKeywords = extractKeywords;
var extractKeywordsPrompt = genkit_1.ai.definePrompt({
    name: 'extractKeywordsPrompt',
    input: { schema: ExtractKeywordsInputSchema },
    output: { schema: ExtractKeywordsOutputSchema },
    prompt: "You are an expert at extracting keywords from text.\n\n  Given the following text, extract a list of keywords and their frequencies.\n  Return a JSON array of objects, where each object has a \"keyword\" and a \"frequency\" field.\n\n  Text: {{{text}}}",
});
var extractKeywordsFlow = genkit_1.ai.defineFlow({
    name: 'extractKeywordsFlow',
    inputSchema: ExtractKeywordsInputSchema,
    outputSchema: ExtractKeywordsOutputSchema,
}, function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, extractKeywordsPrompt(input)];
            case 1:
                output = (_a.sent()).output;
                return [2 /*return*/, output];
        }
    });
}); });
//# sourceMappingURL=extract-keywords.js.map