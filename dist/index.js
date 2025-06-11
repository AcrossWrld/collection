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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var answer_questions_1 = require("./ai/flow/answer-questions");
var evaluate_quiz_answer_1 = require("./ai/flow/evaluate-quiz-answer");
var extract_keywords_1 = require("./ai/flow/extract-keywords");
var generate_quiz_answers_1 = require("./ai/flow/generate-quiz-answers");
var process_pdf_1 = require("./ai/flow/process-pdf");
var suggest_follow_up_question_1 = require("./ai/flow/suggest-follow-up-question");
var suggest_initial_question_1 = require("./ai/flow/suggest-initial-question");
var summarize_pdf_1 = require("./ai/flow/summarize-pdf");
var dotenv_1 = __importDefault(require("dotenv"));
var genkit_1 = require("genkit");
var googleai_1 = require("@genkit-ai/googleai");
dotenv_1.default.config();
exports.ai = (0, genkit_1.genkit)({
    plugins: [(0, googleai_1.googleAI)()],
    model: 'googleai/gemini-2.0-flash',
});
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Route 1: PDF Question Answering
app.post('/api/answer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, question, pdfContent, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, question = _a.question, pdfContent = _a.pdfContent;
                if (!question || !pdfContent) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing question or pdfContent' })];
                }
                return [4 /*yield*/, (0, answer_questions_1.answerQuestions)({ question: question, pdfContent: pdfContent })];
            case 1:
                result = _b.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error('Error:', err_1);
                res.status(500).json({ error: 'Failed to generate answer' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route 2: Quiz Answer Evaluation
app.post('/api/evaluate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, question, userAnswer, correctAnswer, result, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, question = _a.question, userAnswer = _a.userAnswer, correctAnswer = _a.correctAnswer;
                if (!question || !userAnswer || !correctAnswer) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing question, userAnswer, or correctAnswer' })];
                }
                return [4 /*yield*/, (0, evaluate_quiz_answer_1.evaluateQuizAnswer)({ question: question, userAnswer: userAnswer, correctAnswer: correctAnswer })];
            case 1:
                result = _b.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.error('Error in /api/evaluate:', err_2);
                res.status(500).json({ error: 'Failed to evaluate answer' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route 3: Keyword Extractor
app.post('/api/keywords', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = req.body.text;
                if (!text) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing text' })];
                }
                return [4 /*yield*/, (0, extract_keywords_1.extractKeywords)({ text: text })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error('Error in /api/keywords:', err_3);
                res.status(500).json({ error: 'Failed to extract keywords' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route 4 : Generate Quiz Questions
app.post('/api/generate-quiz', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pages, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pages = req.body.pages;
                if (!pages || !Array.isArray(pages)) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing or invalid "pages" array in request body.' })];
                }
                return [4 /*yield*/, (0, generate_quiz_answers_1.generateQuizQuestions)({ pages: pages })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error('Error in /api/generate-quiz:', err_4);
                res.status(500).json({ error: 'Failed to generate quiz questions.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route 5 : Process PDF from Base64 Data URI
app.post('/api/process-pdf', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pdfDataUri, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pdfDataUri = req.body.pdfDataUri;
                if (!pdfDataUri || !pdfDataUri.startsWith('data:')) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing or invalid "pdfDataUri" field.' })];
                }
                return [4 /*yield*/, (0, process_pdf_1.processPdf)({ pdfDataUri: pdfDataUri })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.error('Error in /api/process-pdf:', err_5);
                res.status(500).json({ error: 'Failed to process PDF document.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route 6: Suggest Initial Question
app.post('/api/suggest-follow-up', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pdfContent, lastUserQuestion, lastAiAnswer, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, pdfContent = _a.pdfContent, lastUserQuestion = _a.lastUserQuestion, lastAiAnswer = _a.lastAiAnswer;
                if (!pdfContent || !lastUserQuestion || !lastAiAnswer) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing required fields' })];
                }
                return [4 /*yield*/, (0, suggest_follow_up_question_1.suggestFollowUpQuestion)({
                        pdfContent: pdfContent,
                        lastUserQuestion: lastUserQuestion,
                        lastAiAnswer: lastAiAnswer,
                    })];
            case 1:
                result = _b.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error generating follow-up question:', error_1);
                res.status(500).json({ error: 'Failed to generate follow-up question' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route 7: Suggest Initial Question
app.post('/api/suggest-initial-question', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pdfContent, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pdfContent = req.body.pdfContent;
                if (!pdfContent) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing required field: pdfContent' })];
                }
                return [4 /*yield*/, (0, suggest_initial_question_1.suggestInitialQuestion)({ pdfContent: pdfContent })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error suggesting initial question:', error_2);
                res.status(500).json({ error: 'Failed to generate initial question' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route 8: Summarize PDFs
app.post('/api/summarize-pdf', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pdfDataUri, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pdfDataUri = req.body.pdfDataUri;
                if (!pdfDataUri || !pdfDataUri.startsWith('data:application/pdf;base64,')) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Missing or invalid 'pdfDataUri'. Expected format: 'data:application/pdf;base64,<data>'",
                        })];
                }
                return [4 /*yield*/, (0, summarize_pdf_1.summarizePdf)({ pdfDataUri: pdfDataUri })];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error summarizing PDF:', error_3);
                res.status(500).json({ error: 'Failed to summarize the PDF document' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Health check
app.get('/', function (req, res) {
    console.log("Genkit API is running.");
    res.send('Genkit API is running.');
});
// Start the server
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map