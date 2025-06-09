"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
var genkit_1 = require("genkit");
var googleai_1 = require("@genkit-ai/googleai");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ai = (0, genkit_1.genkit)({
    plugins: [(0, googleai_1.googleAI)()],
    model: 'googleai/gemini-2.0-flash',
});
//# sourceMappingURL=genkit.js.map