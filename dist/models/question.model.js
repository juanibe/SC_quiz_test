"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    text: String,
    isPublished: String,
});
exports.default = mongoose_1.model('Question', QuestionSchema);
