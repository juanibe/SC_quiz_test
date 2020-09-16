"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = exports.QuestionRoutes = exports.UserRoutes = void 0;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.UserRoutes = user_routes_1.default;
const question_routes_1 = __importDefault(require("./question.routes"));
exports.QuestionRoutes = question_routes_1.default;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.AuthRoutes = auth_routes_1.default;
