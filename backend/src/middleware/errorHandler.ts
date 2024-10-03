import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ENV } from '../config/env';

export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            message: err.message,
        });
    } else {
        res.status(500).json({
            message: ENV.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message,
        });
    }
};
