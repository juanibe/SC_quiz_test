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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionController = void 0;
const question_model_1 = __importDefault(require("../models/question.model"));
class QuestionController {
    constructor() { }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield question_model_1.default.find({});
                res.status(200).json({ questions: questions });
            }
            catch (e) {
                next(e);
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    const error = new Error();
                    error.message = 'Id must be sent';
                    throw error;
                }
                ;
                const question = yield question_model_1.default.findOne({ _id: id });
                if (!question) {
                    const error = new Error();
                    error.message = 'Not found';
                    throw error;
                }
                res.status(200).json({ question: question });
            }
            catch (e) {
                next(e);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, loggedInUser } = req;
                if (loggedInUser && loggedInUser.role !== 1) {
                    const error = new Error();
                    error.message = 'Unauthorized';
                    error.status = 401;
                    throw error;
                }
                const question = yield question_model_1.default.create(body);
                res.status(200).json({ question: question });
            }
            catch (e) {
                next(e);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, loggedInUser } = req;
                if (loggedInUser && loggedInUser.role !== 1) {
                    const error = new Error();
                    error.message = 'Unauthorized';
                    error.status = 401;
                    throw error;
                }
                ;
                const { id } = req.params;
                if (!id) {
                    const error = new Error();
                    error.message = 'Id must be sent';
                    throw error;
                }
                ;
                yield question_model_1.default.findByIdAndUpdate(id, body, { new: true });
                res.status(200).json({ message: 'SUCCESS' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loggedInUser } = req;
            if (loggedInUser && loggedInUser.role !== 1) {
                const error = new Error();
                error.message = 'Unauthorized';
                error.status = 401;
                throw error;
            }
            ;
            const { id } = req.params;
            if (!id) {
                const error = new Error();
                error.message = 'Id must be sent';
                throw error;
            }
            ;
            yield question_model_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: 'SUCCESS' });
        });
    }
}
;
exports.questionController = new QuestionController();
