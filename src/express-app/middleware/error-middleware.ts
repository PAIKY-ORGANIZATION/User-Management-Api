import { NextFunction, Request, Response } from 'express';
import { AppError } from '../lib/exceptions.js';

export const errorMiddleware = (error: AppError, _req: Request, res: Response, _next: NextFunction)=>{

	res.status(error.statusCode).send({
        message: error.message,
		error: error.InternalError,
	});

	return;
};
