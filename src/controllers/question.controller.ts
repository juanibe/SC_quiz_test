import { Request, Response, NextFunction } from 'express';
import QuestionModel, { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { Error } from '../middlewares/error.middleware';

interface RequestWithUser extends Request {
    loggedInUser?: User;
}


class QuestionController {

    constructor() { }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const questions: Question[] = await QuestionModel.find({}).where('isPublished').equals(true);
            res.status(200).json({ questions: questions });
        } catch (e) {
            next(e)
        }
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                const error = new Error();
                error.message = 'Id must be sent';
                throw error;
            };

            const question: Question | null = await QuestionModel.findOne({ _id: id });

            if (!question) {
                const error = new Error();
                error.message = 'Not found';
                throw error;
            }

            res.status(200).json({ question: question });

        } catch (e) {
            next(e)
        }

    }

    public async create(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { body, loggedInUser } = req;

            if (loggedInUser && loggedInUser.role !== 1) {
                const error: Error = new Error();
                error.message = 'Unauthorized';
                error.status = 401;
                throw error;
            }

            const answers = req.body.answers.map((a: any) => {
                return { text: a.text, isCorrect: a.isCorrect }
            })

            const question: Question = await QuestionModel.create({
                text: req.body.text,
                isPublished: req.body.isPublished,
                answers: answers,
            });
            res.status(200).json({ question: question });
        } catch (e) {
            next(e)
        }
    }

    public async update(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { body, loggedInUser } = req;

            if (loggedInUser && loggedInUser.role !== 1) {
                const error: Error = new Error();
                error.message = 'Unauthorized';
                error.status = 401;
                throw error;
            };

            const { id } = req.params;

            if (!id) {
                const error = new Error();
                error.message = 'Id must be sent';
                throw error;
            };

            await QuestionModel.findByIdAndUpdate(id, body, { new: true });
            res.status(200).json({ message: 'SUCCESS' });
        } catch (e) {
            next(e)
        }

    }

    public async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const { loggedInUser } = req;

        if (loggedInUser && loggedInUser.role !== 1) {
            const error: Error = new Error();
            error.message = 'Unauthorized';
            error.status = 401;
            throw error;
        };

        const { id } = req.params;

        if (!id) {
            const error = new Error();
            error.message = 'Id must be sent';
            throw error;
        };

        await QuestionModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'SUCCESS' });
    }
};

export const questionController = new QuestionController();
