"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const question_controller_1 = __importDefault(require("./question.controller"));
exports.default = {
    UserController: user_controller_1.default,
    QuestionController: question_controller_1.default,
};
