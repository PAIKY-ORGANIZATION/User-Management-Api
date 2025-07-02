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

			console.log('TEST123');


				schema.parse(req);
			}

			await controller(req, _res, next);

			next();
		} catch (e) {
			console.error(e);
			let exception;
			if (e instanceof AppError) {

				exception = e;
			} else if (e instanceof ZodError) {
			//* About zod schemas from "user-manager-sdk":
			//¡ If you are importing the zod schemas from  "user-manager-sdk" and you are running this code along the LINKED version of ""user-manager-sdk", this will no be  detected as a ZodError. Instead it will be an internal server error.
			// ¡ Run this code with  \ npm i "user-manager-sdk" \  instead of npm link "user-manager-sdk" for this section to work or declare the zod in this server


				console.log('TEST');
				

				const messages = Object.values(e.flatten().fieldErrors).flat();
				exception = new UnprocessableEntity(messages);
			} 
            else {
				exception = new InternalException('Internal server error', (e as any).message);
			}

			next(exception);
		}
	};
};
