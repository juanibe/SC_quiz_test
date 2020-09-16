import { NextFunction, Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import UserModel, { User } from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { Error } from '../middlewares/error.middleware';

interface RequestWithUser extends Request {
    loggedInUser?: User;
}

class UserController {

    constructor() { }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users: User[] = await UserModel.find({});
            res.status(200).json({ users: users });
        } catch (e) {
            next(e)
        }

    }

    public async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            if (!id) {
                const error: Error = new Error()
                error.message = 'Id must be sent'
                error.status = 400;
                throw error;
            }

            const user: User | null = await UserModel.findOne({ _id: id });

            if (!user) {
                const error: Error = new Error()
                error.message = 'Not found'
                error.status = 404;
                throw error;
            }

            res.status(200).json({ user: user });

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
            };

            if (!body || !body.email || !body.password) {
                const error: Error = new Error()
                error.message = 'Email and Passoword are required'
                error.status = 400;
                throw error;
            }

            const userExist = await UserModel.findOne({ email: body.email });

            if (userExist) {
                const error: Error = new Error()
                error.message = 'User already exists'
                error.status = 400;
                throw error;
            };

            const salt: any = genSaltSync(10);
            const hashedPass = hashSync(body.password, salt);
            body.password = hashedPass;
            body.password = hashedPass;

            const user: User = await UserModel.create(body);

            if (!user) {
                const error: Error = new Error()
                error.message = 'There was a problem trying to create the user'
                error.status = 500;
                throw error;
            };

            const jwt = sign({ id: user._id, role: user.role, email: user.email }, 'Secret-Key')

            res.status(200).json({ user: user, jwt: jwt });

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
                const error: Error = new Error()
                error.message = 'Id must be sent'
                error.status = 400;
                throw error;
            };

            if (body.email) {
                const userExist = UserModel.findOne({ email: body.email });

                if (userExist) {
                    const error: Error = new Error()
                    error.message = 'User already exists'
                    error.status = 400;
                    throw error;
                }
            }

            await UserModel.findByIdAndUpdate(id, body, { new: true });

            res.status(200).json({ message: 'SUCCESS' });
        } catch (e) {
            next(e)
        }
    }

    public async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { loggedInUser } = req;

            if (loggedInUser && loggedInUser.role !== 1) {
                const error: Error = new Error();
                error.message = 'Unauthorized';
                error.status = 401;
                throw error;
            };

            const { id } = req.params;

            if (!id) {
                const error: Error = new Error()
                error.message = 'Id must be sent'
                error.status = 400;
                throw error;
            };

            await UserModel.findByIdAndDelete(id);

            res.status(200).json({ message: 'SUCCESS' });
        } catch (e) {
            next(e)
        }
    }
};

export const userController = new UserController();
