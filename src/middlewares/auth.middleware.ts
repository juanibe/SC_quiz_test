import { Request, Response, Errback, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/user.model'

interface RequestWithUser extends Request {
    loggedInUser?: User;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    verify(token, 'Secret-Key' as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.loggedInUser = user
        next();
    })
}