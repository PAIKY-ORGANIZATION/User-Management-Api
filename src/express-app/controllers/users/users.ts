import { Request, Response } from 'express';
import { LoginSchemaType, SignupSchemaType } from '../../zodSchemas/user-schema.js';
import { userService } from '../../app-setup.js';
import { BadRequest } from 'custom-exceptions-express';


export const signup = async (req: Request<{}, {}, SignupSchemaType>,res: Response) => {
	const { username, email, password } = req.body;

	await userService.register(email, username, password);

	res.send({ message: 'Success', data: { username, email, password } });
};

export const signin = async (req: Request<{}, {}, LoginSchemaType>, res: Response) => {
	const { email, password } = req.body;
    await userService.login(email, password);
	res.send({ message: 'Success', data: { email, password } });
};

export const triggerBadRequest = async (_req: Request, _res: Response) => {
	
    throw new BadRequest('Bad request');

};
