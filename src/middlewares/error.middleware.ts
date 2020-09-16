import { Request, Response, Errback, NextFunction } from 'express';

export interface Error {
    status?: number;
    message?: string;
}

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.status || 500)
    return res.send({
        message: err.message || "Internal server error",
        status: err.status || 500
    });

};