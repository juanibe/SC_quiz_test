import { NextFunction, Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import UserModel, { User } from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { Error } from '../middlewares/error.middleware';


class AuthController {

    constructor() { }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;

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

            // const hashedPass = this.hashPass(body.password);
            const salt: any = genSaltSync(10);
            const hashedPass = hashSync(body.password, salt);
            body.role = 0;
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

    };

    public async login(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, password } = req.body;

            const userExist: any = await UserModel.findOne({ email: email });

            if (!userExist) {
                const error: Error = new Error()
                error.message = 'Invalid credentials'
                error.status = 400;
                throw error;
            };

            const isValidPassword: boolean = userExist.comparePasswords(password);

            if (!isValidPassword) {
                const error: Error = new Error()
                error.message = 'Incorrect password'
                error.status = 400;
                throw error;
            }

            const jwt: string = sign({ id: userExist._id, role: userExist.role, email: userExist.email }, 'Secret-Key');

            res.status(200).json({ jwt: jwt });

        } catch (e) {
            next(e)
        }
    }

    private hashPass(password: string) {
        const salt: any = genSaltSync(10);
        return hashSync(password, salt);
    };

    private generateJwt(user: User) {
        return sign({ id: user._id, role: user.role, email: user.email }, 'Secret-Key')
    }
};

export const authController = new AuthController();
