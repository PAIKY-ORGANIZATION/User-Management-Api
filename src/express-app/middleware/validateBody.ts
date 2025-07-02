import { AppError, InternalException, UnprocessableEntity } from 'custom-exceptions-express';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

//prettier-ignore
type ControllerFunction = (req: Request<any>, res: Response,next: NextFunction) => Promise<void>;


//prettier-ignore
export const validate = (controller: ControllerFunction, schema?: AnyZodObject,  ) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {

			if (schema) {
				schema.parse(req);
			}

			await controller(req, _res, next);

			next();
		} catch (e) {
			
			console.log(e);
			

			let exception;
			if (e instanceof AppError) {
				exception = e;
			} else if (e instanceof ZodError) {
				const messages = Object.values(e.flatten().fieldErrors).flat();
				exception = new UnprocessableEntity(messages);
			} 
            // else if (e instanceof AxiosError) {

			// 	const status = e.response?.status || 500;
			// 	const message = e.response?.data || 'Axios request failed';

			// 	if (status === 404) {
			// 		exception = new BadRquest(message);
			// 	} else {
			// 		exception = new InternalException('Axios error',status,message);
			// 	}
			// } 
            else {
				exception = new InternalException('Internal server error', (e as any).message);
			}

			next(exception);
		}
	};
};
